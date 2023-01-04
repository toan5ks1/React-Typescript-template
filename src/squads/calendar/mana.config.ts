export default {
    application: {
        teamName: "calendar",
        sources: {
            "@manabie-com/mfe/calendar-main": {
                outDir: "./build/calendar-main",
                configPath: "./calendar.config.ts",
                entryPath: "calendar-main/index.js",
            },
        },
        hooks: {
            beforeBuild: async () => {},
        },
    },
};
