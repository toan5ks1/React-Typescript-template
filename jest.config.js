const path = require("path");

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    rootDir: path.resolve(__dirname),
    coverageReporters: ["json", "html", "text", "text-summary"],
    collectCoverageFrom: ["<rootDir>/src/**/*.{js,jsx,ts,tsx}"],
    coveragePathIgnorePatterns: [
        "<rootDir>/src/squads/",
        "<rootDir>/src/test-utils/",
        "<rootDir>/src/internals/localizer/",
    ],
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{spec,test}.{ts,tsx}",
        "<rootDir>/src/**/__test__/**/*.{spec,test}.{ts,tsx}",
        "<rootDir>/src/**/*.{spec,test}.{ts,tsx}",
        "<rootDir>/.github/scripts/**/*.{spec,test}.js",
    ],
    testPathIgnorePatterns: ["<rootDir>/src/squads/"],
    coverageThreshold: {
        global: {
            statements: 60,
            branches: 49.8,
            functions: 62.4,
            lines: 60.5,
        },
    },
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    globalSetup: "<rootDir>/jest-global-setup.ts",
    globalTeardown: "<rootDir>/jest-global-teardown.ts",
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    resetModules: true,
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|sass|scss)$": "identity-obj-proxy",
        "^manabie-bob/(.*)$": "<rootDir>/node_modules/manabie-bob/$1",
        "^manabie-yasuo/(.*)$": ["<rootDir>/node_modules/manabie-yasuo/$1"],
        "^manabuf/(.*)$": "<rootDir>/node_modules/manabuf/$1",
        "^src/(.*)$": "<rootDir>/src/$1",
        "^\\./variants/VITE_PJ_OWNER$": "./variants/manabie",
    },
    verbose: true,
    bail: true,
    reporters: [
        "default",
        [
            "./node_modules/jest-html-reporter",
            {
                pageTitle: "Manabie - Unit Test Performance Report",
                outputPath: `./coverage/performance-report.html`,
                includeFailureMsg: true,
                executionTimeWarningThreshold: 5,
                sort: "executionDesc",
            },
        ],
    ],
};
