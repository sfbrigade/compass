-- THIS IS FOR POPULATING A TEST STUDENT **ONLY**
-- DO NOT INCLUDE THIS FILE IN PULL REQUEST
-- from CLI in compass, run "psql -d compass -a -f src/backend/db/migrations/david_belinda.sql"


-- Make sure that we're working in compass
\c compass;

DO $$
DECLARE
  belinda_email TEXT;
  belinda_id UUID;
  belinda_iep_id UUID;
  goal_1_id UUID;
  goal_2_id UUID;
BEGIN

  SELECT 'david.belinda@gmail.com' INTO belinda_email;

  -- Need to clear old versions of David Belinda and all related documents
  -- Need to start from furthest out and work in, as remote keys do not
  -- have 'ON DELETE' conditions


  -- Delete all subgoals 
  DELETE FROM subgoal
    WHERE subgoal.goal_id IN (
      SELECT goal.goal_id
      FROM goal
      INNER JOIN iep 
      ON goal.iep_id=iep.iep_id 
      INNER JOIN student
      ON iep.student_id=student.student_id
      WHERE student.email=belinda_email
    );

  DELETE FROM goal
    WHERE goal.iep_id IN (
      SELECT iep.iep_id
      FROM iep
      INNER JOIN student
      ON iep.student_id=student.student_id
      WHERE student.email=belinda_email
    );

  DELETE FROM iep
    USING student
    WHERE iep.student_id = student.student_id
    AND student.email=belinda_email;

  DELETE FROM student WHERE student.email=belinda_email;

  -- All relevant Belinda docs should be clear, now re-seed

  -- Create David Belinda, get ID
  INSERT INTO student (first_name, last_name, email, grade)
    VALUES ('David', 'Belinda', belinda_email, 5)
    RETURNING student.student_id INTO belinda_id;

  -- Create IEP, get ID
  INSERT INTO iep (student_id, start_date, end_date)
    VALUES (belinda_id, '08-11-2023', '10-31-2023')
    RETURNING iep.iep_id INTO belinda_iep_id;

  -- Create first goal, get ID
  INSERT INTO goal (iep_id, description, category)
    VALUES (belinda_iep_id, 'By October, when given a list of 20 unfamiliar words that contain short-vowel sounds, David will decode them with 90% accuracy on each of 5 trials.', 'reading')
    RETURNING goal.goal_id INTO goal_1_id;

  -- Create second goal
  INSERT INTO goal (iep_id, description, category)
    VALUES (belinda_iep_id, 'By November, when given a list of 30 unfamiliar words that contain short-vowel sounds, David will decode them with 90% accuracy on each of 5 trials.', 'reading')
    RETURNING goal.goal_id INTO goal_2_id;


  -- Create subgoal 1 for goal 1
  INSERT INTO subgoal (goal_id, description, target_max_attempts)
    VALUES (goal_1_id, 'Decode 10 October words', 5);

  -- Create subgoal 2 for goal 1
  INSERT INTO subgoal (goal_id, description, target_max_attempts)
    VALUES (goal_1_id, 'Decode 10 more October words', 5);


  -- Create subgoal 1 for goal 2
  INSERT INTO subgoal (goal_id, description, target_max_attempts)
    VALUES (goal_2_id, 'Decode 10 November words', 5);

  -- Create subgoal 2 for goal 2
  INSERT INTO subgoal (goal_id, description, target_max_attempts)
    VALUES (goal_2_id, 'Decode 10 more November words', 5);

  -- Create subgoal 3 for goal 2
  INSERT INTO subgoal (goal_id, description, target_max_attempts)
    VALUES (goal_2_id, 'Decode the final 10 November words', 5);

END$$;