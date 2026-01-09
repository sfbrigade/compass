import { Card, CardContent, Grid2, Stack } from "@mui/material";

import Chip from "../design_system/chip/Chip";

import Button from "@/components/design_system/button/Button";

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
    <Card>
      <CardContent>
        <Chip
          variant="task"
          label={`Benchmark #${benchmarks ? benchmarks?.number.toString() : ""}`}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        />
        <p>{benchmarks?.description}</p>
        <Grid2
          container
          spacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          direction={{ xs: "column", sm: "row" }}
          sx={{ marginTop: "30px", width: "100%", marginBottom: "1.5rem" }}
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
        <Stack alignItems="center">
          <Button
            onClick={() =>
              router.push(`/benchmarks/${benchmarks?.benchmark_id}`)
            }
          >
            Start Trial
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
