import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useState, type ReactNode } from "react";
import { format } from "date-fns";
import Typography from "@mui/material/Typography";
import Chips from "../design_system/Chips/Chips";
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
        <Chips
          color="default"
          size="medium"
          icon={<CalendarMonthIcon />}
          label={`Created on: ${format(benchmark?.created_at, "P")}`}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ margin: "1rem", marginLeft: ".5rem" }}>
              <Chips
                label={(index ?? 0) + 1}
                color="default"
                size="medium"
                sx={{
                  marginRight: "0.5rem",
                }}
                icon={
                  <ContentPasteIcon
                    sx={{
                      color: "var(--grey-10)",
                      fontSize: 20,
                    }}
                  />
                }
              />
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
            <Chips
              label={benchmark?.baseline_level + "%"}
              color="primary"
              size="medium"
            ></Chips>
          </Info>
          <Info description={"TARGET LEVEL"}>
            <Chips
              label={benchmark?.target_level + "%"}
              color="primary"
              size="medium"
            ></Chips>
          </Info>
          <Info description={"CURRENT LEVEL"}>
            {" "}
            {benchmark?.current_level ? (
              <Chips
                label={benchmark?.current_level + "%"}
                color="primary"
                size="medium"
              ></Chips>
            ) : (
              <Chips
                label={"0%"}
                color="default"
                size="medium"
                sx={{
                  border: "1px solid",
                  borderColor: "primary",
                }}
              ></Chips>
            )}
          </Info>
          <Info description={"# OF TRIALS"}>
            {" "}
            {benchmark?.number_of_trials ? (
              <Chips
                label={benchmark?.number_of_trials}
                color="primary"
                size="medium"
              ></Chips>
            ) : (
              <Chips
                label={"0"}
                color="default"
                size="medium"
                sx={{
                  border: "1px solid",
                  borderColor: "primary",
                }}
              ></Chips>
            )}
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
