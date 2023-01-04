import path from "path";
import { ConfigEnv, UserConfig, defineConfig, loadEnv } from "vite";
import pluginChecker, { UserPluginConfig } from "vite-plugin-checker";
import viteCompression from "vite-plugin-compression";
import vitePluginHtmlEnv from "vite-plugin-html-env";
import vitePluginImp from "vite-plugin-imp";
import Pages from "vite-plugin-pages";
import shimReactPdf from "vite-plugin-shim-react-pdf";
import tsconfigPaths from "vite-tsconfig-paths";
import zlib from "zlib";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig(async (configEnv: ConfigEnv): Promise<UserConfig> => {
    const currentEnvironments = loadEnv(configEnv.mode, "./environments", "VITE_");

    // only do tsc check on build
    const checkerConfigs: UserPluginConfig = {
        typescript: true,
    };

    // we do full eslint + tsc check on development
    if (configEnv && configEnv.mode === "development") {
        checkerConfigs.eslint = {
            files: ["./src"],
            extensions: [".ts", ".tsx"],
        };
    }

    const squads = [
        "lesson",
        "communication",
        "user",
        "syllabus",
        "payment",
        "adobo",
        "architecture",
        "calendar",
        "timesheet",
    ];
    return {
        server: {
            port: 3001,
            host: "0.0.0.0",
        },
        envDir: "./environments",
        build: {
            outDir: "build",
            target: "modules",
            assetsDir: "./statics",
            emptyOutDir: true,
            rollupOptions: {
                output:
                    currentEnvironments.VITE_NO_HASH === "true"
                        ? {
                              entryFileNames: `statics/[name].js`,
                              chunkFileNames: `statics/[name].js`,
                              assetFileNames: `statics/[name].[ext]`,
                          }
                        : {},
                plugins: [
                    dynamicImportVars({
                        include: "./src/internals/configuration/variants/*.ts",
                    }),
                ],
            },
        },
        define: {
            "process.env": `${JSON.stringify({})}`,
        },
        resolve: {
            dedupe: ["react", "react-dom"],
            alias: squads
                .map((squad) => {
                    return {
                        find: `@manabie-com/micro-frontend/${squad}`,
                        replacement: path.resolve(__dirname, `src/squads/${squad}/build/index.js`),
                    };
                })
                .concat([
                    {
                        find: "./variants/VITE_PJ_OWNER",
                        replacement: `./variants/${currentEnvironments.VITE_PJ_OWNER}`,
                    },
                ]),
        },
        esbuild: {
            logLevel: "warning",
            jsxInject: `import React from 'react'`,
        },
        plugins: [
            configEnv.mode !== "test" && reactRefresh(),
            configEnv.mode !== "test" && pluginChecker(checkerConfigs),
            tsconfigPaths(),
            vitePluginHtmlEnv({ ...currentEnvironments, prefix: "<{", suffix: "}>" }),
            viteCompression({
                algorithm: "brotliCompress",
                compressionOptions: {
                    params: {
                        [zlib.constants.BROTLI_PARAM_QUALITY]: 9,
                        [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
                    },
                },
            }),
            shimReactPdf(),
            Pages({
                pagesDir: [
                    { dir: "src/squads/user/pages", baseRoute: "" },
                    { dir: "src/squads/timesheet/pages", baseRoute: "" },
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
            vitePluginImp({
                libList: [
                    {
                        libName: "lodash",
                        libDirectory: "",
                        camel2DashComponentName: false,
                    },
                ],
            }),
        ],
        optimizeDeps: {
            esbuildOptions: {
                define: {
                    global: "globalThis",
                },
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        buffer: true,
                    }),
                ],
            },
        },
    };
});
