import { trpc } from "@/client/lib/trpc";
import { Benchmark } from "@/types/global";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import { BenchmarkAssignmentModal } from "./Benchmark-Assignment-Modal";
import $button from "@/components/design_system/button/Button.module.css";

interface BenchmarkProps {
  benchmark: Benchmark;
}

const Benchmarks = ({ benchmark }: BenchmarkProps) => {
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  return (
    <Box sx={{ border: "1px solid var(--grey-60)" }}>
      <Box
        sx={{
          display: "flex-col",
          justifyContent: "space-between",
          backgroundColor: "var(--grey-100)",
          padding: "1rem",
        }}
      >
        <p>{benchmark.description}</p>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p> BASELINE</p>
          <p> CURRENT</p>
          <Box
            sx={{
              display: "flex-col",
            }}
          >
            <p>STAFF</p>
            <Button
              className={$button.secondary}
              onClick={() => setIsAssignmentModalOpen(true)}
            >
              Assign Staff
            </Button>
          </Box>
        </Box>
      </Box>
      <BenchmarkAssignmentModal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        benchmark_id={benchmark.benchmark_id}
      />
    </Box>
  );
};

export default Benchmarks;
