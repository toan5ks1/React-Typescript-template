const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

function run() {
    const depCruiseBin = path.resolve(__dirname, "../node_modules/.bin/depcruise");
    const cwd = path.resolve(__dirname, "../");
    const squads = [
        "communication",
        "lesson",
        "payment",
        "syllabus",
        "user",
        "adobo",
        "architecture",
        "calendar",
    ];
    const depsMap = {}; // collect all deps to here, then count their existence
    const rootPath = path.resolve(__dirname, "../src"); // collect all deps to here, then count their existence
    const finalResultPath = path.resolve(__dirname, "./depcruise-temp", "final.json"); // collect all deps to here, then count their existence

    squads.forEach((squad) => {
        // eslint-disable-next-line no-console
        console.log(`Run for ${squad}`);
        // just do operation in sync, no need performance here
        const configPath = path.resolve(__dirname, `./depcruise-temp/depcruise-${squad}.js`);
        const outputFile = `__generated-${squad}__.json`;
        const outputPath = path.resolve(__dirname, "./depcruise-temp", outputFile);

        execSync(
            `${depCruiseBin} --config "${configPath}" --exclude "node_modules" --output-type json --output-to "${outputPath}" ${rootPath}`,
            {
                cwd: cwd,
            }
        );

        const jsonFormat = require(outputPath);
        const violations = jsonFormat.summary.violations;

        violations.forEach((violation) => {
            if (violation.to in depsMap) {
                depsMap[violation.to] = [
                    // to deduplicate
                    ...new Set([...depsMap[violation.to], violation.rule.name]),
                ].sort();
            } else {
                depsMap[violation.to] = [violation.rule.name];
            }
        });
    });

    fs.writeFileSync(finalResultPath, JSON.stringify(depsMap, null, 2));
}

run();
