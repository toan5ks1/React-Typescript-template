const path = require("path");
const { exec } = require("child_process");

const allTeams = [
    "adobo",
    "architecture",
    "calendar",
    "communication",
    "lesson",
    "payment",
    "syllabus",
    "timesheet",
    "user",
];

function run() {
    allTeams.forEach((team) => {
        const teamManaConfig = path.resolve(__dirname, `../src/squads/${team}/mana.config.ts`);

        exec(
            `yarn mana app build --config ${teamManaConfig} --manifest-path ${path.resolve(
                __dirname,
                `../src/squads/${team}/manifest.json`
            )}`,
            (error, stdout, stderr) => {
                if (error) {
                    console.log(error);
                }
            }
        );
    });
}

run();
