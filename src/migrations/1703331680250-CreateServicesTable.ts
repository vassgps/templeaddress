import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateServicesTable1703331680250 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    active BOOLEAN DEFAULT true,
    service_id UUID DEFAULT uuid_generate_v4() UNIQUE,
    is_delete BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    name VARCHAR(1000) NOT NULL,
    email VARCHAR(1000) NOT NULL,
    deity VARCHAR(1000) DEFAULT '',
    service VARCHAR(1000) DEFAULT '',
    description VARCHAR(1000) DEFAULT '',
    location VARCHAR(1000) DEFAULT '',
    address VARCHAR(1000) DEFAULT '',
    service_areas VARCHAR(1000) DEFAULT '',
    whatsapp_number VARCHAR(12) DEFAULT '',
    google_map_link VARCHAR(1000) DEFAULT '',
    url VARCHAR(1000) DEFAULT '',
    google_map_embed_link VARCHAR(1000) DEFAULT '',
    instagram_link VARCHAR(1000) DEFAULT '',
    facebook_link VARCHAR(1000) DEFAULT '',
    youtube_link VARCHAR(1000) DEFAULT '',
    landmark VARCHAR(100) DEFAULT '',
    donations_text VARCHAR(1000) DEFAULT '',
    account_number VARCHAR(50) DEFAULT '',
    ifse_code VARCHAR(50) DEFAULT '',
    upi_id VARCHAR(30) DEFAULT '',
    images JSONB DEFAULT '[]',
    booking_available VARCHAR(100) DEFAULT '',
    consulting_time JSONB DEFAULT '[]',
    contact_number VARCHAR(12) DEFAULT '',
    image VARCHAR(100) DEFAULT '',
    profile_page_link VARCHAR(1000) DEFAULT '',
    user_id INTEGER REFERENCES users(id) NOT NULL
);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
