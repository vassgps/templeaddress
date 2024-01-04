export interface User {
  id: string;
  uuid: string;
  username:string;
  mobile_number:string;
  first_name:string;
  user_id: string;
  referred_by: string;
  refresh_token: string;
  coins: number;
  referral_code: string;
  status: boolean;
  is_delete: boolean;
  created_at: Date;
  updated_at: Date;
  name: string;
  email: string;
  phone_number: string;
  wallet_balance:number
  referrer: User;
  accessToken: string;
  refreshToken: string;
  role: string;
}


export interface ServiceForm {
  name: string;
  account_name: string;
  service_areas?:string[];
  district: string;
  uuid?:string;
  state:string;
  gallery?:any,
  landmark:string;
  website:string;
  zipcode:string;
  town:string;
  bank_name:string;
  telephone:string;
  email: string;
  service: string;
  description: string;
  profile_page_link: string;
  location: string;
  address: string;
  time_slot_1: string;
  time_slot_2: string;
  time_slot_3: string;

  enable_booking: boolean;
  mobile: string;
  image: string;
  embedded_url?:string
  whatsapp_number:string;
  youtube_link?:string;
  map_url:string
  instagram_link:string
  facebook_link:string
  images:string[]


  acc_number?:string
  ifsc_code?:string
  upi_id?:string
}

export interface InputProps {
  type: "text" | "password" | "email" | "radio" | "number";
  err?: string;
  title: string;
  name: string;
  bg?: boolean;
  submit: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string|number;
  width?: boolean;
}

export interface Service {
  map_url:string;
  slug:string;
  acc_number:string;
  bank_name:string;
  gallery:any;
  social_media:any;
  status:boolean;
  mobile:string;
  uuid:string;
  account_name:string;
  id: number;
  ifsc_code:string;
  active: boolean;
  service_id: string;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  deity: string;
  service: string;
  description: string;
  location: string;
  address: string;
  service_areas: string;
  booking_available: string;
  consulting_time: string;
  contact_number: string;
  image: string;
  embedded_url?:string
  user_id: User;

  youtube_link?:string;
  whatsapp_number:string;
  google_map_link:string
  instagram_link:string
  facebook_link:string
  images:string[]

  donations_text?:string
  account_number?:string
  ifse_code?:string
  upi_id?:string
}

export interface Temple {
  social_media:any
  telephone:string;
  email:string;
  slug:string;
  image:string;
  deity_list: string[];
  gallery:any;
  deity:string;
  uuid:string;
  mobile:string;
  map_url:string;
  ifsc_code:string;
  zipcode:string;
  acc_number:string;
  time_slot_1:string;
  time_slot_2:string;
  time_slot_3:string;
  upi_qr:string;
  pooja_details:[{name:string,description:string,amount:string,booking_available:boolean}]
  embedded_url:string;

  id: string;
  temple_id:string;
  donations_text:string;
  status: boolean;
  is_delete: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  name: string;
  google_map_embed_link?:string
  landmark: string;
  personal_number: string;
  thumbnail_image: string;
  contact_number: string;
  google_map_link: string;
  images: string[];
  user_id: User;

  country?: string;
  state?: string;
  district?: string;
  town?: string;
  local_area?: string;
  account_name?: string;
  account_number?: string;
  bank_name?: string;
  ifse_code?: string;
  upi_id?: string;
  qr_code?: string;
}

export interface TempleForm {
  name:string;
  landmark:string;
  zipcode:string;
  uuid?:string;
  image:string;
  time_slot_1: string;
  time_slot_2: string;
  time_slot_3: string;
  gallery:any;
  website:string;
  email:string;

  deity: string;
  mobile: string;
  location:string;
  map_url: string;
  telephone: string;
  description: string;
  thumbnail_image?: string;
  images: string[];
  deity_list:string[]

  embedded_url?:string
  country?: string;
  state?: string;
  district?: string;
  town?: string;
  account_name?: string;
  acc_number?: string;
  bank_name?: string;
  ifsc_code?: string;
  upi_id?: string;
  upi_qr?: string;

  
}




export interface Pooja{
  amount:number;
  name:string
  booking_available?:boolean;
  description:string;
  temple_uuid?:string;
  uuid?:string;
  code?:string;
}
