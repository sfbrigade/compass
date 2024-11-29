const avaConfig = {
  timeout: "90s",
  files: ["src/**/*.test.ts"],
  extensions: ["ts"],
  require: ["@esbuild-kit/cjs-loader"],
  watchMode: {
    ignoreChanges: ["**/.next/**"],
  },
};
export default avaConfig;
