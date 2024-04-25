import { trpc } from "@/client/lib/trpc";
import { GoalHeader } from "@/components/goal-header/goal-header";
import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import $button from "@/components/design_system/button/Button.module.css";

const CreateBenchmarkPage = () => {
  const router = useRouter();
  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: router.query.goal_id as string },
    { enabled: Boolean(router.query.goal_id) }
  );

  const addSubgoalMutation = trpc.iep.addSubgoal.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // NOTE: property "name" is not currently included in this mutation,
    // nor in initial-migrations.sql
    await addSubgoalMutation.mutateAsync({
      goal_id: router.query.goal_id as string,
      description: formData.get("description") as string,
      materials: formData.get("materials") as string,
      instructions: formData.get("instructions") as string,
      target_level: Number(formData.get("target_level") as string),
      baseline_level: Number(formData.get("baseline_level") as string),
      metric_name: formData.get("metric_name") as string,
      target_max_attempts: null,
    });

    await router.push(
      `/students/${router.query.student_id as string}/goals/${
        router.query.goal_id as string
      }`
    );
  };

  return (
    <Stack
      component="form"
      bgcolor="white"
      borderRadius={2}
      onSubmit={handleSubmit}
    >
      <Box p={4}>
        {goal && (
          <GoalHeader
            name="[placeholder] 1st Goal"
            description={goal.description}
            createdAt={goal.created_at}
            goalId={goal.goal_id}
          />
        )}
      </Box>

      <Divider />

      <fieldset disabled={addSubgoalMutation.isLoading} style={{ border: 0 }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={4}
        >
          <Stack spacing={4} p={3} pr={0}>
            <Typography variant="h4">Benchmark</Typography>
            <TextField
              label="Name"
              helperText="Maximum 30 characters"
              required
              name="name"
            />
            <TextField
              label="Description"
              multiline
              required
              minRows={3}
              name="description"
            />

            <Stack spacing={2}>
              <Typography variant="h4">Metrics</Typography>
              <Stack direction="row" spacing={4}>
                <Stack direction="row" alignItems="center">
                  <TextField
                    label="Target Level"
                    required
                    type="number"
                    name="target_level"
                  />
                  <Typography ml={1}>%</Typography>
                </Stack>
                <Stack direction="row" alignItems="center">
                  <TextField
                    label="Baseline Level"
                    required
                    type="number"
                    name="baseline_level"
                  />
                  <Typography ml={1}>%</Typography>
                </Stack>
                <TextField label="Metric to track" name="metric_name" />
              </Stack>
            </Stack>
          </Stack>

          <Stack spacing={4} p={3} pl={0} flexGrow={1}>
            <Typography variant="h4">Details</Typography>
            <TextField
              multiline
              label="Materials"
              minRows={3}
              required
              name="materials"
            />
            <TextField
              multiline
              label="Instructions"
              minRows={3}
              required
              name="instructions"
            />
          </Stack>
        </Stack>

        <Divider />

        <Stack direction="row" spacing={2} p={4} justifyContent="space-between">
          <button
            type="reset"
            onClick={router.back}
            className={$button.secondary}
          >
            Cancel
          </button>
          <button type="submit" className={$button.default}>
            Create
          </button>
        </Stack>
      </fieldset>
    </Stack>
  );
};

export default CreateBenchmarkPage;
