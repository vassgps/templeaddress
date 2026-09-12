import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck, CalendarDays, ListOrdered, Ticket, Download, MessageCircle, Check, Plus, Megaphone, Clock, Users2, Share2, Upload, Globe, Pencil, ShieldCheck, Handshake, Sparkles, Zap, X, Power, Image as ImageIcon, Phone } from 'lucide-react'
import { festival as F, poojaCategories, bookingTypeOptions } from '../data'
import { DashShell, Pill, Field, Input, Select, Toggle, Table, Stat, Tabs, useToast } from '../ui'

/* =============================================================================
   FESTIVAL COMMITTEE DASHBOARD  (/festival-admin)
   Kept deliberately simple for this MVP — no ERP-style finance/accounting screens.
   How it differs from the temple dashboard:
   · a festival is time-bound — a countdown replaces the daily pooja chart
   · offerings use the same "pooja item" model as a temple (basic + advanced + Live booking),
     but limits apply per festival DAY, not per calendar day
   · a "day sheet" per festival day replaces the temple's daily chart (names read at the ritual)
   · sponsorship also happens straight from the public festival page — no login needed there
   ========================================================================== */

const items = [{ group:'Festival committee', links:[
  ['/festival-admin','Overview',CalendarCheck],
  ['/festival-admin/programme','Programme',CalendarDays],
  ['/festival-admin/offerings','Offerings',ListOrdered],
  ['/festival-admin/bookings','Day sheets',Ticket],
  ['/festival-admin/sponsors','Sponsors',Handshake],
  ['/festival-admin/profile','Festival profile',Globe],
  ['/festival-admin/settings','Settings',ShieldCheck],
]}]
const Shell = ({ children }) => <DashShell role="Vendor · Festival committee" user={`${F.code} · ${F.committee} · ${F.convenor} (Convenor)`} items={items} badge="5">{children}</DashShell>
const H = ({ t, s, right }) => <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-semibold">{t}</h1>{s&&<div className="text-sm text-brown-500">{s}</div>}</div>{right}</div>
const rs = n => `₹${Number(n).toLocaleString('en-IN')}`
const kindTone = k => ({Ritual:'warn',Cultural:'info',Procession:'gold',Seva:'ok'})[k]||'n'
const statusTone = s => /Confirmed|signed|Paid|Done/.test(s) ? 'ok' : /Needs|Awaiting|To confirm|Pledged/.test(s) ? 'warn' : 'info'

/* ---------------- OVERVIEW (simple) ---------------- */
export function FOverview() {
  const [toast,el]=useToast()
  const totalOffered = F.offerings.reduce((s,o)=>s+o.sold,0)
  const tasks = [
    ['Confirm the still-unconfirmed programme items','todo','/festival-admin/programme'],
    ['Collect sponsor balance — Ulliyeri Co-op Bank ₹20,000','todo','/festival-admin/sponsors'],
    ['Complete the festival profile (gallery & contacts)','todo','/festival-admin/profile'],
    ['Upload KYC agreement for staff verification','todo','/festival-admin/settings'],
    ['Offerings & prices published','done','/festival-admin/offerings'],
  ]
  return (<Shell>{el}<H t="Festival overview" s={`Listing ID ${F.code} · ${F.committee} · ${F.temple}`} right={<div className="flex gap-2"><Link to="/festival" className="btn-g"><Globe size={16}/>View public page</Link><button onClick={()=>toast('Update sent to 1,180 devotees on WhatsApp')} className="btn-p"><Megaphone size={16}/>Send update</button></div>}/>

    <div className="overflow-hidden rounded-2xl bg-temple-grad p-5 text-white md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div><div className="flex flex-wrap gap-2"><Pill tone="gold">{F.code}</Pill><Pill tone="ok">{F.status}</Pill></div>
          <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">{F.name}</h2>
          <div className="ml mt-0.5 text-sm text-brown-100">{F.ml} · {F.from} – {F.to} · {F.place}</div></div>
        <div className="text-right"><div className="font-display text-4xl font-bold text-gold-300 md:text-5xl">{F.daysToGo}</div><div className="text-xs text-brown-100">days to Kodiyettam</div></div>
      </div>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
      <Stat v={totalOffered} l="offerings booked so far"/>
      <Stat v={`${rs(F.sponsorGot)} / ${rs(F.sponsorTarget)}`} l="sponsorship raised"/>
      <Stat v={F.programme.length} l="programme events"/>
      <Stat v={F.offerings.filter(o=>o.live).length} l="live-bookable offerings"/>
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
        <div className="card p-5"><h3 className="font-semibold">To do</h3>
          <div className="mt-3 space-y-2">{tasks.map(([t,st,h])=><Link key={t} to={h} className="flex items-start gap-2 rounded-lg p-1.5 text-sm hover:bg-brown-50">
            <span className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] ${st==='done'?'bg-emerald-500 text-white':'border-2 border-saffron-400'}`}>{st==='done'&&'✓'}</span>
            <span className={st==='done'?'text-brown-400 line-through':''}>{t}</span></Link>)}</div></div>
        <div className="card p-5 text-sm"><h3 className="font-semibold">Committee</h3><div className="mt-2 space-y-1 text-brown-600"><div><b className="text-brown-900">Rajeev M</b> · Convenor (owner)</div><div>Suresh P · Treasurer</div><div>Anitha R · Programme</div><div>Nishanth K · Temple secretary</div></div><Link to="/festival-admin/settings" className="btn-g mt-3 w-full !py-1.5 text-xs"><Users2 size={14}/>Manage committee</Link></div>
        <div className="card p-5"><h3 className="font-semibold">Festival QR board</h3><p className="text-xs text-brown-500">Printed for the temple gate and the pandal.</p><div className="photo mt-2 aspect-[3/4] rounded-xl"/><button onClick={()=>toast('Print file downloaded')} className="btn-g mt-2 w-full"><Download size={16}/>Download print file</button></div>
      </aside></div>
  </Shell>)
}

/* ---------------- PROGRAMME (program list) ---------------- */
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
      <div className="flex gap-2"><button onClick={()=>{setAdd(false);toast('Event added to '+F.days[day])}} className="btn-p">Add to programme</button><button onClick={()=>setAdd(false)} className="btn-g">Cancel</button></div></div>}

    <div className="card p-5"><div className="flex items-center justify-between"><h3 className="font-semibold">{F.days[day]} · {list.length} events</h3><span className="text-xs text-brown-500">Times are shown to devotees</span></div>
      <div className="mt-3 divide-y divide-brown-100">{list.map(([,name,time,kind,who,st])=>
        <div key={name} className="flex flex-wrap items-center gap-3 py-3"><div className="w-20 shrink-0 font-semibold">{time}</div>
          <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><b>{name}</b><Pill tone={kindTone(kind)}>{kind}</Pill></div><div className="text-sm text-brown-500">{who}</div></div>
          <Pill tone={statusTone(st)}>{st}</Pill><button className="btn-g !py-1.5 text-xs"><Pencil size={14}/>Edit</button></div>)}
        {!list.length && <p className="py-6 text-center text-sm text-brown-500">No events on this day yet.</p>}</div></div>

    <div className="card mt-5 p-5"><h3 className="font-semibold">Send a programme update</h3><div className="mt-3 grid gap-4 md:grid-cols-2">
      <Field label="WhatsApp announcement" hint="Sent to devotees who booked or followed the festival"><textarea className="input" rows={3} defaultValue={'🙏 Kottur Utsavam 2026 · 3–8 December\nKodiyettam 3 Dec 6:00 AM · Aarattu 8 Dec 5:00 AM\nBook offerings and sponsorships: kottur-utsavam-2026.templeaddress.com'}/></Field>
      <Field label="Printed notice (Malayalam)"><textarea className="input ml" rows={3} defaultValue={'കൊട്ടൂർ ഉത്സവം 2026 · ഡിസംബർ 3 – 8'}/></Field></div>
      <div className="mt-3 flex flex-wrap gap-2"><button onClick={()=>toast('Programme PDF downloaded')} className="btn-g"><Download size={16}/>Programme PDF</button><button onClick={()=>toast('Notice sent to 1,180 devotees')} className="btn-wa"><MessageCircle size={16}/>Send on WhatsApp</button><button className="btn-g"><Share2 size={16}/>Share link</button></div></div>
  </Shell>)
}

/* ---------------- OFFERINGS (bookable) — individual pooja item model ---------------- */
const blankOffering = () => ({ code:'', name:'', ml:'', category:poojaCategories[poojaCategories.length-1], price:'', dailyLimit:0, sold:0,
  bookingType:bookingTypeOptions[2], live:false, bookable:true, purpose:'', startTime:'', endTime:'', minBookingTime:'Same day, before booking closes', deity:'' })

export function FOfferings() {
  const [toast,el]=useToast(); const [list,setList]=useState(F.offerings)
  const [editing,setEditing]=useState(null); const [draft,setDraft]=useState(null)
  const setField=(k,v)=>setDraft(d=>({...d,[k]:v}))
  const openEdit = i => { setEditing(i); setDraft(i==='new'?{...blankOffering(),code:`${F.code}-O${list.length+1}`}:{...list[i]}) }
  const save = () => { if(!draft.name.trim()||!draft.code.trim()){toast('Name and code are required');return}
    if(editing==='new') setList(l=>[...l,draft]); else setList(l=>l.map((o,i)=>i===editing?draft:o))
    toast(editing==='new'?`${draft.name} added`:`${draft.name} updated`); setEditing(null) }
  const toggleField=(i,k)=>setList(l=>l.map((o,j)=>j===i?{...o,[k]:!o[k]}:o))
  const remove = i => { const name=list[i].name; setList(l=>l.filter((_,j)=>j!==i)); toast(`${name} removed`) }

  return (<Shell>{el}<H t="Offerings" s="Bookable offerings & sponsorships — the same pooja-item details as a temple, with a per-festival-day limit" right={<button onClick={()=>openEdit('new')} className="btn-s"><Plus size={16}/>Add offering</button>}/>
    <div className="mb-4 rounded-xl bg-saffron-50 p-3 text-sm text-saffron-800">Each offering's daily limit applies <b>per festival day</b> across all {F.days.length} days, not per calendar year. Devotees on the public page book against a specific festival date.</div>

    <div className="card p-4"><Table head={['Code','Offering','Category','Price ₹','Limit / day','Sold','Live','Bookable','']} rows={list.map((o,i)=>[
      <span className="text-xs text-brown-500">{o.code}</span>,
      <div><b>{o.name}</b><div className="ml text-xs text-brown-500">{o.ml}</div></div>,
      <Pill tone="n">{o.category}</Pill>,
      <b>₹{o.price}</b>,
      o.dailyLimit?`${o.dailyLimit}/day`:'∞',
      <b>{o.sold}</b>,
      <Toggle defaultChecked={o.live} onChange={()=>{toggleField(i,'live');toast(o.live?`${o.name}: live booking off`:`${o.name}: bookable instantly, any time`)}}/>,
      <Toggle defaultChecked={o.bookable} onChange={()=>toggleField(i,'bookable')}/>,
      <div className="flex gap-2"><button onClick={()=>openEdit(i)} className="text-xs font-semibold text-saffron-600"><Pencil size={12} className="mr-0.5 inline"/>Edit</button><button onClick={()=>remove(i)} className="text-xs text-red-600">Remove</button></div>,
    ])}/></div>

    {editing!==null && draft && <div className="card mt-5 space-y-6 p-5">
      <div className="flex items-center justify-between"><h3 className="text-lg font-semibold">{editing==='new'?'Add an offering':`Edit · ${list[editing].name}`}</h3><button onClick={()=>setEditing(null)} className="text-brown-400 hover:text-brown-700"><X size={18}/></button></div>
      <div><h4 className="text-xs font-bold uppercase tracking-wide text-brown-500">Basic details</h4>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <Field label="Name (English)"><Input value={draft.name} onChange={e=>setField('name',e.target.value)}/></Field>
          <Field label="Name (Malayalam)"><Input className="input ml" value={draft.ml} onChange={e=>setField('ml',e.target.value)}/></Field>
          <Field label="Code" hint="Unique per listing"><Input value={draft.code} onChange={e=>setField('code',e.target.value)}/></Field>
          <Field label="Category"><Select options={poojaCategories} value={draft.category} onChange={e=>setField('category',e.target.value)}/></Field>
          <Field label="Price ₹"><Input type="number" value={draft.price} onChange={e=>setField('price',+e.target.value)}/></Field>
          <Field label="Booking type"><Select options={bookingTypeOptions} value={draft.bookingType} onChange={e=>setField('bookingType',e.target.value)}/></Field>
        </div>
        <div className="mt-4 flex items-start justify-between gap-3 rounded-xl bg-emerald-50 p-3"><div><div className="flex items-center gap-1.5 text-sm font-semibold"><Zap size={14} className="text-emerald-600"/>Enable Live Booking</div><p className="mt-1 text-xs text-emerald-800">Bookable instantly any time, even after that day's sheet is sent. The committee gets an email/SMS/WhatsApp notification immediately; it's picked up in the next day sheet.</p></div><Toggle defaultChecked={draft.live} onChange={v=>setField('live',v)}/></div></div>
      <div><h4 className="text-xs font-bold uppercase tracking-wide text-brown-500">Advanced details</h4>
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <Field label="Purpose" className="md:col-span-2"><textarea className="input" rows={2} value={draft.purpose} onChange={e=>setField('purpose',e.target.value)}/></Field>
          <Field label="Start time"><Input placeholder="6:00 AM" value={draft.startTime} onChange={e=>setField('startTime',e.target.value)}/></Field>
          <Field label="End time"><Input placeholder="6:30 AM" value={draft.endTime} onChange={e=>setField('endTime',e.target.value)}/></Field>
          <Field label="Minimum booking time"><Input value={draft.live?'Instant · live booking':draft.minBookingTime} onChange={e=>setField('minBookingTime',e.target.value)} disabled={draft.live}/></Field>
          <Field label="Deity"><Input value={draft.deity} onChange={e=>setField('deity',e.target.value)}/></Field>
          <Field label="Limit per festival day" hint="0 = unlimited"><Input type="number" value={draft.dailyLimit} onChange={e=>setField('dailyLimit',+e.target.value)}/></Field>
        </div></div>
      <div className="flex gap-2 border-t border-brown-100 pt-4"><button onClick={save} className="btn-p"><Check size={16}/>Save offering</button><button onClick={()=>setEditing(null)} className="btn-g">Cancel</button></div>
    </div>}
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
        <p className="mt-2 text-xs text-brown-500">Sponsorship names (Annadanam, Ezhunnallippu) are grouped at the top of the printed sheet so they can be announced before the ritual begins. Any <b>Live</b> offering booked after this sheet was sent appears on the next day's sheet instead.</p></div>
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
  return (<Shell>{el}<H t="Sponsors" s="Devotees and organisations can also sponsor directly from the public festival page — no login needed" right={<button onClick={()=>setAdd(!add)} className="btn-p"><Plus size={16}/>Record a sponsor</button>}/>
    <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900 mb-5"><b>Public self-serve sponsorship</b> is live on <Link to="/festival" className="underline">the festival page</Link> — anyone can pick a package and pay online without an account. Use the form below only for sponsors who paid by bank transfer, cheque or cash to the committee.</div>

    <div className="card p-5"><div className="flex flex-wrap items-end justify-between gap-2"><div><h3 className="text-lg font-semibold">Sponsorship target</h3><p className="text-sm text-brown-500">{rs(F.sponsorGot)} raised of {rs(F.sponsorTarget)}</p></div><b className="font-display text-2xl">{pct}%</b></div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-brown-100"><div className="h-full rounded-full bg-saffron-500" style={{width:`${pct}%`}}/></div></div>

    {add && <div className="card mt-5 space-y-4 p-5"><h3 className="font-semibold">Record a sponsorship</h3>
      <div className="grid gap-4 md:grid-cols-2"><Field label="Sponsor name (as printed)"><Input placeholder="Malabar Gold Traders"/></Field><Field label="Package"><Select options={['Title sponsor ₹1,00,000','Day sponsor ₹35,000','Programme sponsor ₹25,000','Annadanam day ₹5,000','Custom amount']}/></Field>
        <Field label="Amount ₹"><Input type="number" placeholder="35000"/></Field><Field label="Payment"><Select options={['Paid in full','Advance received','Pledged — not yet paid']}/></Field>
        <Field label="Method"><Select options={['Bank transfer','Cheque','Cash to treasurer','Online (public page)']}/></Field><Field label="Reference / UTR"><Input placeholder="FDRLN…"/></Field>
        <Field label="Contact person & phone"><Input placeholder="Name · +91"/></Field><Field label="GSTIN (for invoice)"><Input placeholder="32AAACR1234A1Z5"/></Field></div>
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

/* ---------------- FESTIVAL PROFILE — summary, timings, contacts, gallery ---------------- */
export function FPage() {
  const [toast,el]=useToast(); const [tab,setTab]=useState(0)
  const done = [['Summary',1],['Event timings',1],['Travel & facilities',0],['Gallery & poster',0],['Contact persons',1]]
  return (<Shell>{el}<H t="Festival profile" s="kottur-utsavam-2026.templeaddress.com · summary, timings, contacts and gallery devotees see" right={<div className="flex gap-2"><Link to="/festival" className="btn-g"><Globe size={16}/>Preview</Link><button onClick={()=>toast('Published')} className="btn-p">Publish</button></div>}/>
    <div className="mb-4 flex flex-wrap gap-2">{done.map(([n,ok])=><Pill key={n} tone={ok?'ok':'warn'}>{ok?<Check size={12}/>:'○'}{n}</Pill>)}</div>
    <Tabs tabs={['Summary','Event timings','Travel & facilities','Gallery & poster','Contact persons']} at={tab} set={setTab}/>
    {tab===0 && <div className="card grid gap-4 p-5 md:grid-cols-2"><Field label="Festival name (English)"><Input defaultValue={F.name}/></Field><Field label="Festival name (Malayalam)"><Input className="input ml" defaultValue={F.ml}/></Field>
      <Field label="Temple"><Input defaultValue={F.temple}/></Field><Field label="Managed by"><Input defaultValue={F.committee}/></Field>
      <Field label="Start date"><Input type="date" defaultValue="2026-12-03"/></Field><Field label="End date"><Input type="date" defaultValue="2026-12-08"/></Field>
      <Field label="About this festival" hint="Why devotees come — 3 to 5 sentences" className="md:col-span-2"><textarea className="input" rows={4} defaultValue="The annual utsavam of Kottur Sree Mahavishnu Temple runs for six days in December, beginning with Kodiyettam and ending with Aarattu at the temple pond. Families of the eight illams return every year, and the Thayambaka on the fourth night draws crowds from across Malabar."/></Field>
      <Field label="What's new this year" className="md:col-span-2"><textarea className="input" rows={2} defaultValue="Annadanam on all six days, sponsored by devotees. Live booking for Utsava Bali for the first time."/></Field>
      <div className="md:col-span-2 flex items-center gap-2 text-xs text-brown-500"><Globe size={14}/>Malayalam versions are auto-drafted by the assistant; review before publishing.</div></div>}
    {tab===1 && <div className="card p-5"><h3 className="font-semibold">Main ritual timings</h3><p className="text-sm text-brown-500">Highlighted at the top of the festival page — full day-by-day detail lives in Programme.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">{[['Kodiyettam (flag hoisting)','3 Dec · 6:00 AM'],['Thayambaka night','4 Dec · 7:30 PM'],['Kalamezhuthu Pattu','6 Dec · 8:00 PM'],['Aarattu & Pallivetta','8 Dec · 5:00 AM']].map(([n,t])=>
        <div key={n} className="rounded-xl bg-brown-50 p-3 text-sm"><span className="text-brown-500">{n}</span><b className="block">{t}</b></div>)}</div>
      <Link to="/festival-admin/programme" className="mt-3 inline-block text-sm font-semibold text-saffron-600">Edit the full programme →</Link></div>}
    {tab===2 && <div className="card space-y-4 p-5"><Field label="How to reach"><textarea className="input" rows={3} defaultValue="Bus to Naduvannur, auto to Ulliyeri (4 km). Nearest railway station Kozhikode (28 km)."/></Field>
      <Field label="Parking"><textarea className="input" rows={2} defaultValue="Two-wheelers at the temple ground; cars at the UP school ground, 300 m away. Free."/></Field>
      <Field label="Facilities"><div className="flex flex-wrap gap-2">{['Drinking water','Toilets','First aid','Prasadam counter','Wheelchair access','Cloak room'].map((x,i)=><button key={x} className={`rounded-full px-3 py-1.5 text-sm ${i<4?'bg-brown-900 text-white':'border border-brown-200 bg-white'}`}>{x}</button>)}</div></Field></div>}
    {tab===3 && <div className="card p-5"><h3 className="font-semibold">Festival poster</h3><div className="mt-3 grid gap-4 md:grid-cols-[220px_1fr]"><div className="photo aspect-[3/4] rounded-xl"/><div><p className="text-sm text-brown-500">Used on the festival page, WhatsApp updates and the QR board.</p>
      <div className="mt-3 flex flex-wrap gap-2"><button className="btn-s"><Upload size={16}/>Upload poster</button><button onClick={()=>toast('Draft poster generated from the programme')} className="btn-g"><Sparkles size={16}/>Generate from programme</button></div></div></div>
      <h3 className="mt-6 font-semibold">Gallery</h3><p className="text-sm text-brown-500">Photos help devotees decide to attend or sponsor.</p>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">{[1,2,3].map(i=><div key={i} className="photo aspect-square rounded-xl"/>)}<button className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-brown-200 text-sm text-brown-500"><ImageIcon size={18}/>+ Upload</button></div></div>}
    {tab===4 && <div className="card p-5"><h3 className="font-semibold">Contact persons shown on the festival page</h3><Table head={['Name','Role','Phone','Shown publicly','']} rows={[
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
  const [listingEnabled,setListingEnabled]=useState(true)
  return (<Shell>{el}<H t="Settings"/><Tabs tabs={['Listing & festival status','Committee','Payments','Documents (KYC)','Permissions']} at={tab} set={setTab}/>
    {tab===0 && <div className="space-y-5">
      <div className={`card p-5 ${!listingEnabled?'ring-2 ring-red-300':''}`}><div className="flex items-center justify-between gap-3"><div><h3 className="font-semibold">Listing status</h3><p className="text-sm text-brown-500">Turns the public festival page on or off. Disabling hides it from search and search-engines; existing bookings are unaffected.</p></div>
        <button onClick={()=>{setListingEnabled(v=>!v);toast(listingEnabled?'Listing disabled — the public page is hidden':'Listing enabled — the public page is live')}} className={`btn !px-3 !py-2 text-sm ${listingEnabled?'bg-red-50 text-red-700':'bg-emerald-50 text-emerald-700'}`}><Power size={15}/>{listingEnabled?'Disable listing':'Enable listing'}</button></div></div>
      <div className="card space-y-4 p-5"><div className="grid gap-4 md:grid-cols-2">
        <Field label="Festival status" hint="Where the festival is in its own timeline"><Select options={['Upcoming','Bookings open','Festival running','Completed']} defaultValue="Bookings open"/></Field>
        <Field label="Festival type"><Select options={['Annual utsavam','Thira / Theyyam','Pooram','Navarathri','Special one-time event']}/></Field>
        <Field label="Expected daily footfall"><Select options={['Under 500','500 – 2,000','2,000 – 10,000','Above 10,000']} defaultValue="2,000 – 10,000"/></Field>
        <Field label="Language of announcements"><Select options={['Malayalam + English','Malayalam only']}/></Field></div>
        <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-900">A festival listing is <b>time-bound</b>. Seven days after the closing date, its status moves to <b>Completed</b> automatically and bookings close.</div>
        <button onClick={()=>toast('Saved')} className="btn-p">Save</button></div></div>}
    {tab===1 && <div className="card p-5"><h3 className="font-semibold">Committee members & access</h3><p className="text-sm text-brown-500">Festival committees change every year — give access by role, not by phone number.</p>
      <div className="mt-3"><Table head={['Name','WhatsApp','Role','Can do','']} rows={[
        ['Rajeev M','+91 94… 771','Convenor (owner)','Everything','—'],
        ['Suresh P','+91 98… 220','Treasurer','Sponsors, payments','Remove'],
        ['Anitha R','+91 90… 118','Programme','Programme, offerings, profile','Remove'],
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
    {tab===3 && <div className="card space-y-4 p-5"><div className="flex items-center gap-2"><ShieldCheck size={18} className="text-saffron-600"/><h3 className="font-semibold">Documents & KYC agreement</h3></div>
      <p className="text-sm text-brown-500">These identify the committee and authorise it to collect payments on TempleAddress. <b>Staff verify every document before the listing can go live.</b></p>
      <div className="grid gap-4 md:grid-cols-2">{[['Committee registration / resolution letter','ok'],['Convenor ID proof (Aadhaar / PAN)','ok'],['Bank account proof','ok'],['Signed TempleAddress platform agreement','warn']].map(([n,tone])=>
        <div key={n} className="rounded-2xl border border-brown-100 p-4"><div className="flex items-start justify-between gap-2"><b className="text-sm">{n}</b><Pill tone={tone}>{tone==='ok'?'Verified by staff':'Pending review'}</Pill></div><Input type="file" className="mt-2"/></div>)}</div>
      <button onClick={()=>toast('Documents submitted for staff verification')} className="btn-p">Submit for staff verification</button></div>}
    {tab===4 && <div className="card space-y-4 p-5"><h3 className="font-semibold">Permissions & compliance</h3><p className="text-sm text-brown-500">Large festivals need local clearances. Upload them here — staff check before the listing goes live for high-footfall events.</p>
      <div className="grid gap-4 md:grid-cols-2">{[['Panchayat / municipality permission','Required above 2,000 footfall','ok'],['Police permission (crowd & traffic)','Required for processions','ok'],['Fire & safety clearance','Required for fireworks / pandal','warn'],['Fireworks licence','Only if vedikettu is planned','n'],['Elephant parade permit','Forest dept. — per elephant','warn'],['Loudspeaker permission','Time limits apply after 10 PM','ok']].map(([n,note,tone])=>
        <div key={n} className="rounded-2xl border border-brown-100 p-4"><div className="flex items-start justify-between gap-2"><div><b className="text-sm">{n}</b><div className="text-xs text-brown-500">{note}</div></div><Pill tone={tone}>{tone==='ok'?'Uploaded':tone==='warn'?'Pending':'N/A'}</Pill></div><Input type="file" className="mt-2"/></div>)}</div>
      <button onClick={()=>toast('Documents saved')} className="btn-p">Save</button></div>}
  </Shell>)
}
