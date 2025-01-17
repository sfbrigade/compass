-- Step 1: Add new benchmark_id column to trial_data
ALTER TABLE trial_data
ADD COLUMN benchmark_id uuid REFERENCES benchmark(benchmark_id);

-- Step 1a: Add due_date and trial_count to benchmark

ALTER TABLE benchmark
ADD COLUMN due_date TIMESTAMPTZ;

ALTER TABLE benchmark
ADD COLUMN trial_count INTEGER;

-- Step 2: Copy benchmark_id from tasks for existing records
UPDATE trial_data
SET benchmark_id = task.benchmark_id
FROM task
WHERE trial_data.task_id = task.task_id;

-- Step 2a: Copy due_date and trial_count from tasks for existing records
-- Taking the first result of tasks that matches the right benchmark_id

UPDATE benchmark
SET due_date = task.due_date, trial_count = task.trial_count
FROM task
WHERE task.benchmark_id = benchmark.benchmark_id;

-- Step 3: Make benchmark_id required
ALTER TABLE trial_data
ALTER COLUMN benchmark_id SET NOT NULL;

-- Step 4: Remove task_id column
ALTER TABLE trial_data
DROP COLUMN task_id;

-- Step 4a: Remove due_date, and trial_count from task

ALTER TABLE task
DROP COLUMN due_date;

ALTER TABLE task
DROP COLUMN trial_count;