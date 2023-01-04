/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
    options: {
        tsPreCompilationDeps: true,
    },
    forbidden: [
        {
            name: "not-outside-squad-folder",
            comment: "Don't allow dependencies in user to outside squad folder",
            severity: "error",
            from: { path: ["(^src/squads/)([^/]+)/"] },
            to: {
                path: ["^$1", "^src/test-utils"],
                pathNot: [
                    "$1$2",
                    "^src/squads/payment/domains/OrderManagement/components/StudentBillingTab", // TODO: LT-14185 this line is temporary
                    "^src/squads/adobo/domains/invoice/pages/student-invoice/StudentInvoice", // TODO: LT-15871 temporary line
                    "^src/squads/adobo/domains/entry-exit/modules/student-entryexit",
                    "^src/squads/adobo/domains/entry-exit/services/infer-service", // TODO: Make ticket to move these 2 hooks to adobo domain
                ],
            },
        },
        {
            name: "no-outside-hook",
            comment: "Don't allow dependencies src/hooks into hook folder",
            severity: "error",
            from: { path: ["(^src/squads/[^/]+)"] },
            to: {
                path: ["^src/hooks"],
                pathNot: [
                    "^$1",
                    "^src/hooks/useTextEllipsis",
                    "^src/hooks/useDialog",
                    "^src/hooks/useBrightcoveProfileData",
                    "src/hooks/useFormFilterAdvanced",
                    "src/hooks/useBrightcoveProfileData",
                    "src/hooks/useOnChangeVideoLink",
                    "src/hooks/useActionMenu",
                    "src/hooks/useTabs",
                    "^src/hooks/(useUpdatePermissionMicroApplication|useStandaloneFeatureToggle|useDataProvider|useMediaList|useBreadcrumb|useGlobalLocations|useAutocompleteReference)",
                ],
            },
        },
        {
            name: "no-outside-internals",
            comment: "Don't allow dependencies src/internals into internals folder",
            severity: "error",
            from: {
                path: ["(^src)/internals"],
            },
            to: {
                pathNot: [
                    "$1/(packages|common|typings|test-utils|models|internals|__tests__)",
                    "$1/(hooks/data/data-types|services/index|services/yasuo/user-service-yasuo)", //This line is temporary,
                    "$1/(squads/user/service/usermgmt/user-group-service-user-mgmt)", //TODO: remove when move auth-provider.ts into squad
                    "$1/(squads/user/service/usermgmt/user-service-usermgmt)", //TODO: remove when move auth-provider.ts into squad
                ],
            },
        },
        {
            name: "no-outside-packages",
            comment: "Don't allow dependencies src/packages into packages folder",
            severity: "error",
            from: {
                path: ["(^src)/packages"],
            },
            to: {
                pathNot: ["$1/(packages|common|typings|test-utils)"],
            },
        },
        {
            name: "no-outside-services and __generated__",
            comment: "Don't allow dependencies src/services, src/__generated__ into squads folder",
            severity: "error",
            from: {
                path: ["(^src)/squads"],
            },
            to: {
                path: ["(^src)/services", "(^src)/__generated__"],
            },
        },
    ],
};
