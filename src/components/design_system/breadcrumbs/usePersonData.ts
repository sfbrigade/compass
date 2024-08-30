import { trpc } from "@/client/lib/trpc";
import { SelectableForTable } from "zapatos/schema";

export type Student = SelectableForTable<"student">;
export type Para = SelectableForTable<"user">;
export type PersonData = Student | Para | undefined;

export const usePersonData = (paths: string[]): PersonData => {
  const { data: student } = trpc.student.getStudentById.useQuery(
    { student_id: paths[2] },
    { enabled: Boolean(paths[2] && paths[1] === "students") }
  );
  const { data: para } = trpc.para.getParaById.useQuery(
    { user_id: paths[2] },
    { enabled: Boolean(paths[2] && paths[1] === "staff") }
  );

  return student || para;
};
