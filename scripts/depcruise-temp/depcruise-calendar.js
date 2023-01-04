/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: "calendar",
            comment: "Don't allow dependencies from outside calendar folder",
            severity: "error",
            from: { path: "^src/squads/calendar" },
            to: { pathNot: "^src/squads/calendar" },
        },
    ],
};
