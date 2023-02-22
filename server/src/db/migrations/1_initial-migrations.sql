CREATE EXTENSION "uuid-ossp";

CREATE TABLE "users" (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('para', 'case_manager', 'admin'))
);

CREATE TABLE "students" (
  student_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  assigned_case_manager_id UUID REFERENCES "users" (user_id) ON DELETE SET NULL
);
