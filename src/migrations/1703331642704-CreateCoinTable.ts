import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateCoinTable1703331642704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS coin (
            id SERIAL PRIMARY KEY,
            coins_id UUID DEFAULT uuid_generate_v4() UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            one_coins VARCHAR(10) DEFAULT '',
            admin_id INTEGER REFERENCES admin(id)
        );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
