import { commonBuildPipelineConfig } from "../../../mfe/common.config";

export default commonBuildPipelineConfig("adobo-main", {
    entry: "./exports/applications/adobo-main.tsx",
    port: 4002,
    rootDir: __dirname,
    checkConfig: {
        typescript: true,
        eslint: {
            files: ["./src"],
            extensions: [".ts", ".tsx"],
        },
    },
});
