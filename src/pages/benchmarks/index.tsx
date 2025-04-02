import { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import Image from "next/image";

import { trpc } from "@/client/lib/trpc";
import TaskCard from "@/components/taskCard/TaskCard";
import FilterChip from "@/components/design_system/filterChip/FilterChip";
import { SortDirection, SortProperty, TaskData } from "@/types/global";

import noBenchmarks from "../../public/img/no-benchmarks-transparent.svg";
import type { NextPageWithLayout } from "../_app";

const Benchmarks: NextPageWithLayout = () => {
  const [sortProperty, setSortProperty] = useState<SortProperty>("first_name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const [displayedTasks, setDisplayedTasks] = useState<TaskData[]>([]);

  const { data: tasksData, isLoading } = trpc.para.getMyTasks.useQuery();

  useEffect(() => {
    if (!tasksData) {
      setDisplayedTasks([]);
    } else {
      setDisplayedTasks(
        [...tasksData].sort((a, b) => {
          if (a[sortProperty] < b[sortProperty])
            return sortDirection === "asc" ? -1 : 1;
          if (a[sortProperty] > b[sortProperty])
            return sortDirection === "asc" ? 1 : -1;
          return 0;
        })
      );
    }
  }, [sortDirection, sortProperty, tasksData]);

  const handleSort = (property: SortProperty) => {
    if (property === sortProperty) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortProperty(property);
      setSortDirection("asc");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {displayedTasks?.length === 0 ? (
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
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              mb: "2rem",
            }}
          >
            Sort:
            <FilterChip
              checkHidden={true}
              label="Sort"
              onClick={(option) => handleSort(option?.value as SortProperty)}
              options={[
                { label: "Date assigned", value: "created_at" },
                { label: "Student", value: "first_name" },
              ]}
              selectedValue={sortProperty}
            />
          </Box>
          <Box>
            {displayedTasks?.map((task) => {
              return (
                <div key={task.task_id}>
                  <TaskCard task={task} />
                </div>
              );
            })}
          </Box>
        </Box>
      )}
    </>
  );
};

Benchmarks.getBreadcrumbs = function getBreadcrumbs() {
  return undefined;
};

export default Benchmarks;
