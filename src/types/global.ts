import { SelectableForTable } from "zapatos/schema";

export type Goal = SelectableForTable<"goal">;
export type Benchmark = SelectableForTable<"benchmark">;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type FormEvent = React.FormEvent<HTMLFormElement>;

export type SortProperty = "first_name" | "created_at";
export type SortDirection = "asc" | "desc";

export interface TaskData {
  task_id: string;
  first_name: string;
  last_name: string;
  category: string;
  description: string;
  instructions: string | null;
  attempts_per_trial: number | null;
  number_of_trials: number | null;
  due_date: Date | null;
  trial_count: number | null;
  seen: boolean;
  completed_trials: string | number | bigint | null;
  created_at: Date;
  benchmark_id: string;
}
