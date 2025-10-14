import Chip from "../design_system/chip/Chip";

interface BenchmarkChipControllerProps {
  data?: number | null;
  notifier?: boolean;
}
export default function BenchmarkChipController({
  data,
  notifier,
}: BenchmarkChipControllerProps) {
  console.log(notifier);
  if (data && !notifier) {
    return <Chip label={data + "%"} className="data-chip" />;
  } else if (data && notifier) {
    return <Chip label={data} className="data-chip" />;
  } else if (notifier) {
    return <Chip label={0} className="empty-chip" />;
  } else {
    return <Chip label={0 + "%"} className="empty-chip" />;
  }
}
