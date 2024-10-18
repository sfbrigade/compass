-- Each task should have a unique subgoal_id - assignee_id combination
-- which corresponds to a unique benchmark / para combo
ALTER TABLE task
ADD CONSTRAINT UC_Task UNIQUE (subgoal_id, assignee_id);

-- Add index to allow easy queries of tasks by assignee
CREATE INDEX idx_task_assignee ON task(assignee_id);