import { trpc } from "@/client/lib/trpc";
import $button from "@/components/design_system/button/Button.module.css";
import { GoalHeader } from "@/components/goal-header/goal-header";
import { ChangeEvent } from "@/types/global";
import { CheckCircle, TripOriginRounded } from "@mui/icons-material";
import {
  Box,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

interface Benchmark {
  title: string;
  description: string;
  label: string;
  name: string;
  placeholder: string;
}

interface BenchmarkFormState {
  [key: string]: string | number | undefined;
}

const CreateBenchmarkPage = () => {
  const router = useRouter();
  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: router.query.goal_id as string },
    { enabled: Boolean(router.query.goal_id) }
  );

  const addSubgoalMutation = trpc.iep.addSubgoal.useMutation();

  const VIEW_STATES = {
    BENCHMARK_PG_1: 0,
    BENCHMARK_PG_2: 1,
  };

  const [viewState, setViewState] = useState(VIEW_STATES.BENCHMARK_PG_1);

  const [benchmarkFormState, setBenchmarkFormState] =
    useState<BenchmarkFormState>({
      description: undefined,
      setup: undefined,
      materials: undefined,
      instructions: undefined,
      baseline_level: 0,
      target_level: 0,
      attempts_per_trial: 0,
      number_of_trials: 0,
    });

  const steps = ["Instructional Guidelines", "Data Collection Guidelines"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const form = e.currentTarget as HTMLFormElement;
    // const formData = new FormData(form);
    // console.log("form data", formData);

    // await addSubgoalMutation.mutateAsync({
    //   goal_id: router.query.goal_id as string,
    //   status: "In Progress",
    //   description: formData.get("description") as string,
    //   setup: formData.get("setup") as string,
    //   instructions: formData.get("instructions") as string,
    //   materials: formData.get("materials") as string,
    //   target_level: Number(formData.get("target_level")),
    //   baseline_level: Number(formData.get("baseline_level")),
    //   metric_name: formData.get("metric_name") as string,
    //   attempts_per_trial: Number(formData.get("attempts_per_trial")) || null,
    //   number_of_trials: Number(formData.get("number_of_trials")) || null,
    // });
    console.log("benchmarkFormState", benchmarkFormState);
    await addSubgoalMutation.mutateAsync({
      goal_id: router.query.goal_id as string,
      status: "In Progress",
      description: benchmarkFormState["description"] as string,
      setup: benchmarkFormState["setup"] as string,
      instructions: benchmarkFormState["instructions"] as string,
      materials: benchmarkFormState["materials"] as string,
      target_level: benchmarkFormState["target_level"] as number,
      baseline_level: benchmarkFormState["baseline_level"] as number,
      metric_name: "" as string,
      attempts_per_trial: benchmarkFormState["attempts_per_trial"] as number,
      number_of_trials: benchmarkFormState["number_of_trials"] as number,
    });

    await router.push(
      `/students/${router.query.student_id as string}/goals/${
        router.query.goal_id as string
      }`
    );
  };

  const textFieldData1 = [
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

  const renderTextFields = (textFieldData: Benchmark[]) => {
    return textFieldData.map((field, index) => (
      <Stack spacing={2} width="100%" key={index}>
        <Typography variant="h6">{field.title}</Typography>
        <Typography variant="body1">{field.description}</Typography>
        <TextField
          label={field.label}
          fullWidth
          required
          multiline
          rows={4}
          name={field.name}
          value={
            benchmarkFormState[field.name] !== undefined
              ? benchmarkFormState[field.name]
              : null
          }
          onChange={(e: ChangeEvent) =>
            setBenchmarkFormState({
              ...benchmarkFormState,
              [field.name]: e.target.value,
            })
          }
          placeholder={field.placeholder}
        />
      </Stack>
    ));
  };

  return (
    <Stack
      component="form"
      bgcolor="white"
      borderRadius={2}
      gap={4}
      onSubmit={handleSubmit}
      maxWidth="1000px"
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

      <Box bgcolor={"var(--grey-80)"} py={4}>
        <Typography variant="h3" textAlign="left" pb={2}>
          Create Benchmark
        </Typography>
        {/* <Stepper activeStep={viewState} alternativeLabel connector={null}>
          {steps.map((label, index) => (
            <Step key={label}>
              {index !== steps.length && (
                <StepLabel
                  StepIconComponent={
                    index < viewState ? CheckCircle : TripOriginRounded
                  }
                >
                  {label}
                </StepLabel>
              )}
            </Step>
          ))}
        </Stepper> */}
      </Box>

      <fieldset disabled={addSubgoalMutation.isLoading} style={{ border: 0 }}>
        <Stack direction="row" spacing={4}>
          {viewState === VIEW_STATES.BENCHMARK_PG_1 && (
            <Stack spacing={4} px={3} pb={3} width={"100%"}>
              <Typography variant="h3">
                Benchmark #1 - Instructional Guidelines
              </Typography>

              {renderTextFields(textFieldData1)}
            </Stack>
          )}

          {viewState === VIEW_STATES.BENCHMARK_PG_2 && (
            <Stack spacing={4} px={3} pb={3} width={"100%"}>
              <Typography variant="h3">
                Benchmark #1 - Data Collection Guidelines
              </Typography>

              <Stack spacing={2}>
                <Typography variant="h4">Metric to track</Typography>
                <Stack direction="row" spacing={4} justifyContent="left">
                  <Stack direction="row" alignItems="center">
                    <TextField
                      label="Baseline Level"
                      required
                      type="number"
                      name="baseline_level"
                      value={
                        benchmarkFormState["baseline_level"] !== undefined
                          ? benchmarkFormState["baseline_level"]
                          : null
                      }
                      onChange={(e: ChangeEvent) =>
                        setBenchmarkFormState({
                          ...benchmarkFormState,
                          ["baseline_level"]: Number(e.target.value),
                        })
                      }
                    />
                    <Typography ml={1}>%</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center">
                    <TextField
                      label="Target Level"
                      required
                      type="number"
                      name="target_level"
                      value={
                        benchmarkFormState["target_level"] !== undefined
                          ? benchmarkFormState["target_level"]
                          : null
                      }
                      onChange={(e: ChangeEvent) =>
                        setBenchmarkFormState({
                          ...benchmarkFormState,
                          ["target_level"]: Number(e.target.value),
                        })
                      }
                    />
                    <Typography ml={1}>%</Typography>
                  </Stack>
                  <TextField
                    label="Attempts Per Trial"
                    type="number"
                    name="attempts_per_trial"
                    value={
                      benchmarkFormState["attempts_per_trial"] !== undefined
                        ? benchmarkFormState["attempts_per_trial"]
                        : null
                    }
                    onChange={(e: ChangeEvent) =>
                      setBenchmarkFormState({
                        ...benchmarkFormState,
                        ["attempts_per_trial"]: Number(e.target.value),
                      })
                    }
                  />
                  <TextField
                    label="Number of Trials"
                    type="number"
                    name="number_of_trials"
                    value={
                      benchmarkFormState["number_of_trials"] !== undefined
                        ? benchmarkFormState["number_of_trials"]
                        : null
                    }
                    onChange={(e: ChangeEvent) =>
                      setBenchmarkFormState({
                        ...benchmarkFormState,
                        ["number_of_trials"]: Number(e.target.value),
                      })
                    }
                  />
                </Stack>
              </Stack>
            </Stack>
          )}
        </Stack>

        {viewState === VIEW_STATES.BENCHMARK_PG_1 && (
          <Stack direction="row" spacing={2} p={4} pt={0} justifyContent="end">
            <button
              type="reset"
              onClick={router.back}
              className={$button.secondary}
            >
              Cancel
            </button>
            <button
              onClick={() => setViewState(VIEW_STATES.BENCHMARK_PG_2)}
              className={$button.default}
            >
              Next
            </button>
          </Stack>
        )}

        {viewState === VIEW_STATES.BENCHMARK_PG_2 && (
          <Stack direction="row" spacing={2} p={4} justifyContent="end">
            <button
              onClick={() => setViewState(VIEW_STATES.BENCHMARK_PG_1)}
              className={$button.secondary}
            >
              Back
            </button>
            <button type="submit" className={$button.default}>
              Create Benchmark
            </button>
          </Stack>
        )}
      </fieldset>
    </Stack>
  );
};

export default CreateBenchmarkPage;
