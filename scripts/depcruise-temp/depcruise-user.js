/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: "user",
            comment: "Don't allow dependencies from outside user folder",
            severity: "error",
            from: { path: "^src/squads/user" },
            to: { pathNot: "^src/squads/user" },
        },
    ],
};
