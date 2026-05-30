const createJestConfig = require("next/jest")({ dir: __dirname });

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  moduleNameMapper: {
    "^@/tests/(.*)$": "<rootDir>/tests/$1",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }],
  },
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/api/**",
    "!src/components/ui/**",
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    "./lib/schemas/transferSchema.ts": {
      branches: 100,
      functions: 100,
      lines: 100,
    },
    "./store/slices/": {
      branches: 90,
      functions: 100,
      lines: 100,
    },
    "./hooks/": {
      functions: 100,
      lines: 95,
    },
  },
};

module.exports = createJestConfig(customJestConfig);
