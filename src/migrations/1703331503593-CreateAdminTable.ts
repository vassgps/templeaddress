import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateAdminTable1703331503593 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS admin (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      admin_id UUID DEFAULT uuid_generate_v4() UNIQUE,
      refresh_token VARCHAR(1000) DEFAULT '',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      email VARCHAR(1000) UNIQUE NOT NULL,
      phone_number VARCHAR(12) DEFAULT '',
      password VARCHAR(1000) DEFAULT ''
     );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
