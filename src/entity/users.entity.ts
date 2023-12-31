import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id: string;
  
  @Column({ type: 'uuid', name: 'user_id', unique: true , default: () => 'uuid_generate_v4()'})
  user_id: string;
  
  @Column({ default: "" })
  refresh_token: string

  @Column({ default: 0 })
  coins:number
  
  @Column({ unique: true, nullable: true })
  referral_code: string

  @Column({ default: true })
  active: boolean;

  @Column({ default: false })
  is_delete: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ default: "" })
  name: string;

  @Column({ unique: true , default: "" })
  email: string;

  @Column({ default: "" })
  phone_number: string;

  @Column({ default: "" })
  password: string;

  @Column({ default: "" })
  otp: string;

  @ManyToOne(() => Users, { nullable: true })
  @JoinColumn({ name: 'referrer' })
  referrer: Users|null
  
}
