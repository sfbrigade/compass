import Chip from "../design_system/chip/Chip";

interface BenchmarkChipControllerProps {
  data?: number | null;
  notifier?: boolean;
}
export default function BenchmarkChipController({
  data,
  notifier,
}: BenchmarkChipControllerProps) {
  if (data && !notifier) {
    return <Chip label={data + "%"} variant="primary" />;
  } else if (data && notifier) {
    return <Chip label={data} variant="primary" />;
  } else if (notifier) {
    return <Chip label={0} variant="secondary" />;
  } else {
    return <Chip label={0 + "%"} variant="secondary" />;
  }
}
