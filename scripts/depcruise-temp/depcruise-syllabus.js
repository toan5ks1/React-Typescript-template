/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: "syllabus",
            comment: "Don't allow dependencies from outside syllabus folder",
            severity: "error",
            from: { path: "^src/squads/syllabus" },
            to: { pathNot: "^src/squads/syllabus" },
        },
    ],
};
