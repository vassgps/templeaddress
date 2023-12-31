import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateWithdrawFormTable1703331802169
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS withdrawform (
            id SERIAL PRIMARY KEY,
            active BOOLEAN DEFAULT true,
            form_id UUID DEFAULT uuid_generate_v4() UNIQUE,
            is_delete BOOLEAN DEFAULT false,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            tranaction_id VARCHAR(30) DEFAULT '',
            money INTEGER DEFAULT 0,
            payment_method VARCHAR(30) DEFAULT '',
            name VARCHAR(30) DEFAULT '',
            upi_code VARCHAR(30) DEFAULT '',
            account_number VARCHAR(30) DEFAULT '',
            status VARCHAR(30) DEFAULT '',
            ifsc_code VARCHAR(30) DEFAULT '',
            coins INTEGER DEFAULT 0,
            user_id INTEGER REFERENCES users(id) NOT NULL,
            admin_id INTEGER REFERENCES admin(id)
        );
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
