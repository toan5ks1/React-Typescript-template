const envCmd = require("env-cmd");
const path = require("path");
const fs = require("fs");

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function loadEnvs() {
    const envDefault = process.env;
    try {
        let envOverrides = {};
        const filePath = path.resolve(__dirname, "../environments/.env");
        const secretFile = path.resolve(__dirname, "../environments/.env.local");
        if (fs.existsSync(filePath)) {
            envOverrides = await envCmd.GetEnvVars({
                envFile: {
                    filePath,
                },
            });
        }

        if (fs.existsSync(secretFile)) {
            const secrets = await envCmd.GetEnvVars({
                envFile: {
                    filePath: secretFile,
                },
            });

            envOverrides = {
                ...envOverrides,
                ...secrets,
            };
        }

        return {
            ...envDefault,
            ...envOverrides,
        };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log("Error during loading environment", error);
        return envDefault;
    }
}

async function loadSecrets() {
    const envs = await loadEnvs();

    const schemaUrl =
        envs.GRAPHQL_SCHEMA_URL || "https://admin.staging-green.manabie.io:31600/v1/graphql";

    let secret = envs.GRAPHQL_SCHEMA_SECRET;

    return new Promise((resolve) => {
        if (!secret) {
            readline.question(
                "Missing secret, please add to the GRAPHQL_SCHEMA_SECRET(secret of the hasura) to the .env or type password here\n" +
                    "Password:",
                (sec) => {
                    resolve({
                        schemaUrl,
                        secret: sec,
                    });
                }
            );

            return;
        }

        resolve({
            secret,
            schemas: getValidSchemaInfos(envs),
        });
    });
}

function getValidSchemaInfos(envs) {
    // a schema url must begin with "GRAPHQL_SCHEMA_URL_<name>". We take the name part for schema name
    return Object.keys(envs)
        .map((key) => {
            return key.includes("GRAPHQL_SCHEMA_URL_")
                ? {
                      url: envs[key],
                      name: lastPhraseLowercase(key.split("_")),
                  }
                : null;
        })
        .filter((e) => !!e);
}

function lastPhraseLowercase(strings) {
    return strings.pop().toLowerCase();
}

async function doInFolders(path, callback) {
    const folders = fs.readdirSync(path);

    return Promise.all(folders.map(callback));
}

const metadataDir = path.resolve(__dirname, "./data/");

function resolveNeedToValidateEnglishFile() {
    return path.resolve(__dirname, "../src/i18n/source/cms_en.json");
}
function resolveNeedToValidateJapaneseFile() {
    return path.resolve(__dirname, "../src/i18n/source/cms_ja.json");
}

function isDirExist(filePath) {
    return fs.existsSync(filePath);
}
// using curl --data @file
function writeMetadataParams(filePath) {
    const pathFile = path.resolve(__dirname, "import-metadata-params.json");

    fs.writeFileSync(
        pathFile,
        JSON.stringify({
            type: "replace_metadata",
            args: require(filePath),
        })
    );
    return pathFile;
}

module.exports = {
    loadEnvs,
    loadSecrets,
    doInFolders,
    metadataDir,
    isDirExist,
    writeMetadataParams,
    resolveNeedToValidateEnglishFile,
    resolveNeedToValidateJapaneseFile,
};
