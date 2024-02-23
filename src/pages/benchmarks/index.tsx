import { trpc } from "@/client/lib/trpc";
import TaskCard from "@/components/taskCard/taskCard";
import $typo from "@/styles/Typography.module.css";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import FilterAlt from "@mui/icons-material/FilterAlt";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Sort from "@mui/icons-material/Sort";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import $button from "../../components/design_system/button/Button.module.css";
import noBenchmarks from "../../public/img/no-benchmarks.png";

function Benchmarks() {
  const [isPara, setIsPara] = useState(false);
  const { data: tasks, isLoading } = trpc.para.getMyTasks.useQuery();

  const handleTogglePara = () => {
    setIsPara(!isPara);
  };

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
        <Container sx={{ marginTop: "2rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>Assigned Students</h3>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <span>View - {isPara ? "Para" : "Case Manager"}</span>
              <button onClick={() => handleTogglePara()}>Toggle View</button>

              {/* May not be applicable to Para */}
              {!isPara ? (
                <span
                  style={{
                    display: "flex",
                    maxWidth: "fit-content",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <CheckBoxOutlineBlankOutlinedIcon /> Show all benchmarks
                </span>
              ) : null}
              <span
                className={`${$button.pilled}`}
                style={{
                  display: "flex",
                  maxWidth: "fit-content",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <FilterAlt /> Filter <KeyboardArrowDown />
              </span>
              <span
                className={`${$button.pilled}`}
                style={{
                  display: "flex",
                  maxWidth: "fit-content",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Sort /> Sort <KeyboardArrowDown />
              </span>
            </div>
          </Box>

          <Box sx={{ height: "75vh", overflowY: "scroll" }}>
            {tasks?.map((task) => {
              return (
                <div key={task.task_id} className={$typo.noDecoration}>
                  {isPara ? (
                    <Link
                      href={`/benchmarks/${task.task_id}`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <TaskCard task={task} isPara={isPara} />
                    </Link>
                  ) : (
                    <TaskCard task={task} isPara={isPara} />
                  )}
                </div>
              );
            })}
          </Box>
        </Container>
      )}
    </>
  );
}

export default Benchmarks;
