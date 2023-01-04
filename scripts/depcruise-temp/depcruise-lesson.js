/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: "lesson",
            comment: "Don't allow dependencies from outside lesson folder",
            severity: "error",
            from: { path: "^src/squads/lesson" },
            to: { pathNot: "^src/squads/lesson" },
        },
    ],
};
