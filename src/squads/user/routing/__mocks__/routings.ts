export const rawRoutes = [
    {
        permissionConfigs: {
            subject: "student_erp",
            action: "SHOW",
        },
        viteRoutes: [
            {
                path: "/user/student_erp",
                component: () => {
                    return "/user/student_erp";
                },
            },
        ],
    },
];
