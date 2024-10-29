import { trpc } from "@/client/lib/trpc";
import { SelectableForTable } from "zapatos/schema";

export type Student = SelectableForTable<"student">;
export type Para = SelectableForTable<"user">;
export interface BreadcrumbContext {
  person: Student | Para | undefined;
}

export const useBreadcrumbContext = (
  query: Record<string, string>
): BreadcrumbContext => {
  const { data: student } = trpc.student.getStudentById.useQuery(
    { student_id: query.student_id },
    { enabled: query.student_id !== undefined }
  );
  const { data: para } = trpc.para.getParaById.useQuery(
    { user_id: query.user_id },
    { enabled: query.user_id !== undefined }
  );

  return { person: student || para };
};
