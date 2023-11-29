import ParaNav from "@/components/paraNav/ParaNav";
import React from "react";
import $box from "@/styles/Box.module.css";
import $taskCard from "@/components/taskCard/TaskCard.module.css";
import $button from "@/styles/Button.module.css";
import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import { format } from "date-fns";
import Link from "next/link";

const StudentProfilePage = () => {
  const router = useRouter();
  const { benchmark_id } = router.query;
  const { data: student, isLoading } = trpc.student.getStudentByTaskId.useQuery(
    { task_id: benchmark_id as string },
    { enabled: Boolean(benchmark_id) }
  );

  if (!student || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ParaNav />
      <div className={`${$box.default} ${$taskCard.profile}`}>
        <div className={$taskCard.image}></div>
        <h4>
          {student.first_name} {student.last_name}
        </h4>
        <div className={$taskCard.dateFloater}>
          Due: {student.due_date ? format(student.due_date, "MM-dd-yyyy") : ""}
        </div>
      </div>
      <div className={$box.default}>
        <h4>Diagnosis:</h4>
        <p>*Insert student diagnosis here*</p>
      </div>
      <div className={$box.default}>
        <h4>Specific notes:</h4>
        <p>*Insert specific notes here*</p>
      </div>
      <Link
        href={`/benchmarks/${benchmark_id as string}`}
        className={`${$button.default} ${$button.fixedToBottom}`}
      >
        Collect data
      </Link>
    </div>
  );
};

export default StudentProfilePage;
