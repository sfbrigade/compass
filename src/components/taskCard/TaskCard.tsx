import { format } from "date-fns";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import Card from "../design_system/card/Card";

interface ParaTaskCard {
  // this should be based on TaskData, maybe have some Omit's.
  task_id: string;
  first_name: string;
  last_name: string;
  category: string;
  description: string;
  instructions: string | null;
  number_of_trials: number | null;
  due_date: Date | null;
  seen: boolean;
  trial_count: number | null;
  completed_trials: string | number | bigint | null;
  benchmark_id: string;
}

interface TaskCardProps {
  task: ParaTaskCard;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const router = useRouter();

  const completionRate = useMemo(() => {
    const num = parseInt(task.completed_trials as string) || 0;
    const calculatedRate = Math.floor(
      (num / (task.number_of_trials ?? 1)) * 100,
    );
    return calculatedRate;
  }, [task.completed_trials, task.number_of_trials]);

  return (
    <Card
      button="Collect Data"
      eyebrow={
        !task.seen
          ? "NEW"
          : completionRate >= 100
            ? "DONE"
            : `DUE: ${
                task.due_date ? format(task.due_date, "MM-dd-yyyy") : "N/A"
              }`
      }
      header={`${task.first_name} ${task.last_name}`}
      onClick={() => router.push(`/benchmarks/${task.benchmark_id}`)}
      sx={{ mb: "1.5rem" }}
    >
      {task?.description}
    </Card>
  );
};

export default TaskCard;
