import { SelectableForTable } from "zapatos/schema";

export type Goal = SelectableForTable<"goal">;
export type Benchmark = SelectableForTable<"benchmark">;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type FormEvent = React.FormEvent<HTMLFormElement>;

export type SortProperty = "first_name";
export type SortDirection = "asc" | "desc";
