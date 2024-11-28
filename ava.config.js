export default {
  timeout: "90s",
  files: ["src/**/*.test.ts"],
  extensions: ["ts"],
  require: ["@esbuild-kit/cjs-loader"],
  ignoredByWatcher: ["**/.next/**"],
};
