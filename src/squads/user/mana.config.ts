export default {
    application: {
        teamName: "user",
        sources: {
            "@manabie-com/mfe/user-main": {
                configPath: "./user.config.ts",
                outDir: "./build/user-main",
                entryPath: "user-main/index.js",
            },
            "@manabie-com/mfe/user-auth": {
                configPath: "./user-auth.config.ts",
                outDir: "./build/user-auth",
                entryPath: "user-auth/index.js",
            },
        },
        hooks: {
            beforeBuild: async () => {},
        },
    },
};
