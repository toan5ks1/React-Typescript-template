import { commonBuildPipelineConfig } from "../../../mfe/common.config";

const calendarMainConfig = commonBuildPipelineConfig("calendar-main", {
    entry: "./exports/applications/calendar-main.tsx",
    port: 4009,
    rootDir: __dirname,
    checkConfig: {
        typescript: true,
        eslint: {
            files: ["./src"],
            extensions: [".ts", ".tsx"],
        },
    },
});

export default calendarMainConfig;
