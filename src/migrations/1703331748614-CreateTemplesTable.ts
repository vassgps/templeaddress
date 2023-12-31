import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTemplesTable1703331748614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS temples (
    id SERIAL PRIMARY KEY,
    active BOOLEAN DEFAULT true,
    is_delete BOOLEAN DEFAULT false,
    temple_id UUID DEFAULT uuid_generate_v4() UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    description VARCHAR(1000) DEFAULT '',
    donations_text VARCHAR(1000) DEFAULT '',
    name VARCHAR(30) NOT NULL,
    landmark VARCHAR(30) DEFAULT '',
    deity JSONB DEFAULT '[]',
    personal_number VARCHAR(12) DEFAULT '',
    thumbnail_image VARCHAR(100) DEFAULT '',
    contact_number VARCHAR(12) DEFAULT '',
    google_map_link VARCHAR(1000) DEFAULT '',
    country VARCHAR(30) DEFAULT '',
    url VARCHAR(1000) DEFAULT '',
    state VARCHAR(1000) DEFAULT '',
    district VARCHAR(1000) DEFAULT '',
    town VARCHAR(100) DEFAULT '',
    local_area VARCHAR(100) DEFAULT '',
    account_name VARCHAR(50) DEFAULT '',
    account_number VARCHAR(50) DEFAULT '',
    bank_name VARCHAR(50) DEFAULT '',
    ifse_code VARCHAR(50) DEFAULT '',
    google_map_embed_link VARCHAR(1000) DEFAULT '',
    upi_id VARCHAR(50) DEFAULT '',
    qr_code VARCHAR(1000) DEFAULT '',
    offerings JSONB DEFAULT '{}',
    temple_timing JSONB DEFAULT '{}',
    images JSONB DEFAULT '[]',
    user_id INTEGER REFERENCES users(id) NOT NULL
);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
