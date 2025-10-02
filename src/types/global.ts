import { RouterOutputs } from "@/client/lib/trpc";
import { SelectableForTable } from "zapatos/schema";

export type Benchmark = RouterOutputs["iep"]["getBenchmark"];
export type Goal = SelectableForTable<"goal">;
export type Para = RouterOutputs["para"]["getParaById"];
export type Student = RouterOutputs["student"]["getStudentById"];
export type User = SelectableForTable<"user">;

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

export interface DatePoint {
  x: number;
  y: number;
  id: string;
}

export interface SoloPoint extends DatePoint {
  staffName: string;
  success: number;
  numberOfAttempts: number;
}

export interface BulkPoint extends DatePoint {
  staffNames: string[];
  numberOfTrials: number;
}

export type TrialData = {
  success: number;
  created_at: Date;
  unsuccess: number;
  first_name: string;
  last_name: string;
  trial_data_id: string;
};

export interface ProcessedTrialData extends TrialData {
  successRate: number;
  staffName: string;
  numberOfAttempts: number;
}

export const valueFormatter = (point: SoloPoint | BulkPoint): string => {
  if ("numberOfTrials" in point) {
    return `${point.y.toFixed(1)}% avg (${point.numberOfTrials} trials)`;
  } else {
    return `${point.y.toFixed(1)}% avg over ${point.numberOfAttempts} attempt${
      point.numberOfAttempts !== 1 ? "s" : ""
    }`;
  }
};
