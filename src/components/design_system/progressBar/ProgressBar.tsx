import LinearProgress from "@mui/material/LinearProgress";

export default function ProgressBar({ value }: { value: number }) {
  return (
    <div>
      <LinearProgress
        variant="determinate"
        color="primary"
        value={value}
        sx={{
          backgroundColor: "primary.light",
          height: "4px",
          width: "280px",
        }}
      />
    </div>
  );
}
