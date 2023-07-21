CREATE EXTENSION "uuid-ossp";

CREATE TABLE "user" (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('staff', 'admin')),
  email TEXT UNIQUE NOT NULL,
  email_verified_at TIMESTAMPTZ,
  image_url TEXT
);

CREATE TABLE "paras_assigned_to_case_manager" (
  case_manager_id UUID REFERENCES "user" (user_id) NOT NULL,
  para_id UUID REFERENCES "user" (user_id) NOT NULL,
  PRIMARY KEY (case_manager_id, para_id)
);

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
  assigned_case_manager_id UUID REFERENCES "user" (user_id) ON DELETE SET NULL,
  grade SMALLINT
);

CREATE TABLE "file" (
  file_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  content_type TEXT NOT NULL,
  ext_s3_path TEXT NOT NULL UNIQUE,
  uploaded_by_user_id UUID REFERENCES "user" (user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "iep" (
  iep_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES "student" (student_id),
  case_manager_id UUID REFERENCES "user" (user_id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "goal" (
  goal_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- TODO: add index to allow reordering
  iep_id UUID REFERENCES "iep" (iep_id),
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  category TEXT NOT NULL CHECK (category IN ('writing', 'reading', 'math', 'other'))
);

CREATE TABLE "subgoal" (
  subgoal_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- TODO: add index to allow reordering
  goal_id UUID REFERENCES "goal" (goal_id),
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  instructions TEXT,
  target_max_attempts INTEGER --How many "questions" to administer in a single sitting

  -- Different collection types may be added later:
  -- collection_type TEXT NOT NULL CHECK (collection_type IN ('attempt', 'behavioral')),
);

CREATE TABLE "task" (
  task_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subgoal_id UUID REFERENCES "subgoal" (subgoal_id),
  assignee_id UUID REFERENCES "user" (user_id),
  due_date TIMESTAMPTZ NOT NULL
);

CREATE TABLE "trial_data" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subgoal_id UUID REFERENCES "subgoal" (subgoal_id),
  created_by_user_id UUID REFERENCES "user" (user_id),
  -- TODO: Possibly add optional reference to "task"
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  success_with_prompt INTEGER NOT NULL,
  success_without_prompt INTEGER NOT NULL,

  -- Optional depending on type of task
  notes TEXT,
  image_list TEXT[]
);

-- Potential schema for different collection types:
  -- type TEXT NOT NULL CHECK (type IN ('attempt', 'behavioral')) -- enum - type of subgoal
  -- data jsonb -- actual data, e.g. attempt_counts etc