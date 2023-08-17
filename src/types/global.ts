import { SelectableForTable } from "zapatos/schema";

export interface ParaTaskCard {
  task_id: string;
  first_name: string;
  last_name: string;
  category: string;
  description: string;
  instructions: string | null;
  target_max_attempts: number | null;
  due_date: Date;
  seen: boolean;
  trial_count: number;
  completed_trials: number | null;
}

export type Goal = SelectableForTable<"goal">;
export type Subgoal = SelectableForTable<"subgoal">;
