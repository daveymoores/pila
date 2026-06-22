const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jsdom",
  testMatch: ["**/*.spec.tsx", "**/*.spec.ts"],
};

module.exports = createJestConfig(customJestConfig);