import { SelectableForTable } from "zapatos/schema";

export interface ParaTaskCard {
  task_id: string;
  first_name: string;
  last_name: string;
  description: string;
  category: string;
  due_date: Date;
  seen: boolean;
  instructions: string | null;
  success_with_prompt: number | null;
  success_without_prompt: number | null;
  target_max_attempts: number | null;
  submitted: boolean | null;
}

export type Goal = SelectableForTable<"goal">;
export type Subgoal = SelectableForTable<"subgoal">;
