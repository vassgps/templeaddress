import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck, CalendarDays, ListOrdered, Ticket, Music, Landmark, PenLine, Settings, Banknote, Download, MessageCircle, Check, Plus, Megaphone, Clock, Users2, Share2, Upload, ArrowRightLeft, Crown, Globe, Pencil, ShieldCheck, Handshake, Sparkles } from 'lucide-react'
import { festival as F } from '../data'
import { DashShell, Pill, Field, Input, Select, Toggle, Table, Stat, Tabs, useToast } from '../ui'

/* =============================================================================
   FESTIVAL COMMITTEE DASHBOARD  (/festival-admin)
   How it differs from the temple dashboard:
   · a festival is time-bound — a countdown and a budget replace the daily pooja chart
   · offerings are limited per festival DAY, and sell out; sponsorships are the main income
   · the committee hires artists/troupes (money going out) — temples never do
   · a "day sheet" per festival day replaces the temple's daily chart (names read at the ritual)
   · settlement is fast during the festival week, then the listing is archived / rolled over
   ========================================================================== */

const items = [{ group:'Festival committee', links:[
  ['/festival-admin','Overview',CalendarCheck],
  ['/festival-admin/programme','Programme',CalendarDays],
  ['/festival-admin/offerings','Offerings',ListOrdered],
  ['/festival-admin/bookings','Day sheets',Ticket],
  ['/festival-admin/sponsors','Sponsors',Handshake],
  ['/festival-admin/artists','Artists & vendors',Music],
  ['/festival-admin/finance','Finance',Landmark],
  ['/festival-admin/page','Festival page',PenLine],
  ['/festival-admin/settings','Settings',Settings],
]}]
const Shell = ({ children }) => <DashShell role="Vendor · Festival committee" user={`${F.committee} · ${F.convenor} (Convenor)`} items={items} badge="5">{children}</DashShell>
const H = ({ t, s, right }) => <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-semibold">{t}</h1>{s&&<div className="text-sm text-brown-500">{s}</div>}</div>{right}</div>
const rs = n => `₹${Number(n).toLocaleString('en-IN')}`
const kindTone = k => ({Ritual:'warn',Cultural:'info',Procession:'gold',Seva:'ok'})[k]||'n'
const statusTone = s => /Confirmed|signed|Paid|Done/.test(s) ? 'ok' : /Needs|Awaiting|To confirm|Pledged/.test(s) ? 'warn' : 'info'

/* ---------------- OVERVIEW ---------------- */
export function FOverview() {
  const [toast,el]=useToast()
  const pct = Math.round(F.collected/F.budget*100)
  const tasks = [
    ['Assign an artist for Ottanthullal (5 Dec)','todo','/festival-admin/artists'],
    ['Confirm Kalamezhuthu Pattu team (6 Dec)','todo','/festival-admin/artists'],
    ['Collect sponsor balance — Ulliyeri Co-op Bank ₹20,000','todo','/festival-admin/sponsors'],
    ['Publish the full programme on the festival page','todo','/festival-admin/page'],
    ['Panchayat & police permission letters','todo','/festival-admin/settings'],
    ['Committee bank account verified for settlement','done','/festival-admin/finance'],
    ['Offerings & prices published','done','/festival-admin/offerings'],
  ]
  return (<Shell>{el}<H t="Festival overview" s={`${F.committee} · ${F.temple}`} right={<div className="flex gap-2"><Link to="/festival" className="btn-g"><Globe size={16}/>View public page</Link><button onClick={()=>toast('Update sent to 1,180 devotees on WhatsApp')} className="btn-p"><Megaphone size={16}/>Send update</button></div>}/>

    <div className="overflow-hidden rounded-2xl bg-temple-grad p-5 text-white md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><div className="flex flex-wrap gap-2"><Pill tone="gold">{F.code}</Pill><Pill tone="ok">{F.status}</Pill></div>
          <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">{F.name}</h2>
          <div className="ml mt-0.5 text-sm text-brown-100">{F.ml} · {F.from} – {F.to} · {F.place}</div></div>
        <div className="text-right"><div className="font-display text-4xl font-bold text-gold-300 md:text-5xl">{F.daysToGo}</div><div className="text-xs text-brown-100">days to Kodiyettam</div></div>
      </div>
      <div className="mt-5"><div className="h-2.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-gold-400" style={{width:`${pct}%`}}/></div>
        <div className="mt-1.5 flex justify-between text-xs text-brown-100"><span><b className="text-white">{rs(F.collected)}</b> collected ({pct}%)</span><span>Budget {rs(F.budget)}</span></div></div>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
      <Stat v={rs(F.collected)} l="collected so far" delta="+₹42,500 this week"/>
      <Stat v={`${rs(F.sponsorGot)} / ${rs(F.sponsorTarget)}`} l="sponsorships"/>
      <Stat v={rs(F.committed)} l="committed to vendors"/>
      <Stat v={rs(F.inHand)} l="balance in hand"/>
    </div>

    <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_340px]"><div className="space-y-5">
      <div className="card p-5"><div className="flex items-center justify-between"><h3 className="text-lg font-semibold">Programme at a glance</h3><Link to="/festival-admin/programme" className="text-sm font-semibold text-saffron-600">Edit programme</Link></div>
        <div className="mt-3 space-y-2">{F.days.map(d=>{ const ev=F.programme.filter(p=>p[0]===d)
          return (<div key={d} className="flex gap-3 rounded-xl border border-brown-100 p-3"><div className="w-16 shrink-0 text-center"><div className="font-display text-lg font-bold">{d.split(' ')[0]}</div><div className="text-[11px] text-brown-500">{d.split(' ')[1]}</div></div>
            <div className="min-w-0 flex-1 space-y-1">{ev.map(([,name,time,kind,who,st])=><div key={name} className="flex flex-wrap items-center gap-2 text-sm"><Clock size={12} className="text-brown-400"/><span className="text-brown-500">{time}</span><b className="truncate">{name}</b><Pill tone={kindTone(kind)}>{kind}</Pill>{st!=='Confirmed'&&<Pill tone={statusTone(st)}>{st}</Pill>}<span className="truncate text-xs text-brown-500">{who}</span></div>)}</div></div>) })}</div></div>

      <div className="card p-5"><div className="flex items-center justify-between"><h3 className="text-lg font-semibold">Latest bookings</h3><Link to="/festival-admin/bookings" className="text-sm font-semibold text-saffron-600">All day sheets</Link></div>
        <div className="mt-3"><Table head={['Offering','Devotee','For day','Qty','₹']} rows={F.sheet.map(([o,d,n,q,a])=>[<b>{o}</b>,`${d} · ${n}`,'3 Dec',q,rs(a)])}/></div></div>
    </div>

      <aside className="space-y-4">
        <div className="card p-5"><h3 className="font-semibold">Readiness checklist</h3><p className="text-xs text-brown-500">5 items still open</p>
          <div className="mt-3 space-y-2">{tasks.map(([t,st,h])=><Link key={t} to={h} className="flex items-start gap-2 rounded-lg p-1.5 text-sm hover:bg-brown-50">
            <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] ${st==='done'?'bg-emerald-500 text-white':'border-2 border-saffron-400'}`}>{st==='done'&&'✓'}</span>
            <span className={st==='done'?'text-brown-400 line-through':''}>{t}</span></Link>)}</div></div>
        <div className="card p-5 text-sm"><h3 className="font-semibold">Committee</h3><div className="mt-2 space-y-1 text-brown-600"><div><b className="text-brown-900">Rajeev M</b> · Convenor (owner)</div><div>Suresh P · Treasurer</div><div>Anitha R · Programme</div><div>Nishanth K · Temple secretary</div></div><Link to="/festival-admin/settings" className="btn-g mt-3 w-full !py-1.5 text-xs"><Users2 size={14}/>Manage committee</Link></div>
        <div className="card p-5"><h3 className="font-semibold">Festival QR board</h3><p className="text-xs text-brown-500">Printed for the temple gate and the pandal.</p><div className="photo mt-2 aspect-[3/4] rounded-xl"/><button onClick={()=>toast('Print file downloaded')} className="btn-g mt-2 w-full"><Download size={16}/>Download print file</button></div>
      </aside></div>
  </Shell>)
}

/* ---------------- PROGRAMME ---------------- */
export function FProgramme() {
  const [toast,el]=useToast(); const [day,setDay]=useState(0); const [add,setAdd]=useState(false)
  const list = F.programme.filter(p=>p[0]===F.days[day])
  return (<Shell>{el}<H t="Programme" s="The day-wise schedule devotees see on the festival page" right={<div className="flex gap-2"><button onClick={()=>setAdd(!add)} className="btn-s"><Plus size={16}/>Add event</button><button onClick={()=>toast('Programme published to the festival page')} className="btn-p"><Check size={16}/>Publish</button></div>}/>
    <Tabs tabs={F.days} at={day} set={setDay}/>
    {add && <div className="card mb-5 space-y-4 p-5"><h3 className="font-semibold">New event · {F.days[day]}</h3>
      <div className="grid gap-4 md:grid-cols-2"><Field label="Event name (English)"><Input placeholder="e.g. Chakyar Koothu"/></Field><Field label="Event name (Malayalam)"><Input className="input ml" placeholder="ചാക്യാർ കൂത്ത്"/></Field>
        <Field label="Start time"><Input type="time" defaultValue="19:00"/></Field><Field label="Type"><Select options={['Ritual','Cultural','Procession','Seva']}/></Field>
        <Field label="Artist / troupe / in-charge" hint="Search TempleAddress service providers or type a name"><Input placeholder="Kalamandalam …"/></Field><Field label="Duration"><Select options={['30 min','1 hour','2 hours','3 hours','All day']}/></Field>
        <Field label="Description for devotees" className="md:col-span-2"><textarea className="input" rows={2} placeholder="Shown on the festival page and in the WhatsApp update"/></Field></div>
      <div className="flex gap-2"><button onClick={()=>{setAdd(false);toast('Event added to 5 Dec')}} className="btn-p">Add to programme</button><button onClick={()=>setAdd(false)} className="btn-g">Cancel</button></div></div>}

    <div className="card p-5"><div className="flex items-center justify-between"><h3 className="font-semibold">{F.days[day]} · {list.length} events</h3><span className="text-xs text-brown-500">Drag to reorder · times are shown to devotees</span></div>
      <div className="mt-3 divide-y divide-brown-100">{list.map(([,name,time,kind,who,st])=>
        <div key={name} className="flex flex-wrap items-center gap-3 py-3"><div className="w-20 shrink-0 font-semibold">{time}</div>
          <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><b>{name}</b><Pill tone={kindTone(kind)}>{kind}</Pill></div><div className="text-sm text-brown-500">{who}</div></div>
          <Pill tone={statusTone(st)}>{st}</Pill><button className="btn-g !py-1.5 text-xs"><Pencil size={14}/>Edit</button></div>)}
        {!list.length && <p className="py-6 text-center text-sm text-brown-500">No events on this day yet.</p>}</div></div>

    <div className="card mt-5 p-5"><h3 className="font-semibold">Programme notes</h3><div className="mt-3 grid gap-4 md:grid-cols-2">
      <Field label="Announcement text (WhatsApp)" hint="Sent to devotees who booked or followed the festival"><textarea className="input" rows={3} defaultValue={'🙏 Kottur Utsavam 2026 · 3–8 December\nKodiyettam 3 Dec 6:00 AM · Aarattu 8 Dec 5:00 AM\nBook vazhipadu and sponsorships: kottur-utsavam-2026.templeaddress.com'}/></Field>
      <Field label="Printed notice (Malayalam)"><textarea className="input ml" rows={3} defaultValue={'കൊട്ടൂർ ഉത്സവം 2026 · ഡിസംബർ 3 – 8'}/></Field></div>
      <div className="mt-3 flex flex-wrap gap-2"><button onClick={()=>toast('Programme PDF downloaded')} className="btn-g"><Download size={16}/>Programme PDF</button><button onClick={()=>toast('Notice sent to 1,180 devotees')} className="btn-wa"><MessageCircle size={16}/>Send on WhatsApp</button><button className="btn-g"><Share2 size={16}/>Share link</button></div></div>
  </Shell>)
}

/* ---------------- OFFERINGS ---------------- */
export function FOfferings() {
  const [toast,el]=useToast()
  return (<Shell>{el}<H t="Offerings & sponsorship slots" s="Festival vazhipadu and sponsorships — limits apply per festival day, not per year" right={<button onClick={()=>toast('Saved — new prices apply to new bookings')} className="btn-p">Save changes</button>}/>
    <div className="mb-4 rounded-xl bg-saffron-50 p-3 text-sm text-saffron-800">Unlike a temple's daily poojas, each offering below has a <b>per-day limit across the 6 festival days</b>. When a day sells out, devotees are offered the next available day automatically.</div>
    <div className="card p-4"><Table head={['Offering','Malayalam','Price ₹','Limit / day','Sold','Available on','Bookable','']} rows={F.offerings.map(([n,ml,p,lim,sold])=>[
      <b>{n}</b>,<span className="ml">{ml}</span>,<input defaultValue={p} className="input !w-24 !py-1.5"/>,<input defaultValue={lim||''} placeholder="∞" className="input !w-20 !py-1.5"/>,
      <span><b>{sold}</b>{lim?<span className="text-xs text-brown-500"> / {lim*6}</span>:null}</span>,
      <Select options={['All 6 days','3 Dec only','Aarattu day only','Custom…']}/>,<Toggle defaultChecked/>,<button className="text-xs text-brown-500">Edit</button>])}/>
      <div className="mt-3 flex gap-2"><button className="btn-s"><Plus size={16}/>Add offering</button><button className="btn-g">Copy from last year</button></div></div>

    <div className="mt-5 grid gap-5 md:grid-cols-2">
      <div className="card p-5"><h3 className="font-semibold">Sponsorship packages</h3><p className="text-sm text-brown-500">Bigger slots sold by the committee, not booked online.</p>
        <div className="mt-3 divide-y divide-brown-100">{[['Title sponsor','Arch + stage banner, name on all publicity','₹1,00,000','1 slot · sold'],['Day sponsor','Banner for one festival day + stage mention','₹35,000','6 slots · 2 sold'],['Programme sponsor','Named before one cultural programme','₹25,000','8 slots · 1 sold']].map(([n,d,p,s])=>
          <div key={n} className="flex flex-wrap items-center gap-3 py-3"><div className="flex-1"><b>{n}</b><div className="text-xs text-brown-500">{d}</div></div><b>{p}</b><Pill tone={s.includes('sold')&&!s.includes('0 sold')?'ok':'n'}>{s}</Pill></div>)}</div>
        <Link to="/festival-admin/sponsors" className="btn-g mt-3 w-full"><Handshake size={16}/>Manage sponsors</Link></div>

      <div className="card p-5"><h3 className="font-semibold">Booking window</h3><div className="mt-3 grid gap-4">
        <Field label="Bookings open from"><Input type="date" defaultValue="2026-09-01"/></Field>
        <Field label="Bookings close" hint="Sponsorship names must be printed before this"><Select options={['1 day before each event','3 days before the festival','On the festival day itself']} defaultValue="1 day before each event"/></Field>
        <Field label="Day sheet sent to committee at"><Select options={['6:00 PM','8:00 PM','10:00 PM']} defaultValue="8:00 PM"/></Field>
        <Toggle label="Allow NRI devotees to book with international cards" defaultChecked/></div></div>
    </div>
  </Shell>)
}

/* ---------------- DAY SHEETS (bookings) ---------------- */
export function FBookings() {
  const [toast,el]=useToast(); const [tab,setTab]=useState(0); const [sent,setSent]=useState(false)
  const tabs = [...F.days,'All bookings']
  const total = F.sheet.reduce((s,r)=>s+r[4],0)
  return (<Shell>{el}<H t="Day sheets" s="The list of names read at each ritual — the festival equivalent of a temple's daily chart" right={<div className="flex gap-2"><button onClick={()=>toast('Excel downloaded')} className="btn-g"><Download size={16}/>Excel</button><button onClick={()=>{setSent(true);toast('Day sheet sent to the committee and melshanthi')}} className="btn-p"><MessageCircle size={16}/>Send day sheet</button></div>}/>
    <Tabs tabs={tabs} at={tab} set={setTab}/>
    {tab<6 ? <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Stat v={F.sheet.length} l="bookings for this day"/><Stat v={rs(total)} l="collected for this day"/><Stat v="2 of 6" l="Utsava Bali slots used"/><Stat v={sent?'Sent':'Not sent'} l="day sheet to melshanthi"/></div>
      <div className="card mt-5 p-5"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-semibold">{F.days[tab]} · names to be read</h3>{sent?<Pill tone="ok"><Check size={12}/>Sent & locked</Pill>:<Pill tone="warn">Draft — closes 8:00 PM the day before</Pill>}</div>
        <div className="mt-3"><Table head={['#','Offering','Devotee','Nakshatra','Qty','₹']} rows={F.sheet.map(([o,d,n,q,a],i)=>[i+1,o,<b>{d}</b>,n,q,rs(a)])}/></div>
        <div className="mt-4 flex flex-wrap gap-2"><button onClick={()=>toast('PDF downloaded — print for the melshanthi')} className="btn-g"><Download size={16}/>Print sheet (PDF)</button><button className="btn-wa"><MessageCircle size={16}/>Send to melshanthi</button><button className="btn-g"><Megaphone size={16}/>Announcement list</button></div>
        <p className="mt-2 text-xs text-brown-500">Sponsorship names (Annadanam, Ezhunnallippu) are grouped at the top of the printed sheet so they can be announced before the ritual begins.</p></div>
    </> : <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Stat v="308" l="bookings so far"/><Stat v={rs(F.collected)} l="collected"/><Stat v="19 / 36" l="Utsava Bali sold"/><Stat v="9 / 12" l="Annadanam days sold"/></div>
      <div className="card mt-5 p-4"><Table head={['Day','Bookings','Offerings sold','₹','Day sheet']} rows={F.days.map((d,i)=>[<b>{d}</b>,[42,63,58,47,51,47][i],['Bali 4 · Annadanam 2 · Deepam 31','Bali 6 · Annadanam 2 · Deepam 44','Bali 3 · Annadanam 1 · Deepam 39','Bali 2 · Annadanam 2 · Deepam 28','Bali 2 · Annadanam 1 · Deepam 35','Bali 2 · Annadanam 1 · Deepam 35'][i],rs([98500,142000,121000,96500,118000,108500][i]),<Pill tone={i?'n':'warn'}>{i?'Not due yet':'Closes tonight'}</Pill>])}/></div>
      <div className="card mt-5 p-5"><h3 className="font-semibold">Cancellations & refunds</h3><Table head={['Date','Devotee','Offering','₹','Reason','Status']} rows={[['9 Sept','Manoj P','Utsava Bali · 4 Dec','2,500','Moved to 6 Dec',<Pill tone="ok">Rebooked</Pill>],['7 Sept','Anonymous','Deepam','100','Duplicate payment',<Pill tone="info">Refunded</Pill>]]}/></div>
    </>}
  </Shell>)
}

/* ---------------- SPONSORS ---------------- */
export function FSponsors() {
  const [toast,el]=useToast(); const [add,setAdd]=useState(false)
  const pct = Math.round(F.sponsorGot/F.sponsorTarget*100)
  return (<Shell>{el}<H t="Sponsors" s="Committee-sold sponsorships — the largest share of festival income" right={<button onClick={()=>setAdd(!add)} className="btn-p"><Plus size={16}/>Record a sponsor</button>}/>
    <div className="card p-5"><div className="flex flex-wrap items-end justify-between gap-2"><div><h3 className="text-lg font-semibold">Sponsorship target</h3><p className="text-sm text-brown-500">{rs(F.sponsorGot)} raised of {rs(F.sponsorTarget)}</p></div><b className="font-display text-2xl">{pct}%</b></div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-brown-100"><div className="h-full rounded-full bg-saffron-500" style={{width:`${pct}%`}}/></div></div>

    {add && <div className="card mt-5 space-y-4 p-5"><h3 className="font-semibold">Record a sponsorship</h3>
      <div className="grid gap-4 md:grid-cols-2"><Field label="Sponsor name (as printed)"><Input placeholder="Malabar Gold Traders"/></Field><Field label="Package"><Select options={['Title sponsor ₹1,00,000','Day sponsor ₹35,000','Programme sponsor ₹25,000','Annadanam day ₹5,000','Custom amount']}/></Field>
        <Field label="Amount ₹"><Input type="number" placeholder="35000"/></Field><Field label="Payment"><Select options={['Paid in full','Advance received','Pledged — not yet paid']}/></Field>
        <Field label="Method"><Select options={['Bank transfer','Cheque','Cash to treasurer','Online (TempleAddress)']}/></Field><Field label="Reference / UTR"><Input placeholder="FDRLN…"/></Field>
        <Field label="Contact person & phone"><Input placeholder="Name · +91"/></Field><Field label="GSTIN (for invoice)"><Input placeholder="32AAACR1234A1Z5"/></Field>
        <Field label="Where the name appears" className="md:col-span-2"><div className="flex flex-wrap gap-2">{['Festival page','Arch / banner','Stage announcement','Receipts','Printed notice'].map((x,i)=><button key={x} className={`rounded-full px-3 py-1.5 text-sm ${i<3?'bg-brown-900 text-white':'border border-brown-200 bg-white'}`}>{x}</button>)}</div></Field></div>
      <div className="flex gap-2"><button onClick={()=>{setAdd(false);toast('Sponsor recorded — GST invoice queued')}} className="btn-p">Save sponsor</button><button onClick={()=>setAdd(false)} className="btn-g">Cancel</button></div></div>}

    <div className="card mt-5 p-4"><Table head={['Sponsor','Package','₹','Status','Note','']} rows={F.sponsors.map(([n,p,a,st,note])=>[<b>{n}</b>,p,rs(a),<Pill tone={statusTone(st)}>{st}</Pill>,<span className="text-xs text-brown-500">{note}</span>,<button className="text-xs font-semibold text-saffron-600">Invoice</button>])}/></div>

    <div className="mt-5 grid gap-5 md:grid-cols-2">
      <div className="card p-5"><h3 className="font-semibold">Branding preview</h3><p className="text-sm text-brown-500">How sponsor names appear to devotees.</p>
        <div className="mt-3 space-y-2">{[['Festival page header','Malabar Gold Traders'],['Every booking receipt','Annadanam sponsored by Resurge India Foundation'],['Day 1 banner & arch','Ulliyeri Service Co-op Bank']].map(([w,n])=>
          <div key={w} className="flex items-center gap-3 rounded-xl bg-gold-300/25 p-3 text-sm"><div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-[10px] font-bold text-emerald-700">LOGO</div><div><div className="text-xs text-brown-500">{w}</div><b>{n}</b></div></div>)}</div></div>
      <div className="card p-5"><h3 className="font-semibold">Follow-ups</h3><Table head={['Sponsor','Owed ₹','Due','Action']} rows={[['Ulliyeri Service Co-op Bank','20,000','1 Dec',<button className="text-xs font-semibold text-saffron-600">Remind</button>],['NRI Forum · Dubai','25,000','Not fixed',<button className="text-xs font-semibold text-saffron-600">Remind</button>]]}/>
        <p className="mt-3 text-xs text-brown-500">Reminders go on WhatsApp from the committee's number with the pending amount and the festival bank details.</p></div>
    </div>
  </Shell>)
}

/* ---------------- ARTISTS & VENDORS ---------------- */
export function FArtists() {
  const [toast,el]=useToast()
  const totalFee = F.artists.reduce((s,a)=>s+a[3],0), totalAdv = F.artists.reduce((s,a)=>s+a[4],0)
  return (<Shell>{el}<H t="Artists & vendors" s="Money going out — troupes, elephants, sound and stage that the committee hires" right={<Link to="/services" className="btn-p"><Sparkles size={16}/>Find artists on TempleAddress</Link>}/>
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Stat v={rs(totalFee)} l="total artist fees"/><Stat v={rs(totalAdv)} l="advance paid"/><Stat v={rs(totalFee-totalAdv)} l="balance on festival days"/><Stat v="2" l="still to confirm"/></div>
    <div className="card mt-5 p-4"><Table head={['Troupe / vendor','Programme','When','Fee ₹','Advance ₹','Balance ₹','Status','']} rows={F.artists.map(([n,p,w,fee,adv,st])=>[
      <b>{n}</b>,p,w,rs(fee),rs(adv),<b>{rs(fee-adv)}</b>,<Pill tone={statusTone(st)}>{st}</Pill>,<button className="text-xs font-semibold text-saffron-600">Agreement</button>])}/>
      <div className="mt-3 flex gap-2"><button className="btn-s"><Plus size={16}/>Add artist / vendor</button><button onClick={()=>toast('Payment schedule downloaded')} className="btn-g"><Download size={16}/>Payment schedule</button></div></div>

    <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_340px]">
      <div className="card p-5"><h3 className="font-semibold">Unassigned programmes</h3><p className="text-sm text-brown-500">Events on the schedule with no troupe booked yet.</p>
        <div className="mt-3 divide-y divide-brown-100">{[['Ottanthullal','5 Dec · 7:00 PM','₹8,000 – ₹12,000 typical'],['Kalamezhuthu Pattu','6 Dec · 8:00 PM','Kurup team asked — awaiting reply']].map(([n,w,note])=>
          <div key={n} className="flex flex-wrap items-center gap-3 py-3"><div className="flex-1"><b>{n}</b><div className="text-xs text-brown-500">{w} · {note}</div></div><Link to="/services" className="btn-g !py-1.5 text-xs">Find artist</Link><button className="btn-s !py-1.5 text-xs">Add manually</button></div>)}</div></div>
      <div className="card p-5 text-sm"><h3 className="font-semibold">How hiring works</h3><p className="mt-2 text-brown-600">Artists listed on TempleAddress can be booked from here — their fee, advance and date lock into your schedule and the balance appears in Finance. Troupes you hire privately can be added manually; TempleAddress does not handle that money.</p>
        <div className="mt-3 rounded-xl bg-blue-50 p-3 text-xs text-blue-900">Advances paid through TempleAddress are deducted from your festival collection before settlement — no separate transfer needed.</div></div>
    </div>
  </Shell>)
}

/* ---------------- FINANCE ---------------- */
export function FFinance() {
  const [toast,el]=useToast(); const [tab,setTab]=useState(0)
  const income = [['Offerings & vazhipadu (online)',289500],['Sponsorships',395000],['Donations to festival fund',0]]
  const totalExp = F.expenses.reduce((s,e)=>s+e[2],0), paidExp = F.expenses.reduce((s,e)=>s+e[3],0)
  return (<Shell>{el}<H t="Finance" s="Budget, collections, expenses and settlement to the committee account" right={<button onClick={()=>toast('Statement downloaded')} className="btn-g"><Download size={16}/>Statement (Excel)</button>}/>
    <Tabs tabs={['Position','Expenses','Settlement']} at={tab} set={setTab}/>
    {tab===0 && <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Stat v={rs(F.budget)} l="budget"/><Stat v={rs(F.collected)} l="collected" delta={`${Math.round(F.collected/F.budget*100)}% of budget`}/><Stat v={rs(totalExp)} l="expenses committed"/><Stat v={rs(F.collected-paidExp)} l="balance in hand"/></div>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="card p-5"><h3 className="font-semibold">Income</h3><Table head={['Source','₹']} rows={income.map(([s,a])=>[s,rs(a)])}/>
          <div className="mt-3 flex justify-between border-t border-brown-100 pt-3 font-bold"><span>Total</span><span>{rs(F.collected)}</span></div></div>
        <div className="card p-5"><h3 className="font-semibold">Gap to budget</h3><p className="text-sm text-brown-500">{rs(F.budget-F.collected)} still to raise in {F.daysToGo} days.</p>
          <div className="mt-3 space-y-2 text-sm">{[['Unsold day sponsorships','₹1,40,000'],['Unsold Utsava Bali slots','₹42,500'],['Annadanam days left','₹15,000'],['Expected walk-in offerings','₹2,00,000']].map(([n,a])=>
            <div key={n} className="flex justify-between rounded-lg bg-brown-50 px-3 py-2"><span>{n}</span><b>{a}</b></div>)}</div></div>
      </div></>}
    {tab===1 && <>
      <div className="card p-4"><Table head={['Head','Category','Budgeted ₹','Paid ₹','Balance ₹','Note']} rows={F.expenses.map(([h,c,amt,paid,note])=>[<b>{h}</b>,c,rs(amt),rs(paid),<b>{rs(amt-paid)}</b>,<span className="text-xs text-brown-500">{note}</span>])}/>
        <div className="mt-3 flex gap-2"><button className="btn-s"><Plus size={16}/>Add expense</button><button className="btn-g"><Upload size={16}/>Upload bill</button></div></div>
      <div className="card mt-5 p-5 text-sm"><b>Who can enter expenses</b><p className="mt-1 text-brown-600">Only the Convenor and the Treasurer can add or approve expenses. Every entry keeps an audit trail with the uploaded bill, and the committee can download the full register after the festival for the general body meeting.</p></div></>}
    {tab===2 && <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Stat v={rs(118400)} l="payable now"/><Stat v="Mon 15 Sept" l="next settlement"/><Stat v={rs(171100)} l="settled so far"/><Stat v="T+1" l="during festival week"/></div>
      <div className="card mt-5 p-5"><div className="flex items-center gap-2"><Landmark size={18}/><b>Committee bank account</b><Pill tone="ok">Penny-drop verified</Pill></div>
        <div className="mt-2 text-sm">Kottur Utsava Committee · Federal Bank ····7781 · IFSC FDRL0001234</div>
        <p className="mt-2 text-xs text-brown-500">Online bookings and sponsorships collected by TempleAddress are settled to this account. Artist advances paid through TempleAddress are deducted before settlement.</p></div>
      <div className="card mt-5 p-5"><div className="flex items-center justify-between gap-3"><div><h3 className="font-semibold">Express settlement during festival week</h3><p className="text-sm text-brown-500">Money collected is settled the next working day from 1–8 December, so the committee has cash for daily expenses. Outside festival week the normal weekly cycle applies.</p></div><Toggle label="On" defaultChecked/></div></div>
      <div className="card mt-5 p-5"><h3 className="font-semibold">Settlement history</h3><Table head={['Period','Bookings','Collected ₹','Advances deducted ₹','Net ₹','Paid on','UTR','Status']} rows={[
        ['1–7 Sept','63','89,400','47,500','41,900','8 Sept','FDRLN26251000488',<Pill tone="ok">Paid</Pill>],
        ['25–31 Aug','58','76,200','0','76,200','1 Sept','FDRLN26244000301',<Pill tone="ok">Paid</Pill>],
        ['18–24 Aug','41','53,000','0','53,000','25 Aug','FDRLN26237000194',<Pill tone="ok">Paid</Pill>]]}/></div></>}
  </Shell>)
}

/* ---------------- FESTIVAL PAGE EDITOR ---------------- */
export function FPage() {
  const [toast,el]=useToast(); const [tab,setTab]=useState(0)
  const done = [['Festival basics',1],['About & significance',1],['Programme',1],['Offerings',1],['Travel & parking',0],['Poster',1],['Photos',0],['Contacts',1]]
  return (<Shell>{el}<H t="Festival page" s="kottur-utsavam-2026.templeaddress.com · a micro-site that stays up until the festival ends" right={<div className="flex gap-2"><Link to="/festival" className="btn-g"><Globe size={16}/>Preview</Link><button onClick={()=>toast('Published')} className="btn-p">Publish</button></div>}/>
    <div className="mb-4 flex flex-wrap gap-2">{done.map(([n,ok])=><Pill key={n} tone={ok?'ok':'warn'}>{ok?<Check size={12}/>:'○'}{n}</Pill>)}</div>
    <Tabs tabs={['Basics','About','Travel & facilities','Poster & photos','Contacts']} at={tab} set={setTab}/>
    {tab===0 && <div className="card grid gap-4 p-5 md:grid-cols-2"><Field label="Festival name (English)"><Input defaultValue={F.name}/></Field><Field label="Festival name (Malayalam)"><Input className="input ml" defaultValue={F.ml}/></Field>
      <Field label="Temple"><Input defaultValue={F.temple}/></Field><Field label="Managed by"><Input defaultValue={F.committee}/></Field>
      <Field label="Start date"><Input type="date" defaultValue="2026-12-03"/></Field><Field label="End date"><Input type="date" defaultValue="2026-12-08"/></Field>
      <Field label="Main ritual days" hint="Highlighted on the page" className="md:col-span-2"><Input defaultValue="Kodiyettam 3 Dec · Aarattu & Pallivetta 8 Dec"/></Field></div>}
    {tab===1 && <div className="card space-y-4 p-5"><Field label="About this festival" hint="Why devotees come — 3 to 5 sentences"><textarea className="input" rows={4} defaultValue="The annual utsavam of Kottur Sree Mahavishnu Temple runs for six days in December, beginning with Kodiyettam and ending with Aarattu at the temple pond. Families of the eight illams return every year, and the Thayambaka on the fourth night draws crowds from across Malabar."/></Field>
      <Field label="Significance / history"><textarea className="input" rows={3} defaultValue="Held in Vrischikam since the temple's renovation in 1932."/></Field>
      <Field label="What's new this year"><textarea className="input" rows={2} defaultValue="Annadanam on all six days, sponsored by devotees. Online booking for Utsava Bali for the first time."/></Field>
      <div className="flex items-center gap-2 text-xs text-brown-500"><Globe size={14}/>Malayalam versions are auto-drafted by the assistant; review before publishing.</div></div>}
    {tab===2 && <div className="card space-y-4 p-5"><Field label="How to reach"><textarea className="input" rows={3} defaultValue="Bus to Naduvannur, auto to Ulliyeri (4 km). Nearest railway station Kozhikode (28 km)."/></Field>
      <Field label="Parking"><textarea className="input" rows={2} defaultValue="Two-wheelers at the temple ground; cars at the UP school ground, 300 m away. Free."/></Field>
      <div className="grid gap-4 md:grid-cols-2"><Field label="Facilities"><div className="flex flex-wrap gap-2">{['Drinking water','Toilets','First aid','Prasadam counter','Wheelchair access','Cloak room'].map((x,i)=><button key={x} className={`rounded-full px-3 py-1.5 text-sm ${i<4?'bg-brown-900 text-white':'border border-brown-200 bg-white'}`}>{x}</button>)}</div></Field>
        <Field label="Crowd advisory"><textarea className="input" rows={3} defaultValue="Heaviest crowd on 4 Dec (Thayambaka night) and 8 Dec morning."/></Field></div></div>}
    {tab===3 && <div className="card p-5"><h3 className="font-semibold">Festival poster</h3><div className="mt-3 grid gap-4 md:grid-cols-[220px_1fr]"><div className="photo aspect-[3/4] rounded-xl"/><div><p className="text-sm text-brown-500">The poster is used on the festival page, on WhatsApp updates and on the QR board. Upload the printed design, or let the assistant generate one from your programme.</p>
      <div className="mt-3 flex flex-wrap gap-2"><button className="btn-s"><Upload size={16}/>Upload poster</button><button onClick={()=>toast('Draft poster generated from the programme')} className="btn-g"><Sparkles size={16}/>Generate from programme</button></div></div></div>
      <h3 className="mt-6 font-semibold">Photos</h3><p className="text-sm text-brown-500">Last year's festival photos help devotees decide. Add this year's during the festival.</p>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">{[1,2,3].map(i=><div key={i} className="photo aspect-square rounded-xl"/>)}<button className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-brown-200 text-sm text-brown-500">+ Upload</button></div></div>}
    {tab===4 && <div className="card p-5"><h3 className="font-semibold">Shown on the festival page</h3><Table head={['Name','Role','Phone','Shown publicly','']} rows={[
      ['Rajeev M','Convenor','+91 94… 771',<Toggle defaultChecked/>,'Edit'],
      ['Suresh P','Treasurer','+91 98… 220',<Toggle/>,'Edit'],
      ['Anitha R','Programme','+91 90… 118',<Toggle defaultChecked/>,'Edit'],
      ['Temple office','Enquiries','+91 90… 422',<Toggle defaultChecked/>,'Edit']]}/>
      <button className="btn-s mt-3"><Plus size={16}/>Add contact</button></div>}
  </Shell>)
}

/* ---------------- SETTINGS ---------------- */
export function FSettings() {
  const [toast,el]=useToast(); const [tab,setTab]=useState(0); const [mode,setMode]=useState('ta')
  return (<Shell>{el}<H t="Settings"/><Tabs tabs={['Festival & status','Committee','Payments','Permissions','Next year']} at={tab} set={setTab}/>
    {tab===0 && <div className="card space-y-4 p-5"><div className="grid gap-4 md:grid-cols-2">
      <Field label="Listing status" hint="Controls what devotees can do on the festival page"><Select options={['Draft — not visible','Announced — no booking yet','Bookings open','Festival running','Closed — archived']} defaultValue="Bookings open"/></Field>
      <Field label="Festival type"><Select options={['Annual utsavam','Thira / Theyyam','Pooram','Navarathri','Special one-time event']}/></Field>
      <Field label="Expected daily footfall"><Select options={['Under 500','500 – 2,000','2,000 – 10,000','Above 10,000']} defaultValue="2,000 – 10,000"/></Field>
      <Field label="Language of announcements"><Select options={['Malayalam + English','Malayalam only']}/></Field></div>
      <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900">A festival listing is <b>time-bound</b>. Seven days after the closing date it moves to <b>archived</b> automatically — the page stays online for reference, bookings close, and the final settlement runs.</div>
      <button onClick={()=>toast('Saved')} className="btn-p">Save</button></div>}
    {tab===1 && <div className="card p-5"><h3 className="font-semibold">Committee members & access</h3><p className="text-sm text-brown-500">Festival committees change every year — give access by role, not by phone number.</p>
      <div className="mt-3"><Table head={['Name','WhatsApp','Role','Can do','']} rows={[
        ['Rajeev M','+91 94… 771','Convenor (owner)','Everything','—'],
        ['Suresh P','+91 98… 220','Treasurer','Finance, expenses, settlement','Remove'],
        ['Anitha R','+91 90… 118','Programme','Programme, artists, page','Remove'],
        ['Nishanth K','+91 90… 422','Temple secretary','View only + day sheets','Remove']]}/></div>
      <button className="btn-s mt-3"><Plus size={16}/>Add member</button>
      <div className="mt-4 rounded-xl bg-saffron-50 p-3 text-sm text-saffron-800">The temple's own listing and this festival listing are separate. The temple secretary sees the day sheets here but cannot change the temple's poojas from this dashboard, and vice versa.</div></div>}
    {tab===2 && <div className="space-y-5">
      <div className="card p-5"><h3 className="font-semibold">How the committee receives money</h3>
        <div className="mt-3 grid gap-3 md:grid-cols-3">{[['ta','Through TempleAddress','Razorpay / PayU / Stripe collect; settled to the committee account'],['own','Committee\'s own gateway','Settles directly; TempleAddress shows no settlement'],['manual','No gateway — bank only','TempleAddress collects; accountant pays by NEFT']].map(([k,h,p])=>
          <button key={k} onClick={()=>setMode(k)} className={`rounded-2xl border p-4 text-left ${mode===k?'border-saffron-500 bg-saffron-50':'border-brown-200 bg-white'}`}><b className="text-sm">{h}</b><div className="mt-1 text-xs text-brown-500">{p}</div></button>)}</div></div>
      <div className="card grid gap-4 p-5 md:grid-cols-2"><h3 className="font-semibold md:col-span-2">Settlement account</h3>
        <Field label="Account holder" hint="Must match the committee's registration"><Input defaultValue="Kottur Utsava Committee"/></Field><Field label="Account number"><Input defaultValue="XXXXXXXX7781"/></Field>
        <Field label="IFSC"><Input defaultValue="FDRL0001234"/></Field><Field label="UPI (optional)"><Input defaultValue="kotturutsavam@fbl"/></Field>
        <Field label="Committee PAN" hint="Needed for sponsorship invoices above ₹50,000"><Input defaultValue="AAATK9912F"/></Field><Field label="GSTIN (if registered)"><Input placeholder="Optional"/></Field></div>
      <div className="card p-5"><h3 className="font-semibold">Convenience fee</h3><div className="mt-3 grid gap-4 md:grid-cols-2"><Field label="Fee on festival bookings"><Select options={['Inherit platform default (off)','Off','Percentage','Fixed amount']}/></Field><Field label="Who pays"><Select options={['Devotee (added on top)','Committee (deducted from settlement)']}/></Field></div>
        <p className="mt-2 text-xs text-brown-500">Sponsorships recorded manually by the committee carry no platform fee.</p></div>
      <button onClick={()=>toast('Payment settings saved')} className="btn-p">Save</button></div>}
    {tab===3 && <div className="card space-y-4 p-5"><h3 className="font-semibold">Permissions & compliance</h3><p className="text-sm text-brown-500">Large festivals need local clearances. Upload them here — staff check before the listing goes live for high-footfall events.</p>
      <div className="grid gap-4 md:grid-cols-2">{[['Panchayat / municipality permission','Required above 2,000 footfall','ok'],['Police permission (crowd & traffic)','Required for processions','ok'],['Fire & safety clearance','Required for fireworks / pandal','warn'],['Fireworks licence','Only if vedikettu is planned','n'],['Elephant parade permit','Forest dept. — per elephant','warn'],['Loudspeaker permission','Time limits apply after 10 PM','ok']].map(([n,note,tone])=>
        <div key={n} className="rounded-2xl border border-brown-100 p-4"><div className="flex items-start justify-between gap-2"><div><b className="text-sm">{n}</b><div className="text-xs text-brown-500">{note}</div></div><Pill tone={tone}>{tone==='ok'?'Uploaded':tone==='warn'?'Pending':'N/A'}</Pill></div><Input type="file" className="mt-2"/></div>)}</div>
      <button onClick={()=>toast('Documents saved')} className="btn-p">Save</button></div>}
    {tab===4 && <div className="space-y-5"><div className="card p-5"><div className="flex items-center gap-2"><ArrowRightLeft size={18}/><h3 className="font-semibold">Roll over to next year</h3></div>
      <p className="mt-1 text-sm text-brown-500">Most committees keep the same programme shape year after year. Copy this festival into 2027 with new dates — bookings, sponsors and finance start empty.</p>
      <div className="mt-3 grid gap-4 md:grid-cols-2"><Field label="Next year's start date"><Input type="date" defaultValue="2027-11-22"/></Field><Field label="Copy"><Select options={['Programme + offerings + page content','Offerings only','Page content only']}/></Field></div>
      <button onClick={()=>toast('Kottur Utsavam 2027 created as a draft')} className="btn-dk mt-3">Create 2027 draft</button></div>
      <div className="card p-5"><div className="flex items-center gap-2"><Crown size={18} className="text-gold-500"/><h3 className="font-semibold">Hand over to the next committee</h3></div>
        <p className="mt-1 text-sm text-brown-500">When the general body elects a new convenor, transfer ownership. The new convenor accepts by OTP; the old one keeps view access to past festivals.</p>
        <div className="mt-3 grid gap-4 md:grid-cols-2"><Field label="New convenor's WhatsApp"><Input placeholder="+91"/></Field><Field label="Reason"><Select options={['Annual committee election','Convenor stepped down','Correction']}/></Field></div>
        <button onClick={()=>toast('Handover request sent — new convenor must accept by OTP')} className="btn-g mt-3"><ShieldCheck size={16}/>Send handover request</button></div>
      <div className="card p-5"><h3 className="font-semibold">Past festivals</h3><Table head={['Festival','Dates','Bookings','Collected ₹','Status']} rows={[
        ['Kottur Utsavam 2025','2–7 Dec 2025','268','5,92,000',<Pill>Archived</Pill>],
        ['Ashtami Rohini 2026','14 Sept 2026','96','1,24,500',<Pill>Archived</Pill>]]}/></div></div>}
  </Shell>)
}
