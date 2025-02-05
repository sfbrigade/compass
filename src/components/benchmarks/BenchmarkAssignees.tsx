import { Box, Button, Stack } from "@mui/material";
import { BenchmarkWithAssignees } from "@/types/global";
import { format } from "date-fns";

import $button from "@/components/design_system/button/Button.module.css";

const BenchmarkAssignees = ({
  benchmark,
  onAssign,
}: {
  benchmark: BenchmarkWithAssignees;
  onAssign: () => void;
}) => {
  const { assignees, due_date, trial_count } = benchmark;

  return (
    <>
      {assignees.length === 0 && (
        <Button
          className={$button.secondary}
          onClick={() => onAssign()}
          sx={{
            paddingTop: ".4rem !important",
            paddingBottom: ".4rem !important",
            paddingLeft: ".4rem !important",
            paddingRight: ".4rem !important",
          }}
        >
          Assign staff
        </Button>
      )}
      {!!assignees.length && (
        <Stack direction="row">
          <Stack>
            {assignees.map((u) => (
              <Box key={u.user_id} fontWeight="bold" textAlign="left">
                {u.first_name} {u.last_name}
              </Box>
            ))}
            {due_date && <Box>Until {format(new Date(due_date), "MMM d")}</Box>}
            {!due_date && !!trial_count && <Box>{trial_count} times</Box>}
            {!due_date && !trial_count && <Box>Until unassigned</Box>}
          </Stack>
          <Box>
            <Button className={$button.tertiary} onClick={() => onAssign()}>
              Change
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default BenchmarkAssignees;
