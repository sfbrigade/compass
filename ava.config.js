module.exports = {
  timeout: "90s",
  files: ["src/backend/**/*.test.ts"],
  extensions: ["ts"],
  require: ["@esbuild-kit/cjs-loader"],
  ignoredByWatcher: ["**/.next/**"],
};
