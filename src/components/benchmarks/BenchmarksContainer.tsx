import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import $GoalPage from "@/styles/GoalPage.module.css";
import $button from "@/components/design_system/button/Button.module.css";
import Link from "next/link";
import { type Subgoal } from "@/types/global";
import BenchmarkListElement from "./BenchmarkListElement";
import NoBenchmarksGraphic from "./NoBenchmarksGraphic";

export enum selectableTabs {
  ALL,
  COMPLETE,
}
const tabMapping = {
  [selectableTabs.ALL]: {
    status: "All",
    message: "No benchmarks",
  },

  //Status text must match the status in the database
  [selectableTabs.COMPLETE]: {
    status: "Complete",
    message: "No completed benchmarks",
  },
};
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
      {/* Render <NoBenchmarksGraphic /> if no benchmarks present*/}
      <Grid container className={$GoalPage.benchmarksContainer}>
        <Grid sx={{ width: "100%" }} item>
          {(() => {
            const { status, message } = tabMapping[activeTab];
            const filteredSubgoals = subgoals.filter((subgoal) =>
              status === "All" ? true : subgoal.status === status
            );

            return filteredSubgoals.length === 0 ? (
              <NoBenchmarksGraphic blurb={message} />
            ) : (
              filteredSubgoals.map((subgoal, index) => (
                <BenchmarkListElement
                  key={subgoal.subgoal_id}
                  subgoal={subgoal}
                  index={index}
                />
              ))
            );
          })()}
        </Grid>
      </Grid>
    </Stack>
  );
}
