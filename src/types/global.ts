import { SelectableForTable } from "zapatos/schema";

export type Goal = SelectableForTable<"goal">;
export type Subgoal = SelectableForTable<"subgoal">;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type FormEvent = React.FormEvent<HTMLFormElement>;
export enum UserType {
  User = "user",
  Para = "para",
  CaseManager = "case_manager",
  Admin = "admin",
}
