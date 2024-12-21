-- Each task should have a created_at date so that we can sort by assigned date
-- NOTE: This relies on the assigned date never changing; if the app allows changes, we will likely want create a dedicated assigned_on date in addition to (or instead of) this column 
ALTER TABLE task
ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT NOW();

-- Add index to allow easy queries of tasks by date
CREATE INDEX idx_created_at ON task(created_at);
