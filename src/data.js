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
