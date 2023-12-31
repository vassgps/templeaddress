import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entity";
import { Admin } from "./admin.entity";

@Entity({ name: 'withdrawform' })
export class WithdrawForm {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ default: true })
  active: boolean;

  @Column({
    type: "uuid",
    name: "form_id",
    unique: true,
    default: () => "uuid_generate_v4()",
  })
  form_id: string;

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

  @Column({ default: "" })
  tranaction_id: string;

  @Column({ default: 0 })
  money: number;

  @Column({ default: "" })
  payment_method: string;

  @Column({ default: "" })
  name: string;

  @Column({ default: "" })
  upi_code: string;

  @Column({ default: "" })
  account_number: string;

  @Column({ default: "" })
  status: string;

  @Column({ default: "" })
  ifsc_code: string;

  @Column({ default: 0 })
  coins: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user_id: Users;

  @ManyToOne(() => Admin, { nullable: true })
  @JoinColumn({ name: "admin_id" })
  admin_id: Admin | null;
}
