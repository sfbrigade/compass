import { trpc } from "@/client/lib/trpc";
import { SelectableForTable } from "zapatos/schema";

export type Student = SelectableForTable<"student">;
export type Para = SelectableForTable<"user">;
export type PersonData = Student | Para | undefined;

export const usePersonData = (query: Record<string, string>): PersonData => {
  const { data: student } = trpc.student.getStudentById.useQuery(
    { student_id: query.student_id },
    { enabled: query.student_id !== undefined }
  );
  const { data: para } = trpc.para.getParaById.useQuery(
    { user_id: query.user_id },
    { enabled: query.user_id !== undefined }
  );

  return student || para;
};
