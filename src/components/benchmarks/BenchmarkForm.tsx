import { trpc } from "@/client/lib/trpc";
import type { Benchmark } from "@/types/global";
import $button from "@/components/design_system/button/Button.module.css";
import { GoalHeader } from "@/components/goal-header/goal-header";
import useGoalIndex from "@/hooks/useGoalIndex";
import { ChangeEvent } from "@/types/global";
import { CheckCircle, TripOriginRounded } from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  Stack,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface BenchmarkFields {
  title: string;
  description: string;
  label: string;
  name: string;
  placeholder: string;
}

interface BenchmarkFormEntry {
  [key: string]: BenchmarkFormField;
}

interface BenchmarkFormField {
  value: string | number;
  valid: boolean;
  touched: boolean;
}

const blankFormField = {
  value: "",
  valid: false,
  touched: false,
};

const BenchmarkStepperIcon = (stepIconProps: StepIconProps) => {
  const { completed = false } = stepIconProps;

  if (completed) {
    return <CheckCircle />;
  } else {
    return <TripOriginRounded />;
  }
};

const BenchmarkForm = ({ benchmark_id = "" }: { benchmark_id?: string }) => {
  const router = useRouter();
  const { data: goal } = trpc.iep.getGoal.useQuery(
    { goal_id: router.query.goal_id as string },
    { enabled: Boolean(router.query.goal_id) }
  );

  const { data: benchmark, isError: benchmarkFetchError } = benchmark_id
    ? trpc.iep.getBenchmark.useQuery({ benchmark_id })
    : { data: undefined, isError: false };

  const goalIndex = useGoalIndex({
    iepId: goal?.iep_id || "",
    goalId: goal?.goal_id || "",
  });

  const addBenchmarkMutation = trpc.iep.addBenchmark.useMutation();
  const updateBenchmarkMutation = trpc.iep.updateBenchmark.useMutation();

  const VIEW_STATES = {
    BENCHMARK_PG_1: 0,
    BENCHMARK_PG_2: 1,
  };

  const [viewState, setViewState] = useState(VIEW_STATES.BENCHMARK_PG_1);

  const [benchmarkFormState, setBenchmarkFormState] =
    useState<BenchmarkFormEntry>({
      description: {
        ...blankFormField,
      },
      setup: {
        ...blankFormField,
      },
      materials: {
        ...blankFormField,
      },
      instructions: {
        ...blankFormField,
      },
      frequency: {
        ...blankFormField,
      },
      baseline_level: {
        ...blankFormField,
      },
      target_level: {
        ...blankFormField,
      },
      attempts_per_trial: {
        ...blankFormField,
      },
      number_of_trials: {
        ...blankFormField,
      },
    });

  const [pageOneIsValid, setPageOneIsValid] = useState(false);
  const [pageTwoIsValid, setPageTwoIsValid] = useState(false);

  // check page one validity
  useEffect(() => {
    const { description, setup, materials, instructions } = benchmarkFormState;
    setPageOneIsValid(
      [description, setup, materials, instructions].every(
        (field) => field.valid
      )
    );
  }, [benchmarkFormState]);

  // check page two validity
  useEffect(() => {
    const {
      frequency,
      baseline_level,
      target_level,
      attempts_per_trial,
      number_of_trials,
    } = benchmarkFormState;

    setPageTwoIsValid(
      [
        frequency,
        baseline_level,
        target_level,
        attempts_per_trial,
        number_of_trials,
      ].every((field) => field.valid)
    );
  }, [benchmarkFormState]);

  useEffect(() => {
    if (!benchmark || benchmarkFetchError) return;

    setBenchmarkFormState((prevState) => {
      return Object.keys(prevState).reduce((newState, key) => {
        const benchmarkKeyValue = benchmark[key as keyof Benchmark] as string;
        const numValue = Number(benchmarkKeyValue);

        let isValid = false;
        let value: string | number = benchmarkKeyValue;

        if (["baseline_level", "target_level"].includes(key)) {
          isValid = numValue >= 0 && numValue <= 100 && numValue % 1 === 0;
          value = numValue;
        } else if (["attempts_per_trial", "number_of_trials"].includes(key)) {
          isValid = numValue % 1 === 0 && numValue > 0;
          value = numValue;
        } else {
          isValid = benchmarkKeyValue.length > 0;
        }

        newState[key] = { ...prevState[key], value, valid: isValid };
        return newState;
      }, {} as BenchmarkFormEntry);
    });
  }, [benchmark, benchmarkFetchError]);

  const steps = ["Instructional Guidelines", "Data Collection Guidelines"];

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // TO DO: metric_name is not used in the mutation (removed from design) and should be removed from the schema
    try {
      if (benchmark_id) {
        await updateBenchmarkMutation.mutateAsync({
          benchmark_id,
          goal_id: router.query.goal_id as string,
          status: "In Progress",
          description: benchmarkFormState["description"].value as string,
          setup: benchmarkFormState["setup"].value as string,
          instructions: benchmarkFormState["instructions"].value as string,
          materials: benchmarkFormState["materials"].value as string,
          frequency: benchmarkFormState["frequency"].value as string,
          target_level: benchmarkFormState["target_level"].value as number,
          baseline_level: benchmarkFormState["baseline_level"].value as number,
          metric_name: "" as string,
          attempts_per_trial: benchmarkFormState["attempts_per_trial"]
            .value as number,
          number_of_trials: benchmarkFormState["number_of_trials"]
            .value as number,
        });
      } else {
        await addBenchmarkMutation.mutateAsync({
          goal_id: router.query.goal_id as string,
          status: "In Progress",
          description: benchmarkFormState["description"].value as string,
          setup: benchmarkFormState["setup"].value as string,
          instructions: benchmarkFormState["instructions"].value as string,
          materials: benchmarkFormState["materials"].value as string,
          frequency: benchmarkFormState["frequency"].value as string,
          target_level: benchmarkFormState["target_level"].value as number,
          baseline_level: benchmarkFormState["baseline_level"].value as number,
          metric_name: "" as string,
          attempts_per_trial: benchmarkFormState["attempts_per_trial"]
            .value as number,
          number_of_trials: benchmarkFormState["number_of_trials"]
            .value as number,
        });
      }

      await router.push(
        `/students/${router.query.student_id as string}/goals/${
          router.query.goal_id as string
        }`
      );
    } catch (error) {
      console.error(
        `Error ${benchmark_id ? "editing" : "creating"} benchmark`,
        error
      );
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
          value={benchmarkFormState[field.name].value || ""}
          error={
            !benchmarkFormState[field.name].valid &&
            benchmarkFormState[field.name].touched
          }
          helperText={
            !benchmarkFormState[field.name].valid &&
            benchmarkFormState[field.name].touched &&
            "Required"
          }
          onChange={(e: ChangeEvent) =>
            setBenchmarkFormState({
              ...benchmarkFormState,
              [field.name]: {
                ...benchmarkFormState[field.name],
                value: e.target.value,
                valid: e.target.value.trim().length > 0,
                touched: true,
              },
            })
          }
          placeholder={field.placeholder}
        />
      </Stack>
    ));
  };

  return (
    <Stack bgcolor="white" borderRadius={2} gap={4} maxWidth="1000px">
      {goal && (
        <GoalHeader
          name={`Goal #${goalIndex}`}
          description={goal.description}
          createdAt={goal.created_at}
          goalId={goal.goal_id}
        />
      )}

      <Box bgcolor={"var(--grey-80)"} py={4}>
        <Typography variant="h3" textAlign="left" pb={2}>
          {benchmark_id ? "Edit" : "Create"} Benchmark
        </Typography>
        <Stepper activeStep={viewState} alternativeLabel connector={null}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={BenchmarkStepperIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <fieldset disabled={addBenchmarkMutation.isLoading} style={{ border: 0 }}>
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
                  <TextField
                    label="Baseline Level"
                    required
                    type="number"
                    name="baseline_level"
                    value={benchmarkFormState["baseline_level"].value}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    error={
                      !benchmarkFormState["baseline_level"].valid &&
                      benchmarkFormState["baseline_level"].touched
                    }
                    helperText={
                      !benchmarkFormState["baseline_level"].valid &&
                      benchmarkFormState["baseline_level"].touched &&
                      "Please enter an integer between 0 and 100"
                    }
                    onChange={(e: ChangeEvent) => {
                      const numValue = Number(e.target.value);
                      setBenchmarkFormState({
                        ...benchmarkFormState,
                        ["baseline_level"]: {
                          value: numValue,
                          valid:
                            numValue >= 0 &&
                            numValue <= 100 &&
                            numValue % 1 === 0,
                          touched: true,
                        },
                      });
                    }}
                  />
                  <TextField
                    label="Target Level"
                    required
                    type="number"
                    name="target_level"
                    value={benchmarkFormState["target_level"].value}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    error={
                      !benchmarkFormState["target_level"].valid &&
                      benchmarkFormState["target_level"].touched
                    }
                    helperText={
                      !benchmarkFormState["target_level"].valid &&
                      benchmarkFormState["target_level"].touched &&
                      "Please enter an integer between 0 and 100"
                    }
                    onChange={(e: ChangeEvent) => {
                      const numValue = Number(e.target.value);
                      setBenchmarkFormState({
                        ...benchmarkFormState,
                        ["target_level"]: {
                          value: numValue,
                          valid:
                            numValue >= 0 &&
                            numValue <= 100 &&
                            numValue % 1 === 0,
                          touched: true,
                        },
                      });
                    }}
                  />
                  <TextField
                    label="Attempts Per Trial"
                    type="number"
                    name="attempts_per_trial"
                    required
                    value={benchmarkFormState["attempts_per_trial"].value}
                    error={
                      !benchmarkFormState["attempts_per_trial"].valid &&
                      benchmarkFormState["attempts_per_trial"].touched
                    }
                    helperText={
                      !benchmarkFormState["attempts_per_trial"].valid &&
                      benchmarkFormState["attempts_per_trial"].touched &&
                      "Please enter an integer greater than 0"
                    }
                    onChange={(e: ChangeEvent) => {
                      const numValue = Number(e.target.value);
                      setBenchmarkFormState({
                        ...benchmarkFormState,
                        ["attempts_per_trial"]: {
                          valid: numValue % 1 === 0 && numValue > 0,
                          touched: true,
                          value: numValue,
                        },
                      });
                    }}
                  />
                  <TextField
                    label="Number of Trials"
                    type="number"
                    name="number_of_trials"
                    required
                    value={benchmarkFormState["number_of_trials"].value}
                    error={
                      !benchmarkFormState["number_of_trials"].valid &&
                      benchmarkFormState["number_of_trials"].touched
                    }
                    helperText={
                      !benchmarkFormState["number_of_trials"].valid &&
                      benchmarkFormState["number_of_trials"].touched &&
                      "Please enter an integer greater than 0"
                    }
                    onChange={(e: ChangeEvent) => {
                      const numValue = Number(e.target.value);
                      setBenchmarkFormState({
                        ...benchmarkFormState,
                        ["number_of_trials"]: {
                          value: numValue,
                          valid: numValue % 1 === 0 && numValue > 0,
                          touched: true,
                        },
                      });
                    }}
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
              disabled={!pageOneIsValid}
              onClick={() => {
                setViewState(VIEW_STATES.BENCHMARK_PG_2);
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
                disabled={!pageTwoIsValid}
                className={$button.default}
                onClick={handleSubmit}
              >
                {benchmark_id ? "Save" : "Create"} Benchmark
              </button>
            </Stack>
          </Stack>
        )}
      </fieldset>
    </Stack>
  );
};

export default BenchmarkForm;
