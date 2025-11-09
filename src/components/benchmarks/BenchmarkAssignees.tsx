import { Box, Stack } from "@mui/material";
import { format } from "date-fns";

import Button from "@/components/design_system/button/Button";
import { Benchmark } from "@/types/global";

const BenchmarkAssignees = ({
  benchmark,
  onAssign,
}: {
  benchmark: Benchmark;
  onAssign: () => void;
}) => {
  const { assignees, due_date, trial_count } = benchmark;

  return (
    <>
      {assignees.length === 0 && (
        <Button
          variant="secondary"
          onClick={() => onAssign()}
          sx={{
            paddingTop: ".4rem !important",
            paddingBottom: ".4rem !important",
            paddingLeft: ".4rem !important",
            paddingRight: ".4rem !important",
            width: "75%",
          }}
        >
          Assign
        </Button>
      )}
      {!!assignees.length && (
        <Stack direction="row" sx={{ display: "flex", alignItems: "center" }}>
          <Stack>
            {assignees.map((u) => (
              <Box key={u.user_id} fontWeight="bold" textAlign="left">
                {u.first_name} {u.last_name}
              </Box>
            ))}
            {due_date && <Box>Until {format(new Date(due_date), "MMM d")}</Box>}
            {!due_date && !!trial_count && <Box>{trial_count} times</Box>}
          </Stack>
          <Box>
            <Button variant="tertiary" onClick={() => onAssign()}>
              Change
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
};

export default BenchmarkAssignees;
