import { SelectableForTable } from "zapatos/schema";

export interface ParaTaskCard {
  task_id: string;
  first_name: string;
  last_name: string;
  description: string;
  category: string;
  due_date: Date;
  instructions: string | null;
  target_max_attempts: number | null;
}

export type Goal = SelectableForTable<"goal">;
export type Subgoal = SelectableForTable<"subgoal">;
