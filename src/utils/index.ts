import { ProcessedTrialData, TrialData } from "@/types/global";
import { ScatterValueType } from "@mui/x-charts";

export const calculateSuccessRate = ({
  success,
  unsuccess,
}: {
  success: number;
  unsuccess: number;
}) => {
  if (success === 0 && unsuccess === 0) {
    return null;
  }
  return (success / (success + unsuccess)) * 100;
};

export const calcAverage = (trialData: TrialData[]) => {
  const successRates = trialData.map((trial) =>
    calculateSuccessRate({ success: trial.success, unsuccess: trial.unsuccess })
  );

  let sum = 0;
  let nonZeros = 0;
  for (const successRate of successRates) {
    if (successRate !== null && successRate !== undefined) {
      sum += successRate;
      nonZeros += 1;
    }
  }

  return nonZeros > 0 ? sum / nonZeros : null;
};

export const findMinDatePoint = (datePoints: ScatterValueType[]) => {
  let minDatePoint = { ...datePoints[0] };

  datePoints.forEach((datePoint) => {
    if (datePoint.y < minDatePoint.y) {
      minDatePoint = { ...datePoint };
    }
  });

  return minDatePoint;
};

export const findMaxDatePoint = (datePoints: ScatterValueType[]) => {
  let maxDatePoint = { ...datePoints[0] };

  datePoints.forEach((datePoint) => {
    if (datePoint.y < maxDatePoint.y) {
      maxDatePoint = { ...datePoint };
    }
  });

  return maxDatePoint;
};

export const groupTrialsByDate = (
  trials: TrialData[],
  clientTimeZone: string = "UTC"
): Record<string, ProcessedTrialData[]> => {
  const datePoints: Record<string, ProcessedTrialData[]> = {};

  trials.forEach((trial) => {
    const createdAtDateString = new Date(trial.created_at).toLocaleDateString(
      "en-US",
      {
        timeZone: clientTimeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }
    );

    const successRate = calculateSuccessRate({
      success: trial.success,
      unsuccess: trial.unsuccess,
    });

    if (successRate === null) {
      return; // Skip trials with no attempts
    }

    const trialData = {
      ...trial,
      successRate,
      staffName: `${trial.first_name} ${trial.last_name}`,
      numberOfAttempts: trial.success + trial.unsuccess,
    };

    if (datePoints[createdAtDateString]) {
      datePoints[createdAtDateString].push(trialData);
    } else {
      datePoints[createdAtDateString] = [trialData];
    }
  });

  return datePoints;
};

export const calculateDailyAggregatedRates = (
  groupedTrials: Record<string, ProcessedTrialData[]>,
  clientTimeZone: string = "UTC"
) => {
  return Object.entries(groupedTrials).map(([date, trials]) => {
    const totalSuccess = trials.reduce((sum, t) => sum + t.success, 0);
    const totalUnsuccess = trials.reduce((sum, t) => sum + t.unsuccess, 0);
    const aggregatedSuccessRate =
      totalSuccess + totalUnsuccess > 0
        ? (totalSuccess / (totalSuccess + totalUnsuccess)) * 100
        : 0;

    const staffNames = Array.from(new Set(trials.map((t) => t.staffName)));

    return {
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: clientTimeZone,
      }),
      rate: aggregatedSuccessRate,
      staffNames,
      numberOfTrials: trials.length,
    };
  });
};
