import React, { useEffect, useState } from "react";
import Counter from "@/components/counter/counter";
import ParaNav from "@/components/paraNav/ParaNav";
import Link from "next/link";
import { trpc } from "@/client/lib/trpc";
import { useRouter } from "next/router";
import { useDebounce } from "react-use";
import $box from "@/styles/Box.module.css";
import $button from "@/components/design_system/button/Button.module.css";
import $typo from "@/styles/Typography.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useConfirmBeforeLeave from "@/hooks/useConfirmBeforeLeave";
import UploadImage from "@/components/uploadPicture/uploadImage";
import { UploadedFile } from "@/components/uploadedFile/uploadedFile";
import { Grid } from "@mui/material";

interface DataUpdate {
  success?: number;
  unsuccess?: number;
  submitted?: boolean;
  notes?: string;
}

const BenchmarkPage = () => {
  const router = useRouter();
  const { benchmark_id } = router.query;
  const utils = trpc.useContext();
  const {
    data: benchmark,
    isLoading: benchmarkIsLoading,
    isError,
  } = trpc.iep.getBenchmarkAndTrialData.useQuery(
    {
      benchmark_id: benchmark_id as string, // how does this line make sense?
    },
    {
      enabled: Boolean(benchmark_id),
    }
  );
  const seenMutation = trpc.iep.markAsSeen.useMutation({
    onSuccess: async () =>
      await utils.iep.getBenchmarkAndTrialData.invalidate(),
  });
  const addTrialMutation = trpc.iep.addTrialData.useMutation({
    onSuccess: async () =>
      await utils.iep.getBenchmarkAndTrialData.invalidate(),
  });
  const updateTrialMutation = trpc.iep.updateTrialData.useMutation({
    onSuccess: async () =>
      await utils.iep.getBenchmarkAndTrialData.invalidate(),
  });
  const attachFileToTrialDataMutation =
    trpc.iep.attachFileToTrialData.useMutation({
      onSuccess: async () =>
        await utils.iep.getBenchmarkAndTrialData.invalidate(),
    });
  const removeFileFromTrialDataAndDeleteMutation =
    trpc.iep.removeFileFromTrialDataAndDelete.useMutation({
      onSuccess: async () =>
        await utils.iep.getBenchmarkAndTrialData.invalidate(),
    });

  const [notesInputValue, setNotesInputValue] = useState("");
  const [successInputValue, setSuccessInputValue] = useState(0);
  const [unsuccessInputValue, setUnsuccessInputValue] = useState(0);

  const [currentTrialIdx, setCurrentTrialIdx] = useState(0);
  const currentTrial = benchmark?.trials[currentTrialIdx] || null;

  const [trialAdded, setTrialAdded] = useState(false);

  const hasInputChanged =
    currentTrial?.notes !== notesInputValue ||
    currentTrial?.success !== successInputValue ||
    currentTrial?.unsuccess !== unsuccessInputValue;

  // Sets the current trial to most recent whenever a new task is loaded.
  useEffect(() => {
    if (benchmark && benchmark.trials.length > 0) {
      setCurrentTrialIdx(benchmark.trials.length - 1);
    }
  }, [benchmark]);

  // Sets all input states to saved values
  useEffect(() => {
    if (currentTrial?.notes !== undefined) {
      setNotesInputValue(currentTrial.notes || "");
    }
    if (currentTrial?.success !== undefined) {
      setSuccessInputValue(currentTrial?.success);
    }
    if (currentTrial?.unsuccess !== undefined) {
      setUnsuccessInputValue(currentTrial?.unsuccess);
    }
  }, [currentTrial?.notes, currentTrial?.success, currentTrial?.unsuccess]);

  // Move this to the backend, this page shouldn't have to deal with tasks, only
  // benchmarks, we don't want mutations in useEffect, useEffect should be responding
  // to UI changes and not making backend changes.
  // Marks this benchmark as seen (if it hasn't been seen yet)
  // or: we can modify the seenMutation to take the benchmark_id and ask it to look up
  // the task based on the current user id being the task's assignee_id
  useEffect(() => {
    if (!seenMutation.isLoading && !benchmarkIsLoading && benchmark) {
      seenMutation.mutate({ benchmark_id: benchmark.benchmark_id });
    }
  }, [benchmark, seenMutation, benchmarkIsLoading]);

  // Creates a new data collection instance (if there are none in progress)
  useEffect(() => {
    if (
      !trialAdded &&
      !addTrialMutation.isLoading &&
      !benchmarkIsLoading &&
      benchmark &&
      (benchmark.trials.length === 0 ||
        benchmark.trials[benchmark.trials.length - 1]?.submitted === true)
    ) {
      addTrialMutation.mutate({
        benchmark_id: benchmark.benchmark_id,
        success: 0,
        unsuccess: 0,
        notes: "",
      });
      setTrialAdded(true);
    }
  }, [benchmark, addTrialMutation, benchmarkIsLoading, trialAdded]);

  const handleUpdate = (updates: DataUpdate) => {
    //Can only update if we're on the most recent trial
    if (
      benchmark &&
      currentTrial &&
      currentTrialIdx === benchmark.trials.length - 1
    ) {
      updateTrialMutation.mutate({
        trial_data_id: currentTrial.trial_data_id,
        ...updates,
      });
    }
  };

  const onNoteChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setNotesInputValue((e.target as HTMLInputElement).value);
  };

  //Only updates db after inputs have stopped for 1 sec
  useDebounce(
    () => {
      if (hasInputChanged) {
        handleUpdate({
          notes: notesInputValue,
          success: successInputValue,
          unsuccess: unsuccessInputValue,
        });
      }
    },
    1000,
    [notesInputValue, successInputValue, unsuccessInputValue]
  );

  // BUG?: Sometimes if the user reloads/navigates away and confirms, the update has time to go through and data is saved. Is this something we should fix?
  useConfirmBeforeLeave(hasInputChanged);

  const handleFileUpload = async (fileId: string) => {
    if (!currentTrial) {
      throw new Error("Trial data has not yet loaded");
    }

    await attachFileToTrialDataMutation.mutateAsync({
      file_id: fileId,
      trial_data_id: currentTrial?.trial_data_id,
    });
  };

  const handleFileDelete = async (fileId: string) => {
    if (!currentTrial) {
      throw new Error("Trial data has not yet loaded");
    }

    await removeFileFromTrialDataAndDeleteMutation.mutateAsync({
      file_id: fileId,
      trial_data_id: currentTrial?.trial_data_id,
    });
  };

  if (benchmarkIsLoading || !currentTrial) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Oops! Something went wrong.</div>;
  }

  return (
    <>
      <Link href="/benchmarks">
        <ArrowBackIcon />
      </Link>
      <ParaNav />
      <p className={$box.default}>
        <strong>Benchmark:</strong> {benchmark.description}
      </p>
      <div className={`${$box.topAndBottomBorder} ${$box.flex}`}>
        <button
          className={`${$button.default} ${$button.circular}`}
          onClick={() => setCurrentTrialIdx(currentTrialIdx - 1)}
          disabled={currentTrialIdx === 0}
        >
          <ChevronLeftIcon />
        </button>
        <h3>Trial {currentTrialIdx + 1}</h3>
        <button
          className={`${$button.default} ${$button.circular}`}
          onClick={() => setCurrentTrialIdx(currentTrialIdx + 1)}
          disabled={currentTrialIdx === benchmark.trials.length - 1}
        >
          <ChevronRightIcon />
        </button>
      </div>

      <div className={$box.greyBg}>
        <Counter
          title={
            <>
              Successful <CheckIcon />
            </>
          }
          count={successInputValue}
          onIncrement={() => {
            setSuccessInputValue(successInputValue + 1);
          }}
          onDecrement={() => {
            setSuccessInputValue(successInputValue - 1);
          }}
          disableInc={currentTrialIdx !== benchmark.trials.length - 1}
          disableDec={
            currentTrialIdx !== benchmark.trials.length - 1 ||
            successInputValue <= 0
          }
          color="green"
        />
        <Counter
          title={
            <>
              Unsuccessful <ClearIcon />
            </>
          }
          count={unsuccessInputValue}
          onIncrement={() => {
            setUnsuccessInputValue(unsuccessInputValue + 1);
          }}
          onDecrement={() => {
            setUnsuccessInputValue(unsuccessInputValue - 1);
          }}
          disableInc={currentTrialIdx !== benchmark.trials.length - 1}
          disableDec={
            currentTrialIdx !== benchmark.trials.length - 1 ||
            unsuccessInputValue <= 0
          }
          color="red"
        />
        <p className={`${$typo.centeredText} ${$typo.bold}`}>
          {successInputValue + unsuccessInputValue} attempts out of{" "}
          {benchmark.number_of_trials ?? "-"}
        </p>
      </div>
      <textarea
        className={$box.default}
        placeholder="Type your observation notes here..."
        rows={5}
        readOnly={currentTrialIdx !== benchmark.trials.length - 1}
        value={notesInputValue}
        onChange={onNoteChange}
      ></textarea>

      <div className={`${$typo.caption} ${$typo.rightText}`}>
        {/* TODO: Error handling */}
        {hasInputChanged || updateTrialMutation.isLoading
          ? "Saving..."
          : updateTrialMutation.isError
            ? "uh oh"
            : "Saved to Cloud"}
      </div>

      <Grid container spacing={2}>
        {currentTrial.files.map((file) => (
          <Grid key={file.file_id} item xs={12}>
            <UploadedFile
              fileId={file.file_id}
              onDelete={() => handleFileDelete(file.file_id)}
            />
          </Grid>
        ))}
      </Grid>

      <UploadImage
        label="Take a picture of student work"
        onUpload={handleFileUpload}
      />

      <Link
        href={`${router.asPath}/review`}
        className={`${$button.default} ${
          currentTrialIdx !== benchmark.trials.length - 1
            ? $button.inactive
            : ""
        }`}
      >
        Review
      </Link>
    </>
  );
};

export default BenchmarkPage;
