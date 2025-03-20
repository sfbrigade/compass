import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useState, type ReactNode } from "react";
import { format } from "date-fns";
import Typography from "@mui/material/Typography";

import Button from "@/components/design_system/button/Button";
import { BenchmarkAssignmentModal } from "./BenchmarkAssignmentModal";
import BenchmarkAssignees from "./BenchmarkAssignees";
import { Benchmark } from "@/types/global";
import Link from "next/link";
import { useRouter } from "next/router";

interface BenchmarkProps {
  benchmark: Benchmark;
  index?: number;
  onUpdate: (benchmark: Benchmark) => void;
}

interface InfoProps {
  description: string;
  children: ReactNode;
}

const Info = ({ description, children }: InfoProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{ marginBottom: "0.5em" }}
        variant="overline"
        display="block"
        gutterBottom
      >
        {description}
      </Typography>
      {children}
    </Box>
  );
};

const BenchmarkListElement = ({
  benchmark,
  index,
  onUpdate,
}: BenchmarkProps) => {
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);

  const router = useRouter();

  const closeModal = (benchmark?: Benchmark) => {
    setIsAssignmentModalOpen(false);
    if (benchmark) {
      onUpdate(benchmark);
    }
  };

  return (
    <Box
      sx={{
        marginBottom: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex-col",
          justifyContent: "space-between",
          backgroundColor: "var(--grey-100)",
          padding: "1rem",
        }}
      >
        <Typography
          sx={{ color: "var(--primary-40)" }}
          variant="overline"
          display="block"
          gutterBottom
        >
          #{(index ?? 0) + 1} created on {format(benchmark?.created_at, "P")}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <ContentPasteIcon
              sx={{
                color: "var(--grey-10)",
                fontSize: 12,
                margin: "1.25rem",
                marginLeft: "0.5rem",
                marginRight: "0.5rem",
              }}
            />

            <Box sx={{ margin: "1rem", marginLeft: ".5rem" }}>
              {benchmark.description}
            </Box>
          </Box>
          <Box sx={{ margin: "1rem" }}>
            <Link
              href={`${router.asPath}/benchmarks/${benchmark.benchmark_id}/edit`}
            >
              <Button variant="tertiary">Edit</Button>
            </Link>
          </Box>
        </Box>
        <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Info description={"BASELINE LEVEL"}>
            {" "}
            {benchmark?.baseline_level}%{" "}
          </Info>
          <Info description={"TARGET LEVEL"}> {benchmark?.target_level}% </Info>
          <Info description={"CURRENT LEVEL"}>
            {" "}
            {benchmark?.current_level || "N/A"}{" "}
          </Info>
          <Info description={"# OF TRIALS"}>
            {" "}
            {benchmark?.number_of_trials || "N/A"}
          </Info>
          <Info description={"STAFF"}>
            <BenchmarkAssignees
              benchmark={benchmark}
              onAssign={() => setIsAssignmentModalOpen(true)}
            />
          </Info>
          <Info description="DATA">
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
              }}
            >
              <Box
                sx={{
                  marginRight: { xs: "0rem", lg: "0.5rem" },
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Link href={`/benchmarks/${benchmark.benchmark_id}`}>
                  <Button variant="tertiary">Collect Data</Button>
                </Link>
              </Box>
              <Box
                sx={{
                  marginLeft: { xs: "0rem", lg: "0.5rem" },
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {/* Placeholder href to replace with actual path */}
                <Button
                  onClick={() => {
                    alert("To be implemented");
                  }}
                  variant="tertiary"
                >
                  View Data
                </Button>
              </Box>
            </Box>
          </Info>
        </Box>
      </Box>
      {isAssignmentModalOpen && (
        <BenchmarkAssignmentModal
          isOpen={true}
          onClose={closeModal}
          benchmark_id={benchmark.benchmark_id}
        />
      )}
    </Box>
  );
};

export default BenchmarkListElement;
