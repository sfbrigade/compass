import React from "react";
import type { Preview } from "@storybook/react";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { compassTheme as theme } from "../src/theme";
import { FontProvider } from "../src/components/font-provider";

import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    /*
      Attention: We've detected that you're using actions.argTypesRegex together with the visual test addon:

      /Users/mike/Documents/coding/compass/.storybook/preview.tsx
        9 | const preview: Preview = {
        10 |   parameters: {
      > 11 |     actions: { argTypesRegex: "^on[A-Z].*" },
          |                ^^^^^^^^^^^^^
        12 |     controls: {
        13 |       matchers: {
        14 |         color: /(background|color)$/i,

      We recommend removing the argTypesRegex and assigning explicit action with the fn function from @storybook/test instead:
      https://storybook.js.org/docs/essentials/actions#via-storybooktest-fn-spy-function
    */
    // actions: { argTypesRegex: "^on[A-Z].*" },
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
};

export default preview;
