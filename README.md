# TempleAddress — MVP prototype (React + Tailwind)

Clickable prototype for the development agency. All routes are hash-linked; open `dist/index.html` directly in a browser
(no server needed) or run the source:

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # single-file dist/index.html

Start at `#/map` for the full route list. Everything here is mock data — there is no backend; state resets on reload.

## Structure
- `src/data.js`        mock temples, poojas, specials, services, gateways, analytics
- `src/ui.jsx`          design system — brand mark/logo, buttons, cards, tables, shells (public + dashboard), footer trust badges, chatbot widget
- `src/pages/public.jsx`   devotee site: home, temples directory (advanced search — name/ID, district, deity, category, filters), temple page (white-label toggle), claim, booking, receipt+80G, donate, special poojas, festival, services, sponsor, **login (role- and auth-aware)**, account, WhatsApp
- `src/pages/vendor.jsx`   vendor dashboard shared by all three vendor types: today's chart, poojas, donations, payouts (3 variants), settings (multi-gateway, fee, 80G, domain, team, plan, ownership transfer), page editor, my data
- `src/pages/partners.jsx` agent, dealer, staff (moderator / accountant / portal admin — queues, analytics, listing/KYC review, charts, special poojas, manual NEFT payouts, withdrawals, claims & transfers, sponsors, backup, config, tables)
- `src/App.jsx`        routes + site map

## User roles & auth (prototype)
Chosen on the `/login` page, which adapts its form per role:

| Role | How they get the role | Login method |
|---|---|---|
| **Guest** | No account | None — can browse and submit a temple's basic details (`/agent/submit`-style forms) without logging in |
| **User / devotee** | Signs up on first login | Mobile + OTP, or Google login |
| **Agent** | Applies via "Add a temple" flow, approved by staff | Mobile + OTP, or Google login |
| **Vendor** — Temple · Festival committee · Service provider (a service provider can also list Special poojas) | Claims/verified by staff, type chosen at login | Mobile + OTP, or Google login |
| **Dealer** | Promoted from agent, approved by staff | **Password + OTP**, or Google Authenticator |
| **Staff** — Moderator · Accountant · Portal admin (sub-role chosen at login) | Provisioned by a Portal admin | **Password + OTP**, or Google Authenticator |

Staff sub-roles scope the dashboard nav (`?role=moderator\|accountant\|admin` on every `/staff*` route) and vendor type scopes the vendor dashboard (`?type=temple\|festival\|service` on every `/vendor*` route) — both read via `useSearchParams`, set by the Login page, defaulting to the fullest view when absent (e.g. direct links from the site map).

- **Moderator** — reviews listings, temples, service providers, agents; views bookings and daily charts.
- **Accountant** — financial reports, vendor/agent/dealer payouts, exports Excel, imports UTR sheet to mark NEFT paid.
- **Portal admin** — configuration (fees, gateways, plans, agent rates, chatbot), approves new staff/accountant/dealer accounts, KYC & convenience-fee policy, manual triggers (charts, payout batch, backup), site maintenance-mode toggle. See `SConfig` in `partners.jsx`.

Google login is mocked (no real OAuth) — the button completes the same prototype flow as OTP.

## Business rules encoded
- Payment modes per listing: **via TempleAddress** (Razorpay / PayU / Stripe, one or more enabled, one default), **temple's own gateway** (Omniware — no payouts shown or generated), **bank account only** (manual NEFT payout).
- Manual payout flow (accountant → Payouts): batch → export Excel → pay in internet banking → import same sheet with UTR/journal → mark paid → temple notified. RazorpayX is a future connector; Excel flow remains fallback.
- 80G: when the temple holds a certificate, donation with PAN generates an 80G receipt alongside the booking receipt.
- Convenience fee: listing override → platform default → 0, capped by a Portal-admin-set global ceiling.
- Ownership: agent-submitted pages can be claimed by the committee (OTP + documents), transferred (new owner accepts by OTP), full audit log.
- Add-temple / page editor require About, Story, History, Speciality, Guidelines, Remarks, Nearby places, Other deities, Photos.
- Chatbot: RAG-style assistant on public pages, answers only from TempleAddress data, escalates to WhatsApp; openable from anywhere via a `ta:ask` window event.

## Brand
- Logo mark (`TempleMark` in `ui.jsx`) is an inline SVG — a temple gopuram inside a rounded pin — no external image asset required. `Logo` composes mark + wordmark and takes a `light` prop for dark headers.
- Footer shows a trust-badges strip (Razorpay, UPI, Digital India, Startup India, Kerala Startup Mission) alongside the existing payment-gateway line — see `TrustBadges` in `ui.jsx`.

## Migrating to Next.js
Each exported page component maps 1:1 to an `app/<route>/page.jsx`; `ui.jsx` becomes `components/`; replace `HashRouter`/`Link` with `next/link`. Tailwind config is reusable as-is.
