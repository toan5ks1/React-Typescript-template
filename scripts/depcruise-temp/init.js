const fs = require("fs");
const path = require("path");

function run() {
    const squads = [
        "communication",
        "lesson",
        "payment",
        "syllabus",
        "user",
        "adobo",
        "calendar",
        "architecture",
        "timesheet",
    ];

    squads.forEach((squadName) => {
        const fileContent = `/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: "${squadName}",
            comment: "Don't allow dependencies from outside ${squadName} folder",
            severity: "error",
            from: { path: "^src/squads/${squadName}" },
            to: { pathNot: "^src/squads/${squadName}" },
        },
    ],
};
`;

        fs.writeFileSync(path.resolve(__dirname, `./depcruise-${squadName}.js`), fileContent);
    });
}

run();
