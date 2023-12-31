BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

CREATE TABLE IF NOT EXISTS admin (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    admin_id UUID DEFAULT uuid_generate_v4() UNIQUE,
    refresh_token VARCHAR(1000) DEFAULT '',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    email VARCHAR(1000) UNIQUE NOT NULL,
    phone_number VARCHAR(12) DEFAULT '',
    password VARCHAR(1000) DEFAULT ''
);

CREATE TABLE IF NOT EXISTS coin (
    id SERIAL PRIMARY KEY,
    coins_id UUID DEFAULT uuid_generate_v4() UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    one_coins VARCHAR(1000) DEFAULT '',
    admin_id INTEGER REFERENCES admin(id)
);

CREATE TABLE IF NOT EXISTS services (
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

CREATE TABLE IF NOT EXISTS temples (
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

COMMIT;



-- npx typeorm migration:run
