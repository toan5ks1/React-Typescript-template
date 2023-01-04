const path = require("path");
const { execSync } = require("child_process");
const fs = require("fs");

const EXCEPTIONS = ["root"];
const projects = fs.readdirSync(path.resolve(__dirname, "../src/squads")).filter((e) => {
    return !EXCEPTIONS.includes(e);
});

const generalParameters = "--coverage --maxWorkers=50%";

const project = process.env.project;

let command = `yarn test --config jest.config.js ${generalParameters}`;
if (!project) {
    projects.forEach((currentSquad) => {
        command += ` && yarn test --config src/squads/${currentSquad}/jest.config.js ${generalParameters}`;
    });
}

if (project && project !== "root") {
    command = `yarn test --config src/squads/${project}/jest.config.js ${generalParameters}`;
}

execSync(command, { cwd: path.resolve(__dirname, ".."), stdio: "inherit" });
