export const rawRoutes = [
    {
        permissionConfigs: {
            subject: "timesheet_management",
            action: "SHOW",
        },
        viteRoutes: [
            {
                path: "/timesheet/timesheet_management",
                component: () => {
                    return "/timesheet/timesheet_management";
                },
            },
        ],
    },
];
