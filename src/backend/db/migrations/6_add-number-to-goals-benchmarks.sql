ALTER TABLE goal
ADD COLUMN number INTEGER;

ALTER TABLE benchmark
ADD COLUMN number INTEGER;

UPDATE goal g
SET number=(SELECT COUNT(*) FROM goal WHERE goal.iep_id=g.iep_id AND goal.created_at <= g.created_at);

UPDATE benchmark b
SET number=(SELECT COUNT(*) FROM benchmark WHERE benchmark.goal_id=b.goal_id AND benchmark.created_at <= b.created_at);

ALTER TABLE goal
ALTER COLUMN iep_id SET NOT NULL;

ALTER TABLE goal
ALTER COLUMN number SET NOT NULL;

CREATE UNIQUE INDEX goal_iep_id_number_idx ON goal(iep_id, number);

ALTER TABLE benchmark
ALTER COLUMN goal_id SET NOT NULL;

ALTER TABLE benchmark
ALTER COLUMN number SET NOT NULL;

CREATE UNIQUE INDEX benchmark_goal_id_number_idx ON benchmark(goal_id, number);
