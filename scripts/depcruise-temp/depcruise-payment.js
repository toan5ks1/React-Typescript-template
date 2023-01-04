/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    forbidden: [
        {
            name: "payment",
            comment: "Don't allow dependencies from outside payment folder",
            severity: "error",
            from: { path: "^src/squads/payment" },
            to: { pathNot: "^src/squads/payment" },
        },
    ],
};
