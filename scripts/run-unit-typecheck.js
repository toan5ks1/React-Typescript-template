const path = require("path");
const { execSync } = require("child_process");

const projects = [
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

let command = "yarn run typecheck:unit";

projects.forEach((currentSquad) => {
    command += ` && echo \"typecheck squad ${currentSquad}\" && project=${currentSquad} yarn run typecheck:unit-squad`;
});

execSync(command, { cwd: path.resolve(__dirname, ".."), stdio: "inherit" });
