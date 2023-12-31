import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'admin' })
export class Admin {
  @PrimaryGeneratedColumn()
  id: string;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({
        type: "uuid",
        name: "admin_id",
        unique: true,
        default: () => "uuid_generate_v4()",
      })
      admin_id: string;

    @Column({ default: "" })
    refresh_token: string
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
  
    @Column({ unique: true ,default: ""})
    email: string;

    @Column({ default: "" })
    phone_number: string;
  
    @Column({ default: "" })
    password: string;
  
    
}

