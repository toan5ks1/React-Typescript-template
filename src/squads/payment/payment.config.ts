import { commonBuildPipelineConfig } from "../../../mfe/common.config";

export default commonBuildPipelineConfig("payment-main", {
    entry: "./exports/applications/payment-main.tsx",
    port: 4004,
    rootDir: __dirname,
    checkConfig: {
        typescript: true,
        eslint: {
            files: ["./src"],
            extensions: [".ts", ".tsx"],
        },
    },
});
