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
  return success / (success + unsuccess);
};

export const calcAverage = (successRates: number[]) => {
  let sum = 0;
  let nonZeros = 0;
  for (const successRate of successRates) {
    sum += successRate;
    nonZeros += 1;
  }

  return sum / nonZeros;
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
