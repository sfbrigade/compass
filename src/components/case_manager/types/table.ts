export interface Person {
  first_name: string;
  last_name: string;
  email: string;
}

export interface Para extends Person {
  user_id: string;
  para_id: string;
  case_manager_id: string;
  email_verified_at: string | null;
  image_url: string;
  role: "admin" | "staff";

  student_id?: never;
  assigned_case_manager_id?: never;
}

export interface Student extends Person {
  student_id: string;
  assigned_case_manager_id: string;

  user_id?: never;
  para_id?: never;
  case_manager_id?: never;
  email_verified_at?: never;
  image_url?: never;
  role?: never;
}

export type UserKeys = keyof Para | keyof Student;

export interface HeadCell {
  id: UserKeys;
  label: string;
  hasInput: boolean;
}
