import { commonBuildPipelineConfig } from "../../../mfe/common.config";

export default commonBuildPipelineConfig("architecture-main", {
    entry: "./exports/applications/architecture-main.tsx",
    port: 4008,
    rootDir: __dirname,
    checkConfig: {
        typescript: true,
        eslint: {
            files: ["./src"],
            extensions: [".ts", ".tsx"],
        },
    },
});
