const path = require("path");

const rootPath = path.resolve("./");

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
    rootDir: path.resolve(__dirname),
    coverageReporters: ["json", "html", "text", "text-summary"],
    collectCoverageFrom: [
        "<rootDir>/**/*.{js,jsx,ts,tsx}",
        "!<rootDir>/jest.config.js",
        "!<rootDir>/setupTests.js",
        "!<rootDir>/jest-global-setup.js",
        "!<rootDir>/jest-global-teardown.ts",
        "!<rootDir>/test-utils/**/*.{js,jsx,ts,tsx}",
        "!<rootDir>/coverage/**/*.{js,jsx,ts,tsx}",
    ],
    coverageThreshold: {
        global: {
            statements: 83,
            branches: 72.2,
            functions: 83,
            lines: 83.9,
        },
    },
    displayName: "payment",
    testMatch: [
        "<rootDir>/**/__tests__/**/*.{spec,test}.{ts,tsx}",
        "<rootDir>/**/__test__/**/*.{spec,test}.{ts,tsx}",
        "<rootDir>/**/*.{spec,test}.{ts,tsx}",
    ],
    testPathIgnorePatterns: [],
    coveragePathIgnorePatterns: [], // dont read coverage from ignored folder
    rootDir: path.resolve(__dirname),
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
        "^manabie-bob/(.*)$": `${rootPath}/node_modules/manabie-bob/$1`,
        "^manabie-yasuo/(.*)$": [`${rootPath}/node_modules/manabie-yasuo/$1`],
        "^manabuf/(.*)$": `${rootPath}/node_modules/manabuf/$1`,
        "^src/(.*)$": `${rootPath}/src/$1`,
        "^\\./variants/VITE_PJ_OWNER$": "./variants/manabie",
    },
    verbose: true,
    bail: true,
    reporters: [
        "default",
        [
            `${rootPath}/node_modules/jest-html-reporter`,
            {
                pageTitle: "Manabie - Unit Test Performance Report",
                outputPath: "./coverage/performance-report-payment.html",
                includeFailureMsg: true,
                executionTimeWarningThreshold: 5,
                sort: "executionDesc",
            },
        ],
    ],
};
