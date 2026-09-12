export const temples = [
  { slug:'kottur-sree-mahavishnu-temple', code:'T1028', name:'Kottur Sree Mahavishnu Temple', ml:'കൊട്ടൂർ ശ്രീ മഹാവിഷ്ണു ക്ഷേത്രം', district:'Kozhikode', place:'Ulliyeri', deity:'Lord Vishnu', others:['Lord Krishna','Lord Ganesh','Naga'],
    gateway:'razorpay', g80:true, plan:'Pro', sponsor:'Resurge India Foundation', bookable:true, cutoff:'8:00 PM', hue:'#7A5238', rating:4.8, reviews:212,
    timings:'5:30–9:30 AM · 5:30–7:30 PM', address:'Ulliyeri, Kottur (PO), Naduvannur (via), Kozhikode – 673614',
    about:'This temple stands in Kottur–Ulliyeri village near Naduvannur, Kozhikode. Mahavishnu is worshipped here as Santhanagopala Moorthy — the giver of children — and families from across Malabar come for Santhanagopala pooja.',
    story:'Legend says a Namboothiri of the Ulliyeri illam found a swayambhu idol while ploughing; the field is still called “Vishnu paadam”.',
    history:'About 2,000 years old and once the family temple of eight illams. In the social reform era, Pulliyilottu Narayanan Nambishan led a Pulaya youth into the temple pond in defiance of untouchability — an event remembered every year.',
    speciality:'Santhanagopala pooja for childless couples · Vedapatasala every Sunday · Ashtami Rohini festival',
    guidelines:'Traditional dress inside the nalambalam. Mobile phones on silent. No photography of the sanctum. Prasadam counter closes 15 min after each pooja.',
    remarks:'Ilaneer abhishekam is the most booked vazhipadu; book Udayasthamana pooja 7 days ahead.',
    nearby:['Thusharagiri waterfalls (28 km)','Kakkayam dam (34 km)','Lokanarkavu temple (22 km)'],
    poojas:[['Ganapathi Homam','ഗണപതി ഹോമം',250,20],['Ilaneer Abhishekam','ഇളനീർ അഭിഷേകം',50,0],['Naalikeram Udaykkal','നാളികേരം ഉടയ്ക്കൽ',10,0],['Pushpanjali','പുഷ്പാഞ്ജലി',20,0],['Bhagyasooktha Pushpanjali','ഭാഗ്യസൂക്ത പുഷ്പാഞ്ജലി',30,0],['Neyvilakku','നെയ്‌വിളക്ക്',15,0],['Palpayasam (1 kg)','പാൽപായസം',120,10],['Santhanagopala Pooja','സന്താനഗോപാല പൂജ',1500,3],['Udayasthamana Pooja','ഉദയാസ്തമന പൂജ',7500,1]] },
  { slug:'bilathikulam-sree-shiva-temple', code:'T1044', name:'Bilathikulam Sree Shiva Temple', ml:'ബിലാത്തികുളം ശ്രീ ശിവ ക്ഷേത്രം', district:'Kozhikode', place:'Bilathikulam', deity:'Lord Shiva', others:['Parvathi','Ganapathi'],
    gateway:'omniware', g80:false, plan:'Basic', sponsor:null, bookable:true, cutoff:'7:00 PM', hue:'#3F4E5C', rating:4.6, reviews:88,
    timings:'5:00–10:00 AM · 5:00–8:00 PM', address:'Bilathikulam, Kozhikode – 673006', about:'A serene Shiva temple by the old town pond, known for its Monday Dhara.', story:'', history:'Rebuilt in 1932 after the great flood.', speciality:'Rudrabhishekam on Pradosham days', guidelines:'Dress code applies.', remarks:'', nearby:['Kozhikode beach (3 km)','Mananchira (2 km)'],
    poojas:[['Dhara','ധാര',40,0],['Rudrabhishekam','രുദ്രാഭിഷേകം',500,5],['Koovalamala','കൂവളമാല',30,0],['Mrithyunjaya Homam','മൃത്യുഞ്ജയ ഹോമം',1500,2]] },
  { slug:'vengamala-bhagavathi-temple', code:'T1221', name:'Vengamala Bhagavathi Temple', ml:'വേങ്ങമല ഭഗവതി ക്ഷേത്രം', district:'Thiruvananthapuram', place:'Marudhumoola', deity:'Bhagavathi', others:['Ganapathi','Yakshi'],
    gateway:'bank', g80:false, plan:'Free', sponsor:null, bookable:true, cutoff:'8:00 PM', hue:'#8A3A1F', rating:4.7, reviews:41,
    timings:'6:00–9:00 AM · 5:30–7:00 PM', address:'Vengamala Temple Road, Marudhumoola, Thiruvananthapuram', about:'Hill-top Bhagavathi temple with a famous Meena Bharani festival.', story:'', history:'', speciality:'Bhagavathi Seva every Friday', guidelines:'', remarks:'', nearby:['Ponmudi (40 km)'],
    poojas:[['Pushpanjali','പുഷ്പാഞ്ജലി',20,0],['Bhagavathi Seva','ഭഗവതി സേവ',750,6],['Kalasam','കലശം',300,0]] },
  { slug:'thrikapaleshwaram-temple', code:'T0917', name:'Thrikapaleshwaram Temple', ml:'തൃക്കപാലേശ്വരം ക്ഷേത്രം', district:'Pathanamthitta', place:'Thiruvalla', deity:'Lord Shiva', others:['Sastha'],
    gateway:'razorpay', g80:true, plan:'Basic', sponsor:null, bookable:true, cutoff:'8:00 PM', hue:'#2F5F4E', rating:4.9, reviews:130,
    timings:'5:00–10:30 AM · 5:00–8:00 PM', address:'Thrikapaleshwaram, Thiruvalla – 689101', about:'One of the 108 Shiva temples of Kerala, on the banks of the Manimala river.', story:'', history:'', speciality:'Pithru tharpanam on Karkidaka Vavu', guidelines:'', remarks:'', nearby:['Aranmula (12 km)'],
    poojas:[['Dhara','ധാര',40,0],['Pithru Tharpanam','പിതൃതർപ്പണം',150,0],['Sahasranama Archana','സഹസ്രനാമ അർച്ചന',60,0]] },
]
export const bySlug = s => temples.find(t=>t.slug===s) || temples[0]

export const specials = [
  { id:'sp1', title:'Ashta Dravya Maha Ganapathi Homam', ml:'അഷ്ടദ്രവ്യ മഹാഗണപതി ഹോമം', date:'Sat 14 Sept · Vinayaka Chathurthi', temple:temples[0], price:1500, seats:40, left:18, tag:'Obstacles', proof:'Photo + video', hue:'#B8804F',
    desc:'Performed by the temple melshanthi with eight dravyas. Your name, nakshatra and sankalpam are read at the homam. Proof on WhatsApp the same day; prasadam by India Post within 5 days.' },
  { id:'sp2', title:'Pithru Tharpanam & Bali', ml:'പിതൃതർപ്പണം', date:'Sat 26 Sept · Purnima', temple:temples[3], price:2100, seats:60, left:9, tag:'Ancestors', proof:'Video', hue:'#2F5F4E', desc:'Tharpanam for departed ancestors on the Manimala riverbank.' },
  { id:'sp3', title:'Bhagavathi Seva', ml:'ഭഗവതി സേവ', date:'Every Friday', temple:temples[2], price:750, seats:40, left:31, tag:'Family', proof:'Photo', hue:'#8A3A1F', desc:'Evening seva with family sankalpam.' },
  { id:'sp4', title:'Sudarsana Homam', ml:'സുദർശന ഹോമം', date:'Fri 2 Oct', temple:temples[0], price:3000, seats:12, left:6, tag:'Protection', proof:'Photo + video', hue:'#7A5238', desc:'For protection from enemies and negativity.' },
  { id:'sp5', title:'Mrithyunjaya Homam (group)', ml:'മൃത്യുഞ്ജയ ഹോമം', date:'Every Monday', temple:temples[1], price:350, seats:25, left:11, tag:'Health', proof:'Photo', hue:'#3F4E5C', desc:'Group homam for health and longevity.' },
  { id:'sp6', title:'Navarathri Saraswathi Pooja', ml:'സരസ്വതി പൂജ', date:'19–21 Oct', temple:temples[2], price:500, seats:120, left:97, tag:'Festival', proof:'Photo', hue:'#8A3A1F', desc:'Vidyarambham and Saraswathi pooja.' },
]
export const services = [
  { id:'sv1', name:'Prasad Nambeesan', ml:'പ്രസാദ് നമ്പീശൻ', type:'Astrologer', district:'Kozhikode', from:300, exp:22, hue:'#5B3E2B', offerings:[['Jathakam consultation · 30 min',500,'In person / phone'],['Prasnam · 1 hr',1500,'In person'],['Muhoortham',300,'Phone']] },
  { id:'sv2', name:'Shiju Krishnan Potty', ml:'ഷിജു കൃഷ്ണൻ പോറ്റി', type:'Poojari', district:'Thiruvananthapuram', from:1500, exp:14, hue:'#7A5238', offerings:[['Ganapathi Homam at home',3500,'Samagri included'],['Griha Pravesham',7500,'Samagri included']] },
  { id:'sv3', name:'P.V. Sasidharan', ml:'പി.വി. ശശിധരൻ', type:'Astrologer', district:'Perinthalmanna', from:300, exp:30, hue:'#3F4E5C', offerings:[['Horoscope reading',300,'Phone']] },
  { id:'sv4', name:'Kalamandalam Anil', ml:'കലാമണ്ഡലം അനിൽ', type:'Thayambaka', district:'Thrissur', from:15000, exp:18, hue:'#8A3A1F', offerings:[['Thayambaka (festival)',15000,'Team of 5']] },
]
/* ---------- VENDOR TYPE 2 · FESTIVAL COMMITTEE ----------
   A festival listing is time-bound (a few days a year), sells sponsorships and day-limited
   offerings, hires artists, and settles once the utsavam is over — no daily pooja chart. */
export const festival = {
  code:'F1016', name:'Kottur Temple Annual Festival 2026', ml:'കൊട്ടൂർ ഉത്സവം 2026',
  temple:'Kottur Sree Mahavishnu Temple', place:'Ulliyeri, Kozhikode', committee:'Kottur Utsava Committee',
  convenor:'Rajeev M', from:'3 Dec 2026', to:'8 Dec 2026', daysToGo:83, status:'Bookings open',
  budget:1250000, collected:684500, committed:412000, inHand:272500, sponsorTarget:600000, sponsorGot:395000,
  days:['3 Dec','4 Dec','5 Dec','6 Dec','7 Dec','8 Dec'],
  /* day, event, time, kind, performer / in-charge, status */
  programme:[
    ['3 Dec','Kodiyettam (flag hoisting)','6:00 AM','Ritual','Melshanthi Krishnan Namboothiri','Confirmed'],
    ['3 Dec','Ezhunnallippu · 3 elephants','7:00 PM','Procession','Kottur Gajamela','Confirmed'],
    ['4 Dec','Thayambaka','7:30 PM','Cultural','Kalamandalam Anil & team','Confirmed'],
    ['4 Dec','Kathakali — Duryodhana Vadham','9:30 PM','Cultural','Sadanam troupe','Advance paid'],
    ['5 Dec','Annadanam','12:30 PM','Seva','Committee kitchen','Confirmed'],
    ['5 Dec','Ottanthullal','7:00 PM','Cultural','Not assigned','Needs artist'],
    ['6 Dec','Kalamezhuthu Pattu','8:00 PM','Ritual','Kurup team, Perambra','Awaiting confirmation'],
    ['7 Dec','Sopana Sangeetham','6:30 PM','Cultural','Sreejith Marar','Confirmed'],
    ['8 Dec','Aarattu & Pallivetta','5:00 AM','Ritual','Melshanthi','Confirmed'],
  ],
  /* name, ml, price, per-day limit (0 = unlimited), sold */
  offerings:[
    ['Utsava Bali sponsorship','ഉത്സവബലി',2500,6,19],
    ['Annadanam (100 devotees)','അന്നദാനം',5000,2,9],
    ['Ezhunnallippu sponsorship','എഴുന്നള്ളിപ്പ്',7500,1,4],
    ['Deepam (festival week)','ദീപം',100,0,212],
    ['Kalasam','കലശം',300,0,64],
  ],
  /* sponsor, package, amount, status, note */
  sponsors:[
    ['Malabar Gold Traders','Title sponsor · arch + stage banner',100000,'Paid','GST invoice INV-0431'],
    ['Resurge India Foundation','Annadanam — all 6 days',60000,'Paid','INV-0428'],
    ['Ulliyeri Service Co-op Bank','Ezhunnallippu · day 1',35000,'Advance ₹15,000','Balance ₹20,000 due 1 Dec'],
    ['NRI Forum · Dubai chapter','Kathakali night',25000,'Pledged','Awaiting transfer'],
  ],
  /* troupe, programme, when, fee, advance, status */
  artists:[
    ['Kottur Gajamela','3 elephants + nadaswaram','3 Dec · 7:00 PM',85000,25000,'Agreement signed'],
    ['Kalamandalam Anil & team','Thayambaka','4 Dec · 7:30 PM',15000,7500,'Advance paid'],
    ['Sadanam Kathakali troupe','Kathakali','4 Dec · 9:30 PM',45000,15000,'Advance paid'],
    ['Sreejith Marar','Sopana sangeetham','7 Dec · 6:30 PM',8000,0,'To confirm'],
    ['Kurup team, Perambra','Kalamezhuthu Pattu','6 Dec · 8:00 PM',12000,0,'Awaiting confirmation'],
  ],
  /* head, category, amount, paid, note */
  expenses:[
    ['Pandal, stage & decoration','Infrastructure',210000,210000,'Paid in full'],
    ['Artists & troupes','Programme',165000,47500,'Balance on festival day'],
    ['Annadanam provisions','Seva',98000,40000,'Partly sponsored'],
    ['Sound & lighting','Infrastructure',64000,20000,'Advance paid'],
    ['Printing & publicity','Publicity',28000,28000,'Paid in full'],
  ],
  /* day sheet rows: offering, devotee, nakshatra, qty, amount */
  sheet:[
    ['Utsava Bali sponsorship','Anand K','Rohini',1,2500],
    ['Annadanam (100 devotees)','Sreeja S · Dubai','Uthram',1,5000],
    ['Deepam','Rajesh Iyer','Chothi',5,500],
    ['Kalasam','Devi M','Makayiram',1,300],
    ['Deepam','Vinod K','Anizham',2,200],
  ],
}

/* ---------- VENDOR TYPE 3 · SERVICE PROVIDER ----------
   A person or team (priest, astrologer, performer) selling time-slot appointments,
   optionally also listing Special poojas. No daily chart, no 80G — reviews and slots matter. */
export const provider = {
  code:'SV-1042', name:'Prasad Nambeesan', ml:'പ്രസാദ് നമ്പീശൻ', kind:'Astrologer',
  place:'Koottur, Naduvannur, Kozhikode', exp:22, rating:4.8, reviews:63, languages:'Malayalam · English',
  plan:'Service Pro · valid to 4 Oct 2026', travelKm:25, slotMins:30, hours:'1:00 PM – 5:00 PM',
  expertise:['Horoscope','Rashi','Swarna Prasnam','Devaprasnam','Thamboolaprashnam','Muhoortham'],
  week:[['Mon',true],['Tue',true],['Wed',true],['Thu',true],['Fri',true],['Sat',true],['Sun',false]],
  /* time, devotee, service, mode, phone, status */
  today:[
    ['1:00 PM','Sreeja S','Jathakam consultation','In person','+91 94••• ••812','Confirmed'],
    ['1:30 PM','Anand K','Muhoortham','Phone','+91 94••• ••256','Confirmed'],
    ['2:00 PM','—','Open slot','—','—','Open'],
    ['2:30 PM','Rajesh Iyer','Prasnam (1 hr)','In person','+91 98••• ••441','Confirmed'],
    ['3:30 PM','Devi M','Horoscope reading','Phone','+91 97••• ••118','Rescheduled'],
    ['4:00 PM','Hari Menon','Muhoortham','Phone','+91 90••• ••402','Confirmed'],
    ['4:30 PM','—','Open slot','—','—','Open'],
  ],
  /* date, devotee, service, mode, amount, status */
  upcoming:[
    ['Sun 14 Sept · 1:00 PM','Lakshmi R','Jathakam consultation','In person',500,'Confirmed'],
    ['Mon 15 Sept · 2:30 PM','Vinod K','Prasnam (1 hr)','In person',1500,'Confirmed'],
    ['Wed 17 Sept · 10:00 AM','Kunnathumadom Devaswom','Devaprasnam','At temple',15000,'Advance paid'],
    ['Fri 19 Sept · 3:00 PM','Achuth P','Muhoortham','Phone',300,'Confirmed'],
  ],
  past:[
    ['10 Sept','Achuth P','Jathakam consultation',500,'Completed','4 ★'],
    ['9 Sept','Meera S','Muhoortham',300,'Completed','5 ★'],
    ['8 Sept','Vengamala Committee','Devaprasnam',15000,'Completed','—'],
    ['7 Sept','Rahul V','Prasnam (1 hr)',1500,'No-show','—'],
  ],
  /* name, ml, price, minutes, mode */
  services:[
    ['Jathakam consultation','ജാതക പരിശോധന',500,30,'In person / phone'],
    ['Prasnam','പ്രശ്നം',1500,60,'In person'],
    ['Swarna Prasnam','സ്വർണ പ്രശ്നം',5000,180,'At temple'],
    ['Muhoortham','മുഹൂർത്തം',300,15,'Phone'],
    ['Devaprasnam','ദേവപ്രശ്നം',15000,480,'At temple'],
  ],
  /* title, date, price, seats, booked, fulfilment */
  specials:[
    ['Ganapathi Homam at devotee\'s home','Sat 20 Sept',3500,4,3,'Proof pending for 2'],
    ['Navagraha Pooja','Sun 28 Sept',2500,6,2,'Upcoming'],
  ],
  /* date, name, phone, message, status */
  enquiries:[
    ['11 Sept','Vinod K','+91 96••• ••330','Swarna Prasnam for our family temple — are you free in October?','New'],
    ['11 Sept','Anjali T','+91 94••• ••905','Do you do online jathakam consultation for NRIs?','New'],
    ['10 Sept','Lakshmi R','+91 94••• ••771','Muhoortham for griha pravesham on 2 Nov','Replied'],
    ['9 Sept','Hari Menon','+91 90••• ••402','Devaprasnam cost for a small kavu near Perambra','Replied'],
  ],
  /* devotee, stars, tag, text, reply */
  feedback:[
    ['Achuth P',4,'Calm demeanor','Explained the jathakam patiently and did not rush the session.','Replied'],
    ['Sreeja S',5,'Accurate','The muhoortham he gave worked out perfectly for our family.','—'],
    ['Rajesh Iyer',5,'Knowledgeable','Deep knowledge of prasnam. Worth the wait for an appointment.','—'],
    ['Meera S',3,'—','Session started 20 minutes late, but the reading was good.','Needs reply'],
  ],
  /* period, appointments, collected, paid on, UTR, status */
  earnings:[
    ['1–7 Sept',18,9400,'8 Sept','FDRLN26251000512','Paid'],
    ['25–31 Aug',21,11150,'1 Sept','FDRLN26244000318','Paid'],
    ['18–24 Aug',16,7800,'25 Aug','FDRLN26237000201','Paid'],
  ],
}

export const gateways = {
  razorpay:{ name:'Razorpay', note:'TempleAddress collects · weekly payout to your bank', kind:'ta' },
  payu:{ name:'PayU', note:'TempleAddress collects · weekly payout', kind:'ta' },
  stripe:{ name:'Stripe', note:'International cards (NRI devotees) · TempleAddress collects', kind:'ta' },
  omniware:{ name:'Omniware · Federal Bank', note:'Temple\'s own merchant account · no TempleAddress payout', kind:'own' },
  bank:{ name:'No gateway — bank account only', note:'Devotees pay TempleAddress; accountant pays the temple manually by NEFT', kind:'manual' },
}
export const analytics = {
  traffic:[['Mar',12.4,3.1],['Apr',15.2,3.9],['May',18.9,4.8],['Jun',22.1,6.2],['Jul',31.4,8.9],['Aug',38.7,11.3],['Sep',44.2,13.8]],
  bookings:[['Mon',142],['Tue',118],['Wed',131],['Thu',97],['Fri',168],['Sat',214],['Sun',188]],
  channels:[{name:'Website',value:46},{name:'WhatsApp',value:31},{name:'Mobile app',value:18},{name:'QR board',value:5}],
}
