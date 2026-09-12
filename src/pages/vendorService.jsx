import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarCheck, ListOrdered, Clock, Sparkles, Inbox, Star, Wallet, UserCheck, Phone, MessageCircle, Check, Plus, Download, Upload, Globe, Pencil, ShieldCheck, CalendarOff, MapPin, Video, Share2, BadgeCheck } from 'lucide-react'
import { provider as P } from '../data'
import { DashShell, Pill, Field, Input, Select, Toggle, Table, Stat, Tabs, useToast } from '../ui'

/* =============================================================================
   SERVICE PROVIDER DASHBOARD  (/service-admin)
   How it differs from the temple dashboard:
   · sells time slots, not daily poojas — an appointment diary replaces the daily chart
   · availability (working days, hours, slot length, leave) is the core setting
   · devotees choose a mode: in person / phone / at their home / at a temple
   · enquiries and reviews drive the business, so both get first-class screens
   · no donations and no 80G — an individual professional, not a trust; TDS/GST instead
   · may also run Special poojas (toggle in profile) with photo/video proof to devotees
   ========================================================================== */

const items = [{ group:'Service provider', links:[
  ['/service-admin','Appointments',CalendarCheck],
  ['/service-admin/services','My services',ListOrdered],
  ['/service-admin/availability','Availability',Clock],
  ['/service-admin/enquiries','Enquiries',Inbox],
  ['/service-admin/special','Special poojas',Sparkles],
  ['/service-admin/reviews','Reviews',Star],
  ['/service-admin/earnings','Earnings',Wallet],
  ['/service-admin/profile','Profile & page',UserCheck],
]}]
const Shell = ({ children }) => <DashShell role="Vendor · Service provider" user={`${P.name} · ${P.kind} · ${P.code}`} items={items} badge="2">{children}</DashShell>
const H = ({ t, s, right }) => <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><h1 className="text-2xl font-semibold">{t}</h1>{s&&<div className="text-sm text-brown-500">{s}</div>}</div>{right}</div>
const rs = n => `₹${Number(n).toLocaleString('en-IN')}`
const modeIcon = m => m==='Phone' ? <Phone size={12}/> : m==='At temple' ? <MapPin size={12}/> : m==='Online' ? <Video size={12}/> : <UserCheck size={12}/>

/* ---------------- APPOINTMENTS (today / upcoming / past) ---------------- */
export function SToday() {
  const [toast,el]=useToast(); const [tab,setTab]=useState(0); const [done,setDone]=useState([]); const [open,setOpen]=useState(true)
  const complete = who => { setDone(d=>[...d,who]); toast(`${who}'s appointment marked complete`) }
  return (<Shell>{el}<H t="Appointments" s="Fri 11 Sept 2026 · your diary for the day" right={<div className="flex items-center gap-3"><Toggle label={open?'Accepting bookings':'Paused'} defaultChecked={open} onChange={v=>{setOpen(v);toast(v?'Bookings resumed':'New bookings paused — existing ones stay')}}/><Link to={`/service/sv1`} className="btn-g"><Globe size={16}/>Public page</Link></div>}/>

    <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Stat v="5" l="appointments today"/><Stat v={rs(2800)} l="today's collection"/><Stat v="2" l="open slots left"/><Stat v="2" l="new enquiries" delta="reply within 4 h"/></div>

    <Tabs tabs={['Today','Upcoming','Past','Cancelled']} at={tab} set={setTab}/>

    {tab===0 && <div className="grid gap-5 lg:grid-cols-[1fr_320px]"><div className="space-y-5">
      <div className="card p-5"><div className="flex flex-wrap items-center justify-between gap-2"><h3 className="text-lg font-semibold">Today · {P.hours}</h3><Pill tone="info">{P.slotMins}-minute slots</Pill></div>
        <div className="mt-3 space-y-2">{P.today.map(([time,who,svc,mode,phone,st])=>{ const isOpen = st==='Open', ok = done.includes(who)
          return (<div key={time} className={`flex flex-wrap items-center gap-3 rounded-xl border p-3 ${isOpen?'border-dashed border-brown-200 bg-brown-50/50':ok?'border-emerald-200 bg-emerald-50':'border-brown-100 bg-white'}`}>
            <div className="w-20 shrink-0 text-sm font-bold">{time}</div>
            {isOpen ? <><div className="flex-1 text-sm text-brown-500">Open slot</div><button className="btn-g !py-1.5 text-xs"><CalendarOff size={14}/>Block</button><button className="btn-s !py-1.5 text-xs">Add booking</button></>
              : <><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><b>{who}</b><Pill tone="n">{modeIcon(mode)}{mode}</Pill>{st==='Rescheduled'&&<Pill tone="warn">Rescheduled</Pill>}{ok&&<Pill tone="ok"><Check size={12}/>Completed</Pill>}</div>
                <div className="text-sm text-brown-500">{svc} · {phone}</div></div>
                <div className="flex flex-wrap gap-1.5"><button className="btn-g !px-2.5 !py-1.5 text-xs"><Phone size={14}/></button><button className="btn-wa !px-2.5 !py-1.5 text-xs"><MessageCircle size={14}/></button>
                {!ok && <button onClick={()=>complete(who)} className="btn-p !py-1.5 text-xs"><Check size={14}/>Complete</button>}</div></>}
          </div>) })}</div>
        <p className="mt-3 text-xs text-brown-500">Marking an appointment complete releases the payment into your next payout and invites the devotee to leave a review.</p></div>

      <div className="card p-5"><h3 className="text-lg font-semibold">Tomorrow · Sat 12 Sept</h3><div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-sm"><span>3 booked · 5 slots free</span><span className="text-brown-500">Bookings close 1 hour before each slot</span></div>
        <div className="mt-3 rounded-xl bg-saffron-50 p-3 text-sm text-saffron-700">Devaprasnam at Kunnathumadom on 17 Sept blocks the full day — your other slots are hidden automatically. <Link to="/service-admin/availability" className="font-semibold underline">Availability</Link></div></div>
    </div>
      <aside className="space-y-4">
        <div className="card p-5"><h3 className="font-semibold">This week</h3><div className="mt-3 space-y-2 text-sm">{[['Mon 8','4 booked'],['Tue 9','5 booked'],['Wed 10','3 booked'],['Thu 11','5 booked · today'],['Fri 12','3 booked'],['Sat 13','2 booked'],['Sun 14','Weekly off']].map(([d,n])=>
          <div key={d} className="flex justify-between rounded-lg bg-brown-50 px-3 py-1.5"><span>{d}</span><b className={n.includes('off')?'text-brown-400':''}>{n}</b></div>)}</div></div>
        <div className="card p-5 text-center"><div className="font-display text-4xl font-bold text-gold-500">{P.rating}</div><div className="flex justify-center gap-0.5 text-gold-500">{[...Array(5)].map((_,i)=><Star key={i} size={14} fill={i<Math.round(P.rating)?'currentColor':'none'}/>)}</div>
          <div className="mt-1 text-xs text-brown-500">{P.reviews} devotee reviews</div><Link to="/service-admin/reviews" className="btn-g mt-3 w-full !py-1.5 text-xs">Reply to reviews</Link></div>
        <div className="card p-5 text-sm"><h3 className="font-semibold">Payout</h3><div className="mt-1 text-brown-600"><b className="text-lg text-brown-900">{rs(4300)}</b> payable now</div><div className="text-xs text-brown-500">Next payout Monday 15 Sept</div><Link to="/service-admin/earnings" className="btn-g mt-2 w-full !py-1.5 text-xs">Earnings</Link></div>
      </aside></div>}

    {tab===1 && <div className="card p-4"><Table head={['When','Devotee','Service','Mode','₹','Status','']} rows={P.upcoming.map(([w,d,s,m,a,st])=>[
      <b>{w}</b>,d,s,<Pill tone="n">{modeIcon(m)}{m}</Pill>,rs(a),<Pill tone={st==='Confirmed'?'ok':'info'}>{st}</Pill>,
      <span className="flex gap-1"><button className="text-xs font-semibold text-saffron-600">Reschedule</button><span className="text-brown-300">·</span><button className="text-xs text-brown-500">Cancel</button></span>])}/>
      <p className="mt-3 text-xs text-brown-500">Rescheduling sends the devotee a WhatsApp with the new slot; they confirm with one tap. Cancelling refunds them in full and frees the slot.</p></div>}

    {tab===2 && <><div className="card p-4"><Table head={['Date','Devotee','Service','₹','Status','Review']} rows={P.past.map(([d,who,s,a,st,rev])=>[
      d,who,s,rs(a),<Pill tone={st==='Completed'?'ok':'err'}>{st}</Pill>,rev])}/></div>
      <div className="card mt-5 p-5 text-sm"><b>No-shows</b><p className="mt-1 text-brown-600">If a devotee does not turn up, mark it a no-show within 24 hours. The fee is retained as per your cancellation policy, and repeated no-shows are flagged to staff.</p></div></>}

    {tab===3 && <div className="card p-4"><Table head={['Date','Devotee','Service','₹','Cancelled by','Refund']} rows={[
      ['9 Sept','Rahul V','Prasnam (1 hr)','1,500','Devotee · 3 h before',<Pill tone="ok">Full refund</Pill>],
      ['5 Sept','Sunitha M','Jathakam consultation','500','You · unwell',<Pill tone="ok">Full refund</Pill>],
      ['2 Sept','Anonymous','Muhoortham','300','Devotee · after slot',<Pill tone="warn">No refund</Pill>]]}/>
      <p className="mt-3 text-xs text-brown-500">Cancelling your own appointments too often affects your listing rank. Use Availability → leave instead when you know in advance.</p></div>}
  </Shell>)
}

/* ---------------- SERVICES ---------------- */
export function SServices() {
  const [toast,el]=useToast(); const [add,setAdd]=useState(false)
  return (<Shell>{el}<H t="My services" s="What devotees can book, how long each takes and where you offer it" right={<div className="flex gap-2"><button onClick={()=>setAdd(!add)} className="btn-s"><Plus size={16}/>Add service</button><button onClick={()=>toast('Saved')} className="btn-p">Save changes</button></div>}/>
    {add && <div className="card mb-5 space-y-4 p-5"><h3 className="font-semibold">New service</h3>
      <div className="grid gap-4 md:grid-cols-2"><Field label="Service name (English)"><Input placeholder="e.g. Naamakaranam muhoortham"/></Field><Field label="Service name (Malayalam)"><Input className="input ml" placeholder="നാമകരണം"/></Field>
        <Field label="Price ₹"><Input type="number" placeholder="500"/></Field><Field label="Duration"><Select options={['15 minutes','30 minutes','45 minutes','1 hour','2 hours','Half day','Full day']}/></Field>
        <Field label="Where"><Select options={['In person at my place','Phone call','Online video call','At the devotee\'s home','At a temple']}/></Field><Field label="Advance to book"><Select options={['Full amount','50%','₹100 token','No advance — pay after']}/></Field>
        <Field label="What the devotee should bring / send" className="md:col-span-2"><textarea className="input" rows={2} placeholder="Birth date, time and place; or the horoscope PDF"/></Field></div>
      <div className="flex gap-2"><button onClick={()=>{setAdd(false);toast('Service added — live on your page')}} className="btn-p">Add service</button><button onClick={()=>setAdd(false)} className="btn-g">Cancel</button></div></div>}

    <div className="card p-4"><Table head={['Service','Malayalam','Price ₹','Minutes','Where','Bookable','']} rows={P.services.map(([n,ml,p,mins,mode])=>[
      <b>{n}</b>,<span className="ml">{ml}</span>,<input defaultValue={p} className="input !w-24 !py-1.5"/>,<input defaultValue={mins} className="input !w-20 !py-1.5"/>,
      <Pill tone="n">{modeIcon(mode)}{mode}</Pill>,<Toggle defaultChecked/>,<button className="text-xs text-brown-500">Edit</button>])}/>
      <p className="mt-3 text-xs text-brown-500">Duration decides how many slots a booking takes. A 3-hour Swarna Prasnam blocks six 30-minute slots automatically.</p></div>

    <div className="mt-5 grid gap-5 md:grid-cols-2">
      <div className="card grid gap-4 p-5"><h3 className="font-semibold">Travel & visits</h3>
        <Field label="I travel up to" hint="Devotees outside this radius won't see home-visit services"><Select options={['10 km','25 km','50 km','Anywhere in Kerala','Anywhere in India']} defaultValue="25 km"/></Field>
        <Field label="Travel charge"><Select options={['Included in the price','₹10 per km','Flat ₹500 per visit','Quoted per booking']} defaultValue="₹10 per km"/></Field>
        <Toggle label="Accept bookings from outside Kerala (NRI devotees, phone/online)" defaultChecked/></div>
      <div className="card grid gap-4 p-5"><h3 className="font-semibold">Booking rules</h3>
        <Field label="Devotees can book"><Select options={['Same day','From tomorrow','2 days ahead','1 week ahead']} defaultValue="Same day"/></Field>
        <Field label="Up to"><Select options={['15 days ahead','30 days ahead','60 days ahead','90 days ahead']} defaultValue="30 days ahead"/></Field>
        <Field label="Free cancellation until"><Select options={['2 hours before','6 hours before','24 hours before','No free cancellation']} defaultValue="6 hours before"/></Field>
        <Field label="Maximum appointments a day"><Input type="number" defaultValue="8"/></Field></div>
    </div>
  </Shell>)
}

/* ---------------- AVAILABILITY ---------------- */
export function SAvailability() {
  const [toast,el]=useToast(); const [week,setWeek]=useState(P.week.map(w=>w[1]))
  const slots = ['1:00','1:30','2:00','2:30','3:00','3:30','4:00','4:30']
  const booked = { 'Thu 11':[0,1,3,4,5], 'Fri 12':[0,2,6], 'Sat 13':[1,4] }
  return (<Shell>{el}<H t="Availability" s="When devotees can book you — the single most important setting for a service listing" right={<button onClick={()=>toast('Availability saved — your page updates immediately')} className="btn-p">Save</button>}/>
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]"><div className="space-y-5">
      <div className="card p-5"><h3 className="font-semibold">Working days</h3>
        <div className="mt-3 flex flex-wrap gap-2">{P.week.map(([d],i)=><button key={d} onClick={()=>setWeek(w=>w.map((v,j)=>j===i?!v:v))} className={`rounded-xl px-4 py-2 text-sm font-semibold ${week[i]?'bg-brown-900 text-white':'border border-brown-200 bg-white text-brown-500'}`}>{d}</button>)}</div>
        <div className="mt-4 grid gap-4 md:grid-cols-3"><Field label="From"><Input type="time" defaultValue="13:00"/></Field><Field label="To"><Input type="time" defaultValue="17:00"/></Field>
          <Field label="Slot length"><Select options={['15 minutes','30 minutes','45 minutes','1 hour']} defaultValue="30 minutes"/></Field></div>
        <div className="mt-2 grid gap-4 md:grid-cols-3"><Field label="Break between appointments"><Select options={['None','5 minutes','10 minutes','15 minutes']} defaultValue="None"/></Field>
          <Field label="Lunch / rest break"><Input defaultValue="None"/></Field><Field label="Different hours on Saturday"><Select options={['Same as weekdays','Morning only','Custom']}/></Field></div></div>

      <div className="card p-5"><h3 className="font-semibold">Next 3 days</h3><p className="text-sm text-brown-500">Green is booked, white is open. Tap a slot to block it.</p>
        <div className="mt-3 overflow-x-auto"><table className="w-full min-w-[420px] border-separate border-spacing-1">
          <thead><tr><th className="w-20"/>{Object.keys(booked).map(d=><th key={d} className="th">{d}</th>)}</tr></thead>
          <tbody>{slots.map((s,i)=><tr key={s}><td className="pr-2 text-right text-xs font-semibold text-brown-500">{s}</td>
            {Object.keys(booked).map(d=><td key={d}><button className={`w-full rounded-lg py-2 text-xs font-semibold ${booked[d].includes(i)?'bg-emerald-100 text-emerald-800':'border border-brown-200 bg-white text-brown-400 hover:bg-brown-50'}`}>{booked[d].includes(i)?'Booked':'Free'}</button></td>)}</tr>)}</tbody>
        </table></div></div>

      <div className="card p-5"><h3 className="font-semibold">Leave & blocked dates</h3><p className="text-sm text-brown-500">Nobody can book you on these days; existing bookings are not touched.</p>
        <div className="mt-3"><Table head={['Dates','Reason','Shown to devotees','']} rows={[
          ['17 Sept (full day)','Devaprasnam at Kunnathumadom','Busy — not available','Remove'],
          ['2–5 Oct','Family function','On leave','Remove'],
          ['Every Sunday','Weekly off','Weekly off','Edit']]}/></div>
        <div className="mt-3 flex flex-wrap items-end gap-3"><Field label="From"><Input type="date"/></Field><Field label="To"><Input type="date"/></Field><Field label="Reason"><Select options={['On leave','Temple engagement','Travel','Personal']}/></Field><button onClick={()=>toast('Dates blocked')} className="btn-s"><CalendarOff size={16}/>Block dates</button></div></div>
    </div>
      <aside className="space-y-4">
        <div className="card p-5"><h3 className="font-semibold">Slot summary</h3><div className="mt-3 space-y-2 text-sm">{[['Slots offered per week','48'],['Booked next 7 days','23'],['Utilisation','48%'],['Most booked slot','2:30 PM'],['Least booked','4:30 PM']].map(([k,v])=>
          <div key={k} className="flex justify-between"><span className="text-brown-500">{k}</span><b>{v}</b></div>)}</div></div>
        <div className="card p-5 text-sm"><h3 className="font-semibold">Tip</h3><p className="mt-1 text-brown-600">Listings that keep at least 40% of slots open get more bookings — devotees pick whoever is free soonest. If you are full for a week, raise your price instead of adding hours.</p></div>
        <div className="card p-5"><h3 className="font-semibold">Emergency pause</h3><p className="mt-1 text-sm text-brown-500">Hides your listing from search immediately. Existing bookings stay and you can resume any time.</p><Toggle label="Pause new bookings"/></div>
      </aside></div>
  </Shell>)
}

/* ---------------- ENQUIRIES ---------------- */
export function SEnquiries() {
  const [toast,el]=useToast(); const [sel,setSel]=useState(0); const [reply,setReply]=useState('')
  const e = P.enquiries[sel]
  return (<Shell>{el}<H t="Enquiries" s="Messages from the Quick Enquiry form on your public page" right={<Pill tone="warn">2 waiting for a reply</Pill>}/>
    <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
      <div className="card divide-y divide-brown-100 p-2">{P.enquiries.map(([d,n,ph,msg,st],i)=>
        <button key={n} onClick={()=>setSel(i)} className={`w-full rounded-xl p-3 text-left ${sel===i?'bg-saffron-50':'hover:bg-brown-50'}`}>
          <div className="flex items-center justify-between gap-2"><b className="text-sm">{n}</b><Pill tone={st==='New'?'warn':'ok'}>{st}</Pill></div>
          <div className="truncate text-xs text-brown-500">{msg}</div><div className="mt-1 text-[11px] text-brown-400">{d} · {ph}</div></button>)}</div>

      <div className="space-y-5"><div className="card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="text-lg font-semibold">{e[1]}</h3><div className="text-sm text-brown-500">{e[0]} · {e[2]}</div></div><Pill tone={e[4]==='New'?'warn':'ok'}>{e[4]}</Pill></div>
        <div className="mt-4 rounded-2xl bg-brown-50 p-4 text-sm">{e[3]}</div>
        <div className="mt-4"><Field label="Your reply" hint="Sent on WhatsApp from the TempleAddress business number, showing your name"><textarea className="input" rows={3} value={reply} onChange={ev=>setReply(ev.target.value)} placeholder="Namaskaram, I am available on…"/></Field>
          <div className="mt-2 flex flex-wrap gap-2">{['Available — shall I book a slot?','Please send birth details','I will call you this evening'].map(q=>
            <button key={q} onClick={()=>setReply(q)} className="rounded-full border border-brown-200 px-3 py-1 text-xs hover:bg-brown-50">{q}</button>)}</div></div>
        <div className="mt-4 flex flex-wrap gap-2"><button onClick={()=>{toast('Reply sent on WhatsApp');setReply('')}} className="btn-p"><MessageCircle size={16}/>Send reply</button>
          <button onClick={()=>toast('Slot held — booking link sent to the devotee')} className="btn-s"><CalendarCheck size={16}/>Send a booking link</button>
          <button className="btn-g"><Phone size={16}/>Call</button><button onClick={()=>toast('Marked closed')} className="btn-g">Mark closed</button></div></div>

        <div className="card p-5 text-sm"><b>Why replying fast matters</b><p className="mt-1 text-brown-600">Enquiries answered within 4 hours convert to a booking about three times more often. Your average reply time is shown on your public page — right now it reads <b>“usually replies within 2 hours”</b>.</p></div>
      </div></div>
  </Shell>)
}

/* ---------------- SPECIAL POOJAS ---------------- */
export function SSpecials() {
  const [toast,el]=useToast(); const [on,setOn]=useState(true)
  return (<Shell>{el}<H t="Special poojas" s="Poojas performed in the devotee's name, sold as seats — with photo or video proof" right={<button className="btn-s"><Plus size={16}/>Propose a special pooja</button>}/>
    <div className="card p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-semibold">Offer Special poojas</h3><p className="text-sm text-brown-500">When on, your special poojas appear on the TempleAddress Special poojas page alongside temple listings. Each one is approved by staff before it goes live.</p></div><Toggle label={on?'Enabled':'Off'} defaultChecked={on} onChange={v=>{setOn(v);toast(v?'Special poojas enabled':'Special poojas hidden from the public page')}}/></div></div>

    {on && <>
      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4"><Stat v="2" l="listed"/><Stat v="5" l="seats booked"/><Stat v={rs(13000)} l="collected"/><Stat v="2" l="proofs pending" delta="send within 24 h"/></div>
      <div className="card mt-5 p-4"><Table head={['Special pooja','Date','Price ₹','Seats','Booked','Fulfilment','']} rows={P.specials.map(([t,d,p,seats,bk,ff])=>[
        <b>{t}</b>,d,rs(p),seats,<b>{bk}</b>,<Pill tone={ff.includes('pending')?'warn':'info'}>{ff}</Pill>,<button className="text-xs font-semibold text-saffron-600">Manage</button>])}/></div>

      <div className="card mt-5 p-5"><h3 className="font-semibold">Ganapathi Homam at devotee's home · 20 Sept · upload proof</h3>
        <p className="text-sm text-brown-500">Devotees who booked a seat expect a photo or short video the same day, plus the sankalpam names read aloud.</p>
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">{['+ photo','+ photo','+ video','prasadam dispatch'].map(x=>
          <button key={x} className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-brown-200 text-sm text-brown-500">{x}</button>)}</div>
        <div className="mt-4 rounded-xl bg-brown-50 p-3 text-sm"><b>Sankalpam list (3 devotees)</b><div className="mt-1 text-brown-600">Anand · Rohini · Kozhikode<br/>Sreeja S · Uthram · Dubai<br/>Vinod K · Anizham · Thrissur</div></div>
        <div className="mt-4 flex flex-wrap gap-2"><button onClick={()=>toast('Proof sent to 3 devotees on WhatsApp')} className="btn-p"><Upload size={16}/>Send proof & mark done</button><button className="btn-g"><Download size={16}/>Sankalpam list (PDF)</button></div></div>

      <div className="card mt-5 p-5 text-sm"><b>How this differs from your appointments</b><p className="mt-1 text-brown-600">An appointment is one devotee booking your time. A special pooja is one ritual you perform with <b>many devotees' names</b> in the sankalpam — seats are limited, the money is collected upfront, and the proof is what the devotee pays for. Staff approve each listing and settle it after the proof is sent.</p></div>
    </>}
  </Shell>)
}

/* ---------------- REVIEWS ---------------- */
export function SReviews() {
  const [toast,el]=useToast(); const [replyTo,setReplyTo]=useState(null)
  const dist = [[5,41],[4,14],[3,5],[2,2],[1,1]]
  return (<Shell>{el}<H t="Reviews" s="Devotee feedback decides how high your listing ranks in search" right={<button onClick={()=>toast('Review request sent to 6 past devotees')} className="btn-p"><Share2 size={16}/>Ask for reviews</button>}/>
    <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
      <div className="card p-5 text-center"><div className="font-display text-5xl font-bold text-gold-500">{P.rating}</div>
        <div className="mt-1 flex justify-center gap-0.5 text-gold-500">{[...Array(5)].map((_,i)=><Star key={i} size={16} fill={i<Math.round(P.rating)?'currentColor':'none'}/>)}</div>
        <div className="mt-1 text-sm text-brown-500">{P.reviews} reviews</div>
        <div className="mt-4 space-y-1.5">{dist.map(([s,n])=><div key={s} className="flex items-center gap-2 text-xs"><span className="w-3 text-brown-500">{s}</span><Star size={10} className="text-gold-500" fill="currentColor"/>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-brown-100"><span className="block h-full rounded-full bg-gold-400" style={{width:`${n/P.reviews*100}%`}}/></span><span className="w-6 text-right text-brown-500">{n}</span></div>)}</div>
        <div className="mt-4 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800">Top tags: <b>Knowledgeable</b> · <b>Accurate</b> · <b>Calm demeanor</b></div></div>

      <div className="space-y-4">{P.feedback.map(([who,stars,tag,text,st],i)=>
        <div key={who} className="card p-5"><div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-full bg-temple-grad text-sm font-bold text-gold-300">{who[0]}</span>
            <div><b>{who}</b><div className="flex gap-0.5 text-gold-500">{[...Array(5)].map((_,j)=><Star key={j} size={12} fill={j<stars?'currentColor':'none'}/>)}</div></div></div>
          <div className="flex gap-2">{tag!=='—'&&<Pill tone="n">{tag}</Pill>}<Pill tone={st==='Replied'?'ok':st==='Needs reply'?'warn':'n'}>{st}</Pill></div></div>
          <p className="mt-3 text-sm text-brown-700">“{text}”</p>
          {replyTo===i ? <div className="mt-3"><textarea className="input" rows={2} placeholder="Thank you for visiting…"/>
            <div className="mt-2 flex gap-2"><button onClick={()=>{setReplyTo(null);toast('Reply published under the review')}} className="btn-p !py-1.5 text-xs">Post reply</button><button onClick={()=>setReplyTo(null)} className="btn-g !py-1.5 text-xs">Cancel</button></div></div>
          : <div className="mt-3 flex gap-2"><button onClick={()=>setReplyTo(i)} className="btn-g !py-1.5 text-xs">{st==='Replied'?'Edit reply':'Reply'}</button>
            {stars<=3 && <button onClick={()=>toast('Reported to staff for review')} className="btn-g !py-1.5 text-xs">Report</button>}</div>}
        </div>)}
        <div className="card p-5 text-sm"><b>House rules</b><p className="mt-1 text-brown-600">Only devotees with a completed booking can review you, so reviews cannot be bought or faked. You may reply once to each review; staff remove abusive or personal content on request, but not a low rating on its own.</p></div>
      </div></div>
  </Shell>)
}

/* ---------------- EARNINGS ---------------- */
export function SEarnings() {
  const [toast,el]=useToast(); const [tab,setTab]=useState(0)
  return (<Shell>{el}<H t="Earnings" s="Appointments and special poojas collected by TempleAddress, paid to your account weekly" right={<button onClick={()=>toast('Statement downloaded')} className="btn-g"><Download size={16}/>Statement (Excel)</button>}/>
    <Tabs tabs={['Payouts','Ledger','Bank & tax']} at={tab} set={setTab}/>
    {tab===0 && <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4"><Stat v={rs(4300)} l="payable now"/><Stat v="Mon 15 Sept" l="next payout"/><Stat v={rs(28350)} l="collected this quarter"/><Stat v={rs(96400)} l="paid this year"/></div>
      <div className="card mt-5 p-5"><h3 className="font-semibold">Payout history</h3><Table head={['Period','Appointments','Collected ₹','Paid on','UTR','Status']} rows={P.earnings.map(([p,n,a,d,u,st])=>[
        p,n,rs(a),d,u,<Pill tone="ok">{st}</Pill>])}/></div>
      <div className="card mt-5 p-5 text-sm"><b>What is deducted</b><div className="mt-2 grid gap-2 md:grid-cols-3">
        {[['Platform fee','0% on appointments','Your Service Pro plan covers the listing'],['Gateway charge','Paid by the devotee','Shown at checkout before they pay'],['TDS','As per rules','A statement is issued each quarter']].map(([k,v,n])=>
          <div key={k} className="rounded-xl bg-brown-50 p-3"><div className="text-xs text-brown-500">{k}</div><b>{v}</b><div className="text-xs text-brown-500">{n}</div></div>)}</div></div></>}
    {tab===1 && <div className="card p-4"><Table head={['Date','Devotee','Service','Mode','Collected ₹','Status']} rows={[
      ['11 Sept','Sreeja S','Jathakam consultation','In person','500',<Pill tone="ok">Completed</Pill>],
      ['11 Sept','Anand K','Muhoortham','Phone','300',<Pill tone="ok">Completed</Pill>],
      ['11 Sept','Rajesh Iyer','Prasnam','In person','1,500',<Pill tone="info">Today</Pill>],
      ['10 Sept','Achuth P','Jathakam consultation','In person','500',<Pill tone="ok">Paid out</Pill>],
      ['8 Sept','Vengamala Committee','Devaprasnam','At temple','15,000',<Pill tone="ok">Paid out</Pill>],
      ['7 Sept','Rahul V','Prasnam','In person','1,500',<Pill tone="err">No-show · retained</Pill>]]}/></div>}
    {tab===2 && <div className="space-y-5">
      <div className="card grid gap-4 p-5 md:grid-cols-2"><h3 className="font-semibold md:col-span-2">Payout account</h3>
        <Field label="Account holder" hint="Must match your PAN"><Input defaultValue="Prasad Nambeesan"/></Field><Field label="Account number"><Input defaultValue="XXXXXXXX3310"/></Field>
        <Field label="IFSC"><Input defaultValue="SBIN0070231"/></Field><Field label="UPI"><Input defaultValue="prasad@okaxis"/></Field>
        <div className="md:col-span-2"><Pill tone="ok"><ShieldCheck size={12}/>Penny-drop verified 14 Jul 2026</Pill></div></div>
      <div className="card grid gap-4 p-5 md:grid-cols-2"><h3 className="font-semibold md:col-span-2">Tax details</h3>
        <Field label="PAN"><Input defaultValue="ABCDE1234F"/></Field><Field label="GSTIN" hint="Optional — needed only above the turnover limit"><Input placeholder="Not registered"/></Field>
        <Field label="Payout cycle"><Select options={['Weekly (Monday)','Fortnightly','Monthly']} defaultValue="Weekly (Monday)"/></Field><Field label="Minimum payout ₹"><Input defaultValue="500"/></Field></div>
      <div className="card p-5"><h3 className="font-semibold">Plan</h3><div className="mt-2 flex flex-wrap items-center justify-between gap-3"><div><b>{P.plan}</b><div className="text-sm text-brown-500">Listing, appointment booking, enquiries, reviews and WhatsApp reminders</div></div><Pill tone="warn">Expires in 23 days</Pill></div>
        <button onClick={()=>toast('Renewal link sent on WhatsApp')} className="btn-p mt-3">Renew ₹3,000 / year</button></div>
      <button onClick={()=>toast('Saved')} className="btn-p">Save</button></div>}
  </Shell>)
}

/* ---------------- PROFILE & PUBLIC PAGE ---------------- */
export function SProfile() {
  const [toast,el]=useToast(); const [tab,setTab]=useState(0)
  return (<Shell>{el}<H t="Profile & page" s="What devotees see before they book you" right={<div className="flex gap-2"><Link to="/service/sv1" className="btn-g"><Globe size={16}/>Preview</Link><button onClick={()=>toast('Published')} className="btn-p">Publish</button></div>}/>
    <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
      <aside className="space-y-5"><div className="overflow-hidden rounded-2xl bg-brown-900 p-5 text-white">
        <div className="flex items-start justify-between"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-saffron-500 text-2xl font-bold">P</span><Pill tone="ok"><BadgeCheck size={12}/>Verified</Pill></div>
        <h2 className="mt-4 text-2xl font-semibold">{P.name}</h2><div className="ml text-sm text-gold-300">{P.ml}</div>
        <p className="mt-1 text-sm text-brown-100">{P.kind} · {P.exp} years</p>
        <div className="mt-4 rounded-xl bg-white/10 p-3"><div className="text-[11px] uppercase text-brown-200">Listing ID</div><div className="text-xl font-bold tracking-wider text-gold-300">{P.code}</div></div>
        <p className="mt-3 text-xs text-brown-100">{P.place}<br/>KYC verified 14 Jul 2026</p></div>
        <div className="card p-5 text-sm"><b>Listing health</b><div className="mt-2 space-y-1.5">{[['Profile completeness','92%','ok'],['Reply time','~2 hours','ok'],['Cancellation rate','2%','ok'],['Photos','1 — add more','warn']].map(([k,v,t])=>
          <div key={k} className="flex items-center justify-between"><span className="text-brown-500">{k}</span><Pill tone={t}>{v}</Pill></div>)}</div></div></aside>

      <div><Tabs tabs={['About you','Expertise','Photos','Verification']} at={tab} set={setTab}/>
        {tab===0 && <div className="card grid gap-4 p-5 md:grid-cols-2">
          <Field label="Name (English)"><Input defaultValue={P.name}/></Field><Field label="Name (Malayalam)"><Input className="input ml" defaultValue={P.ml}/></Field>
          <Field label="I am a"><Select options={['Astrologer','Poojari / priest','Thantri','Thayambaka artist','Sopana sangeetham','Kathakali troupe','Kalamezhuthu','Nadaswaram','Other']} defaultValue="Astrologer"/></Field>
          <Field label="Years of experience"><Input type="number" defaultValue={P.exp}/></Field>
          <Field label="Languages"><Input defaultValue={P.languages}/></Field><Field label="Base town / place"><Input defaultValue={P.place}/></Field>
          <Field label="About you" hint="Devotees read this first — mention your parampara, training and what you are known for" className="md:col-span-2"><textarea className="input" rows={4} defaultValue="Astrologer Prasad Nambeesan, practising at Koottur near Naduvannur, Kozhikode for 22 years. Trained in the Kerala parampara of prasna marga; known for Swarna Prasnam and Devaprasnam at temples across Malabar."/></Field></div>}
        {tab===1 && <div className="card space-y-4 p-5"><Field label="Expertise & specialisations" hint="These become the filter tags devotees search with">
          <div className="flex flex-wrap gap-2">{P.expertise.map(x=><Pill key={x} tone="warn">{x} ✕</Pill>)}<input placeholder="+ add" className="input !w-36 !py-1"/></div></Field>
          <Field label="Temples you serve regularly"><textarea className="input" rows={3} defaultValue={'Kottur Sree Mahavishnu Temple\nVengamala Bhagavathi Temple\nKunnathumadom Sree Krishna Temple'}/></Field>
          <Field label="Training & lineage"><textarea className="input" rows={2} defaultValue="Learnt under Kanippayyur parampara; certified by Jyothisha Parishath, Kozhikode."/></Field>
          <Field label="Awards & recognition"><textarea className="input" rows={2} placeholder="Optional"/></Field></div>}
        {tab===2 && <div className="card p-5"><h3 className="font-semibold">Photos</h3><p className="text-sm text-brown-500">A clear portrait plus photos at work. Listings with 3 or more photos get noticeably more bookings.</p>
          <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4"><div className="photo aspect-square rounded-xl"/>{[1,2,3].map(i=>
            <button key={i} className="grid aspect-square place-items-center rounded-xl border-2 border-dashed border-brown-200 text-sm text-brown-500">+ Upload</button>)}</div>
          <p className="mt-2 text-xs text-brown-500">First photo is used as your listing cover and on the appointment reminder sent to devotees.</p></div>}
        {tab===3 && <div className="space-y-5"><div className="card p-5"><h3 className="font-semibold">Identity & KYC</h3>
          <div className="mt-3"><Table head={['Document','Status','Verified on']} rows={[
            ['Photo ID (Aadhaar)',<Pill tone="ok"><Check size={12}/>Verified</Pill>,'14 Jul 2026'],
            ['PAN',<Pill tone="ok"><Check size={12}/>Verified</Pill>,'14 Jul 2026'],
            ['Bank proof',<Pill tone="ok"><Check size={12}/>Penny-drop</Pill>,'14 Jul 2026'],
            ['Reference from a temple',<Pill tone="ok"><Check size={12}/>Kottur Devaswom</Pill>,'20 Jul 2026']]}/></div>
          <p className="mt-3 text-xs text-brown-500">The <b>Verified</b> badge on your page comes from these checks. If a document expires the badge is paused until you re-upload.</p></div>
          <div className="card p-5"><div className="flex items-center gap-2"><Pencil size={18}/><h3 className="font-semibold">Change name or bank details</h3></div>
            <p className="mt-1 text-sm text-brown-500">Name and bank changes need staff approval and a fresh document, because payouts and receipts depend on them.</p>
            <button onClick={()=>toast('Change request sent to staff')} className="btn-g mt-3">Request a change</button></div></div>}
      </div></div>
  </Shell>)
}
