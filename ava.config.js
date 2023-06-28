module.exports = {
  timeout: "90s",
  files: ["src/**/*.test.ts"],
  extensions: ["ts"],
  require: ["esbuild-register"],
  nodeArguments: ["--loader=tsx"],
  ignoredByWatcher: ["**/.next/**"],
};
