import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entity";

@Entity({name: 'temples' })
export class Temples {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  is_delete: boolean;

  @Column({ type: 'uuid', name: 'temple_id', unique: true , default: () => 'uuid_generate_v4()'})
  temple_id: string;
   
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: "" })
  donations_text:string;

  @Column()
  name: string;

  @Column({ default: "" })
  landmark: string;

  @Column({ type: "jsonb", default: [] })
  deity: string[];

  @Column({ default: "" })
  personal_number: string;

  @Column({ default: "" })
  thumbnail_image: string;

  @Column({ default: "" })
  contact_number: string;

  @Column({ default: "" })
  google_map_link: string;

  
  @Column({ default: "" })
  country:string;

  @Column({ default: "" })
  url:string;

  @Column({ default: "" })
  state:string;

  @Column({ default: "" })
  district:string;

  @Column({ default: "" })
  town:string;

  @Column({ default: "" })
  local_area:string;

  @Column({ default: "" })
  account_name:string

  @Column({ default: "" })
  account_number:string

  @Column({ default: "" })
  bank_name:string

  @Column({ default: "" })
  ifse_code:string

  
  @Column({ default: "" })
  google_map_embed_link:string

  @Column({ default: "" })
  upi_id:string

  @Column({ default: "" })
  qr_code:string
  
  @Column({ type: "jsonb", default: {}  })
  offerings:object

  @Column({ type: "jsonb", default: {}  })
  temple_timing:object

  @Column({ type: "jsonb", default: [] })
  images: string[];
  

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user_id: Users;
}
