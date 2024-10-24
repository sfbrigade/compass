-- Step 1: Drop the existing check constraint if it exists
ALTER TABLE "public"."user" DROP CONSTRAINT IF EXISTS user_role_check;

-- Step 3: Update existing roles
UPDATE "public"."user" SET role = 'case_manager' WHERE role = 'admin';
UPDATE "public"."user" SET role = 'para' WHERE role = 'staff';

-- Step 2: Add the new check constraint with the updated roles
ALTER TABLE "public"."user" ADD CONSTRAINT user_role_check 
CHECK (role = ANY (ARRAY['user'::text, 'para'::text, 'case_manager'::text, 'admin'::text]));


-- Step 4: Add a comment to the table explaining the role values
COMMENT ON COLUMN "public"."user".role IS 'User role: user, para, case_manager, or admin';
