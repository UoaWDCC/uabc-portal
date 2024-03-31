import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
const config: Config = {
  preset: "ts-jest",
  coverageProvider: "v8",
  testEnvironment: "<rootDir>/src/tests/jsdom-extended.js",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup-jest.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
