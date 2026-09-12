# TempleAddress — MVP prototype (React + Tailwind)

Clickable prototype for the development agency. All routes are hash-linked; open `dist/index.html` directly in a browser
(no server needed) or run the source:

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # single-file dist/index.html

Start at `#/map` for the full route list. Everything here is mock data — there is no backend; state resets on reload
(the only exception is the agent-application status, kept in `sessionStorage` so the flow can be demoed end to end).

## Structure
- `src/data.js` — mock data: `temples`, `specials`, `services`, `festival` (festival-committee vendor), `provider` (service-provider vendor), `gateways`, `analytics`
- `src/ui.jsx` — design system: brand mark/logo (`TempleMark`, `Logo`), `GoogleIcon`, `TrustBadges`, buttons, cards, `Table`, `Stat`, `Pill`, `Field`/`Input`/`Select`/`Toggle`, `Tabs`, `Steps`, `useToast`, `PublicShell`, `DashShell`, `Chatbot`
- `src/pages/public.jsx` — devotee site: home, temples directory (advanced search), temple page (white-label toggle), claim, booking, receipt + 80G, donate, special poojas, festival, services, sponsor, **login (role- and auth-aware)**, WhatsApp
- `src/pages/account.jsx` — devotee account: editable profile (nakshatra, gothra, rashi), OTP-verified mobile/email change, Google-linked email locked, bookings and receipts, plus the **agent application** (KYC wizard, draft → review → approved / changes requested)
- `src/pages/vendor.jsx` — **vendor type 1 · temple committee**: daily chart, poojas & prices, donations, payouts (3 gateway variants), settings (gateways, fee, 80G, domain, team, plan, ownership transfer), page editor, my data
- `src/pages/vendorFestival.jsx` — **vendor type 2 · festival committee**: overview with countdown & budget, programme, offerings, day sheets, sponsors, artists & vendors, finance, festival page, settings
- `src/pages/vendorService.jsx` — **vendor type 3 · service provider**: appointment diary, services, availability & slots, enquiries, special poojas, reviews, earnings, profile & page
- `src/pages/partners.jsx` — agent (wallet, profile & KYC card, listings, edit listing, share, submit, submissions), dealer (territory, profile & agreement, agents), staff (moderator / accountant / portal admin)
- `src/App.jsx` — routes + site map

## User roles & auth (prototype)
Chosen on the `/login` page, which adapts its form per role:

| Role | How they get the role | Login method |
|---|---|---|
| **Guest** | No account | None — can browse and submit a listing's basic details without logging in |
| **User / devotee** | Created on first login | Mobile + OTP, or Google login |
| **Agent** | Applies from the account page (KYC wizard), approved by staff | Mobile + OTP, or Google login |
| **Vendor** — Temple · Festival committee · Service provider | Claimed/verified by staff; type chosen at login | Mobile + OTP, or Google login |
| **Dealer** | Promoted from agent, approved by staff | **Password + OTP**, or Google Authenticator |
| **Staff** — Moderator · Accountant · Portal admin | Provisioned by a Portal admin | **Password + OTP**, or Google Authenticator |

Staff sub-roles scope the dashboard nav via `?role=moderator|accountant|admin` on every `/staff*` route (read with
`useSearchParams`, defaulting to the fullest view when absent, e.g. site-map links).

- **Moderator** — reviews listings, temples, service providers, agents; views bookings and daily charts.
- **Accountant** — financial reports, vendor/agent/dealer payouts, exports Excel, imports the UTR sheet to mark NEFT paid.
- **Portal admin** — configuration (fees, gateways, plans, agent rates, chatbot), approves new staff/accountant/dealer accounts, manual triggers (charts, payout batch, backup), site maintenance-mode toggle. See `SConfig` in `partners.jsx`.

Google login is mocked (no real OAuth) — the button completes the same prototype flow as OTP.

## The three vendor types
Each type has its **own dashboard and route group** — they share the design system but not the screens, because the
work is genuinely different. The login page sends each type to its own home, and legacy `/vendor?type=festival|service`
links redirect there.

| | **Temple committee** `/vendor` | **Festival committee** `/festival-admin` | **Service provider** `/service-admin` |
|---|---|---|---|
| Sells | Daily vazhipadu, donations | Time-bound offerings & sponsorships | Time-slot appointments |
| Core screen | Today's **pooja chart** (confirm & lock) | **Day sheet** per festival day (names read at the ritual) | **Appointment diary** (slot by slot) |
| Catalogue | Poojas & prices, daily limits | Offerings with a **per-festival-day** limit + sponsorship packages | Services with duration, mode (in person / phone / online / at home / at temple), travel radius |
| Money in | Bookings + donations (80G) | Online offerings + committee-sold sponsorships | Appointments + optional special poojas |
| Money out | — | **Artists & vendors** (fees, advances, balances) | — |
| Settlement | Weekly payout to temple bank | Weekly, switching to **T+1 express during festival week**; artist advances deducted | Weekly payout, TDS/GST, Service Pro plan |
| Time shape | Perpetual | **Time-bound** — countdown, budget vs collected, auto-archive 7 days after, roll over to next year | Perpetual, driven by **availability** (working days/hours, slot length, leave) |
| Distinct extras | 80G certificate, white-label domain | Permissions & compliance (panchayat, police, fire, elephant, fireworks), committee handover by OTP | Enquiries inbox, reviews with replies, listing-health score, KYC verification badge |
| No | — | No daily chart, no 80G | No donations, no 80G, no daily chart |

Notes on the two newer dashboards:
- **Festival** — `festival` in `data.js` drives it: `programme` (day/event/time/kind/performer/status), `offerings`, `sponsors`, `artists`, `expenses`, `sheet`. Day tabs come from `festival.days`.
- **Service provider** — `provider` in `data.js` drives it: `today`/`upcoming`/`past` appointments, `services`, `week` (working days), `specials`, `enquiries`, `feedback`, `earnings`. Special poojas are behind a toggle, since only some providers offer them.

## Business rules encoded
- Payment modes per listing: **via TempleAddress** (Razorpay / PayU / Stripe, one or more enabled, one default), **own gateway** (Omniware — no payouts shown or generated), **bank account only** (manual NEFT payout).
- Manual payout flow (accountant → Payouts): batch → export Excel → pay in internet banking → import the same sheet with UTR/journal → mark paid → vendor notified. RazorpayX is a future connector; the Excel flow stays as fallback.
- 80G: temples/trusts only. A donation with a PAN generates an 80G receipt alongside the booking receipt. Festival committees and service providers do not issue 80G.
- Convenience fee: listing override → platform default → 0, capped by a Portal-admin global ceiling. Sponsorships recorded manually by a committee carry no platform fee.
- Ownership: agent-submitted pages can be claimed by the committee (OTP + documents) and transferred (new owner accepts by OTP), with a full audit log. Festival listings hand over to the next year's convenor the same way.
- Add-temple / page editor require About, Story, History, Speciality, Guidelines, Remarks, Nearby places, Other deities, Photos.
- Chatbot: RAG-style assistant on public pages, answers only from TempleAddress data, escalates to WhatsApp; openable from anywhere via a `ta:ask` window event.

## Brand
- Logo mark (`TempleMark` in `ui.jsx`) is an inline SVG — a temple gopuram inside a rounded pin — so no image asset is needed. `Logo` composes mark + wordmark and takes a `light` prop for dark headers.
- Footer shows a trust-badges strip (Razorpay, UPI, Digital India, Startup India, Kerala Startup Mission) next to the payment-gateway line — see `TrustBadges` in `ui.jsx`.
- Palette and type live in `tailwind.config.js`: brown / saffron / gold, Fraunces (display) + Manrope + Anek Malayalam. Malayalam text uses the `.ml` class.

## Migrating to Next.js
Each exported page component maps 1:1 to an `app/<route>/page.jsx`; `ui.jsx` becomes `components/`; replace
`HashRouter`/`Link` with `next/link`, and the `?role=` / `?type=` search params with real session claims.
Tailwind config is reusable as-is.
