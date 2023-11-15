import React from "react";
import TaskCard from "@/components/taskCard/taskCard";
import { trpc } from "@/client/lib/trpc";
import $typo from "@/styles/Typography.module.css";
import { Container, Box } from "@mui/material";
import Image from "next/image";
import noBenchmarks from "../../public/img/no-benchmarks.png";

function Benchmarks() {
  const { data: tasks, isLoading } = trpc.para.getMyTasks.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {tasks?.length === 0 ? (
        <Container sx={{ marginTop: "4rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            gap={1.5}
          >
            <Image src={noBenchmarks} alt="empty benchmark" width={250} />
            <p>No assigned benchmarks yet!</p>
            <p style={{ color: "var(--grey-20)", textAlign: "center" }}>
              Contact your case manager for your assignment.
            </p>
          </Box>
        </Container>
      ) : (
        <ul>
          {tasks?.map((task) => {
            return (
              <li key={task.task_id} className={$typo.noDecoration}>
                <TaskCard task={task} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default Benchmarks;
