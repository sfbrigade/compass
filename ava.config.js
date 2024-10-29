module.exports = {
  timeout: "90s",
  files: ["src/**/*.test.{ts,tsx}"],
  extensions: ["ts", "tsx"],
  require: ["@esbuild-kit/cjs-loader"],
  ignoredByWatcher: ["**/.next/**"],
  environmentVariables: {
    ESBK_TSCONFIG_PATH: "./tsconfig-ava.json",
  },
};
