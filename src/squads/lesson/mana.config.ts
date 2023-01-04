export default {
    application: {
        teamName: "lesson",
        sources: {
            "@manabie-com/mfe/lesson-main": {
                outDir: "./build/lesson-main",
                configPath: "./lesson.config.ts",
                entryPath: "lesson-main/index.js",
            },
        },
        hooks: {
            beforeBuild: async () => {},
        },
    },
};
