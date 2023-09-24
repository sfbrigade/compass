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
  completed_trials: string | number | bigint | null;
}

export type Goal = SelectableForTable<"goal">;
export type Subgoal = SelectableForTable<"subgoal">;
export type Student = SelectableForTable<"student">;
export type Para = SelectableForTable<"user">;
export type Iep = SelectableForTable<"iep">;
export type StudentWithIep = Student & Iep;

export interface HeadCell {
  id: string;
  label: string;
  hasInput: boolean;
}

export interface StudentHeadCell extends HeadCell {
  id: keyof Student;
}

export interface ParaHeadCell extends HeadCell {
  id: keyof Para;
}

export interface IepHeadCell extends HeadCell {
  id: keyof Iep;
}

export type StudentWithIepHeadcell = StudentHeadCell | IepHeadCell;

export function isStudentWithIep(
  person: StudentWithIep | Para
): person is StudentWithIep {
  return (
    (person as StudentWithIep).student_id !== undefined &&
    (person as StudentWithIep).iep_id !== undefined
  );
}
