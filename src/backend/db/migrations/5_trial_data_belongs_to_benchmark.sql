-- Step 1: Add new benchmark_id column to trial_data
ALTER TABLE trial_data
ADD COLUMN benchmark_id uuid REFERENCES benchmark(benchmark_id);

-- Step 2: Copy benchmark_id from tasks for existing records
UPDATE trial_data
SET benchmark_id = task.benchmark_id
FROM task
WHERE trial_data.task_id = task.task_id;

-- Step 3: Make benchmark_id required
ALTER TABLE trial_data
ALTER COLUMN benchmark_id SET NOT NULL;

-- Step 4: Remove task_id column
ALTER TABLE trial_data
DROP COLUMN task_id;