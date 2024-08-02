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

interface BenchmarkFields {
  title: string;
  description: string;
  label: string;
  name: string;
  placeholder: string;
}

interface BenchmarkFormEntry {
  [key: string]: string | number | "";
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
    useState<BenchmarkFormEntry>({
      description: "",
      setup: "",
      materials: "",
      instructions: "",
      baseline_level: "",
      target_level: "",
      attempts_per_trial: "",
      number_of_trials: "",
    });

  function checkFormFields() {
    if (!checkTextFields() || !checkNumberFields()) {
      alert("Please fill out all fields before proceeding");
    }
  }

  function checkTextFields(): boolean {
    const { description, setup, materials, instructions } = benchmarkFormState;
    return [description, setup, materials, instructions].every((field) => {
      const castField = field as string;
      return field !== "" && castField.replaceAll(" ", "").length > 0;
    });
  }

  function checkNumberFields(): boolean {
    const {
      baseline_level,
      target_level,
      attempts_per_trial,
      number_of_trials,
    } = benchmarkFormState;
    return [
      baseline_level,
      target_level,
      attempts_per_trial,
      number_of_trials,
    ].every((field) => field !== "");
  }

  const steps = ["Instructional Guidelines", "Data Collection Guidelines"];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("benchmarkFormState", benchmarkFormState);
    // TO DO: metric_name is not used in the mutation (removed from design) and should be removed from the schema
    // TO DO: frequency is not included in the mutation (but is included in the design) and should be added to the schema
    try {
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
    } catch (error) {
      console.error("Error creating benchmark", error);
    }
  };

  const textFieldDescriptionsPage1 = [
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

  const textFieldDescriptionsPage2 = [
    {
      title: "Frequency",
      description: "How often should data be collected for this benchmark?",
      label: "Frequency",
      name: "frequency",
      placeholder:
        "Eg. once per week, every Monday, as much as possible, etc...",
    },
  ];

  const renderTextFields = (textFieldDescriptionsPage: BenchmarkFields[]) => {
    return textFieldDescriptionsPage.map((field, index) => (
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
            benchmarkFormState[field.name] !== ""
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
      {goal && (
        <GoalHeader
          name="[placeholder] 1st Goal"
          description={goal.description}
          createdAt={goal.created_at}
          goalId={goal.goal_id}
        />
      )}

      <Box bgcolor={"var(--grey-80)"} py={4}>
        <Typography variant="h3" textAlign="left" pb={2}>
          Create Benchmark
        </Typography>
        <Stepper activeStep={viewState} alternativeLabel connector={null}>
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
        </Stepper>
      </Box>

      <fieldset disabled={addSubgoalMutation.isLoading} style={{ border: 0 }}>
        <Stack direction="row" spacing={4}>
          {viewState === VIEW_STATES.BENCHMARK_PG_1 && (
            <Stack spacing={4} px={3} pb={3} width={"100%"}>
              <Typography variant="h3">
                Benchmark #1 - Instructional Guidelines
              </Typography>

              {renderTextFields(textFieldDescriptionsPage1)}
            </Stack>
          )}

          {viewState === VIEW_STATES.BENCHMARK_PG_2 && (
            <Stack spacing={4} px={3} pb={3} width={"100%"}>
              <Typography variant="h3">
                Benchmark #1 - Data Collection Guidelines
              </Typography>

              {renderTextFields(textFieldDescriptionsPage2)}

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
                        benchmarkFormState["baseline_level"] !== ""
                          ? benchmarkFormState["baseline_level"]
                          : ""
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
                        benchmarkFormState["target_level"] !== ""
                          ? benchmarkFormState["target_level"]
                          : ""
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
                    required
                    value={
                      benchmarkFormState["attempts_per_trial"] !== ""
                        ? benchmarkFormState["attempts_per_trial"]
                        : ""
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
                    required
                    value={
                      benchmarkFormState["number_of_trials"] !== ""
                        ? benchmarkFormState["number_of_trials"]
                        : ""
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
              onClick={() => {
                checkTextFields()
                  ? setViewState(VIEW_STATES.BENCHMARK_PG_2)
                  : alert("Please fill out all fields before proceeding");
              }}
              className={$button.default}
            >
              Next
            </button>
          </Stack>
        )}

        {viewState === VIEW_STATES.BENCHMARK_PG_2 && (
          <Stack>
            <Stack direction="row" spacing={2} p={4} justifyContent="end">
              <button
                onClick={() => setViewState(VIEW_STATES.BENCHMARK_PG_1)}
                className={$button.secondary}
              >
                Back
              </button>
              <button
                type="submit"
                className={$button.default}
                onClick={checkFormFields}
              >
                Create Benchmark
              </button>
            </Stack>
          </Stack>
        )}
      </fieldset>
    </Stack>
  );
};

export default CreateBenchmarkPage;
