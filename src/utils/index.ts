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

export const calcAverage = (successRates: (number | null)[]) => {
  let sum = 0;
  let nonZeros = 0;
  for (const successRate of successRates) {
    if (successRate !== null) {
      sum += successRate;
      nonZeros += 1;
    }
  }

  return sum / nonZeros;
};
