import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useState, type ReactNode } from "react";
import { format } from "date-fns";
import Typography from "@mui/material/Typography";
import Chip from "../design_system/chip/Chip";
import Button from "@/components/design_system/button/Button";
import { BenchmarkAssignmentModal } from "./BenchmarkAssignmentModal";
import BenchmarkAssignees from "./BenchmarkAssignees";
import { Benchmark } from "@/types/global";
import Link from "next/link";
import { useRouter } from "next/router";

import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";

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
      {description.includes("Assigned STAFF") ||
      description.includes("DATA") ? (
        <Typography
          sx={{ marginTop: "1em", color: "gray" }}
          variant="overline"
          display="block"
          gutterBottom
        >
          {description}
        </Typography>
      ) : (
        ""
      )}
      {children}
      {description.includes("Assigned STAFF") ||
      description.includes("DATA") ? (
        ""
      ) : (
        <Typography
          sx={{ marginTop: "1em", color: "gray" }}
          variant="overline"
          display="block"
          gutterBottom
        >
          {description}
        </Typography>
      )}
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
        <Chip
          color="default"
          size="medium"
          variant="outlined"
          icon={<CalendarMonthOutlinedIcon />}
          sx={{ fontWeight: "medium" }}
          label={`Created on: ${format(benchmark?.created_at, "PPP")}`}
        />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ marginTop: "1.5rem" }}>
              <Chip
                label={(index ?? 0) + 1}
                color="default"
                size="medium"
                sx={{
                  marginRight: "0.5rem",
                  padding: "0.5rem",
                }}
                icon={
                  <ContentPasteIcon
                    sx={{
                      color: "var(--grey-10)",
                      fontSize: 15,
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
            {benchmark?.baseline_level ? (
              <Chip
                label={benchmark?.baseline_level + "%"}
                sx={{ width: "4rem", height: "1.8rem" }}
                size="medium"
                color="primary"
              />
            ) : (
              <Chip
                label={"0%"}
                color="primary"
                variant="outlined"
                size="medium"
                sx={{
                  border: "1px solid",
                  borderColor: "default",
                  width: "3rem",
                  height: "1.8rem",
                  fontWeight: "bold",
                }}
              />
            )}
          </Info>
          <Info description={"TARGET LEVEL"}>
            {" "}
            {benchmark?.target_level ? (
              <Chip
                label={benchmark?.target_level + "%"}
                sx={{ width: "4rem", height: "1.8rem" }}
                size="medium"
                color="primary"
              />
            ) : (
              <Chip
                label={"0%"}
                color="primary"
                variant="outlined"
                size="medium"
                sx={{
                  border: "1px solid",
                  borderColor: "default",
                  width: "3rem",
                  height: "1.8rem",
                  fontWeight: "bold",
                }}
              />
            )}
          </Info>
          <Info description={"CURRENT LEVEL"}>
            {" "}
            {benchmark?.current_level ? (
              <Chip
                label={benchmark?.current_level + "%"}
                sx={{ width: "4rem", height: "1.8rem" }}
                color="primary"
                size="medium"
              />
            ) : (
              <Chip
                label={"0%"}
                color="primary"
                variant="outlined"
                size="medium"
                sx={{
                  border: "1px solid",
                  borderColor: "default",
                  width: "3rem",
                  height: "1.8rem",
                  fontWeight: "bold",
                }}
              />
            )}
          </Info>
          <Info description={"# OF TRIALS"}>
            {" "}
            {benchmark?.number_of_trials ? (
              <Chip
                label={benchmark?.number_of_trials}
                color="primary"
                size="medium"
                sx={{ width: "3rem", height: "1.8rem" }}
              />
            ) : (
              <Chip
                label={"0"}
                color="default"
                size="medium"
                sx={{
                  border: "1px solid",
                  borderColor: "primary",
                  width: "3rem",
                  height: "1.8rem",
                }}
              />
            )}
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
                  <Button
                    variant="tertiary"
                    startIcon={<ContentPasteOutlinedIcon fontSize="medium" />}
                  >
                    Collect Data
                  </Button>
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
                  startIcon={<VisibilityOutlinedIcon />}
                >
                  View Data
                </Button>
              </Box>
            </Box>
          </Info>
          <Info description={"Assigned STAFF"}>
            <BenchmarkAssignees
              benchmark={benchmark}
              onAssign={() => setIsAssignmentModalOpen(true)}
            />
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
