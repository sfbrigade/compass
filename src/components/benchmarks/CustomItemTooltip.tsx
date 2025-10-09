import * as React from "react";
import NoSsr from "@mui/material/NoSsr";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useItemTooltip, useMouseTracker } from "@mui/x-charts";
import { generateVirtualElement } from "./generateVirtualElement";
import { BulkPoint, ProcessedTrialData, SoloPoint } from "@/types/global";

interface CustomItemTooltipProps {
  datePoints?: Record<string, ProcessedTrialData[]>;
}

export function CustomItemTooltip({ datePoints = {} }: CustomItemTooltipProps) {
  const tooltipData = useItemTooltip();
  const mousePosition = useMouseTracker();

  if (!tooltipData || !mousePosition) {
    return null;
  }

  const isSoloOrBulkPoint = (
    value: unknown
  ): value is SoloPoint | BulkPoint => {
    return value !== null && typeof value === "object" && "id" in value;
  };

  const isMousePointer = mousePosition?.pointerType === "mouse";
  const yOffset = isMousePointer ? 0 : 40 - mousePosition.height;
  const getRangeMarkerType = () => {
    if (isSoloOrBulkPoint(tooltipData.value)) {
      const id = tooltipData.value.id;
      if (id.startsWith("min-")) return "Lowest Score";
      if (id.startsWith("max-")) return "Highest Score";
    }
    return null;
  };

  const getFormattedDate = () => {
    if (isSoloOrBulkPoint(tooltipData.value)) {
      let dateString = tooltipData.value.id;

      // If it's a range marker, extract the actual date from the id
      if (dateString.startsWith("min-") || dateString.startsWith("max-")) {
        dateString = dateString.replace(/^(min-|max-)/, "");
      }

      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
    return "Unknown Date";
  };

  const getTrialsForPoint = () => {
    if (!datePoints) return [];

    if (isSoloOrBulkPoint(tooltipData.value)) {
      const dateKey = tooltipData.value.id;
      if (dateKey && datePoints[dateKey]) {
        return datePoints[dateKey];
      }
    }

    return [];
  };

  const trials = getTrialsForPoint();
  const formattedDate = getFormattedDate();
  const rangeMarkerType = getRangeMarkerType();

  const isMultiTrial = trials.length > 1;

  return (
    <NoSsr>
      <Popper
        sx={{
          pointerEvents: "none",
          zIndex: (theme) => theme.zIndex.modal,
        }}
        open
        placement={isMousePointer ? "top-end" : "top"}
        anchorEl={generateVirtualElement(mousePosition)}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, yOffset],
            },
          },
        ]}
      >
        <Paper
          elevation={2}
          sx={{
            m: 1,
            p: 2,
            minWidth: 250,
            maxWidth: 350,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
            {formattedDate}
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: tooltipData.color,
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              {rangeMarkerType || tooltipData.label}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold", ml: "auto" }}>
              {tooltipData.formattedValue}
            </Typography>
          </Stack>

          {trials.length > 0 && (
            <>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
                {isMultiTrial && (
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    Individual Trials
                  </Typography>
                )}
              </Typography>

              <Stack spacing={0.5}>
                {trials.map((trial, idx) => (
                  <Stack
                    key={trial.trial_data_id || idx}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      py: 0.25,
                      px: 1,
                      backgroundColor:
                        idx % 2 === 0 ? "action.hover" : "transparent",
                      borderRadius: 0.5,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
                      {isMultiTrial ? `Trial ${idx + 1}` : "Trial Detail"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.8rem", fontWeight: "medium" }}
                    >
                      {trial.successRate?.toFixed(1)}%
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                    >
                      ({trial.success}/{trial.numberOfAttempts})
                    </Typography>
                  </Stack>
                ))}
              </Stack>

              {trials.length > 0 && (
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "0.75rem",
                    color: "text.secondary",
                    mt: 1,
                    fontStyle: "italic",
                  }}
                >
                  Staff:{" "}
                  {Array.from(new Set(trials.map((t) => t.staffName))).join(
                    ", "
                  )}
                </Typography>
              )}
            </>
          )}
        </Paper>
      </Popper>
    </NoSsr>
  );
}
