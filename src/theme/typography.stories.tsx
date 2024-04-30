import type { Meta } from "@storybook/react";
import { Box, Typography } from "@mui/material";

const meta: Meta = {
  title: "Typography",
  component: Typography,
};

export default meta;

export const TextVariants = () => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="flex-start"
    gap="1.875em"
  >
    <Typography variant="h1">Heading 1</Typography>
    <Typography variant="h2">Heading 2</Typography>
    <Typography variant="h3">Heading 3</Typography>
    <Typography variant="h4">Heading 4</Typography>
    <Typography variant="h5">Heading 5</Typography>

    <Typography variant="body1">Body 1</Typography>
    <Typography variant="body2">Body 2</Typography>

    <Typography variant="button">Button</Typography>

    <Typography variant="caption">Caption</Typography>

    <Typography variant="overline">Overline</Typography>
  </Box>
);
