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
