import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entity";

@Entity({ name: "services" })
export class Services  {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: true })
  active: boolean;

  @Column({
    type: "uuid",
    name: "service_id",
    unique: true,
    default: () => "uuid_generate_v4()",
  })
  service_id: string;

  @Column({ default: false })
  is_delete: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: "" })
  deity: string;

  @Column({ default: "" })
  service: string;

  @Column({ default: "" })
  description: string;

  @Column({ default: "" })
  location: string;

  @Column({ default: "" })
  address: string;

  @Column({ default: "" })
  service_areas: string;

  @Column({ default: "" })
  whatsapp_number: string;

  @Column({ default: "" })
  google_map_link: string;

  @Column({ default: "" })
  url: string;

  @Column({ default: "" })
  google_map_embed_link: string;

  @Column({ default: "" })
  instagram_link: string;

  @Column({ default: "" })
  facebook_link: string;

  @Column({ default: "" })
  youtube_link: string;

  @Column({ default: "" })
  landmark: string;

  @Column({ default: "" })
  donations_text: string;

  @Column({ default: "" })
  account_number: string;

  @Column({ default: "" })
  ifse_code: string;

  @Column({ default: "" })
  upi_id: string;

  @Column({ type: "jsonb", default: [] })
  images: string[];

  @Column({ default: "" })
  booking_available: string;

  @Column({ type: "jsonb", default: [] })
  consulting_time: string[];

  @Column({ default: "" })
  contact_number: string;

  @Column({ default: "" })
  image: string;

  @Column({ default: "" })
  profile_page_link: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user_id: Users;
}
