export default {
    application: {
        teamName: "calendar",

        sources: {
            "@manabie-com/mfe/architecture-main": {
                configPath: "./architecture.config.ts",
                outDir: "./build/architecture-main",
                entryPath: "architecture-main/index.js",
            },
        },
        hooks: {
            beforeBuild: async () => {},
        },
    },
};
