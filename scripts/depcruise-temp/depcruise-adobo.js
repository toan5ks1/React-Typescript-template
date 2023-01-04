/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: "adobo",
            comment: "Don't allow dependencies from outside adobo folder",
            severity: "error",
            from: { path: "^src/squads/adobo" },
            to: { pathNot: "^src/squads/adobo" },
        },
    ],
};
