const avaConfig = {
  timeout: "90s",
  files: ["src/**/*.test.ts"],
  extensions: ["ts"],
  require: ["tsx"],
  nodeArguments: ["--no-warnings"],
  watchMode: {
    ignoreChanges: ["**/.next/**"],
  },
};
export default avaConfig;
