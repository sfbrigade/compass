export interface Person {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  dateAdded?: string;
}

export interface Para extends Person {
  user_id: string;
  last_update: string;
  active_benchmarks: number;

  student_id?: never;
  assigned_case_manager_id?: never;
}

export interface Student extends Person {
  student_id: string;
  assigned_case_manager_id: string;

  user_id?: never;
  last_update?: never;
  active_benchmarks?: never;
}

export type UserKeys = keyof Para | keyof Student;

export interface HeadCell {
  id: UserKeys;
  label: string;
  hasInput: boolean;
}
