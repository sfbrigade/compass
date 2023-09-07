import { SelectableForTable } from "zapatos/schema";

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

export function isStudent(person: Student | Para): person is Student {
  return (person as Student).student_id !== undefined;
}
