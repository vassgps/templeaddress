import React, { useState } from 'react'
import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom'
import { CalendarCheck, ListOrdered, Gift, Landmark, Settings, Database, PenLine, Download, MessageCircle, Check, Plus, CreditCard, ArrowRightLeft, Percent, FileBadge, Globe, Users2, Crown, Power, Zap, Pencil, X } from 'lucide-react'
import { temples, gateways, templeCharts, chartById, poojaCategories, bookingTypeOptions } from '../data'
import { DashShell, Pill, Field, Input, Select, Toggle, Table, Stat, Tabs, useToast, Money } from '../ui'

// Vendor covers three listing types, chosen at login. Each type now has its OWN dashboard:
//   temple             → /vendor          (this file — daily pooja chart, donations, 80G)
//   festival committee → /festival-admin  (pages/vendorFestival.jsx — programme, sponsors, artists)
//   service provider   → /service-admin   (pages/vendorService.jsx — appointment slots, enquiries, reviews)
// Old ?type= links land here, so redirect them to the right dashboard.
const items = [{ group:'Temple · T1028', links:[['/vendor','Today',CalendarCheck],['/vendor/charts','Previous charts',FileBadge],['/vendor/poojas','Poojas',ListOrdered],['/vendor/payouts','Payouts',Landmark],['/vendor/settings','Settings',Settings],['/vendor/page','Page editor',PenLine],['/vendor/donations','Donations',Gift],['/vendor/data','My data',Database]] }]
const useVendorType = () => { const [sp]=useSearchParams(); const t=sp.get('type'); return t==='festival'||t==='service' ? t : 'temple' }
const Shell = ({ children, temple }) => { const vt=useVendorType()
  if (vt==='festival') return <Navigate to="/festival-admin" replace/>
  if (vt==='service') return <Navigate to="/service-admin" replace/>
  return <DashShell role="Vendor · Temple" user={temple||'T1028 · Kottur Sree Mahavishnu Temple · Nishanth (Secretary)'} items={items} badge="2">{children}</DashShell> }
const H = ({ t, s, right }) => <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-semibold">{t}</h1>{s&&<div className="text-sm text-brown-500">{s}</div>}</div>{right}</div>

export function VToday() {
  const [toast,el]=useToast()
  const [enabled,setEnabled]=useState(true); const [bookingsOpen,setBookingsOpen]=useState(true)
  const today=templeCharts[0]
  const toggleEnabled = () => { const next=!enabled; setEnabled(next); toast(next?'Listing enabled — the public page is live again':'Listing disabled — the public page now shows "temporarily unavailable"') }
  const toggleBookings = v => { setBookingsOpen(v); toast(v?'Bookings open — devotees can book vazhipadu again':'Bookings closed — devotees can browse the page but cannot book') }
  return (<Shell>{el}<H t="Kottur Sree Mahavishnu Temple" s="Listing ID T1028 · Sat 13 Sept 2026 · Pro plan · sponsored by Resurge India Foundation" right={<div className="flex flex-wrap items-center gap-2">
      <label className="flex items-center gap-2 rounded-xl border border-brown-200 bg-white px-3 py-2 text-sm"><Toggle label={bookingsOpen?'Bookings open':'Bookings closed'} defaultChecked={bookingsOpen} onChange={toggleBookings}/></label>
      <button onClick={toggleEnabled} className={`btn !px-3 !py-2 text-sm ${enabled?'bg-red-50 text-red-700':'bg-emerald-50 text-emerald-700'}`}><Power size={15}/>{enabled?'Disable listing':'Enable listing'}</button>
    </div>}/>
    {!enabled && <div className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-800"><b>This listing is disabled.</b> The public page shows "temporarily unavailable" and no new bookings are accepted. Re-enable any time — nothing is deleted.</div>}
    {enabled && !bookingsOpen && <div className="mb-4 rounded-xl bg-saffron-50 p-3 text-sm text-saffron-800"><b>Bookings are closed.</b> The page is live and devotees can browse poojas, but the "Book" button is disabled until you reopen bookings. Live poojas are unaffected only when explicitly enabled per pooja.</div>}
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Link to={`/vendor/bookings?date=${today.dateKey}`} className="block rounded-2xl transition hover:-translate-y-0.5 hover:shadow-soft"><Stat v="14" l="bookings today · view details"/></Link><Stat v="₹4,420" l="chart total · bookings + donations"/><Stat v="6" l="tomorrow so far" delta="chart closes in 2 h 14 m"/><Stat v="₹12,650" l="payable balance"/></div>
    <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]"><div className="space-y-5">
      <div className="card p-5"><div className="flex flex-wrap items-center justify-between gap-2"><div><h2 className="text-lg font-semibold">Today's chart · 13 Sept</h2><Link to={`/vendor/charts/${today.id}`} className="text-xs font-semibold text-saffron-600">{today.id} · View full chart</Link></div><Pill tone="ok"><Check size={12}/>Prepared & sent automatically</Pill></div>
        <div className="mt-3"><Table head={['#','Pooja','Devotee','Nakshatra','Qty','₹']} rows={[['1','Ganapathi Homam','Anand','Rohini','1','250'],['2','Ganapathi Homam','Sreeja S','Uthram','1','250'],['3','Ilaneer Abhishekam','Rajesh','Chothi','2','100'],['4','Pushpanjali','Devi','Makayiram','1','20'],['5','Palpayasam','Vinod','Anizham','1','120'],['…','9 more','','','','2,680'],['',<b>Donation — Annadanam</b>,'Anand K (80G)','','','1,000']]}/></div>
        <div className="mt-4 flex flex-wrap gap-2"><button className="btn-g"><Download size={16}/>PDF</button><button className="btn-wa"><MessageCircle size={16}/>Resend on WhatsApp</button></div>
        <p className="mt-2 text-xs text-brown-500">The background task prepared and locked this chart at the temple-configured cutoff, then sent it to +91 90…422 and office@kottur.org automatically.</p></div>

      <div className="card p-5"><div className="flex items-center gap-2"><Zap size={18} className="text-emerald-600"/><h2 className="text-lg font-semibold">Live bookings</h2><Pill tone="ok">{today.liveBookings.length} today</Pill></div>
        <p className="mt-1 text-sm text-brown-500">Booked instantly through a <b>Live</b> pooja after today's chart was already prepared. You were notified the moment each one came in — they're settled with <b>tomorrow's chart</b>, not today's.</p>
        <div className="mt-3 divide-y divide-brown-100">{today.liveBookings.map(([id,pj,who,nak,qty,amt,at,notif])=>
          <div key={id} className="flex flex-wrap items-center gap-3 py-2.5 text-sm"><Pill tone="ok"><Zap size={11}/>{at}</Pill><div className="min-w-0 flex-1"><b>{pj}</b> <span className="text-brown-500">· {who} ({nak}) × {qty}</span><div className="text-xs text-brown-400">{notif}</div></div><b>₹{amt}</b></div>)}</div>
        <p className="mt-3 text-xs text-brown-500">Manage which poojas allow live booking in <Link to="/vendor/poojas" className="font-semibold text-saffron-600 underline">Poojas & prices</Link>.</p></div>

      <div className="card p-5"><h2 className="text-lg font-semibold">Tomorrow · 14 Sept</h2><div className="mt-1 flex items-center justify-between text-sm"><span>6 bookings · ₹1,850</span><span className="text-brown-500">Chart closes today 8:00 PM</span></div><div className="mt-3 rounded-xl bg-saffron-50 p-3 text-sm text-saffron-700">Ganapathi Homam: 14 of 20 slots left. <Link to="/vendor/poojas" className="font-semibold underline">Change limit</Link></div></div></div>
      <aside className="space-y-4"><div className="card p-5"><div className="flex items-center justify-between"><h3 className="font-semibold">Recent charts</h3><Link to="/vendor/charts" className="text-xs font-semibold text-saffron-600">View all</Link></div><Table head={['Chart ID','Date','Total','Status']} rows={templeCharts.slice(1,4).map(c=>[<Link to={`/vendor/charts/${c.id}`} className="font-semibold text-saffron-600">{c.id}</Link>,c.date.replace(' 2026',''),<Money v={c.bookingTotal+c.donationTotal}/>,<Pill tone="ok">{c.status}</Pill>])}/></div>
        <div className="card p-5"><h3 className="font-semibold">Your QR board</h3><div className="photo mt-2 aspect-[3/4] rounded-xl"/><button className="btn-g mt-2 w-full">Download print file</button></div></aside></div></Shell>)
}

export function VBookings() {
  const [q]=useSearchParams(); const chart=templeCharts.find(c=>c.dateKey===(q.get('date')||templeCharts[0].dateKey))||templeCharts[0]
  return (<Shell><H t={`Booking details · ${chart.date}`} s={`Listing ID ${chart.listingId} · ${chart.id}`} right={<Link to={`/vendor/charts/${chart.id}`} className="btn-p">View full chart</Link>}/>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Stat v={chart.bookingCount} l="bookings"/><Stat v={<Money v={chart.bookingTotal}/>} l="booking total"/><Stat v={chart.donations.length} l="donations"/><Stat v={<Money v={chart.bookingTotal+chart.donationTotal}/>} l="chart total"/></div>
    <div className="card mt-5 p-4"><Table head={['Booking ID','Pooja','Devotee','Nakshatra','Qty','Amount','Payment']} rows={chart.bookings.map(([id,p,d,n,q,a,s])=>[<b>{id}</b>,p,d,n,q,<Money v={a}/>,<Pill tone={s==='Paid'?'ok':'warn'}>{s}</Pill>])}/></div>
    <Link to="/vendor" className="btn-g mt-4">← Back to Today</Link></Shell>)
}

export function VCharts() {
  return (<Shell><H t="Previous charts" s="Listing ID T1028 · Open any chart to see bookings, donations, totals and payout status"/>
    <div className="card p-4"><Table head={['Chart ID','Date','Bookings','Booking total','Donations','Chart total','Payout']} rows={templeCharts.map(c=>[
      <Link to={`/vendor/charts/${c.id}`} className="font-semibold text-saffron-600">{c.id}</Link>,c.date,c.bookingCount,<Money v={c.bookingTotal}/>,<Money v={c.donationTotal}/>,<b><Money v={c.bookingTotal+c.donationTotal}/></b>,<Pill tone={c.payoutStatus==='Paid'?'ok':'warn'}>{c.payoutStatus}</Pill>])}/></div></Shell>)
}

export function VChartDetail() {
  const { chartId }=useParams(); const chart=chartById(chartId)
  return (<Shell><H t={`Chart · ${chart.date}`} s={`Chart ID ${chart.id} · Listing ID ${chart.listingId}`} right={<div className="flex gap-2"><Link to={`/vendor/bookings?date=${chart.dateKey}`} className="btn-g">Booking details</Link><button className="btn-p"><Download size={16}/>PDF</button></div>}/>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Stat v={chart.bookingCount} l="bookings"/><Stat v={<Money v={chart.bookingTotal}/>} l="booking total"/><Stat v={<Money v={chart.donationTotal}/>} l="donations"/><Stat v={<Money v={chart.bookingTotal+chart.donationTotal}/>} l="chart total"/></div>
    <div className={`mt-5 rounded-2xl border p-5 ${chart.payoutStatus==='Paid'?'border-emerald-200 bg-emerald-50':'border-saffron-200 bg-saffron-50'}`}><div className="flex flex-wrap items-center justify-between gap-3"><div><div className="text-xs font-semibold uppercase tracking-wide text-brown-500">Payment against this chart</div><div className="mt-1 text-lg font-semibold">{chart.payoutStatus==='Paid'?'Paid to temple bank':'Pending payout to temple bank'}</div><div className="text-sm text-brown-600">{chart.payoutRef}</div></div><Pill tone={chart.payoutStatus==='Paid'?'ok':'warn'}>{chart.payoutStatus}</Pill></div></div>
    <div className="card mt-5 p-5"><h3 className="font-semibold">Bookings</h3><Table head={['Booking ID','Pooja','Devotee','Nakshatra','Qty','Amount','Payment']} rows={chart.bookings.map(([id,p,d,n,q,a,s])=>[id,p,d,n,q,<Money v={a}/>,<Pill tone={s==='Paid'?'ok':'warn'}>{s}</Pill>])}/></div>
    <div className="card mt-5 p-5"><h3 className="font-semibold">Donations</h3>{chart.donations.length?<Table head={['Receipt ID','Donor','Purpose','Amount','Receipt']} rows={chart.donations.map(([id,d,p,a,s])=>[id,d,p,<Money v={a}/>,s])}/>:<p className="mt-2 text-sm text-brown-500">No donations in this chart.</p>}</div>
    <Link to="/vendor/charts" className="btn-g mt-4">← All previous charts</Link></Shell>)
}

/* -------- POOJAS: individual pooja items — Basic details, Advanced details, Live Booking -------- */
const blankPooja = t => ({ code:'', name:'', ml:'', category:poojaCategories[0], price:'', dailyLimit:0,
  bookingType:bookingTypeOptions[2], live:false, bookable:true, purpose:'', startTime:'', endTime:'', minBookingTime:'Same day, before chart closes', deity:t.deity })

export function VPoojas() {
  const [toast,el]=useToast(); const t=temples[0]
  const [list,setList]=useState(t.poojas)
  const [editing,setEditing]=useState(null) // null | index | 'new'
  const [draft,setDraft]=useState(null)
  const setField = (k,v) => setDraft(d=>({...d,[k]:v}))
  const openEdit = i => { setEditing(i); setDraft(i==='new'?{...blankPooja(t),code:`${t.code}-P${list.length+1}`}:{...list[i]}) }
  const save = () => {
    if(!draft.name.trim()||!draft.code.trim()){ toast('Name and code are required'); return }
    if(editing==='new') setList(l=>[...l,draft]); else setList(l=>l.map((p,i)=>i===editing?draft:p))
    toast(editing==='new'?`${draft.name} added`:`${draft.name} updated`); setEditing(null)
  }
  const remove = i => { const name=list[i].name; setList(l=>l.filter((_,j)=>j!==i)); toast(`${name} removed`) }
  const toggleField = (i,k) => setList(l=>l.map((p,j)=>j===i?{...p,[k]:!p[k]}:p))

  return (<Shell>{el}<H t="Poojas & prices" s="Every booking item on this temple's page — basic details, advanced timing and the Live booking switch" right={<div className="flex gap-2"><button onClick={()=>openEdit('new')} className="btn-s"><Plus size={16}/>Add pooja</button><button onClick={()=>toast('Changes saved — apply to new bookings only')} className="btn-p">Save changes</button></div>}/>

    <div className="card p-4"><Table head={['Code','Pooja','Category','Price ₹','Booking type','Live','Bookable','']} rows={list.map((p,i)=>[
      <span className="text-xs text-brown-500">{p.code}</span>,
      <div><b>{p.name}</b><div className="ml text-xs text-brown-500">{p.ml}</div></div>,
      <Pill tone="n">{p.category}</Pill>,
      <b>₹{p.price}</b>,
      <span className="text-xs text-brown-600">{p.bookingType}</span>,
      <Toggle defaultChecked={p.live} onChange={()=>{toggleField(i,'live');toast(p.live?`${p.name}: live booking turned off`:`${p.name}: live booking enabled — bookable instantly, any time`)}}/>,
      <Toggle defaultChecked={p.bookable} onChange={()=>toggleField(i,'bookable')}/>,
      <div className="flex gap-2"><button onClick={()=>openEdit(i)} className="text-xs font-semibold text-saffron-600"><Pencil size={12} className="mr-0.5 inline"/>Edit</button><button onClick={()=>remove(i)} className="text-xs text-red-600">Remove</button></div>,
    ])}/></div>

    {editing!==null && draft && <div className="card mt-5 space-y-6 p-5">
      <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">{editing==='new'?'Add a pooja':`Edit · ${list[editing].name}`}</h3><button onClick={()=>setEditing(null)} aria-label="Close" className="text-brown-400 hover:text-brown-700"><X size={18}/></button></div>

      <div><h4 className="text-xs font-bold uppercase tracking-wide text-brown-500">Basic details</h4>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <Field label="Name (English)"><Input value={draft.name} onChange={e=>setField('name',e.target.value)}/></Field>
          <Field label="Name (Malayalam)"><Input className="input ml" value={draft.ml} onChange={e=>setField('ml',e.target.value)}/></Field>
          <Field label="Code" hint="Unique per listing"><Input value={draft.code} onChange={e=>setField('code',e.target.value)}/></Field>
          <Field label="Category"><Select options={poojaCategories} value={draft.category} onChange={e=>setField('category',e.target.value)}/></Field>
          <Field label="Price ₹"><Input type="number" value={draft.price} onChange={e=>setField('price',+e.target.value)}/></Field>
          <Field label="Booking type"><Select options={bookingTypeOptions} value={draft.bookingType} onChange={e=>setField('bookingType',e.target.value)}/></Field>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3 rounded-xl bg-emerald-50 p-3"><div><div className="flex items-center gap-1.5 font-semibold text-sm"><Zap size={14} className="text-emerald-600"/>Enable Live Booking</div><p className="mt-1 text-xs text-emerald-800">A devotee can book this pooja instantly, any time — without waiting for a chart to be prepared, and even after booking has otherwise closed for the day. You get an email, SMS and WhatsApp notification the moment it's booked; the booking itself is picked up in the <b>next</b> chart for payout.</p></div><Toggle defaultChecked={draft.live} onChange={v=>setField('live',v)}/></div></div>

      <div><h4 className="text-xs font-bold uppercase tracking-wide text-brown-500">Advanced details</h4>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <Field label="Purpose" hint="Shown to devotees on the booking page" className="md:col-span-2"><textarea className="input" rows={2} value={draft.purpose} onChange={e=>setField('purpose',e.target.value)}/></Field>
          <Field label="Start time"><Input placeholder="6:00 AM" value={draft.startTime} onChange={e=>setField('startTime',e.target.value)}/></Field>
          <Field label="End time"><Input placeholder="6:30 AM" value={draft.endTime} onChange={e=>setField('endTime',e.target.value)}/></Field>
          <Field label="Minimum booking time" hint={draft.live?'Live poojas are always instant':'How far ahead a devotee must book'}><Input value={draft.live?'Instant · live booking':draft.minBookingTime} onChange={e=>setField('minBookingTime',e.target.value)} disabled={draft.live}/></Field>
          <Field label="Deity"><Input value={draft.deity} onChange={e=>setField('deity',e.target.value)}/></Field>
          <Field label="Daily limit" hint="0 = unlimited"><Input type="number" value={draft.dailyLimit} onChange={e=>setField('dailyLimit',+e.target.value)}/></Field>
        </div></div>

      <div className="flex gap-2 border-t border-brown-100 pt-4"><button onClick={save} className="btn-p"><Check size={16}/>Save pooja</button><button onClick={()=>setEditing(null)} className="btn-g">Cancel</button></div>
    </div>}

    <div className="card mt-5 grid gap-4 p-5 md:grid-cols-2"><Field label="Chart closes at" hint="Bookings after this move to the next day — live poojas are unaffected"><Select options={['6:00 PM','7:00 PM','8:00 PM','9:00 PM']} defaultValue="8:00 PM"/></Field><Field label="Bookings open up to"><Select options={['7 days ahead','15 days ahead','30 days ahead']} defaultValue="30 days ahead"/></Field></div></Shell>)
}

export function VDonations() {
  return (<Shell><H t="Donations"/><div className="grid grid-cols-3 gap-3"><Stat v="₹4,500" l="this week"/><Stat v="₹38,200" l="this year"/><Stat v="12" l="80G receipts issued"/></div>
    <div className="card mt-5 p-5"><h3 className="font-semibold">Purposes</h3><Table head={['Purpose','Shown to devotees','This year ₹']} rows={[['Annadanam',<Toggle defaultChecked/>,'21,000'],['Renovation',<Toggle defaultChecked/>,'12,200'],['Festival 2026',<Toggle defaultChecked/>,'5,000'],['General',<Toggle/>,'0']]}/><button className="btn-s mt-3"><Plus size={16}/>Add purpose</button></div>
    <div className="card mt-5 p-5"><h3 className="font-semibold">Recent</h3><Table head={['Date','Donor','Purpose','₹','80G']} rows={[['13 Sept','Anand K','Annadanam','1,000',<Link to="/receipt" className="text-saffron-600">DN-000231</Link>],['11 Sept','Sreeja S','Renovation','2,500','DN-000230'],['9 Sept','Anonymous','Annadanam','1,000','—']]}/></div></Shell>)
}

/* -------- PAYOUTS: three variants by gateway -------- */
export function VPayouts() {
  const [q]=useSearchParams(); const mode=q.get('mode')||'ta'
  const tabs=[['ta','Omniware via TA'],['own','Own gateway (Razorpay/PayU)'],['manual','Bank account only']]
  const Sw = () => <div className="mb-4 flex gap-2">{tabs.map(([k,l])=><Link key={k} to={`/vendor/payouts?mode=${k}`} className={`rounded-full px-3 py-1 text-xs font-semibold ${mode===k?'bg-brown-900 text-white':'bg-white shadow-ring'}`}>{l}</Link>)}</div>
  if(mode==='own') return (<Shell temple="T1044 · Bilathikulam Sree Shiva Temple · Secretary"><H t="Payouts"/><Sw/>
    <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900"><b className="text-base">No TempleAddress payouts for this temple.</b><p className="mt-1">Bilathikulam Sree Shiva Temple collects payments through its own <b>Razorpay / PayU merchant account</b>. Money never passes through TempleAddress, so settlement happens in the temple's gateway account.</p></div>
    <div className="card mt-5 p-5"><h3 className="font-semibold">What TempleAddress still records</h3><p className="text-sm text-brown-500">Chart ID, gateway order ID, payment ID and status for every booking — so charts and receipts stay accurate.</p><div className="mt-3"><Table head={['Chart ID','Date','Bookings','Collected ₹','Gateway ref']} rows={[['CH-T1044-260912','12 Sept','8','1,940','RPY-2609-…'],['CH-T1044-260911','11 Sept','6','1,260','PAYU-2609-…']]}/></div></div>
    <p className="mt-4 text-sm text-brown-500">Want TempleAddress to collect and settle instead? <Link to="/vendor/settings?tab=0" className="text-saffron-600 underline">Change gateway in Settings → Payments</Link>.</p></Shell>)
  if(mode==='manual') return (<Shell temple="T1221 · Vengamala Bhagavathi Temple · Secretary"><H t="Payouts" s="No payment gateway on file — TempleAddress collects and the accountant pays you by NEFT"/><Sw/>
    <div className="grid grid-cols-3 gap-3"><Stat v="₹2,460" l="payable now"/><Stat v="Mon 15 Sept" l="next manual payout run"/><Stat v="₹18,900" l="paid this year"/></div>
    <div className="card mt-5 p-5"><div className="flex items-center gap-2"><Landmark size={18}/><b>Bank on file</b><Pill tone="ok">Verified</Pill></div><div className="mt-2 text-sm">Vengamala Devaswom · Federal Bank ····2201 · IFSC FDRL0002201</div><p className="mt-2 text-xs text-brown-500">Devotees pay through TempleAddress (Razorpay). Every Monday the accountant exports an Excel of pending payouts, transfers from internet banking, and updates the UTR in the same sheet. You get a WhatsApp message when it's marked paid.</p></div>
    <div className="card mt-5 p-5"><h3 className="font-semibold">History</h3><Table head={['Period','Charts','₹','Paid on','UTR / journal','Status']} rows={[['1–7 Sept','5','2,460','—','—',<Pill tone="warn">In this week's sheet</Pill>],['25–31 Aug','4','1,880','1 Sept','FDRLN26244000212',<Pill tone="ok">Paid (manual NEFT)</Pill>],['18–24 Aug','6','2,140','25 Aug','FDRLN26237000098',<Pill tone="ok">Paid (manual NEFT)</Pill>]]}/></div></Shell>)
  return (<Shell><H t="Payouts" s="Payments collected through Omniware via TempleAddress are paid to your bank every week. Gateway charges are deducted by the gateway; TempleAddress deducts nothing."/><Sw/>
    <div className="grid grid-cols-3 gap-3"><Stat v="₹12,650" l="payable now"/><Stat v="Mon 15 Sept" l="next payout"/><Stat v="₹1,84,300" l="paid this year"/></div>
    <div className="card mt-5 p-5"><div className="flex items-center gap-2"><Landmark size={18}/><b>Bank</b><Pill tone="ok">Verified</Pill></div><div className="mt-2 text-sm">Kottur Devaswom Committee · Federal Bank ····4412 · IFSC FDRL0001234 · <Link to="/vendor/settings" className="text-saffron-600">Change</Link></div></div>
    <div className="card mt-5 p-5"><h3 className="font-semibold">Chart settlement details</h3><p className="mb-3 text-sm text-brown-500">Open a Chart ID to verify its bookings, donations, chart total and payment reference.</p><Table head={['Chart ID','Date','Chart total','Payment reference','Status']} rows={templeCharts.map(c=>[<Link to={`/vendor/charts/${c.id}`} className="font-semibold text-saffron-600">{c.id}</Link>,c.date,<Money v={c.bookingTotal+c.donationTotal}/>,c.payoutRef,<Pill tone={c.payoutStatus==='Paid'?'ok':'warn'}>{c.payoutStatus}</Pill>])}/></div>
    <div className="card mt-5 p-5"><h3 className="font-semibold">Payout history</h3><Table head={['Period','Charts','₹','Paid on','UTR','Status']} rows={[['1–7 Sept','7','18,940','8 Sept','FDRLN26251000431',<Pill tone="ok">Paid</Pill>],['25–31 Aug','7','16,120','1 Sept','FDRLN26244000212',<Pill tone="ok">Paid</Pill>],['18–24 Aug','6','14,860','25 Aug','FDRLN26237000098',<Pill tone="ok">Paid</Pill>]]}/><button className="btn-g mt-3"><Download size={16}/>Statement (Excel)</button></div></Shell>)
}

/* -------- SETTINGS: multi-gateway, fee, 80G, domain, team, plan, ownership -------- */
export function VSettings() {
  const [q]=useSearchParams(); const [tab,setTab]=useState(+(q.get('tab')||0)); const [toast,el]=useToast()
  const [enabled,setEnabled]=useState({razorpay:true,payu:false,stripe:true,omniware:false}); const [primary,setPrimary]=useState('razorpay'); const [mode,setMode]=useState('ta')
  const [fee,setFee]=useState('INHERIT'); const [g80,setG80]=useState(true)
  return (<Shell>{el}<H t="Settings"/><Tabs tabs={['Payments','Convenience fee','80G','Website & domain','Team','Plan & sponsor','Ownership']} at={tab} set={setTab}/>
    {tab===0 && <div className="space-y-5">
      <div className="card p-5"><h3 className="font-semibold">How do you receive payments?</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">{[['ta','Omniware via TA','TempleAddress collects through Omniware; weekly payout to your bank'],['own','Own gateway (Razorpay/PayU)','Your gateway settles directly; no TempleAddress payout'],['manual','Bank account only','TempleAddress collects; accountant pays you by NEFT each week']].map(([k,h,p])=><button key={k} onClick={()=>setMode(k)} className={`rounded-2xl border p-4 text-left ${mode===k?'border-saffron-500 bg-saffron-50':'border-brown-200 bg-white'}`}><b className="text-sm">{h}</b><div className="mt-1 text-xs text-brown-500">{p}</div></button>)}</div></div>
      {mode==='ta' && <div className="card p-5"><div className="flex items-center justify-between"><h3 className="font-semibold">Omniware via TempleAddress</h3><Pill tone="ok">Connected</Pill></div>
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-brown-50 p-3"><CreditCard size={18}/><div><b>{gateways.omniware.name}</b><div className="text-xs text-brown-500">{gateways.omniware.note} · platform merchant account</div></div></div></div>}
      {mode==='ta'||mode==='manual' ? <div className="card grid gap-4 p-5 md:grid-cols-2"><h3 className="font-semibold md:col-span-2">Payout bank account</h3><Field label="Account holder"><Input defaultValue="Kottur Devaswom Committee"/></Field><Field label="Account number"><Input defaultValue="XXXXXXXX4412"/></Field><Field label="IFSC"><Input defaultValue="FDRL0001234"/></Field><Field label="UPI (optional)"><Input defaultValue="kotturtemple@fbl"/></Field><div className="md:col-span-2"><Pill tone="ok">Penny-drop verified by staff on 2 Aug</Pill>{mode==='manual'&&<span className="ml-3 text-xs text-brown-500">Manual payouts run every Monday; you'll get a WhatsApp when paid.</span>}</div></div>
      : <div className="card p-5"><div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900">With your own gateway, money goes straight to your account and <b>TempleAddress does not create payouts</b> for this temple.</div><div className="mt-4 grid gap-4 md:grid-cols-2"><Field label="Gateway"><Select options={['Razorpay (temple\'s own account)','PayU (temple\'s own account)']}/></Field><Field label="Merchant ID"><Input placeholder="Merchant ID"/></Field><Field label="API key"><Input type="password"/></Field><Field label="Webhook secret" hint="TempleAddress needs this to mark bookings paid"><Input type="password"/></Field></div><button className="btn-g mt-3">Test connection</button></div>}
      <button onClick={()=>toast('Payment settings saved')} className="btn-p">Save</button></div>}
    {tab===1 && <div className="card space-y-4 p-5"><div className="rounded-xl bg-saffron-50 p-3 text-sm text-saffron-800">Platform default is <b>Off</b> for vazhipadu and donations, <b>2%</b> for special poojas. A value here overrides the default for this listing only.</div>
      <Field label="Convenience fee for this temple"><select className="input" value={fee} onChange={e=>setFee(e.target.value)}><option value="INHERIT">Inherit platform default</option><option value="OFF">Off</option><option value="PERCENT">Percentage</option><option value="FIXED">Fixed amount</option><option value="BOTH">Percentage + fixed</option></select></Field>
      {(fee==='PERCENT'||fee==='FIXED'||fee==='BOTH') && <><div className="grid gap-4 md:grid-cols-2">{fee!=='FIXED'&&<Field label="Percent"><Input type="number" defaultValue="2"/></Field>}{fee!=='PERCENT'&&<Field label="Fixed ₹"><Input type="number" defaultValue="10"/></Field>}</div>
        <div><span className="label">Applies to</span><div className="flex flex-wrap gap-2">{[['Vazhipadu',true],['Donations',false],['Special poojas',true],['Services',false]].map(([n,on])=><button key={n} className={`rounded-full px-3 py-1.5 text-sm ${on?'bg-brown-900 text-white':'border border-brown-200 bg-white'}`}>{n}</button>)}</div></div>
        <div className="grid gap-4 md:grid-cols-2"><Field label="Who pays" hint="Temple-pays needs written consent on file"><Select options={['Devotee (added on top)','Temple (deducted from payable)']}/></Field><Field label="Refundable on cancellation"><Select options={['Yes','No']}/></Field><Field label="Label (EN)"><Input defaultValue="Convenience fee"/></Field><Field label="Label (ML)"><Input defaultValue="സേവന നിരക്ക്"/></Field><Field label="From"><Input type="date"/></Field><Field label="To" hint="Leave blank for always"><Input type="date"/></Field></div></>}
      <button onClick={()=>toast('Fee setting saved for this listing')} className="btn-p">Save</button></div>}
    {tab===2 && <div className="card space-y-4 p-5"><Toggle label="This temple trust holds an 80G certificate" defaultChecked onChange={setG80}/>{g80&&<div className="grid gap-4 md:grid-cols-2"><Field label="Trust PAN"><Input defaultValue="AAATK1234B"/></Field><Field label="80G registration no."><Input defaultValue="AAATK1234BF20221"/></Field><Field label="Valid till (AY)"><Input defaultValue="2027-28"/></Field><Field label="Signatory"><Input defaultValue="Secretary, Kottur Devaswom Committee"/></Field><Field label="Certificate PDF" className="md:col-span-2"><Input type="file"/></Field><div className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-800 md:col-span-2">When on, every donation with a PAN gets an 80G receipt generated together with the booking receipt.</div></div>}<button onClick={()=>toast('Saved')} className="btn-p">Save</button></div>}
    {tab===3 && <div className="card space-y-4 p-5"><Field label="Subdomain" hint="kottur.templeaddress.com · included in Basic"><Input defaultValue="kottur"/></Field><Field label="Custom domain (Pro)" hint="Point a CNAME to tenant.templeaddress.com"><div className="flex gap-2"><Input defaultValue="kotturtemple.org"/><Pill tone="ok">Connected</Pill></div></Field><Toggle label="White-label (no TempleAddress ads or nearby temples)" defaultChecked/><div className="grid gap-4 md:grid-cols-2"><Field label="Theme colour"><Input type="color" defaultValue="#4A3527"/></Field><Field label="Logo"><Input type="file"/></Field></div><button onClick={()=>toast('Saved')} className="btn-p">Save</button></div>}
    {tab===4 && <div className="card p-5"><h3 className="font-semibold">Who receives the daily chart</h3><Table head={['Name','WhatsApp','Email','Role','']} rows={[['Nishanth (Secretary)','+91 90… 422','ni…@gmail.com','Owner · Admin','—'],['Office','+91 94… 118','office@kottur.org','Chart only','Remove'],['Rajan (Treasurer)','+91 98… 771','—','Finance (payouts)','Remove']]}/><button className="btn-s mt-3"><Plus size={16}/>Add member</button><span className="ml-2 text-xs text-brown-500">Pro allows 3 admin numbers</span></div>}
    {tab===5 && <div className="card p-5"><div className="flex items-center justify-between"><div><b>Temple Pro</b> · valid till 31 Jul 2027<div className="text-sm text-brown-500">Sponsored by Resurge India Foundation (Patron pack)</div></div><Pill tone="ok">Active</Pill></div><p className="mt-3 text-sm text-brown-600">Sponsor branding shows on your page, receipts and QR board until expiry. To self-pay and remove branding at renewal, <a className="text-saffron-600 underline">choose a plan</a>.</p></div>}
    {tab===6 && <div className="space-y-5"><div className="card p-5"><div className="flex items-center gap-2"><Crown size={18} className="text-gold-500"/><h3 className="font-semibold">Current owner</h3></div><div className="mt-2 text-sm">Nishanth K (Secretary) · claimed on 2 Aug 2026 · verified by staff</div><div className="text-xs text-brown-500">Originally submitted by partner Jinsha (JIN-4471), who keeps referral credit.</div></div>
      <div className="card p-5"><div className="flex items-center gap-2"><ArrowRightLeft size={18}/><h3 className="font-semibold">Transfer ownership</h3></div><p className="mt-1 text-sm text-brown-500">When the committee changes, hand the page to the new secretary. They must accept by OTP; staff are notified.</p><div className="mt-3 grid gap-4 md:grid-cols-2"><Field label="New owner's WhatsApp"><Input placeholder="+91"/></Field><Field label="Role"><Select options={['Secretary','President','Devaswom officer','Trustee']}/></Field><Field label="Reason" className="md:col-span-2"><Select options={['Committee election','Devaswom takeover','Correction — wrong claimant','Other']}/></Field></div><div className="mt-3 flex gap-2"><button onClick={()=>toast('Transfer request sent — new owner must accept by OTP')} className="btn-dk">Send transfer request</button><button className="btn-g">Add co-admin instead</button></div></div>
      <div className="card p-5"><h3 className="font-semibold">Ownership history</h3><Table head={['Date','Event','By']} rows={[['2 Aug 2026','Claim approved · owner set to Nishanth K','Staff: Anand'],['9 Jul 2026','Listing verified','Staff: Anand'],['4 Jul 2026','Submitted','Partner Jinsha (JIN-4471)']]}/></div></div>}
  </Shell>)
}

/* -------- PAGE EDITOR: mandatory content sections -------- */
export function VPage() {
  const t=temples[0]; const [toast,el]=useToast(); const [tab,setTab]=useState(0)
  const done = ['About','Story','History','Speciality','Guidelines','Remarks','Nearby places','Deities','Photos'].map((n,i)=>[n,i<9])
  return (<Shell>{el}<H t="Page editor" s="Complete every section — devotees and search engines read all of it" right={<div className="flex gap-2"><Link to={`/t/${t.slug}`} className="btn-g">Preview page</Link><button onClick={()=>toast('Published')} className="btn-p">Publish</button></div>}/>
    <div className="mb-4 flex flex-wrap gap-2">{done.map(([n,ok])=><Pill key={n} tone={ok?'ok':'warn'}>{ok&&<Check size={12}/>}{n}</Pill>)}</div>
    <Tabs tabs={['Basics','About & story','Guidelines & remarks','Nearby & deities','Photos']} at={tab} set={setTab}/>
    {tab===0 && <div className="card grid gap-4 p-5 md:grid-cols-2"><Field label="Name (English)"><Input defaultValue={t.name}/></Field><Field label="Name (Malayalam)"><Input defaultValue={t.ml} className="input ml"/></Field><Field label="Main deity"><Input defaultValue={t.deity}/></Field><Field label="Managed by"><Select options={['Committee','Devaswom board','Family / Illam','Trust']}/></Field><Field label="Timings"><Input defaultValue={t.timings}/></Field><Field label="Address"><Input defaultValue={t.address}/></Field></div>}
    {tab===1 && <div className="card space-y-4 p-5"><Field label="About the temple" hint="2–4 sentences. Shown first."><textarea className="input" rows={3} defaultValue={t.about}/></Field><Field label="Story (aithihyam)"><textarea className="input" rows={3} defaultValue={t.story}/></Field><Field label="History"><textarea className="input" rows={4} defaultValue={t.history}/></Field><Field label="Speciality"><textarea className="input" rows={2} defaultValue={t.speciality}/></Field><div className="flex items-center gap-2 text-xs text-brown-500"><Globe size={14}/>Malayalam versions are auto-drafted by the assistant; review before publishing.</div></div>}
    {tab===2 && <div className="card space-y-4 p-5"><Field label="Guidelines for devotees" hint="Dress code, photography, timings of prasadam counter"><textarea className="input" rows={3} defaultValue={t.guidelines}/></Field><Field label="Remarks"><textarea className="input" rows={2} defaultValue={t.remarks}/></Field></div>}
    {tab===3 && <div className="card space-y-4 p-5"><Field label="Other deities (upadevathas)"><div className="flex flex-wrap gap-2">{t.others.map(o=><Pill key={o}>{o} ✕</Pill>)}<input placeholder="+ add" className="input !w-32 !py-1"/></div></Field><Field label="Nearby places to visit" hint="One per line with distance"><textarea className="input" rows={4} defaultValue={t.nearby.join('\n')}/></Field></div>}
    {tab===4 && <div className="card p-5"><div className="grid grid-cols-2 gap-3 md:grid-cols-4">{[1,2,3,4].map(i=><div key={i} className="photo aspect-square rounded-xl"/>)}<button className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-brown-200 text-sm text-brown-500">+ Upload</button></div><p className="mt-2 text-xs text-brown-500">No photos of the deity inside the sanctum. First photo is the cover.</p></div>}
  </Shell>)
}

export function VData() {
  const [toast,el]=useToast()
  return (<Shell>{el}<H t="My data" s="Your temple's data belongs to the temple. Download it any time in open formats."/>
    <div className="card p-5"><h3 className="font-semibold">Download everything</h3><p className="text-sm text-brown-500">Listing, poojas, bookings, donations, charts, receipts (PDF), payouts and sponsor invoices as a ZIP (JSON + Excel + PDF).</p><div className="mt-3 flex items-center gap-3"><button onClick={()=>toast('Export started — link arrives on WhatsApp & email')} className="btn-p"><Download size={16}/>Download my data</button><span className="text-xs text-brown-500">Last export: 1 Sept 2026 (monthly auto-export, Pro)</span></div></div>
    <div className="card mt-5 p-5"><h3 className="font-semibold">Export history</h3><Table head={['Date','Type','Size','Link']} rows={[['1 Sept','Monthly auto','18 MB','Download (valid 30 days)'],['1 Aug','Monthly auto','17 MB','expired'],['14 Jul','On request','16 MB','expired']]}/></div>
    <div className="card mt-5 p-5"><h3 className="font-semibold">Restore</h3><p className="text-sm text-brown-500">Deleted a pooja by mistake? Request a restore; staff verify with the registered secretary and restore that data for this temple only. Financial records are never deleted.</p><textarea className="input mt-3" rows={2} placeholder="e.g. pooja list as of 1 Aug"/><button onClick={()=>toast('Restore request sent')} className="btn-g mt-3">Request restore</button></div></Shell>)
}
