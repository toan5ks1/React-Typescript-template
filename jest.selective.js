const path = require("path");
// access args from command
const args = process.argv;
// search for test file match regex, ex: src/squads/user/componentA
const [testPath] = args.filter((c) => c.match(/^.*\/squads\/[a-z]*/g));

if (!testPath) {
    module.exports = require("./jest.config");
} else {
    // get squad path, ex: src/squads/user
    const [rootSquad] = testPath.match(/^.*\/squads\/[a-z]*/g) || [""];
    // get jest config for this test, ex: src/squads/user/jest.config.js
    const configPath = path.join(rootSquad, "jest.config.js");

    module.exports = require(path.resolve(configPath));
}
