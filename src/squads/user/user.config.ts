import Pages from "vite-plugin-pages";
import shimReactPdf from "vite-plugin-shim-react-pdf";

import { commonBuildPipelineConfig } from "../../../mfe/common.config";

export default commonBuildPipelineConfig("user-main", {
    entry: "./exports/applications/user-main.tsx",
    port: 4007,
    rootDir: __dirname,
    plugins: [
        Pages({
            pagesDir: [
                {
                    dir: "./pages",
                    baseRoute: "",
                },
            ],
            exclude: ["**/auth", "**/components"],
            extensions: ["tsx"],
            react: true,
            extendRoute: (router) => {
                return {
                    ...router,
                    meta: {
                        pathname: router.path.split("/")[1],
                    },
                };
            },
        }),
        shimReactPdf() as any,
    ],
    checkConfig: {
        typescript: true,
        eslint: {
            files: ["./src"],
            extensions: [".ts", ".tsx"],
        },
    },
});
