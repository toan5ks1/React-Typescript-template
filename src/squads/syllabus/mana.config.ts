export default {
    application: {
        teamName: "syllabus",
        sources: {
            "@manabie-com/mfe/syllabus-main": {
                outDir: "./build/syllabus-main",
                configPath: "./syllabus.config.ts",
                entryPath: "syllabus-main/index.js",
            },
        },
        hooks: {
            beforeBuild: async () => {},
        },
    },
};
