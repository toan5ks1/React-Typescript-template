import { commonBuildPipelineConfig } from "../../../mfe/common.config";

export default commonBuildPipelineConfig("syllabus-main", {
    entry: "./exports/applications/syllabus-main.tsx",
    port: 4006,
    rootDir: __dirname,
    checkConfig: {
        typescript: true,
        eslint: {
            files: ["./src"],
            extensions: [".ts", ".tsx"],
        },
    },
});
