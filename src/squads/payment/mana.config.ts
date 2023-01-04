export default {
    application: {
        teamName: "payment",
        sources: {
            "@manabie-com/mfe/payment-main": {
                configPath: "./payment.config.ts",
                outDir: "./build/payment-main",
                entryPath: "payment-main/index.js",
            },
        },
        hooks: {
            beforeBuild: async () => {},
        },
    },
};
