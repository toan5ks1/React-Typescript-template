export default {
    application: {
        teamName: "adobo",

        sources: {
            "@manabie-com/mfe/adobo-main": {
                outDir: "./build/adobo-main",
                configPath: "./adobo.config.ts",
                entryPath: "adobo-main/index.js",
            },
        },
        hooks: {
            beforeBuild: async () => {},
        },
    },
};
