import { Box, List, ListItem } from "@mui/material";
import $benchmark from "./BenchmarkAssignmentModal.module.css";
import { RouterOutputs } from "@/client/lib/trpc";
import DS_Checkbox from "@/components/design_system/checkbox/Checkbox";

interface ParaSelectionStepProps {
  myParas: RouterOutputs["case_manager"]["getMyParas"] | undefined;
  selectedParaIds: string[];
  handleParaToggle: (paraId: string) => () => void;
}

export const ParaSelectionStep = ({
  myParas,
  selectedParaIds,
  handleParaToggle,
}: ParaSelectionStepProps) => {
  return (
    <Box>
      <p>Select one or more paras:</p>
      <Box
        sx={{
          my: 2,
          maxHeight: "10rem",
          overflow: "auto",
          border: "1px solid var(--grey-70)",
          borderRadius: 1,
        }}
      >
        <List sx={{ p: 0 }} className={$benchmark.staffListItemText}>
          {myParas
            ?.filter((para) => para !== undefined)
            .map((para) => (
              <ListItem
                key={para.user_id}
                sx={{
                  px: 0,
                  py: 0,
                }}
              >
                <DS_Checkbox
                  onClickAction={handleParaToggle(para.user_id)}
                  text={`${para.first_name} ${para.last_name}`}
                  checked={selectedParaIds.includes(para.user_id)}
                />
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};
