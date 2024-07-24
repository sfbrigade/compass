import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import $GoalPage from "@/styles/GoalPage.module.css";
import $button from "@/components/design_system/button/Button.module.css";
import Link from "next/link";
import { Typography } from "@mui/material";
import Subgoals from "@/components/subgoal/Subgoal";
import { type Subgoal } from "@/types/global";
import Benchmarks from "./Benchmarks";
import NoBenchmarksGraphic from "./NoBenchmarksGraphic";
export enum selectableTabs {
  ALL,
  COMPLETE,
}

export interface SelectableTabProps {
  text: string;
  value: selectableTabs;
  handleSelect: (e: MouseEvent) => void;
  currentlySelected: selectableTabs;
}

const SelectableTab = ({
  text,
  value,
  handleSelect,
  currentlySelected,
}: SelectableTabProps) => {
  return (
    <div
      className={`${$GoalPage.benchmarksTab}
        ${value === currentlySelected ? $GoalPage.benchmarksTabSelected : ""} `}
      onClick={(e) => {
        handleSelect(e);
      }}
    >
      {text}
    </div>
  );
};

export default function BenchmarksContainer({
  subgoals,
}: {
  subgoals: Subgoal[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<selectableTabs>(
    selectableTabs.ALL
  );
  return (
    <Stack sx={{ width: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
          justifyContent: "space-between",
        }}
      >
        {/* tabs with "all" and "completed" */}
        <Box className={$GoalPage.benchmarksBox} justifyContent="flex-start">
          <SelectableTab
            text={`All (${subgoals.length})`}
            value={selectableTabs.ALL}
            handleSelect={() => {
              setActiveTab(selectableTabs.ALL);
            }}
            currentlySelected={activeTab}
          />

          <SelectableTab
            text={`Completed (${
              subgoals.filter((goal) => goal.status === "Complete").length
            })`}
            value={selectableTabs.COMPLETE}
            handleSelect={() => {
              setActiveTab(selectableTabs.COMPLETE);
            }}
            currentlySelected={activeTab}
          />
        </Box>
        <br />

        {/* Create benchmark button */}
        <Box>
          <Link className={$button.default} href={`${router.asPath}/create`}>
            Create benchmark
          </Link>
        </Box>
      </Box>

      {/* The white box below the tabs */}
      <Grid container className={$GoalPage.benchmarksContainer}>
        <Grid sx={{ width: "100%" }} item>
          {subgoals?.length !== 0 ? (
            <Benchmarks
              subgoals={subgoals}
              activeTab={activeTab}
              selectableTabs={selectableTabs}
            />
          ) : (
            <NoBenchmarksGraphic />
          )}
        </Grid>
      </Grid>
    </Stack>
  );
}
