export interface ParaTaskCard {
  first_name: string;
  last_name: string;
  description: string;
  subgoal_type: string;
  due_date: Date;
  instructions: string | null;
  task_id: string;
}
