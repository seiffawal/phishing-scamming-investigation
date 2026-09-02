# Phishing Incident Report

**Report Date:** August 31, 2026
**Reported By:** [Your Name]
**Incident Type:** Suspected Phishing / Social Engineering (SMS/WhatsApp)
**Classification:** Low technical sophistication, high social-engineering effectiveness

---

## 1. Summary

A message was received via WhatsApp claiming to offer a cash gift of 3,000 Egyptian Pounds (EGP) from the President of Egypt, Abdel Fattah El-Sisi, in connection with Mawlid al-Nabi (Prophet's Birthday) celebrations. The message included a shortened/obfuscated link directing recipients to an external, non-governmental domain. This is consistent with a known phishing pattern used to harvest personal data, financial credentials, or hijack messaging accounts.

---

## 2. Indicators of Compromise (IOCs)

| Type | Value |
|---|---|
| URL | `https://hiobr.buzz/IJgqFDH/eg-ar?0831327613168013918&s=wa&t=1788167597&` |
| Domain | `hiobr.buzz` |
| Delivery Vector | WhatsApp message forward |
| URL Parameter `s` | `wa` (indicates WhatsApp as distribution channel) |
| URL Parameter `t` | `1788167597` (likely Unix timestamp / campaign tracking ID) |
| Path Token | `IJgqFDH` (likely unique per-recipient or per-batch tracking identifier) |
| Language/Targeting | Arabic, Egypt-specific (`eg-ar` in path) |

---

## 3. Message Content (Original)

> الرئيس عبد الفتاح السيسي: هدية نقدية بقيمة 3,000 جنيه مصري لجميع المصريين
> بمناسبة احتفالات المولد النبوي هذا العام، يتم تقديم هدية نقدية بقيمة 3,000 جنيه مصري للمصريين.
> كيفية الاطلاع: اضغط على الرابط أدناه لعرض هديتك النقدية بمناسبة المولد النبوي بقيمة 3,000 جنيه مصري.
> لقد حصلت على هديتي للتو!

**Translation (summary):** Claims President El-Sisi is giving every Egyptian a 3,000 EGP cash gift for Mawlid al-Nabi, with a link to "claim" it, followed by a first-person line implying the sender already received their gift.

---

## 4. Analysis

### 4.1 Domain Legitimacy
- `hiobr.buzz` is **not** a government domain. Official Egyptian government communications use the `.gov.eg` TLD.
- The `.buzz` TLD is commonly associated with low-cost, disposable domain registrations frequently used in phishing and spam campaigns due to low registration cost and minimal vetting.

### 4.2 Social Engineering Techniques Identified
- **Authority impersonation** — invokes the President's name and image to establish false legitimacy.
- **Urgency/scarcity framing** — implies a limited-time or first-come benefit tied to a religious holiday.
- **Social proof** — the closing line ("I just got my gift!") is designed to appear as if forwarded by a trusted contact who already benefited, increasing click-through likelihood.
- **Mass-appeal targeting** — offering a benefit to "all Egyptians" maximizes viral forwarding potential.

### 4.3 Tracking Parameters
- The URL structure (`s=wa`, `t=<timestamp>`, unique path token) is consistent with a **campaign tracking system**, commonly used by phishing operators to:
- Measure click-through rates per distribution channel.
- Identify which forwarded copy led to the click (useful for propagation analysis or targeted follow-up).

### 4.4 Likely Endpoint Behavior (Not Directly Verified)
Based on the pattern, the link likely leads to one or more of the following (typical for this scam category):
- A fake form requesting personal identifiers (name, phone number, national ID).
- A request for banking or mobile wallet (e.g., Vodafone Cash, InstaPay) details.
- A prompt to enter a one-time password (OTP), which would allow account takeover.
- Further redirection prompting the victim to forward the message to additional contacts to "unlock" the reward.

**Note:** The link was not clicked or executed as part of this analysis; conclusions are based on URL structure and known phishing patterns, not direct sandbox execution.

---

## 5. Risk Assessment

| Factor | Assessment |
|---|---|
| Likelihood of malicious intent | High |
| Technical sophistication | Low–Medium |
| Social engineering effectiveness | High (holiday timing, authority figure, viral design) |
| Potential impact if credentials entered | High (financial loss, account takeover) |
| Potential impact if only link opened (no data entered) | Low–Medium (possible device fingerprinting, malicious redirect exposure) |

---

## 6. Recommendations

1. **Do not click the link.** Do not enter any personal, financial, or authentication information if already accessed.
2. **If information was already submitted:**
 - Change passwords for any accounts that share the submitted credentials.
 - Contact your bank/mobile wallet provider to flag potential compromise.
 - Enable two-factor authentication where available.
3. **Do not forward the message**, even with a warning — forwarding with the live link intact still spreads the campaign.
4. **Report the message:**
 - Use WhatsApp's in-app "Report" feature on the conversation.
 - Report to Egypt's official cybercrime authority.
5. **Verify future "official" announcements** only through recognized sources (e.g., Egypt's State Information Service, established national media), never through unsolicited links.

---

## 7. Campaign Attribution

This URL matches the pattern of a documented phishing-as-a-service operation tracked publicly by security researchers (PhishEye, June 2026) under the name **"PrizeBuzz."**

| Attribute | This Incident | PrizeBuzz Network (documented) |
|---|---|---|
| TLD | `.buzz` | `.buzz` (disposable, budget-registered) |
| URL structure | `<domain>/<token>/eg-ar?<numeric>&s=wa&t=<timestamp>` | `<5-char-domain>.buzz/<6-8char>/<cc>-<lang>?<numeric-token>&s=wa#<unix-ms>` |
| Distribution | WhatsApp | WhatsApp (`s=wa` parameter is the documented distribution marker) |
| Lure type | Government cash gift tied to religious holiday | Rotating brand impersonation (banks, telecoms, FMCG) tied to prizes/gifts/holidays |
| Device targeting | Rendered only on mobile | Cloaking logic serves the lure only to fresh tokens on mobile devices in the target country; bots/desktop/reused tokens get ads or a blank decoy |
| Data sought | Personal/phone number entered by reporting party | Phone number, one-time passcode (OTP), card/account details |

**Assessment:** This incident is very likely a variant of the same phishing-as-a-service kit (or a closely related operator using the same infrastructure pattern), with the lure re-skinned to impersonate the Egyptian presidency instead of a commercial brand. The underlying kit is known to be brand-agnostic — the impersonated identity is swapped via a configuration file, which explains why the same URL structure has been observed across many unrelated brands and now, apparently, a government-impersonation variant.

## 8. Interaction Outcome (Reporting Party)

- The reporting party opened the link on a mobile device (consistent with the cloaking behavior described above, which explains why it did not render on PC).
- A **fabricated phone number** was submitted into the form.
- No visible redirect, confirmation, or further prompt was observed afterward.
- **Assessment:** Because a fake number was used, no real contact data was likely exposed to the operator. However, "no visible response" does not rule out background telemetry (e.g., device/browser fingerprinting, IP logging, or session-token issuance) — this is consistent with cloaked kits, which often show minimal visible behavior after the token is confirmed as "already used" for that decoy path. No further data should be entered on this domain or related domains.

## 9. Reporting & Takedown Channels

| Channel | Purpose | How |
|---|---|---|
| WhatsApp in-app report | Flags the message/number for platform-level action | Open the chat → tap the contact/group name → "Report" |
| Egypt cybercrime unit | National law-enforcement reporting | Egypt's Ministry of Interior cybercrime reporting channels |
| Cloudflare abuse | Domains in this network are typically Cloudflare-fronted; abuse reports can prompt proxy-level action | abuse.cloudflare.com (submit the full URL and this report as evidence) |
| Domain registrar abuse | Budget registrars (commonly seen: Spaceship, NameSilo, Namecheap) accept abuse complaints for takedown | Look up the registrar via a WHOIS/RDAP lookup on the domain, then use their published abuse contact |
| Google Safe Browsing report | Helps flag the URL in browsers/Chrome warnings | https://safebrowsing.google.com/safebrowsing/report_phish/ |

**Note on takedown durability:** Publicly documented behavior for this class of kit shows domains are disposable and quickly rotated — takedown of a single domain is unlikely to stop the broader campaign, but reporting still helps flag the current active domain and contributes to pattern-tracking by platforms and researchers.

---

## 10. Conclusion

This message exhibits standard characteristics of a mass-distributed phishing campaign exploiting a public figure's identity and a religious holiday to induce urgency and trust. The domain is not affiliated with any Egyptian government entity. The recommended action is non-engagement, reporting, and credential hygiene review if any interaction with the link already occurred.

---

## 11. Network Traffic Analysis (spec.pcap)

A packet capture (`spec.pcap`) of the reporting party's mobile session was provided and analyzed.

| Attribute | Value |
|---|---|
| Capture window | 2026-08-31 16:18:14 – 16:18:54 UTC (~39.4 seconds) |
| Total packets | 549 (419,278 bytes) |
| Local endpoint | 10.215.173.1 (device, private/NAT address) |
| Remote endpoint | 172.67.221.146 (Cloudflare anycast IP range) |
| TLS/QUIC SNI (all handshakes) | `hiobr.buzz` |
| Transport breakdown | QUIC/HTTP3 over UDP: 533 packets (majority); TLS 1.3 over TCP: 16 packets (fallback/secondary) |

**Findings:**
- All three observed TLS/QUIC handshakes present the Server Name Indication (SNI) `hiobr.buzz`, providing direct technical confirmation that the device connected to the reported phishing domain during the capture window.
- The remote IP (172.67.221.146) falls within Cloudflare's published ranges, confirming the domain is proxied through Cloudflare — consistent with the campaign's use of a major CDN to obscure origin hosting and complicate takedown.
- The connection predominantly used QUIC (HTTP/3), with a smaller TLS 1.3/TCP fallback — typical of a modern mobile browser session to a Cloudflare-fronted site.
- **No plaintext content is recoverable from this capture.** Both TLS 1.3 and QUIC encrypt application data (including HTTP headers, form fields, and page content) end-to-end; only connection metadata (endpoints, timing, volume, and the SNI hostname) is visible without the session's private/decryption keys, which were not available.
- This capture corroborates the reporting party's account of visiting the site on mobile and submitting a (fabricated) form entry, but cannot confirm or deny what data was transmitted in the encrypted payload.

## 12. Extended Traffic Analysis — Full Device Capture (PCAPdroid_31_Aug_19_37_26.pcap)

A full-device packet capture covering the same session window (2026-08-31, 16:37:29–16:43:08 UTC, 21,375 packets, 18.3 MB) was provided. Unlike the earlier scoped captures, this one shows **all app traffic on the device**, revealing what happened immediately after the `hiobr.buzz` page loaded.

### 12.1 Redirect Chain Identified

Within **~1.3 seconds** of the initial `hiobr.buzz` connection, the device silently connected to six additional short, randomly-named domains in rapid succession — a pattern consistent with a **Traffic Distribution System (TDS)**, a redirect infrastructure commonly used by ad-fraud and malvertising networks to route phishing/scam victims toward monetized destinations (ads, gambling affiliate offers, fake app installs, or further scam pages) without any visible page change.

| Time (sec. from capture start) | Domain |
|---|---|
| 0.60 | `hiobr.buzz` (initial phishing domain) |
| 1.87 | `puoxe.buzz` |
| 1.96 | `yfxso.buzz` |
| 1.97 | `bzxrc.buzz` |
| 1.98 | `bhwmj.buzz` |
| 2.00 | `muzks.buzz` |
| 2.01 | `paedg.top` |
| 41.5 | `paedg.top` (repeat) |
| 57.0 | `hiobr.buzz` (repeat) |
| 76.8 | `bgv.eiply.buzz` |
| 77.4 | `a.trafficsyatyou.com` |
| 78.5 | `izy0.com`, `wuytq.com` |
| 79.0 | `cdntechone.com` |
| 79.1 | `my.rtmark.net` |
| 86.2 | `bboy1.com` |
| 98.3–98.9 | `fmscc.com`, `x6y1.com`, `ih31.com` |
| 99.7 | `winmel.live` |

This confirms the "nothing happened" visible outcome (Section 8) was **not accurate at the network level** — a redirect chain was actively running in the background even though the visible page appeared static.

### 12.2 Full Suspicious Domain List (IOCs)

Short, randomly-named domains on disposable TLDs (`.buzz`, `.top`, `.xyz`, `.pro`, `.live`) observed during the session:

```
hiobr.buzz
puoxe.buzz
yfxso.buzz
bzxrc.buzz
bhwmj.buzz
muzks.buzz
paedg.top
bgv.eiply.buzz
mafqy.xyz
winmel.live
1xlite-11151.pro
```

Additional domains observed that are associated with ad-fraud / affiliate-redirect / click-tracking infrastructure (based on naming pattern and known industry associations — not all are inherently malicious, but are commonly present in monetized redirect chains):

```
v3.traincdn.com / v2aka.traincdn.com   — known malvertising/redirect CDN
track.landerlab.io / resources.landerlab.io — "lander" page-building tool, frequently used by ad-fraud/scam campaigns
a.trafficsyatyou.com
my.rtmark.net
s.uuidksinc.net / r.uuidksinc.net / uidsync.net
fmscc.com / x6y1.com / ih31.com / izy0.com / wuytq.com / wuytl.com / ldl1.com / bboy1.com / dri3d.com / f03f.com
refpa32051.com / refpa55651.com / refpa3665.com — referral/click-tracking pattern typical of affiliate fraud
cdntechone.com / datatechonert.com / mbdippex.com
sdk4push.com / go.appmeify.com / go.khotshop.com / go.khotshop.com
ti58l.bemobtrk.com — BeMob is a known ad-tracking/redirect platform
1xlite-11151.pro — associated with an offshore gambling/betting affiliate brand
melbetegypt.com — gambling site targeting Egyptian users
gahakoleir.ru
1d7ba09f481.dreamy-views.com / 126d57a471b3.starry-moon.org — randomized subdomain pattern typical of cloaked redirect/landing infrastructure
```

**Standard ad-tech/analytics domains also present** (Google Ads/Analytics, DoubleClick, Hotjar, Twitter Ads, PropellerAds, BetweenDigital, Yandex AppMetrica): these are common on many ordinary websites and are not unique indicators of this campaign, but their presence alongside the domains above suggests the phishing page's traffic was being monetized/sold through a broader ad-fraud ecosystem rather than solely used for direct credential theft.

### 12.3 Assessment

This full capture upgrades the risk assessment from Section 5. The phishing page is not a standalone credential-harvesting form — it is a front end for (or connected to) a **monetized redirect network**, likely earning the operator revenue per redirect/impression/install regardless of whether the "prize" form is completed. This is consistent with the PrizeBuzz-style campaigns referenced in Section 7, which are documented to chain phishing lures into broader ad-fraud/affiliate infrastructure.

**Practical implication for the reporting party:** even though no real personal data was submitted, simply loading the page triggered background connections to numerous third-party trackers and redirect domains. This does not indicate device compromise (no evidence of malware installation or code execution was found), but it does mean the visit was logged by multiple ad-fraud/tracking networks, and the device's advertising identifiers/IP were likely exposed to them.

## 13. Decrypted Payload Analysis (Manually Captured Requests)

The reporting party manually captured and shared several plaintext HTTP requests/responses from the session (visible only because TLS was terminated locally on their own device), providing content that is not recoverable from network-level packet captures alone.

### 13.1 Data Submission Endpoint (`POST /api/h5heart/port`)

The form submission is sent to an endpoint whose name suggests an "HTML5 heartbeat" system — i.e., this endpoint doubles as both data intake and session-tracking. Notable fields in the JSON body:

- **`ip` / `regip`**: the visitor's real public IP is captured server-side regardless of what values are entered into visible form fields (name, phone, email).
- **`WS`, `TG`, `MS`, `LN`, `TotalShares`, `ShareEnd`**: counters consistent with a "share to unlock reward" mechanic gated on forwarding the link via WhatsApp, Telegram, Messenger, and Line.
- **`hostid`**: a device/session fingerprint independent of any submitted personal data, allowing the operator to track a visitor across requests even when fake information is entered.
- **`clickid`, `inviter_id`, `fromapp`**: present but unused fields, indicating built-in support for affiliate/referral attribution infrastructure.
- **`country` / `initCountry`**: confirms geo-targeting/geo-locking to Egypt (`"eg"`).
- **Placeholder email** (e.g., `<timestamp-fragment>@163.com`): auto-generated by the client-side script rather than user-supplied, using a Chinese webmail domain — a minor but notable fingerprint suggesting the kit's development origin/tooling, separate from wherever it is actually operated.

### 13.2 Heartbeat Pings (`{"cmd":"ping","date":...}`)

Lightweight, periodic keep-alive messages confirming continuous background JavaScript polling for as long as the page remains open — used for dwell-time/engagement tracking, feeding into both bot-detection scoring and the ad-fraud monetization documented in Section 12.

### 13.3 Cloudflare RUM Beacon (`/cdn-cgi/rum`)

A legitimate Cloudflare Real User Monitoring beacon (not custom scam-kit code) was observed, confirming Cloudflare Browser Insights is active on the zone. Includes a **`siteToken`** value (`d6b04785228244538419d4b5f3e46b86`) — a potentially useful pivot point, as the same analytics token could appear on other domains managed under the same Cloudflare account, offering a way to link seemingly unrelated phishing domains to a common operator.

### 13.4 Client-Side Cloaking Script (Behavioral Summary)

A client-side script confirmed to run on page load:

- Inspects `navigator.platform` and screen dimensions to classify the visitor as desktop/laptop vs. mobile.
- Desktop-classified visitors are silently redirected to a decoy path (randomized `/404bbb<token>` suffix) using a `noreferrer` link, preventing referrer leakage back to the decoy.
- Mobile-classified visitors are forwarded deeper into the phishing flow with a freshly generated per-visit token and timestamp appended to the URL.

This confirms the cloaking mechanism is **client-side and behavior-based**, not simple User-Agent string matching — it evaluates real browser/device characteristics, making it harder for basic automated scanners to detect.

**Full technical deobfuscation of the script's implementation was intentionally not performed or reproduced in this report**, as detailed cloaking-evasion code is not appropriate to document at that level even for defensive purposes; the behavioral summary above is sufficient for reporting and takedown purposes.

## 14. Manual HTTP Interception Findings (Burp Suite Export)

The reporting party captured additional evidence via a manual browsing session through a local intercepting proxy (Burp Suite), providing full request/response visibility that packet captures alone cannot show (since TLS is terminated at the proxy on the user's own device).

### 14.1 Fake Link Preview (Open Graph Spoofing)

The page's HTML head sets Open Graph / Twitter Card metadata — the tags WhatsApp, Facebook, and other apps use to build a link preview card — with:

```
og:url = "https://www.whatsapp.com/"
```

This means that when a victim shares the phishing link in a WhatsApp chat, the preview card that renders can display branding/URL context associated with `whatsapp.com` rather than the true destination (`hiobr.buzz`), despite the underlying link being unchanged. This is a deliberate deception layer distinct from the device-based cloaking already documented — it targets the *sharer's audience*, not just the direct visitor, increasing the credibility of forwarded copies of the link.

### 14.2 Live Domain Rotation Endpoint

A request to `hiobr.buzz/x/domains.json` returned a live-updating list of backup domains:

```json
{"success":true,"message":"success","data":["gvpyu.xyz","cuvrm.buzz","bwavg.buzz","mbgxn.buzz","zvsfc.buzz"]}
```

This confirms the operator maintains **on-demand domain rotation as a service** — if the primary domain is taken down or blocked, the client-side app can pull a fresh list of active replacement domains without requiring victims to receive a new link manually. This significantly increases the resilience of the campaign against takedown efforts targeting a single domain.

### 14.3 Real-Time WebSocket Channel

A WebSocket connection was observed to `mafqy.xyz/wss` (HTTP 101 Switching Protocols). This indicates the operator can maintain a persistent, bidirectional real-time channel to the client — beyond the periodic heartbeat/polling already documented — potentially for live state changes (e.g., pushing the next stage of the flow, live "spots remaining" counters, or coordinating the redirect chain in real time).

### 14.4 Additional Ad-Network Calls

Three additional `.buzz`/`.xyz` domains were called for `ads.json`, parameterized with the device fingerprint code and locale/country observed earlier:

```
lnczfe.buzz/ads.json?ref=001001&l=en&c=eg
hvxfzw.buzz/ads.json?ref=001001&l=en&c=eg
ohtdaw.buzz/ads.json?ref=001001&l=en&c=eg
```

This reinforces the Section 12 finding that the page is integrated with a broader monetized ad-fraud network rather than operating as a standalone credential-harvesting form.

### 14.5 Share-Gating Confirmation

Calls to `/api/shareControl/share` and `/api/shareControl/back` returned generic success responses, consistent with the "share to unlock" mechanic inferred from the `WS`/`TG`/`MS`/`LN`/`TotalShares` fields documented in Section 13 (Decrypted Payload Analysis).

### 14.6 Updated Assessment

This evidence confirms the operation is a mature, actively maintained phishing-as-a-service platform with: automated domain rotation, real-time control channels, deceptive link-preview metadata targeting secondary victims (people who receive forwards), and integration with third-party ad-fraud monetization — not a simple static phishing page.

## 15. References

- PhishEye Research, *"PrizeBuzz: The .buzz Prize-Scam Phishing Network"* (June 15, 2026) — primary source for campaign attribution, IOC patterns, and cloaking behavior: https://phisheye.com/blog/prizebuzz-phishing-network
- Google Safe Browsing — phishing report form: https://safebrowsing.google.com/safebrowsing/report_phish/
- Cloudflare — abuse report submission: https://abuse.cloudflare.com
- CISA — "Recognize and Report Phishing" (general reference on phishing indicators): https://www.cisa.gov/secure-our-world/recognize-and-report-phishing

---

*This report was compiled based on message content and URL structure analysis provided by the reporting party. No direct interaction with the malicious endpoint was performed.*
