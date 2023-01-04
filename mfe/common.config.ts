import * as path from "path";
import type { RollupOptions } from "rollup";
import {
    build,
    defineConfig,
    LibraryOptions,
    loadEnv,
    ConfigEnv,
    Plugin,
    UserConfig,
    UserConfigExport,
} from "vite";
import { UserPluginConfig } from "vite-plugin-checker";
// don't do any check for now
import viteCompression from "vite-plugin-compression";
import vitePluginHtmlEnv from "vite-plugin-html-env";
import tsconfigPaths from "vite-tsconfig-paths";
import { constants } from "zlib";

import reactRefresh from "@vitejs/plugin-react-refresh";

export interface BuildPipelineOptions {
    rootDir: string;
    entry?: string; // input file path for build entry
    host?: string;
    port: number;
    mode?: "micro" | "root";
    format?: "react" | "js";
    extendExternal?: string[]; // external dependencies beside of react, react-dom, material ui
    envDir?: string; // relative to rootDir
    plugins?: Plugin[];
    alias?: { find: string | RegExp; replacement: string }[];
    rollupPlugins?: RollupOptions["plugins"];
    checkConfig: UserPluginConfig;
}

type CustomizationFn = (currentConfig: UserConfig, envConfig: ConfigEnv) => UserConfig;

type BuildPipelineFunction = (
    buildName: string,
    buildOptions: BuildPipelineOptions,
    customizationFn?: CustomizationFn
) => UserConfigExport;

export const commonBuildPipelineConfig: BuildPipelineFunction = (
    buildName,
    buildOptions,
    customizeFn = (e) => e
    // if you extremely want to modify the final config
) => {
    if (buildOptions.mode === "micro" && !buildOptions.entry) {
        throw new Error(`Mode 'micro' needs 'entry' options in config: ${__dirname}`);
    }

    return defineConfig(async (configEnv) => {
        const currentEnvironments = loadEnv(configEnv.mode, "./environments", "VITE_");

        buildOptions.format = buildOptions.format ?? "react"; // default
        const isBuildForReact = buildOptions.format === "react";
        const buildMode = buildOptions.mode ?? "micro";
        const libBuildConfig: LibraryOptions | undefined =
            buildMode === "micro"
                ? {
                      entry: path.resolve(buildOptions.rootDir, buildOptions.entry!),
                      name: buildName,
                      fileName: () => `index.js`,
                      formats: ["es"],
                  }
                : undefined;

        return customizeFn(
            {
                root: buildOptions.rootDir,
                server: {
                    port: buildOptions.port, // prepare for load local application in development
                    host: buildOptions.host ?? "0.0.0.0",
                },
                cacheDir: path.resolve(buildOptions.rootDir, ".cache"),
                publicDir: path.resolve(buildOptions.rootDir, "./public"),
                envDir: path.resolve(buildOptions.rootDir, buildOptions.envDir ?? "./environments"),
                build: {
                    outDir: path.resolve(buildOptions.rootDir, `./build/${buildName}`),
                    target: "modules",
                    assetsDir: path.resolve(buildOptions.rootDir, "./statics"),
                    lib: libBuildConfig,
                    emptyOutDir: true,
                    reportCompressedSize: false,
                    rollupOptions: {
                        external: ["react", "react-dom", ...(buildOptions.extendExternal ?? [])],
                        plugins: buildOptions.rollupPlugins as any,
                    },
                },
                resolve: {
                    alias: [
                        {
                            find: "./variants/VITE_PJ_OWNER",
                            replacement: `./variants/${currentEnvironments.VITE_PJ_OWNER}`,
                        },
                        ...(buildOptions.alias ?? []),
                    ],
                },
                esbuild: {
                    logLevel: "warning",
                    ...(isBuildForReact && {
                        jsxInject: `import * as React from "react";`,
                    }),
                },
                plugins: [
                    isBuildForReact && reactRefresh(),
                    // pluginChecker(buildOptions.checkConfig),
                    tsconfigPaths({
                        root: path.resolve(__dirname, "../"),
                    }),
                    vitePluginHtmlEnv(currentEnvironments),
                    viteCompression({
                        algorithm: "brotliCompress",
                        compressionOptions: {
                            params: {
                                [constants.BROTLI_PARAM_QUALITY]: 9,
                                [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_TEXT,
                            },
                        },
                    }),
                    ...(buildOptions.plugins ?? []),
                ],
            },
            configEnv
        );
    });
};

// use single thread for now
export async function godPleaseBuildWithoutErrors(config: UserConfigExport) {
    const finalConfig = await resolveFunctionableConfig(config);

    return build(finalConfig);
}

async function resolveFunctionableConfig(userConfigExport: UserConfigExport) {
    return typeof userConfigExport === "function"
        ? await userConfigExport({ mode: "production", command: "build" })
        : await userConfigExport;
}
