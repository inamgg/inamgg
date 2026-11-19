/**
 * Galaxiee Courier Sync — Leopards + PostEx → Google Sheet
 *
 * Kahan lagana hai: Google Sheet → Extensions → Apps Script → is file ka sara code paste karein.
 * Keys kahan rakhni hain (Sheet ke kisi cell mein KABHI nahi):
 *   Apps Script → Project Settings (gear icon) → Script Properties → Add property:
 *     POSTEX_TOKEN           (PostEx merchant portal se API token)
 *     LEOPARDS_API_KEY       (Leopards COD portal → API Settings → API Management)
 *     LEOPARDS_API_PASSWORD  (wahin se)
 *
 * Endpoints:
 *   PostEx  — "PostEx-COD API Integration Guide V4.1.9": get-all-order, payment-status, get-order-status.
 *   Leopards — trackBookedPacket and getAllCities, as used by the open-source developifynet/leopardscod-php client.
 *   Leopards field names are mapped on a best-effort basis; anything else lands in "other details"
 *   so the mapping can be corrected after the first real run.
 *
 * Privacy: customer name, phone, address and email are never written to the Sheet.
 */

const POSTEX_BASE = 'https://api.postex.pk/services/integration/api/order';
const LEOPARDS_BASE = 'https://merchantapi.leopardscourier.com/api';
const POSTEX_DAYS_BACK = 60;          // kitne din purane PostEx orders sync karne hain
const POSTEX_PAYMENT_CHECKS_PER_RUN = 100;
const LEOPARDS_BATCH = 50;
const TZ = 'Asia/Karachi';
const PII_KEY_PATTERN = /name|phone|mobile|address|email|cnic/i;

const POSTEX_COLUMNS = [
  'trackingNumber', 'orderRefNumber', 'transactionStatus', 'cityName', 'invoicePayment',
  'transactionDate', 'orderPickupDate', 'orderDeliveryDate', 'transactionFee', 'transactionTax',
  'reversalFee', 'reversalTax', 'upfrontPayment', 'upfrontPaymentDate', 'reservePayment',
  'reservePaymentDate', 'balancePayment'
];
const LEOPARDS_FIELDS = [
  'booked_packet_order_id', 'booked_packet_status', 'booking_date',
  'destination_city_name', 'booked_packet_collect_amount'
];

// ---------- Menu ----------
function onOpen() {
  SpreadsheetApp.getUi().createMenu('Galaxiee')
    .addItem('1. Test connections', 'testConnections')
    .addItem('2. Sync PostEx now', 'syncPostEx')
    .addItem('3. Sync Leopards now', 'syncLeopards')
    .addItem('4. Turn on hourly sync', 'setupHourlyTrigger')
    .addToUi();
}

// ---------- Helpers ----------
function prop_(key) {
  const v = PropertiesService.getScriptProperties().getProperty(key);
  if (!v) throw new Error('Missing Script Property: ' + key + ' (Project Settings → Script Properties)');
  return v;
}

function redact_(text) {
  let s = String(text);
  const props = PropertiesService.getScriptProperties().getProperties();
  Object.keys(props).forEach(function (k) {
    if (props[k] && props[k].length >= 4) s = s.split(props[k]).join('***');
  });
  return s;
}

function sheet_(name) {
  const ss = SpreadsheetApp.getActive();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function log_(source, message) {
  sheet_('Sync Log').appendRow([new Date(), source, redact_(message).slice(0, 500)]);
}

function ymd_(d) {
  return Utilities.formatDate(d, TZ, 'yyyy-MM-dd');
}

function qs_(params) {
  return Object.keys(params).map(function (k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
  }).join('&');
}

// ---------- PostEx ----------
function postexGet_(path, params) {
  const url = POSTEX_BASE + path + (params ? '?' + qs_(params) : '');
  const res = UrlFetchApp.fetch(url, {
    method: 'get',
    headers: { token: prop_('POSTEX_TOKEN') },
    muteHttpExceptions: true
  });
  const code = res.getResponseCode();
  const text = res.getContentText();
  if (code !== 200) throw new Error('PostEx HTTP ' + code + ': ' + text.slice(0, 200));
  return JSON.parse(text);
}

function readSettlements_(sh) {
  const out = {};
  if (sh.getLastRow() < 2) return out;
  const data = sh.getDataRange().getValues();
  const h = data[0];
  const iT = h.indexOf('trackingNumber');
  const iSet = h.indexOf('settle');
  const iSD = h.indexOf('settlementDate');
  if (iT < 0 || iSet < 0) return out;
  for (let r = 1; r < data.length; r++) {
    out[data[r][iT]] = { settle: data[r][iSet], settlementDate: iSD >= 0 ? data[r][iSD] : '' };
  }
  return out;
}

function syncPostEx() {
  const to = new Date();
  const from = new Date(to.getTime() - POSTEX_DAYS_BACK * 86400000);
  const json = postexGet_('/v1/get-all-order', { orderStatusID: 0, fromDate: ymd_(from), toDate: ymd_(to) });
  const orders = Array.isArray(json.dist) ? json.dist : [];
  const sh = sheet_('PostEx');
  const previous = readSettlements_(sh);
  const header = POSTEX_COLUMNS.concat(['settle', 'settlementDate', 'lastSynced']);
  const now = new Date();
  const rows = orders.map(function (o) {
    const row = POSTEX_COLUMNS.map(function (c) { return (o[c] === undefined || o[c] === null) ? '' : o[c]; });
    const s = previous[o.trackingNumber] || {};
    return row.concat([s.settle === undefined ? '' : s.settle, s.settlementDate || '', now]);
  });
  sh.clearContents();
  sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold');
  if (rows.length) sh.getRange(2, 1, rows.length, header.length).setValues(rows);
  sh.setFrozenRows(1);
  log_('PostEx', 'Synced ' + rows.length + ' orders (' + ymd_(from) + ' to ' + ymd_(to) + ')');
  updatePostExPayments_();
}

function updatePostExPayments_() {
  const sh = sheet_('PostEx');
  if (sh.getLastRow() < 2) return;
  const data = sh.getDataRange().getValues();
  const h = data[0];
  const iT = h.indexOf('trackingNumber');
  const iS = h.indexOf('transactionStatus');
  const iSet = h.indexOf('settle');
  const todo = [];
  for (let r = 1; r < data.length && todo.length < POSTEX_PAYMENT_CHECKS_PER_RUN; r++) {
    const delivered = String(data[r][iS]).trim().toLowerCase() === 'delivered';
    if (delivered && data[r][iSet] !== true) todo.push(r);
  }
  const token = prop_('POSTEX_TOKEN');
  let settled = 0;
  for (let i = 0; i < todo.length; i += 20) {
    const chunk = todo.slice(i, i + 20);
    const requests = chunk.map(function (r) {
      return {
        url: POSTEX_BASE + '/v1/payment-status/' + encodeURIComponent(data[r][iT]),
        method: 'get',
        headers: { token: token },
        muteHttpExceptions: true
      };
    });
    UrlFetchApp.fetchAll(requests).forEach(function (res, k) {
      if (res.getResponseCode() !== 200) return;
      const d = (JSON.parse(res.getContentText()) || {}).dist || {};
      if (d.settle === true) settled++;
      sh.getRange(chunk[k] + 1, iSet + 1, 1, 2).setValues([[d.settle === true, d.settlementDate || '']]);
    });
  }
  log_('PostEx', 'Payment checked for ' + todo.length + ' delivered orders, ' + settled + ' settled');
}

// ---------- Leopards ----------
function leopardsGet_(path, params) {
  const all = Object.assign({
    api_key: prop_('LEOPARDS_API_KEY'),
    api_password: prop_('LEOPARDS_API_PASSWORD')
  }, params || {});
  const res = UrlFetchApp.fetch(LEOPARDS_BASE + path + '?' + qs_(all), { muteHttpExceptions: true });
  const code = res.getResponseCode();
  if (code !== 200) throw new Error('Leopards HTTP ' + code);
  return JSON.parse(res.getContentText());
}

function syncLeopards() {
  const sh = sheet_('Leopards');
  const last = sh.getLastRow();
  if (last < 2) { log_('Leopards', 'Column A mein koi CN number nahi'); return; }
  const cns = sh.getRange(2, 1, last - 1, 1).getValues().map(function (r) { return String(r[0]).trim(); });
  const list = cns.filter(function (c) { return c; });
  const found = {};
  for (let i = 0; i < list.length; i += LEOPARDS_BATCH) {
    const chunk = list.slice(i, i + LEOPARDS_BATCH);
    const json = leopardsGet_('/trackBookedPacket/format/json/', { track_numbers: chunk.join(',') });
    if (!json.status) { log_('Leopards', 'API error: ' + (json.error || 'unknown')); continue; }
    (json.packet_list || []).forEach(function (p) {
      const cn = String(p.track_number || p.booked_packet_cn || p.cn_number || '').trim();
      if (cn) found[cn] = p;
    });
  }
  const now = new Date();
  const out = cns.map(function (cn) {
    const p = found[cn];
    if (!p) return LEOPARDS_FIELDS.map(function () { return ''; }).concat([cn ? 'not found' : '', cn ? now : '']);
    const known = LEOPARDS_FIELDS.map(function (f) { return p[f] === undefined ? '' : p[f]; });
    const other = Object.keys(p).filter(function (k) {
      return LEOPARDS_FIELDS.indexOf(k) < 0 && !PII_KEY_PATTERN.test(k) && typeof p[k] !== 'object';
    }).map(function (k) { return k + '=' + p[k]; }).join('; ');
    return known.concat([other.slice(0, 2000), now]);
  });
  const header = ['CN number (yahan paste karein)'].concat(LEOPARDS_FIELDS).concat(['other details', 'lastSynced']);
  sh.getRange(1, 1, 1, header.length).setValues([header]).setFontWeight('bold');
  sh.getRange(2, 2, out.length, out[0].length).setValues(out);
  log_('Leopards', 'Tracked ' + Object.keys(found).length + ' of ' + list.length + ' CN numbers');
}

// ---------- Test + schedule ----------
function testConnections() {
  const msgs = [];
  try {
    const j = postexGet_('/v1/get-order-status');
    msgs.push('PostEx OK: ' + (j.statusMessage || j.statusCode));
  } catch (e) {
    msgs.push('PostEx FAILED: ' + e.message);
  }
  try {
    const j = leopardsGet_('/getAllCities/format/json/');
    msgs.push(j.status ? 'Leopards OK' : 'Leopards FAILED: ' + (j.error || 'unknown'));
  } catch (e) {
    msgs.push('Leopards FAILED: ' + e.message);
  }
  msgs.forEach(function (m) { log_('Test', m); });
  try { SpreadsheetApp.getUi().alert(redact_(msgs.join('\n'))); } catch (e) { /* run from editor: see Sync Log */ }
}

function hourlySync() {
  try { syncPostEx(); } catch (e) { log_('PostEx', 'ERROR ' + e.message); }
  try { syncLeopards(); } catch (e) { log_('Leopards', 'ERROR ' + e.message); }
}

function setupHourlyTrigger() {
  ScriptApp.getProjectTriggers()
    .filter(function (t) { return t.getHandlerFunction() === 'hourlySync'; })
    .forEach(function (t) { ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('hourlySync').timeBased().everyHours(1).create();
  log_('Setup', 'Hourly sync ON');
}
