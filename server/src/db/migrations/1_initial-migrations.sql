CREATE EXTENSION "uuid-ossp";

CREATE TABLE student (
  student_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birth_year INT NOT NULL
);

CREATE TABLE task (
  task_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  tools TEXT[] NOT NULL,
  setup TEXT NOT NULL,
  student_id UUID NOT NULL REFERENCES student(student_id),
  -- todo: add reference to the case manager who created this task
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE DOMAIN task_question_jsonb AS JSONB;

CREATE TABLE task_question (
  task_question_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES task(task_id),
  question task_question_jsonb NOT NULL,
  type TEXT GENERATED ALWAYS AS (question->>'type') STORED,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE task_attempt (
  task_attempt_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_id UUID NOT NULL REFERENCES task(task_id),
  student_id UUID NOT NULL REFERENCES student(student_id),
  -- todo: add reference to the para who administered this attempt
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE DOMAIN task_attempt_question_answer_jsonb AS JSONB;

CREATE TABLE task_attempt_question_answer (
  task_attempt_question_answer_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_attempt_id UUID NOT NULL REFERENCES task_attempt(task_attempt_id),
  task_question_id UUID NOT NULL REFERENCES task_question(task_question_id),
  answer task_attempt_question_answer_jsonb NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
