export default {
    application: {
        teamName: "communication",
        sources: {
            "@manabie-com/mfe/communication-main": {
                outDir: "./build/communication-main",
                configPath: "./communication.config.ts",
                entryPath: "communication-main/index.js",
            },
        },
        hooks: {
            beforeBuild: async () => {},
        },
    },
};
