export default {
    application: {
        teamName: "timesheet",
        sources: {
            "@manabie-com/mfe/timesheet-main": {
                configPath: "./timesheet.config.ts",
                outDir: "./build/timesheet-main",
                entryPath: "timesheet-main/index.js",
            },
        },
        hooks: {
            beforeBuild: async () => {},
        },
    },
};
