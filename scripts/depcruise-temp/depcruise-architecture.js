/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: "architecture",
            comment: "Don't allow dependencies from outside architecture folder",
            severity: "error",
            from: { path: "^src/squads/architecture" },
            to: { pathNot: "^src/squads/architecture" },
        },
    ],
};
