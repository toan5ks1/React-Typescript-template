import { commonBuildPipelineConfig } from "../../../mfe/common.config";

export default commonBuildPipelineConfig("lesson-main", {
    entry: "./exports/applications/lesson-main.tsx",
    port: 4003,
    rootDir: __dirname,
    checkConfig: {
        typescript: true,
        eslint: {
            files: ["./src"],
            extensions: [".ts", ".tsx"],
        },
    },
});
