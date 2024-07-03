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

    console.log(
      "This is the [goal_id].create.tsx page, which is trigged by clicking the add benchmark button."
    );

    await addSubgoalMutation.mutateAsync({
      goal_id: router.query.goal_id as string,
      status: "In Progress",
      description: formData.get("description") as string,
      setup: formData.get("setup") as string,
      instructions: formData.get("instructions") as string,
      materials: formData.get("materials") as string,
      target_level: Number(formData.get("target_level")),
      baseline_level: Number(formData.get("baseline_level")),
      metric_name: formData.get("metric_name") as string,
      attempts_per_trial: Number(formData.get("attempts_per_trial")) || null,
      number_of_trials: Number(formData.get("number_of_trials")) || null,
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
            <Typography variant="h3">
              Benchmark #1 - Instructional Guidelines
            </Typography>
            <Typography variant="h6">Benchmark Description</Typography>
            <Typography variant="body1">
              Provide a written description of this benchmark
            </Typography>
            <TextField
              label="Description"
              required
              name="description"
              defaultValue={
                "What level this student should attain in a certain skill by a certain date..."
              }
            />
            <Typography variant="h6">Activity Setup</Typography>
            <Typography variant="body1">
              Describe how staff should set up a trial to measure this
              benchmark.
            </Typography>
            <TextField
              label="Setup"
              required
              name="setup"
              defaultValue={
                "Describe the timing, environment, or other conditions..."
              }
            />
            <Typography variant="h6">Materials needed</Typography>
            <Typography variant="body1">
              List any materials that staff will need to conduct a trial for
              this benchmark.
            </Typography>
            <TextField
              label="Materials"
              required
              name="materials"
              defaultValue={"Eg. pencil, worksheets, timer, etc..."}
            />
            <Typography variant="h6">Instructions</Typography>
            <Typography variant="body1">
              Describe how staff should conduct a trial for this benchmark.
            </Typography>
            <TextField
              label="Materials"
              required
              name="materials"
              defaultValue={
                "What level of prompting is permitted, what specific actions staff should take, what they should be observing..."
              }
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
              <Stack direction="row" alignItems="center" spacing={7}>
                <TextField
                  label="Attempts Per Trial"
                  type="number"
                  name="attempts_per_trial"
                />
                <TextField
                  label="Number of Trials"
                  type="number"
                  name="number_of_trials"
                />
              </Stack>
            </Stack>
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
