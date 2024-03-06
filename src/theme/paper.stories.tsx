import type { Meta } from "@storybook/react";
import { Box, Paper } from "@mui/material";

const meta: Meta<typeof Paper> = {
  title: "Paper",
  component: Paper,
};

export default meta;

export const Elevations = () => (
  <Box display="flex">
    {new Array(6).fill(0).map((_, i) => (
      <Paper
        key={i}
        elevation={i}
        sx={{
          width: "10rem",
          height: "10rem",
          margin: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Elevation: {i}
      </Paper>
    ))}
  </Box>
);
