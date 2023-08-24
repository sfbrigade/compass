import { SelectableForTable } from "zapatos/schema";

export type Student = SelectableForTable<"student">;
export type Para = SelectableForTable<"user">;

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

export function isStudent(person: Student | Para): person is Student {
  return (person as Student).student_id !== undefined;
}
