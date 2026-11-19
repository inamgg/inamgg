# Galaxiee Ops: Google Sheet + Courier API setup (Day 2)

Kul time: ~20 minute, sirf ek baar.

## Step 1: Sheet ko Google Drive mein daalein (3 minute)
1. `Galaxiee-Ops.xlsx` file download karein. Ye file Claude ne chat mein bheji hai.
2. PC par **drive.google.com** kholein → **New → File upload** → file chunein.
3. File par double-click → upar **Open with Google Sheets**.
4. **File → Save as Google Sheets**. Ab ye asli Google Sheet ban gayi.
5. Purani .xlsx file Drive se delete kar dein, taake do copies na banein.

## Step 2: Courier script lagayein (5 minute)
1. Google Sheet mein upar **Extensions → Apps Script**.
2. Wahan jo code likha hai, sab mita dein.
3. `courier-sync.gs` ka **sara code** copy karke wahan paste karein → **Save** (💾).
4. Project ka naam rakhein: `Galaxiee Courier Sync`.

## Step 3: API keys daalein, sirf yahan (5 minute)
> Keys **kabhi** chat mein, WhatsApp par, ya Sheet ke kisi cell mein na likhein.

1. Apps Script mein left side **⚙ Project Settings**.
2. Neeche **Script Properties → Add script property**. Ye teen add karein:

| Property | Value kahan se milegi |
|---|---|
| `POSTEX_TOKEN` | PostEx merchant portal → API / Integration section ka token |
| `LEOPARDS_API_KEY` | Leopards COD portal → API Settings → API Management |
| `LEOPARDS_API_PASSWORD` | Wahin se |

3. **Save script properties**.

## Step 4: Test karein (3 minute)
1. Apps Script mein upar function list se `testConnections` chunein → **Run**.
2. Pehli baar Google permission maangega: **Review permissions** → apna account → **Allow**.
   (Agar "Google hasn't verified this app" aaye: **Advanced → Go to Galaxiee Courier Sync**. Ye aapki apni script hai.)
3. Sheet mein wapas jayein → **Sync Log** tab dekhein:
   - `PostEx OK` aur `Leopards OK` = sab theek ✅
   - `FAILED` = message ka screenshot Claude ko bhejein. **Key wala hissa mat bhejein.** Log mein keys pehle se `***` hoti hain.

## Step 5: Data laayein
1. Sheet ko refresh karein. Upar naya menu **Galaxiee** aayega.
2. **Galaxiee → Sync PostEx now**: PostEx tab mein pichhle 60 din ke orders, status, aur kaun sa paisa settle hua.
3. **Leopards**: Leopards tab ke column A mein CN numbers paste karein (Leopards portal ki booked packets report se). Phir **Galaxiee → Sync Leopards now**.
   *(Day 3 se Claude ka Data Collector Shopify se CN numbers khud yahan daalega.)*
4. **Galaxiee → Turn on hourly sync**: ab har ghante khud update hoga.

## Aap kya bharenge (Sheet ke peelay dabbe)
| Tab | Kya | Kab |
|---|---|---|
| Settings | "Base charge mein kitne kg" confirm karein | Ek baar |
| Products | Khareed qeemat, sale price, weight, type (stock / market-buy) | Ek baar, top 10 se shuru |
| Bilty Log | Har heavy parcel: transporter, bilty no, asli kiraya, status | Jab parcel jaye |
| Post Office | Register ki entry | Jab parcel jaye / paisa aaye |
| Purchases | Market se khareed ki asli qeemat | Har market-buy order par |
| Cash & Udhaar | Bank balance, supplier udhaar | Din ya hafte mein ek baar |

## Masla aaye to
- Menu nazar na aaye: Sheet refresh karein, ya Apps Script mein `onOpen` ek baar Run karein.
- "Missing Script Property": Step 3 mein naam bilkul isi spelling mein likhein.
- Leopards tab mein "not found": CN number sahi hai ya nahi check karein. Phir bhi masla ho to "other details" column ka screenshot bhejein.
