module.exports = {
  timeout: "90s",
  files: ["src/**/*.test.ts"],
  extensions: ["ts"],
  nodeArguments: ["--loader=tsx"],
  ignoredByWatcher: ["**/.next/**"],
};
