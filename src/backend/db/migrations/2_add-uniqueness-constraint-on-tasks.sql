-- Each task should have a unique benchmark_id - assignee_id combination
-- which corresponds to a unique benchmark / para combo
ALTER TABLE task
ADD CONSTRAINT benchmark_assignee_unique UNIQUE (benchmark_id, assignee_id);

-- Add index to allow easy queries of tasks by assignee
CREATE INDEX idx_task_assignee ON task(assignee_id);