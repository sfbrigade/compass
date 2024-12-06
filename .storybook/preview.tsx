import React from "react";
import type { Preview } from "@storybook/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { compassTheme as theme } from "../src/theme";
import { FontProvider } from "../src/components/font-provider";

import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <FontProvider>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Story />
          </ThemeProvider>
        </StyledEngineProvider>
      </FontProvider>
    ),
  ],

  tags: ["autodocs"],
};

export default preview;
