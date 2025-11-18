import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";

import Chip from "../design_system/chip/Chip";

import Button from "@/components/design_system/button/Button";
import { Typography } from "@mui/material";

import type { Benchmark } from "@/types/global";

import styles from "./GoalCard.module.css";

import { useRouter } from "next/router";

export default function BenchmarksContainer({
  benchmarks,
}: {
  benchmarks: Benchmark | undefined;
}) {
  const router = useRouter();
  return (
    <Box
      sx={{
        marginBottom: "2rem",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex-col",
          justifyContent: "space-between",
          backgroundColor: "var(--grey-100)",
          padding: "24px",
          gap: "24px",
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{ color: "var(--primary-40)" }}
          variant="overline"
          display="block"
          gutterBottom
        ></Typography>
        <Chip
          variant="task"
          label={`Benchmark ${benchmarks?.number.toString()}`}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
        <p>{benchmarks?.description}</p>
        <Grid2
          container
          spacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          direction={{ xs: "column", sm: "row" }}
          sx={{ marginTop: "30px", width: "100%" }}
        >
          <Grid2 size={6} className={styles.GridItems}>
            <h1>Frequency</h1>
            <p>{benchmarks?.frequency}</p>
          </Grid2>
          <Grid2 size={6} className={styles.GridItems}>
            <h1>Instructions</h1>
            <p>{benchmarks?.instructions}</p>
          </Grid2>
          <Grid2 size={6} className={styles.GridItems}>
            <h1>Materials</h1>
            <p>{benchmarks?.materials}</p>
          </Grid2>
          <Grid2 size={6} className={styles.GridItems}>
            <h1>Activity Setup</h1>
            <p>{benchmarks?.setup}</p>
          </Grid2>
        </Grid2>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Button
            onClick={() =>
              router.push(`/benchmarks/${benchmarks?.benchmark_id}`)
            }
          >
            Start Trial
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
