import { Plugin } from "vite";

import { commonBuildPipelineConfig } from "../../../mfe/common.config";

export default commonBuildPipelineConfig(
    "root",
    {
        mode: "root",
        port: 4012,
        rootDir: __dirname,
        checkConfig: {
            typescript: true,
            eslint: {
                files: ["./src"],
                extensions: [".ts", ".tsx"],
            },
        },
    },
    (config) => {
        if (!config.plugins) {
            config.plugins = [];
        }

        config.plugins.push(
            viteIgnoreStaticImport([
                "@manabie-com/mfe/syllabus",
                "@manabie-com/mfe/user",
                "@manabie-com/mfe/adobo",
            ])
        );
        config.plugins.push(viteConvertModuleToModuleShim());

        return config;
    }
);

function viteConvertModuleToModuleShim(): Plugin {
    return {
        name: "vite-plugin-html-transform-module-script",
        enforce: "post",
        transformIndexHtml(html) {
            return html.replace(/type="module"/gi, 'type="module-shim"');
        },
    };
}

// https://github.com/vitejs/vite/issues/6393#issuecomment-1006819717
function viteIgnoreStaticImport(importKeys: string[]): Plugin {
    return {
        name: "vite-plugin-ignore-static-import",
        enforce: "pre",
        // 1. insert to optimizeDeps.exclude to prevent pre-transform
        config(config) {
            config.optimizeDeps = {
                ...(config.optimizeDeps ?? {}),
                exclude: [...(config.optimizeDeps?.exclude ?? []), ...importKeys],
            };
        },
        // 2. push a plugin to rewrite the 'vite:import-analysis' prefix
        configResolved(resolvedConfig) {
            const VALID_ID_PREFIX = `/@id/`;
            const reg = new RegExp(`${VALID_ID_PREFIX}(${importKeys.join("|")})`, "g");

            // @ts-ignore push to readonly array
            resolvedConfig.plugins.push({
                name: "vite-plugin-ignore-static-import-replace-idprefix",
                transform: (code) => {
                    return reg.test(code) ? code.replace(reg, (_, s1) => s1) : code;
                },
            } as Plugin);
        },
        // 3. rewrite the id before 'vite:resolve' plugin transform to 'node_modules/...'
        resolveId: (id) => {
            if (importKeys.includes(id)) {
                return { id, external: true };
            }
        },
    };
}
