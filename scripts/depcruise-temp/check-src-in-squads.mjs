import { readFileSync } from "fs";

import { execSync } from "child_process";

const generated = async (pathCheck, onlySquad) => {
    execSync(`node ./scripts/dependencies-tracking.js`, {
        stdio: "inherit",
    });
    const finalJSON = JSON.parse(readFileSync("scripts/depcruise-temp/final.json"));

    let strMarkdown = "|Component | Squad |\n|---|---|\n";

    Object.keys(finalJSON).forEach((key) => {
        if (key.includes(pathCheck)) {
            let values = finalJSON[key];
            if (!onlySquad || (onlySquad && values.length === 1)) {
                strMarkdown += `|${key}| ${values.join(", ")}|\n`;
            }
        }
    });
    console.log(strMarkdown);
    return strMarkdown;
};

generated("src/components", true);
