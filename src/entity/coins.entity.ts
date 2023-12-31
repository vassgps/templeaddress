import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Admin } from "./admin.entity";

@Entity({ name: "coin" })
export class Coin {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "uuid",
    name: "coins_id",
    unique: true,
    default: () => "uuid_generate_v4()",
  })
  coins_id: string;
  
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: string;
  
  @Column({ default: "" })
  one_coins: string;

  
  @ManyToOne(() => Admin, { nullable: true })
  @JoinColumn({ name: 'admin_id' })
  admin_id: Admin|null
}
