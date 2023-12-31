import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1703331527753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            user_id UUID DEFAULT uuid_generate_v4() UNIQUE,
            refresh_token VARCHAR(1000) DEFAULT '',
            coins INTEGER DEFAULT 0,
            referral_code VARCHAR(1000) UNIQUE NULL,
            active BOOLEAN DEFAULT true,
            is_delete BOOLEAN DEFAULT false,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            name VARCHAR(50) DEFAULT '',
            email VARCHAR(30) UNIQUE DEFAULT '',
            phone_number VARCHAR(12) DEFAULT '',
            password VARCHAR(1000) DEFAULT '',
            otp VARCHAR(8) DEFAULT '',
            referrer_id INTEGER REFERENCES users(id) NULL
        );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
