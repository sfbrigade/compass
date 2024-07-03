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

  console.log(
    "This is the [goal_id].create.tsx page, which is trigged by clicking the add benchmark button."
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
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

  const textFieldData = [
    {
      title: "Benchmark Description",
      description: "Provide a written description of this benchmark.",
      label: "Description",
      name: "description",
      placeholder:
        "What level this student should attain in a certain skill by a certain date...",
    },
    {
      title: "Activity Setup",
      description:
        "Describe how staff should set up a trial to measure this benchmark.",
      label: "Setup",
      name: "setup",
      placeholder: "Describe the timing, environment, or other conditions...",
    },
    {
      title: "Materials needed",
      description:
        "List any materials that staff will need to conduct a trial for this benchmark.",
      label: "Materials",
      name: "materials",
      placeholder: "Eg. pencil, worksheets, timer, etc...",
    },
    {
      title: "Instructions",
      description:
        "Describe how staff should conduct a trial for this benchmark.",
      label: "Instructions",
      name: "instructions",
      placeholder:
        "What level of prompting is permitted, what specific actions staff should take, what they should be observing...",
    },
  ];

  const renderTextFields = () => {
    return textFieldData.map((field, index) => (
      <Stack spacing={2} p={3} pr={0} key={index}>
        <Typography variant="h6">{field.title}</Typography>
        <Typography variant="body1">{field.description}</Typography>
        <TextField
          label={field.label}
          required
          multiline
          rows={4}
          name={field.name}
          defaultValue={field.placeholder}
        />
      </Stack>
    ));
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

            {renderTextFields()}

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
