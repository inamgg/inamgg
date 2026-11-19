# Galaxiee AI Team — Version 1 Blueprint
**Kaam:** Daily Ops + Reports · **Team:** 4 agents · **Setup:** 7 din, roz 1–2 ghante

> Is blueprint ke saare numbers aapke jawabon se liye gaye hain. Jo number aapne nahi diya, uske aage **data missing** likha hai. Wo Day 1 par Business Brain mein bharna hai.

**Aapke diye hue facts:**
| Cheez | Aapka jawab |
|---|---|
| Products | Commercial products, price PKR 20,000 se 500,000 |
| Data | Shopify + Excel sheet |
| Couriers | Leopards, PostEx, Pakistan Post Office |
| Heavy maal (40–50 kg se 200 kg tak) | **Adda bilty** (goods transport) se jata hai |
| Courier API | Aapke paas hai. Kis courier ki: **confirm karni hai** |
| Courier charges | Normal parcel PKR 220, weight par PKR 80 per kg |
| Govt tax | Har COD order par 4% |
| RTO (wapas aane wale parcel) | 15–20% |
| Ads | Meta par chal rahe hain. TikTok aur Google ka setup ho chuka hai, ads abhi shuru karne hain |
| Time | Roz 1–2 ghante |
| Budget | Team achha kaam kare to budget ka masla nahi |
| Achha / bura din | 50+ orders bohat achha, 20 se kam bura |
| Product cost, product weight, courier return charge | **data missing** (Shopify mein bhi khaali hai) |

**Shopify se asli data (20 Aug – 18 Nov 2026, 90 din):**
| Cheez | Number |
|---|---|
| Total orders | 1,158 (roz ~13) |
| Cancelled orders | **511 (44%)** |
| Shipped orders | 623 |
| Gross sales | PKR 38,468,173 |
| Cancel/return ki wajah se wapas | PKR 20,382,091 (53%) |
| Net sales | PKR 17,758,541 |
| Average order (Oct–Nov) | ~PKR 37,600 |
| Shopify mein "paid" orders | Sirf 14. Baqi 633 "pending" hain, chahe deliver ho chuke hon |

> **Sab se bara leak:** RTO nahi, **cancellation** hai. 100 mein se 44 order ship hone se pehle hi cancel ho jate hain. Shipped orders par 15–20% RTO lagayein to 1,158 mein se sirf ~500 orders deliver hue, yani taqreeban 43%. Isliye Confirmation Agent ab Week 2 ki pehli priority hai.

**Shopify data mein masle (system banane se pehle theek karne honge):**
- Kisi product mein **cost per item** nahi bhara, aur sab ka **weight 0 kg** hai. Inke baghair profit ka hisaab nahi ho sakta.
- **Shopify ka stock sahi nahi hai (aapne confirm kiya).** Products do qism ke hain:
  - **Apna stock:** godown mein para maal. Iska asli count Shopify mein theek karna hai. Ye "total assets" mein ginta hai.
  - **Market se khareed:** stock nahi hota, order aane par market se khareed kar dispatch hota hai. Har order par khareed ki asli qeemat Sheet mein note hogi, taake us order ka profit sahi nikle. Ye assets mein nahi ginta.
  - Har product par Shopify mein tag lagayein: `stock` ya `market-buy`. System isi se farq karega.
- "Philips Lumea 9900": 5 orders mein 110 units, gross PKR 4.3M, net sirf PKR 39,000. **Aapne kaha ke inhein cancel samjhein.** System inhein sales, orders aur profit mein nahi ginega.
- 78 orders bina product naam ke (PKR 1.3M): **aapne confirm kiya ke ye asli orders hain.** System inhein normal orders ki tarah ginega.

---

## 0. Final system: "Galaxiee Command Center" — ye aapke liye kya karega

Jab poora system ban jayega (Week 8 tak), to aap phone par ek screen kholenge aur ye sab dikhega:

**1. Aapke business ki total value (Total Assets)**
| Hissa | Kahan se aayega | Kitna "live" |
|---|---|---|
| Bank + cash in hand | Aap khud likhenge (2 minute) | Roz/hafte mein ek baar |
| COD cash courier ke paas (Leopards, PostEx) | Courier API se automatic | Har ghante |
| Post Office + adda bilty ka paisa | Aap phone se entry karenge (1 minute per parcel) | Jab parcel jaye ya paisa aaye |
| Raste mein parcels (cost par) | Shopify + courier | Roz |
| Godown ka stock (cost par) | Shopify inventory × cost per item | Live (stock theek hone ke baad) |
| **Minus:** supplier ka udhaar, ads ke bill | Aap likhenge + ad accounts | Roz/hafte |
| **= Net business value** | Cash & Assets Agent hisaab lagayega | Roz subah |

**2. Asal profit:** aaj, is hafte aur is mahine ka. Product, courier, city aur ad platform (Meta, TikTok, Google) ke hisaab se: kis cheez se paisa ban raha hai aur kahan doob raha hai.

**3. Order ka poora safar:** placed → confirmed → cancelled → shipped → delivered → RTO → cash received. Har step par kitne orders aur kitna paisa hai.

**4. Kya karna hai:** roz "Aaj ke top 3 kaam", har ek ke saath PKR mein fayda. Misaal: "PostEx ke paas PKR 4.2 lakh 9 din se pending hai, aaj call karein."

**5. Alerts:** cash 7 din se zyada phansa ho, kisi city mein RTO barh jaye, stock khatam hone wala ho, ya kisi ad ka kharcha profit se zyada ho.

**"Real time" ki imaandar tasveer:**
- **Live:** Shopify orders aur Meta ads. Ye dono connector se seedhe aate hain.
- **Har ghante (automatic):** Leopards aur PostEx ka status aur COD cash, aapki courier API se.
- **Roz subah:** TikTok/Google ads (jab shuru hon).
- **Aap entry karenge:** Post Office aur adda bilty ke parcels. Inki koi API nahi hai.
- **Aap likhenge:** bank balance aur supplier ka udhaar. Isse koi software khud nahi jaan sakta.

**Agents (final team, 8 agents, ek ek karke ON honge):**
| # | Agent | Kab ON | Kaam |
|---|---|---|---|
| 1 | Team Lead | Week 1 | Aapse baat, reports, top 3 kaam |
| 2 | Data Collector | Week 1 | Shopify, Excel, courier, ads ka data |
| 3 | Checker | Week 1 | Numbers milana, fake orders pakarna |
| 4 | Profit & COD Analyst | Week 1 | Profit, RTO, cash pending |
| 5 | **Confirmation Agent** ⭐ | Week 2 | 44% cancellation kam karna: confirmation messages/call scripts, advance payment ki salah |
| 6 | **Cash & Assets Agent** ⭐ | Week 3 | Total assets, courier remittance ka milan, udhaar, cash flow |
| 7 | **Ads Agent** (Meta + TikTok + Google) ⭐ | Week 4 | Teeno platforms ka spend vs asal profit, kahan paisa lagana hai |
| 8 | **Stock Agent** ⭐ | Week 5 | Stock value, khatam hone ke alerts, na bikne wala stock |
| 9 | Support Agent | Week 6–7 | Customer sawalon ke jawab ke drafts |
| 10 | Content/SEO Agent | Week 8+ | Product pages, SEO |

⭐ = aapke "complete system" ke liye naye add kiye gaye agents. Inke prompts Section 4b mein hain.

---

## 1. Recommended use case — Daily Ops + Reports

Pehla kaam yahi kyun:
1. Aapke products PKR 20K se 500K ke hain. 15–20% RTO ka matlab hai har 5–6 mein se 1 bara order wapas aa raha hai. Har RTO par do taraf ka courier kharcha aur paisa phansta hai. Pehle ye number saaf dikhna chahiye.
2. Abhi data Shopify aur Excel mein bikhra hua hai. Ek roz ki report sab ek jagah le aayegi.
3. Baad mein aane wala har agent (confirmation, ads, support) inhi numbers par chalega.
4. Is kaam mein risk kam hai. Team sirf parhti aur hisaab lagati hai, customer ko kuch nahi bhejti aur paisa kharch nahi karti.
5. Pehle hafte se hi roz 30–60 minute ka manual hisaab bachega.

**Baqi kaam kab add hon:**
| Kaam | Kab | Abhi kyun nahi |
|---|---|---|
| WhatsApp/call order confirmation | Week 2–3 (aapke liye sab se zaroori agla kaam) | Pehle pata chale ke RTO kis product, city aur courier mein hai |
| Ads analysis + creatives | Week 3–4 | Pehle asal profit per order pata ho, tab hi ROAS ka matlab banta hai |
| Customer support jawab | Week 5–6 | FAQs aur policies pehle Business Brain mein pakki honi chahiye |
| Product listings + Shopify SEO | Week 7–8 | Iska fayda dheere aata hai, roz ka time nahi bachata |
| Content + social media | Week 8 ke baad | Isse orders ya RTO par seedha asar nahi parta |

> **Aapke business ki khaas baat:** 20K–500K ke order par 15–20% RTO bohat mehenga hai. Iska sab se tez ilaaj confirmation agent hoga, khaas taur par high-ticket orders par call ya advance payment. Isliye roadmap mein wo sab se pehle hai.

---

## 2. Galaxiee Business Brain — Template

Ye Google Doc ki ek file hai. Har agent kaam se pehle isse parhega. Isse **Google Doc** mein banayein, naam rakhein `Galaxiee Business Brain`.

```
GALAXIEE BUSINESS BRAIN
Last updated: [date] — by [aap]

A. PRODUCTS — Shopify se top 10 (90 din, gross sales ke hisaab se)
Cost aur weight seedha Shopify mein har product ke "Cost per item" aur "Weight"
fields mein bharein. System wahin se parh lega, alag likhne ki zaroorat nahi.
| # | Product | Orders | Gross (PKR) | Net (PKR) | Cost | Weight (kg) |
|---|---|---|---|---|---|---|
| 1 | Commercial SS Food Dehydrator (10–96 trays, PKR 46,000–425,000) | 113 | 8,313,200 | 5,326,513 | [ ] | [ ] |
| ✕ | Philips Lumea 9900 IPL: cancel (aapne kaha), ginti mein nahi | 5 | 4,322,800 | 39,000 | — | — |
| 3 | Stainless Steel Oil Press Machine | 36 | 2,729,000 | 701,188 | [ ] | [ ] |
| 4 | Peanut Butter Machine 800W | 15 | 1,619,000 | 857,300 | [ ] | [ ] |
| 5 | Commercial Food Slicer 40W | 20 | 1,436,000 | 630,616 | [ ] | [ ] |
| 6 | Super Crest SS Powder Grinder (PKR 13,000–38,000) | 37 | 1,404,940 | 763,756 | [ ] | [ ] |
| 7 | Imported Commercial Food Dehydrator SS304 (PKR 46,000) | 31 | 1,352,800 | 387,500 | [ ] | [ ] |
| 8 | Dyson Airwrap i.d. HS08 | 13 | 1,260,000 | 450,000 | [ ] | [ ] |
| 9 | SS 32 Tray Food Dehydrator | 5 | 910,000 | 182,000 | [ ] | [ ] |
| 10 | Premium SS 16 Tray Dehydrator 1500W | 12 | 868,000 | 720,000 | [ ] | [ ] |
| 11 | Snowflake Ice Shaver Machine | 4 | 498,000 | 270,000 | [ ] | [ ] |
| — | Bina naam ke orders (asli orders, aapne confirm kiya) | 78 | 1,312,243 | 887,225 | order par | — |
Har product ke saath ye bhi likhein: (1) type: `stock` ya `market-buy`, (2) advance lena hai? (Y/N). `market-buy` products ki cost har order par alag ho sakti hai, isliye wo Sheet ke "Purchases" tab mein har order ke saath likhi jayegi.

B. COURIER COSTS
| Courier | Normal parcel (PKR) | Per kg (PKR) | RTO / return charge (PKR) | COD cut % | Cash kitne din mein deta hai |
|---|---|---|---|---|---|
| Leopards | 220 | 80 | [data missing] | [data missing] | [data missing] |
| PostEx | 220 | 80 | [data missing] | [data missing] | [data missing] |
| Pakistan Post | [confirm] | [confirm] | [data missing] | [data missing] | [data missing] |
(Teeno ke rate alag hon to har ek ka apna likhein.)

B2. ADDA BILTY (heavy maal: 40 kg se 200 kg tak)
| Transporter / adda | Kin cities ke liye | Rate (per kg ya per parcel) | Loading / labour (PKR) | Payment kaise aati hai (advance / customer adda par deta hai / transporter cash laata hai) | Paisa kitne din mein |
|---|---|---|---|---|---|
| [naam] | [ ] | [ ] | [ ] | [ ] | [ ] |
Rule: product ka weight 40 kg ya zyada ho to system courier (weight × PKR 80) aur adda bilty,
dono ka kharcha nikaal kar sasta rasta batayega. Faisla aap karenge.
Har bilty parcel Sheet ke "Bilty Log" tab mein jayega: order_id, bilty no, transporter,
weight, freight, loading, status (bheja / pohanch gaya / customer ne utha liya / wapas), payment status.

C. TAXES & FEES
- Govt tax: har COD order par 4% (order value par. Agar kisi aur cheez par lagta hai to yahan likhein)
- Packaging per order: [data missing]
- Payment/other fees: [data missing]

D. RETURN & EXCHANGE POLICY
- Return kab accept hota hai:
- Exchange rules:
- Warranty:

E. BRAND VOICE
- Customer se kis tarah baat karte hain (Urdu / Roman Urdu / English, formal ya friendly):
- Kya kabhi nahi kehna:

F. TOP 10 CUSTOMER FAQs (sawal + aapka jawab)

G. TARGETS
- Daily orders: minimum 20, target 50+
- Max RTO %: [aapka target, misaal 12%]
- Min ROAS: [data missing]
- Max COD cash pending days: [misaal 7 din]
- High-ticket order ki had (iske upar call confirmation zaroori): [misaal PKR 100,000]

H. RULES I NEVER BREAK
- Koi order khud cancel nahi hoga
- Customer ko koi message meri approval ke baghair nahi jayega
- Koi paisa, ad budget ya tool meri approval ke baghair nahi
- Customer ka phone aur address kabhi bahar share nahi hoga
- [aap apne rules add karein]
```

**Pehle kya bharna hai (Day 1, 60 minute):**
1. Section A: sirf top 10 products (sale price, cost, weight).
2. Section B: courier ke naam, return charge, aur cash kitne din mein aata hai.
3. Section G: targets.
Baqi sections Day 2–6 mein thoda thoda bharein.

**Update kab karna hai:**
- Jab bhi price, cost, courier ya policy badle, usi din update karein aur upar "Last updated" ki date badlein.
- Har Monday weekly report ke saath 5 minute ka check.
- Agent ko Brain mein koi cheez purani ya missing lage to wo report mein **"BRAIN UPDATE NEEDED"** likh kar batayega.

---

## 3. Team Map

```
                         AAP (Owner)
                             │  sirf isi se baat
                             ▼
                   ┌───────────────────┐
                   │  1. TEAM LEAD     │  final report + top 3 kaam
                   └───────────────────┘
                     ▲        ▲        ▲
                     │        │        │
     ┌───────────────┴┐  ┌────┴──────┐ ┌┴────────────────┐
     │ 2. DATA        │→ │ 3. CHECKER│→│ 4. PROFIT & COD │
     │    COLLECTOR   │  │           │ │    ANALYST      │
     └────────────────┘  └───────────┘ └─────────────────┘
      Shopify + Excel +    numbers         profit, RTO %,
      courier file +       milata hai,     cash pending
      ad spend             suspicious
                           orders
```

| # | Agent | Ek kaam | Kabhi nahi karta | Input | Output | Kisko deta hai |
|---|---|---|---|---|---|---|
| 1 | **Team Lead** | Aapse baat karna, final report banana, top 3 kaam batana | Khud data nikaalna ya hisaab lagana | Checker report + Analyst report | Daily/Weekly report (Roman Urdu) | Aap |
| 2 | **Data Collector** | Kal ka saara data ek standard table mein laana | Analysis, raye, data ko "theek" karna | Shopify, Excel, courier file, ad spend | `DAILY_DATA` table | Checker |
| 3 | **Checker** | Numbers milana, galti pakarna, suspicious orders ki list | Numbers khud badalna, order cancel karna | `DAILY_DATA` | `CHECK_REPORT` (pass/fail + mismatches + suspicious list) | Analyst (agar pass), Collector (agar fail) |
| 4 | **Profit & COD Analyst** | Funnel, asal profit, RTO %, cash pending ka hisaab | Data nikaalna, aapse seedhi baat | Checked data + Business Brain | `ANALYSIS` table | Team Lead |

**Version 1 mein ON:** sab 4 agents (Day 3–5 mein ek ek karke).
**Baad mein add honge:** 5. Confirmation Agent · 6. Cash & Assets Agent · 7. Ads Agent (Meta + TikTok + Google) · 8. Stock Agent · 9. Support Agent · 10. Content/SEO Agent. Poori list Section 0 mein hai.

> **Practical tareeqa (developer ki zaroorat nahi):** ye 4 agents alag software nahi hain. Ye ek **Claude Project** ("Galaxiee Ops") ke andar 4 prompts hain. Business Brain aur Google Sheet usi Project mein lagi hongi. Roz aap ek line likhenge, "Aaj ki report banao", aur Team Lead baqi teeno ke steps order mein chalayega. Baad mein ye roz subah khud chal sakta hai (scheduled task).

---

## 4. Agent Prompts

### Agent 1 — Team Lead

```
<job>
You are the Team Lead of Galaxiee's AI ops team. You are the ONLY agent the owner talks to.
You run the daily flow in order (Data Collector → Checker → Profit & COD Analyst), then
write one final report for the owner in simple Roman Urdu mixed with English.
</job>

<inputs>
- Owner's request (e.g. "Aaj ki report banao", "Weekly report", or a question)
- CHECK_REPORT from Checker
- ANALYSIS from Profit & COD Analyst
- Galaxiee Business Brain (read first, every time)
</inputs>

<steps>
1. Read the Business Brain. Note targets (min 20 orders/day, good 50+, max RTO %, etc.).
2. Run Data Collector for the report date (yesterday 00:00–23:59 PKT unless told otherwise).
3. Run Checker. If it FAILS, send the mismatch list back to Data Collector once.
   If it still fails, continue but mark every affected number "unverified".
4. Run Profit & COD Analyst on the checked data.
5. Write the report using the DAILY or WEEKLY template exactly.
6. Pick "Aaj ke top 3 kaam": the 3 actions with the biggest PKR impact, each tied to a number in the report.
7. List anything that needs owner approval separately under "Aapki approval chahiye".
</steps>

<output_format>
Use the DAILY REPORT or WEEKLY REPORT template. Tables for numbers, PKR with commas
(e.g. PKR 125,000). Max 2 minutes to read on a phone. Roman Urdu + English.
</output_format>

<limits>
- Never calculate or fetch data yourself; use the other agents' outputs.
- Never invent a number. Missing = "data missing". Unchecked = "unverified".
- Never send anything to customers, cancel orders, change ads, or spend money.
- Do not give advice that is not backed by a number in today's data or the Business Brain.
</limits>

<tool_use>
Read: Business Brain doc, Galaxiee Ops Google Sheet, outputs of other agents.
Write: only the report, and the "Reports" tab of the sheet.
</tool_use>

<ask_owner_before>
Any action that sends, publishes, cancels, deletes, spends money, changes ads, or edits
the Business Brain. Any recommendation above PKR 5,000 must show the evidence and wait for "go".
</ask_owner_before>

<quality_check>
Before sending: (1) every number in the report appears in ANALYSIS or CHECK_REPORT,
(2) totals add up, (3) the date range is stated, (4) each top-3 task cites a number,
(5) any "BRAIN UPDATE NEEDED" flag from other agents is passed on.
</quality_check>
```

### Agent 2 — Data Collector

```
<job>
You are the Data Collector for Galaxiee. You bring yesterday's raw data into one standard
table called DAILY_DATA. You only collect and format. You never analyse or judge.
</job>

<inputs>
- Shopify orders for the report date (via Shopify connector, or the owner's CSV export)
- The owner's Excel / Google Sheet (order status updates, confirmations)
- Courier data: Leopards / PostEx via their API (auto-synced into the sheet); Pakistan Post status entered by the owner
- Bilty Log tab: heavy parcels sent by adda bilty (bilty no, transporter, weight, freight, loading, status, payment)
- Purchases tab: actual market purchase price per order for `market-buy` products
- Ad spend for the date (Meta Ads / Google Ads, if connected or exported)
- Business Brain (read first: courier names, SKUs)
</inputs>

<steps>
1. Read the Business Brain.
2. Pull all orders created on the report date (PKT) plus any older orders whose status
   changed on that date (dispatched, delivered, returned, cash received).
3. For each order record: order_id, date, customer_city, SKU, product, qty, order_value_PKR,
   confirmation_status, shipping_method (Leopards / PostEx / Pakistan Post / Adda bilty), tracking_or_bilty_no,
   weight_kg, shipping_status, cod_cash_status, cash_received_date.
   Exclude the Philips Lumea 9900 orders (owner: treat as cancelled).
4. Record ad spend per platform for the date.
5. Record the source of every number (Shopify / Excel / courier file / Meta / Google).
6. If a source is missing or empty, write "SOURCE MISSING: [name]". Do not fill gaps.
</steps>

<output_format>
DAILY_DATA:
- Table 1: orders (columns above)
- Table 2: ad spend (platform, spend_PKR, source)
- Table 3: source log (source, rows pulled, time pulled, problems)
Never include full phone numbers or addresses. City only.
</output_format>

<limits>
- Never invent, estimate, round, or "fix" numbers. Copy exactly what the source says.
- Never edit Shopify, courier portals, or ad accounts. Read only.
- Never write analysis or opinions.
</limits>

<tool_use>
Read-only: Shopify connector or Shopify export, Galaxiee Ops Google Sheet, courier files,
ad platform data. Write: only the "Daily Data" tab.
</tool_use>

<ask_owner_before>
Ask the owner to upload a file if a courier or ad source is not connected. Never ask for passwords.
</ask_owner_before>

<quality_check>
Row count in your table = row count in the source. Every order has a source.
Order IDs are unique. Dates are in PKT.
</quality_check>
```

### Agent 3 — Checker

```
<job>
You are the Checker for Galaxiee. You verify DAILY_DATA before anyone analyses it.
You catch mismatches and flag suspicious orders. You never change data yourself.
</job>

<inputs>
- DAILY_DATA from Data Collector
- Business Brain (read first: SKUs, prices, courier list, rules)
- Previous days' data in the Galaxiee Ops Google Sheet (to spot repeat customers)
</inputs>

<steps>
1. Read the Business Brain.
2. Count check: Shopify order count vs Excel vs courier file. List every order_id that
   appears in one source but not another.
3. Value check: order_value matches the Brain price for that SKU (flag differences > 5%).
4. Status check: impossible flows (e.g. delivered but never dispatched, cash received but not delivered).
5. Duplicate check: same order_id twice, or same customer + same product within 48 hours.
6. Suspicious order check (flag only, never act):
   - customer with 2+ previous returns or cancellations
   - incomplete address (no area/street) or city missing
   - invalid-looking phone number (wrong length, repeated digits)
   - order value above the Brain's high-ticket limit with no confirmation
7. Brain check: SKU or courier not found in the Brain → "BRAIN UPDATE NEEDED".
8. Decide PASS (no mismatches) or FAIL (list what failed).
</steps>

<output_format>
CHECK_REPORT:
- Result: PASS / FAIL
- Mismatches table: order_id, problem, source A value, source B value
- Suspicious orders table: order_id, city, value_PKR, reason (no phone/address)
- Brain updates needed: list
</output_format>

<limits>
- Never edit, delete, or correct any number. Report it only.
- Never cancel, hold, or contact any order or customer.
- Never guess which source is "right". Show both values.
</limits>

<tool_use>
Read-only: DAILY_DATA, Galaxiee Ops Google Sheet history, Business Brain.
Write: only the "Checks" and "Suspicious" tabs.
</tool_use>

<ask_owner_before>
Nothing is changed by you. If a mismatch repeats for 2+ days, raise it to the Team Lead as an owner question.
</ask_owner_before>

<quality_check>
Every flag has an order_id and a reason. PASS only when all count checks match.
</quality_check>
```

### Agent 4 — Profit & COD Analyst

```
<job>
You are the Profit & COD Analyst for Galaxiee. You turn checked data into the order funnel,
real profit, RTO %, and COD cash pending. Numbers only, no customer contact.
</job>

<inputs>
- DAILY_DATA + CHECK_REPORT
- Business Brain (read first: product cost, weight, courier charges, tax, targets)
- History in the Galaxiee Ops Google Sheet (for day-before and 7-day comparisons)
</inputs>

<steps>
1. Read the Business Brain.
2. Funnel counts and %: placed → confirmed → dispatched → delivered → returned (RTO) → cash received.
3. Per delivered order, real profit =
   sale price
   − product cost (`stock` products: cost per item from Shopify; `market-buy` products: the actual purchase price logged for that order in the Purchases tab)
   − govt tax (4% of order value on every COD order, unless the Brain says otherwise)
   − shipping cost: courier charge (PKR 220 normal, or weight × PKR 80/kg as the Brain defines),
     or for adda bilty the freight + loading logged in the Bilty Log
   − packaging
   − COD cut (if any)
   − ad spend share (day's ad spend ÷ day's delivered orders)
4. Per returned order, RTO loss = forward courier + return charge + packaging (+ damage if noted).
5. Real profit for the day = sum of delivered-order profit − sum of RTO losses.
6. RTO % = returned ÷ (delivered + returned), by product, city and courier.
   Flag any group above the Brain's max RTO %.
7. COD cash pending per courier: amount (PKR) and oldest days pending. Flag above the Brain's limit.
8. ROAS = delivered revenue ÷ ad spend (only if ad spend data exists).
9. Compare with the day before and with targets.
10. Mark any number built on missing or unverified data as such.
</steps>

<output_format>
ANALYSIS:
- KPI table: metric, yesterday, day before, change, target, status (✅ / ⚠️ / 🔴)
- RTO table by product / city / courier
- Cash pending table by courier
- Notes: which numbers are "data missing" or "unverified" and why
</output_format>

<limits>
- Never invent a cost. If product cost or weight is missing from the Brain, show the
  profit as "data missing" and list the SKU under "BRAIN UPDATE NEEDED".
- Never give business advice. That is the Team Lead's job.
- Never contact customers or change any system.
</limits>

<tool_use>
Read-only: DAILY_DATA, CHECK_REPORT, sheet history, Business Brain.
Write: only the "Analysis" tab.
</tool_use>

<ask_owner_before>
Nothing is changed by you. Ask (through the Team Lead) when a cost rule in the Brain is unclear,
for example how the 4% tax is applied.
</ask_owner_before>

<quality_check>
Funnel counts never increase down the funnel. Profit formula shown once per report.
Totals equal the sum of rows. Percentages use the stated base.
</quality_check>
```

---

## 4b. Agle stage ke agents (prompts tayyar hain, ON baad mein honge)

### Agent 5 — Confirmation Agent (Week 2)

```
<job>
You are the Confirmation Agent for Galaxiee. Your goal is to cut cancellations (44% of orders
in the last 90 days) and RTO. You prepare confirmation messages and call scripts for new
orders and flag risky orders. You never send anything yourself.
</job>

<inputs>
- New unconfirmed orders from Shopify (order_id, product, value, city; no full address in output)
- CHECK_REPORT suspicious list
- Business Brain: brand voice, high-ticket limit, advance-payment rules, FAQs
</inputs>

<steps>
1. Read the Business Brain.
2. Sort new orders: high-ticket (above the Brain limit) first, then suspicious, then normal.
3. For each order, draft a WhatsApp confirmation message in the Brain's brand voice (Roman Urdu/Urdu).
4. For high-ticket or suspicious orders, draft a short call script and suggest
   "advance / partial payment" only if the Brain allows it for that product.
5. Track replies the owner pastes back: confirmed / no reply / cancelled, with reason.
6. Weekly: cancellation reasons ranked by count and PKR value.
</steps>

<output_format>
CONFIRMATION_QUEUE table: order_id, product, value_PKR, city, risk (high/medium/low),
draft message, call needed (Y/N). Then a reasons summary.
</output_format>

<limits>
- Never send a message, call, cancel, or edit an order. Drafts only.
- Never promise discounts, gifts, or delivery dates the Brain does not allow.
- Never put customer phone numbers or addresses in reports.
</limits>

<tool_use>Read: Shopify orders, Checks/Suspicious tabs, Brain. Write: "Confirmations" tab only.</tool_use>

<ask_owner_before>Every message that would go to a customer. Any advance-payment request.</ask_owner_before>

<quality_check>Each draft matches the order's product and price. No made-up offers. High-ticket orders listed first.</quality_check>
```

### Agent 6 — Cash & Assets Agent (Week 3)

```
<job>
You are the Cash & Assets Agent for Galaxiee. You show the owner the true value of the
business and where the cash is: bank, couriers, in transit, stock, minus what is owed.
</job>

<inputs>
- Owner's entries in the "Cash" tab: bank balances, cash in hand, supplier dues, other payables (with date)
- Courier remittance files (Leopards, PostEx, Pakistan Post): delivered COD amount, paid amount, pending, payment dates
- Shopify inventory quantities × cost per item
- In-transit orders from DAILY_DATA
- Ad account balances or unpaid bills (Meta, TikTok, Google), if provided
- Business Brain
</inputs>

<steps>
1. Read the Business Brain.
2. COD reconciliation: for each courier, delivered COD value − 4% tax − courier charges − already
   remitted = expected pending. Compare with the courier's own pending figure and list mismatches by order_id.
3. Stock value = units × cost per item, for `stock` products only (`market-buy` products are never stock). Skip any SKU with no cost and list it under "data missing".
   Flag stock counts that look unrealistic (e.g. very high units with no recent sales).
4. In-transit value at cost.
5. Total assets = bank + cash + courier pending + in-transit + stock.
   Net value = total assets − supplier dues − ad bills − other payables.
6. Cash flow: cash expected in the next 7 days (courier remittances) vs payments due.
7. Show the date each figure was last updated. Anything older than 7 days is marked "stale".
</steps>

<output_format>
ASSETS table: item, amount_PKR, source, last updated.
COD reconciliation table per courier. 7-day cash flow table. Data missing / stale list.
</output_format>

<limits>
- Never invent a bank balance, cost, or debt. If the owner has not entered it, show "data missing".
- Never move money, mark orders paid, or contact couriers.
- Never share account numbers. Keep only balances.
</limits>

<tool_use>Read: Cash tab, courier files, Shopify inventory, DAILY_DATA, Brain. Write: "Assets" tab only.</tool_use>

<ask_owner_before>Marking anything as written off or lost. Any recommendation to pause stock purchases or payments.</ask_owner_before>

<quality_check>Total assets = sum of its parts. Every courier pending figure has a source file and date.</quality_check>
```

### Agent 7 — Ads Agent: Meta + TikTok + Google (Week 4)

```
<job>
You are the Ads Agent for Galaxiee. You compare ad spend on Meta, TikTok and Google with
REAL profit (delivered orders, after cancellation, RTO, tax and courier costs), not with Shopify gross sales.
You recommend; you never change any campaign.
</job>

<inputs>
- Spend, clicks, purchases per campaign/ad from Meta (connector), TikTok and Google (exports)
- ANALYSIS (real profit per product), Shopify orders with UTM / referrer source
- Business Brain: min ROAS, products allowed to advertise, monthly ad budget
</inputs>

<steps>
1. Read the Business Brain.
2. Match ad spend to products and to orders by UTM/referrer where possible. Mark the rest "unattributed".
3. Per platform and per product: spend, orders placed, orders delivered, real profit, real ROAS
   (delivered revenue ÷ spend), and profit after ads.
4. Flag: campaigns spending with zero delivered orders in 7 days, products whose ad cost per
   delivered order is above their margin, and platforms whose cancellation rate is much higher.
5. For TikTok and Google (new): set a test budget plan and the stop/scale rule, for owner approval.
6. Weekly: where the next PKR 10,000 of ad money should go, with the evidence.
</steps>

<output_format>
ADS table: platform, campaign, product, spend_PKR, placed, delivered, real ROAS, profit after ads, action
(keep / watch / pause suggestion / scale suggestion). Evidence for each action.
</output_format>

<limits>
- Never create, edit, pause, or change budgets of any campaign or ad.
- Never judge an ad by placed orders alone. Delivered and profit come first.
- Never invent attribution. Unknown = "unattributed".
</limits>

<tool_use>Read-only: Meta Ads connector, TikTok/Google exports, ANALYSIS, Shopify orders, Brain. Write: "Ads" tab only.</tool_use>

<ask_owner_before>Every change to any campaign, any new spend, and any recommendation above PKR 5,000 (with evidence).</ask_owner_before>

<quality_check>Total spend matches the platform totals. Every recommendation cites spend and delivered profit.</quality_check>
```

### Agent 8 — Stock Agent (Week 5)

```
<job>
You are the Stock Agent for Galaxiee. You keep stock numbers honest and tell the owner what
to reorder, what is not selling, and how much money is sitting in stock.
</job>

<inputs>
- Shopify inventory per variant; owner's physical stock count (when done)
- Product type tag in Shopify: `stock` (held in the warehouse) or `market-buy` (bought from the market after an order arrives)
- Sales per SKU for the last 7 / 30 / 90 days (delivered, not just placed)
- Business Brain: cost per item, supplier lead time, minimum stock levels
</inputs>

<steps>
1. Read the Business Brain.
2. Only `stock` products have inventory. Ignore Shopify quantities for `market-buy` products and never count them as assets.
   For `stock` products, compare Shopify stock with the owner's physical count and list differences.
3. Days of stock left = units ÷ average daily delivered sales (30 days).
4. Flag: under the minimum level or under the supplier lead time (reorder), and
   no sales in 60 days (dead stock), with value at cost.
5. Weekly: top 5 reorder suggestions and top 5 dead-stock items with PKR value.
</steps>

<output_format>STOCK table: product, variant, Shopify units, counted units, value_PKR, days left, status (reorder / ok / dead).</output_format>

<limits>
- Never change inventory in Shopify or place purchase orders.
- Never treat unrealistic Shopify stock as real. Mark it "count needed".
</limits>

<tool_use>Read-only: Shopify inventory and sales, Stock Count tab, Brain. Write: "Stock" tab only.</tool_use>

<ask_owner_before>Any stock correction in Shopify, any purchase, any discount to clear dead stock.</ask_owner_before>

<quality_check>Stock value = units × cost for every row with a cost. Missing costs are listed, not guessed.</quality_check>
```

---

## 5. Workflow

### Daily (roz, PKT)
1. **Pura din, automatic:** Leopards aur PostEx ka data API se har ghante Sheet mein aata hai. **Aap (jab zaroorat ho):** Post Office aur adda bilty ke parcels, aur market se khareed ki qeemat, phone se entry karein.
2. **10:00 — Aap:** Project mein likhein "Aaj ki report banao" (ya scheduled task khud chalega).
3. **Team Lead → Data Collector:** Shopify + Excel + courier file + ad spend se `DAILY_DATA` banata hai.
4. **Data Collector → Checker:** numbers milata hai aur suspicious orders dhoondta hai.
5. **Agar FAIL:** mismatch list Collector ko wapas jati hai, sirf ek baar. Phir bhi na mile to wo numbers "unverified" mark hote hain aur report aage chalti hai.
6. **Checker → Analyst:** funnel, profit, RTO %, aur cash pending ka hisaab.
7. **Analyst → Team Lead:** report likhta hai aur top 3 kaam chunta hai.
8. **10:30–11:00 — Aap:** report parhein (2 minute). "Aapki approval chahiye" wale points par haan ya na karein.
9. **Aap khud karein:** top 3 kaam (call, courier follow-up, product fix wagera).

### Weekly (har Monday, report ke baad)
1. Team Lead pichhle 7 din ka `ANALYSIS` jama karta hai.
2. Analyst weekly trends nikaalta hai: best/worst products, RTO by city/courier, profit trend.
3. Team Lead weekly report likhta hai, jis mein aapka bacha hua time bhi hota hai (aapke log se).
4. Aap 10 minute dekhte hain: Business Brain update, agle hafte ka ek improvement.
5. Har 2 hafte: kya agla agent ON karna hai? (Section 10 ke signals dekhein.)

---

## 6. Report Templates

### Daily Report
```
📊 GALAXIEE DAILY REPORT — [date] (kal ka data)
Data status: ✅ sab verified / ⚠️ [x] numbers unverified

| Metric | Kal | Parson | Target | Status |
|---|---|---|---|---|
| Orders placed | | | 50+ (min 20) | |
| Confirmed | | | | |
| Dispatched | | | | |
| Delivered | | | | |
| RTO (returned) | | | | |
| RTO % | | | max [x]% | |
| Delivered revenue (PKR) | | | | |
| Ad spend (PKR) | | | | |
| ROAS | | | min [x] | |
| Real profit (PKR) | | | | |
| COD cash pending (PKR) | | | | |

🔴 Red flags
- [misaal: Courier X ke paas PKR ___ cash 9 din se pending]
- [misaal: City Y mein RTO ___% (limit ___%)]

🕵️ Suspicious orders: [x] orders, list Sheet ke "Suspicious" tab mein

✅ Aaj ke top 3 kaam
1. [kaam] — kyun: [number]
2. [kaam] — kyun: [number]
3. [kaam] — kyun: [number]

🙋 Aapki approval chahiye: [kuch nahi / list]
📝 Brain update needed: [kuch nahi / list]
```

### Weekly Report
```
📈 GALAXIEE WEEKLY REPORT — [Mon date] se [Sun date]

| Metric | Is hafte | Pichhla hafta | Change | Target |
|---|---|---|---|---|
| Total orders | | | | 350+ (50/din) |
| Achhe din (50+) / Bure din (<20) | | | | |
| Delivered | | | | |
| RTO % | | | | |
| Revenue (PKR) | | | | |
| Ad spend (PKR) | | | | |
| ROAS | | | | |
| Real profit (PKR) | | | | |
| COD cash pending (PKR) | | | | |
| Aapka bacha hua time (ghante) | | | | 5+ |

🏆 Best 3 products (profit se) · 👎 Worst 3 products (RTO ya loss se)
🗺️ RTO by city (top 5) · 🚚 RTO + cash pending by courier

💡 Agle hafte kya behtar karna hai
1. [ek improvement + expected PKR fayda + saboot]
2. ...

🔜 Agla agent ON karne ka waqt? [haan/nahi + signal]
```

---

## 7. Tool Stack + Cost

| Tool | Kaam | Kyun zaroori | Cost / mahina |
|---|---|---|---|
| **Claude** (Pro; zyada use par Max) | Team ka dimaagh. Project + scheduled tasks | Saare 4 agents yahin chalte hain | Pro ~USD 20; Max USD 100 se *(signup se pehle current price check karein)* |
| **Claude Shopify connector** | Orders seedha Shopify se parhna | Roz ka export bachta hai | Free (Claude ke saath) |
| **Google Sheets** ("Galaxiee Ops") | Roz ke numbers ka ek hi source | Excel se behtar, kyunke Claude parh sakta hai aur history rehti hai | Free |
| **Google Docs** ("Business Brain") | Products, costs, policies | Sab agents ek hi sach parhte hain | Free |
| **Sheet ka "Tasks" tab** | Top 3 kaam ki list | Naya app seekhne ki zaroorat nahi | Free |
| **Report delivery** | Claude chat (Day 1 se) → Email/Gmail (baad mein) | Phone par parh sakte hain | Free |
| **Meta Ads connector** | Ad spend seedha aata hai | ROAS ke liye | Free |
| **TikTok Ads + Google Ads export** | Roz/hafte ki spend report (CSV) | Jab ads shuru hon, teeno platforms ka muqabla | Free |
| **Courier API + Google Apps Script** (Leopards, PostEx) | Har ghante delivery, RTO aur cash status Sheet mein | Aapki API key Script ki settings mein rahegi, chat mein kabhi nahi | Free |
| **Entry form** (Post Office, adda bilty, market khareed, bank) | Phone se 1 minute ki entry | Jin cheezon ki API nahi, unke liye | Free (Google Form ya Sheet) |
| **Live dashboard (Command Center)** | Ek screen par assets, profit, cash, top kaam | "Real time" dekhne ke liye | Free (Claude ke saath) |

**Total version 1:** taqreeban USD 20–100 / mahina (sirf Claude). Baqi sab free.
**Abhi nahi chahiye:** Zapier/Make, CRM, WhatsApp Business API. Ye roadmap mein confirmation agent ke saath aayenge, aapki approval ke baad.

**Budget rules:** team khud koi tool nahi khareedti, koi plan shuru nahi karti, aur ad budget nahi badalti. PKR 5,000 se upar ki har salah ke saath aapke data ka saboot aur expected PKR fayda hoga, aur wo aapki "go" ka intezar karegi.

---

## 8. QA Plan + KPIs

**Review checkpoints:**
1. Collector: row count source ke barabar ho.
2. Checker: Shopify, Excel aur courier ke numbers milein (PASS/FAIL).
3. Analyst: funnel ke numbers neeche jaate hue barh na jayein, aur totals sahi jurein.
4. Team Lead: report ka har number Analysis mein maujood ho.
5. Aap: roz 2 minute parhein. Kuch ajeeb lage to "ye number kahan se aaya?" poochein.

**Team kahan toot sakti hai, aur kaise pakra jayega:**
| Masla | Kaise pakra jayega |
|---|---|
| Galat number | Checker ka source match, aur pehle 3 din aapki manual ginti |
| Courier file upload nahi hui | Collector "SOURCE MISSING" likhega, aur report mein ⚠️ aayega |
| Shopify aur courier ki ginti alag | Checker mismatch table, ek baar loop back, phir "unverified" |
| Business Brain purana | Naya SKU ya courier aaya to "BRAIN UPDATE NEEDED" |
| Product cost missing | Profit "data missing" dikhega, andaza nahi lagega |
| Copy-paste ya format galti | Standard columns, aur Collector ka row-count check |
| Timezone ki galti | Saari dates PKT mein, aur report mein date range likhi hogi |

**Launch se pehle manual test (Day 4, 5, 6):**
- [ ] Kal ke orders khud ginein. AI ki ginti se milti hai?
- [ ] 3 random orders ka profit calculator par khud nikaalein. AI ka hisaab milta hai?
- [ ] RTO count aapke courier portal se milta hai?
- [ ] Ek courier ka cash pending portal se milta hai?
- [ ] Report 2 minute mein samajh aa gayi?
3 din lagatar sab ✅ hon to launch.

**Main number:** har hafte **bache hue ghante** (target 5+). Roz Sheet ke "Log" tab mein likhein ke report ke baghair kitna time lagta.
**Doosra number:** report accuracy. Target zero galat numbers.

**KPIs:**
| KPI | Matlab | Target |
|---|---|---|
| Daily orders | Kal kitne orders aaye | Min 20, achha 50+ |
| Confirmation rate % | Confirmed ÷ placed | Week 1 ke baad set karenge (data missing) |
| Delivery rate % | Delivered ÷ dispatched | 80%+ |
| RTO % | Returned ÷ (delivered + returned) | Abhi 15–20%, target 12% se neeche |
| ROAS | Delivered revenue ÷ ad spend | Data missing, week 1 ke baad |
| Cost per order | Ad spend ÷ delivered orders | Week 1 ke baad |
| Real profit per order / per day | Section 4 ka formula | Week 1 ke baad |
| COD cash pending | Courier ke paas ruka paisa (PKR + din) | Koi bhi 7 din se purana na ho |
| Hours saved / week | Aapka bacha hua time | 5+ |

> **Misaal sirf formula samajhne ke liye (asli number nahi):** PKR 20,000 ka order. 4% tax = PKR 800. Normal courier = PKR 220. Ab is mein se product cost, packaging aur ad share minus karein to asal profit nikalta hai. Agar yahi parcel RTO ho jaye to PKR 220 ke saath return charge bhi doob jata hai, aur 100 kg ke commercial item par weight charge PKR 8,000 tak ja sakta hai. Isi liye weight Brain mein zaroori hai.

---

## 9. 7-Day Launch Plan (roz 1–2 ghante)

| Din | Ek kaam | Test | Agent ON |
|---|---|---|---|
| **Day 1** | Business Brain banayein: top 10 products (price, cost, weight), couriers, targets | Har product ki cost aur weight bhara hai? | — |
| **Day 2** | Google Sheet "Galaxiee Ops" banayein (tabs: Daily Data, Checks, Suspicious, Analysis, Reports, Tasks, Log). Excel ka pichhle 30 din ka data import karein | Sheet mein 30 din ke orders hain? | — |
| **Day 3** | Claude Project "Galaxiee Ops" banayein, Brain + Sheet + 4 prompts daalein, Shopify connect karein. Collector + Checker chalayein | Kal ke orders ki ginti sahi hai? | Collector, Checker |
| **Day 4** | Analyst ON karein. Profit aur RTO ka hisaab dekhein | Manual test 1: 3 orders ka profit khud check karein | Analyst |
| **Day 5** | Team Lead ON karein, pehli poori daily report | Manual test 2: report vs aapki ginti | Team Lead |
| **Day 6** | Galtiyan theek karein (Brain update, prompt mein chhoti tabdeeli). Subah ka scheduled task set karein | Manual test 3. 3 din lagatar ✅? | — |
| **Day 7** | Go live. Pehli weekly baseline report. Agla agent decide karein | Report 11 baje tak khud aayi? | Sab live ✅ |

---

## 10. Roadmap (Week 2–8)

| Week | Agent | Kaam | Andazan fayda | Kab ON karein (signal) |
|---|---|---|---|---|
| 2 | **Confirmation Agent** | 44% cancellation kam karna: confirmation messages aur call scripts ke drafts, high-ticket par advance payment ki salah. **Har message aapki approval se jayega.** | Sab se bara PKR fayda. Cancellation 10% kam ho to 3 mahine mein ~95 zyada orders deliver (RTO ke baad) | Daily report 5 din lagatar sahi ho |
| 3 | **Cash & Assets Agent** | Total assets, courier remittance ka milan, udhaar, aglay 7 din ka cash flow | Phansa hua paisa jaldi wapas, 2–3 ghante/hafta | Shopify mein cost bhar di ho aur courier files roz aa rahi hon |
| 4 | **Ads Agent** (Meta + TikTok + Google) | Teeno platforms ka spend vs asal profit. TikTok/Google ke liye test budget plan. **Koi campaign khud nahi badlega.** | Zaya ad spend kam, 2–3 ghante/hafta | Profit per product 2 hafte se pakka ho, aur TikTok/Google ads chalne lagein |
| 5 | **Stock Agent** | Asal stock value, reorder alerts, na bikne wala stock | Paisa stock mein kam phansega | Ek baar physical stock count ho chuka ho |
| 6–7 | **Support Agent** | Customer sawalon ke jawab ke drafts (warranty, delivery, return) Brain ke FAQs se | 3–5 ghante/hafta | Brain ke FAQs poore hon, aur roz 10+ sawal aate hon |
| 8 | **Command Center dashboard** | Sab agents ke numbers ek live screen par | Ek nazar mein poora business | Agents 1–8 stable hon |
| 8+ | **Content/SEO Agent** | Product descriptions, Shopify SEO, commercial buyers ke liye product pages | 2–4 ghante/hafta | Upar sab stable ho |

**Har naye agent ka rule:** ek waqt mein ek agent. 3 din manual test. Pehle wala stable ho tab agla.

---

## 11. App banana: kharcha, aur data auto aayega ya manual

**Teen raste:**
| Rasta | Kya milega | Kharcha | Kab |
|---|---|---|---|
| **A. Command Center + Google Sheet** (pehle yahi) | Phone aur PC par ek link. Data Sheet mein. Apps Script se har ghante auto-sync | Claude plan ke ilawa ~0 | Week 1–8 |
| **B. Apni web app (PWA)** | Galaxiee ki apni app: phone ki home screen par icon, login, entry forms, aur sab data ek database mein | Hosting + database: free se ~USD 45/mahina tak *(current price check karein)*. Banwane ka: main Claude Code se banaun to sirf Claude plan (Max behtar). Developer se banwayen to unka quote lein (rough andaza PKR 1.5–5 lakh; 2–3 quotes lein) | Jab rasta A ek mahina sahi chal chuka ho |
| **C. Play Store / App Store app** | Store par listed app | Google Play USD 25 ek baar, Apple USD 99/saal, aur banwana mehenga | Zaroorat nahi. PWA phone par app ki tarah hi chalti hai |

Rasta A ka data structure hi rasta B mein jayega. Is liye A se shuru karne mein kuch zaya nahi hota.

**Kaunsa data khud aayega, kaunsa aap dalenge:**
| Data | Kaise | Aapka time |
|---|---|---|
| Shopify orders, products, price | Auto | 0 |
| Leopards / PostEx status, RTO, COD cash | Auto (aapki API) | 0 |
| Meta ads spend | Auto (connector) | 0 |
| TikTok / Google ads | Pehle roz ki CSV, baad mein API se auto | 2 minute/din, phir 0 |
| Product cost + weight | Ek baar Shopify mein | Ek baar |
| Market se khareed ki qeemat | Har market-buy order par 1 entry | ~30 second/order |
| Pakistan Post + adda bilty parcels | Phone se entry (bilty no, freight, status) | ~1 minute/parcel |
| Bank balance, supplier udhaar | Aap likhenge | 2 minute/din ya hafte mein ek baar |

---

## ⭐ START HERE FIRST (aaj, 30 minute se kam)

**Shopify admin kholein → Products. Upar ki list ke top 10 products (Section 2-A) mein har ek ke andar ye do field bharein:**
1. **Cost per item** (aapki khareed ki qeemat, PKR)
2. **Weight** (kg, packing ke saath)

Ye ek kaam hai jis ke baghair koi agent asal profit ya total assets ka hisaab nahi laga sakta. Shopify mein bharne ka fayda ye hai ke system har roz wahin se khud parh lega.
