import { trpc } from "@/client/lib/trpc";
import TaskCard from "@/components/taskCard/taskCard";
import $typo from "@/styles/Typography.module.css";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import noBenchmarks from "../../public/img/no-benchmarks.png";
import $button from "../../components/design_system/button/Button.module.css";
import Sort from "@mui/icons-material/Sort";
import FilterAlt from "@mui/icons-material/FilterAlt";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";

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
                  <TaskCard task={task} />
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
