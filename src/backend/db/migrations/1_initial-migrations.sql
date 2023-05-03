CREATE EXTENSION "uuid-ossp";

CREATE TABLE "user" (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('para', 'case_manager', 'admin')),
  email TEXT UNIQUE NOT NULL,
  email_verified_at TIMESTAMPTZ,
  image_url TEXT
);

-- table for CM's para list will go here


-- This table is managed by Auth.js via our adapter at backend/auth/adapter.ts
-- See https://authjs.dev/reference/adapters#models for more details
CREATE TABLE "account" (
  account_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES "user" (user_id) ON DELETE CASCADE,
  provider_name TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  access_token TEXT,
  refresh_token TEXT,
  expires_at INT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  UNIQUE (provider_name, provider_account_id)
);

CREATE TABLE "session" (
  session_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES "user" (user_id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE TABLE "student" (
  student_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  assigned_case_manager_id UUID REFERENCES "user" (user_id) ON DELETE SET NULL
);

CREATE TABLE "cm_to_student" (
  relation_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assigned_case_manager_id UUID REFERENCES "user" (user_id) ON DELETE SET NULL,
  student_id UUID REFERENCES "student" (student_id) ON DELETE SET NULL
);