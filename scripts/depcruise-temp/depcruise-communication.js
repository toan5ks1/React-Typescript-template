/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: "communication",
            comment: "Don't allow dependencies from outside communication folder",
            severity: "error",
            from: { path: "^src/squads/communication" },
            to: { pathNot: "^src/squads/communication" },
        },
    ],
};
