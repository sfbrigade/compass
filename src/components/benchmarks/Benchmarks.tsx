import NoBenchmarksGraphic from "./NoBenchmarksGraphic";
import Subgoals from "@/components/subgoal/Subgoal";
import { type Subgoal } from "@/types/global";
import { type selectableTabs as selectableTabsType } from "./BenchmarksContainer";

export default function Benchmarks({
  subgoals,
  activeTab,
  selectableTabs,
}: {
  subgoals: Subgoal[];
  activeTab: selectableTabsType;
  selectableTabs: typeof selectableTabsType;
}) {
  return (
    <>
      {(() => {
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

        const { status, message } = tabMapping[activeTab];

        const filteredSubgoals =
          (status === "All"
            ? subgoals
            : subgoals?.filter((subgoal) => subgoal.status === status)) || [];
        return filteredSubgoals.length === 0 ? (
          <NoBenchmarksGraphic blurb={message} />
        ) : (
          filteredSubgoals.map((subgoal, index) => (
            <Subgoals
              key={subgoal.subgoal_id}
              subgoal={subgoal}
              index={index}
            />
          ))
        );
      })()}
    </>
  );
}
