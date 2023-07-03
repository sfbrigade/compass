import { SelectableForTable } from "zapatos/schema";

export type Student = SelectableForTable<"student">;
export type Para = SelectableForTable<"user">;

export type UserKeys = keyof Para | keyof Student;

export interface HeadCell {
  id: UserKeys;
  label: string;
  hasInput: boolean;
}

export function isStudent(person: Student | Para): person is Student {
  return (person as Student).student_id !== undefined;
}
