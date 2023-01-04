import { ManabieConfiguration } from "@manabie-com/mana-cli";

const configuration: ManabieConfiguration = {
    envfile: ["./environments/.env", "./environments/.env.local"],
    tsConfig: "./tsconfig.json",
    tsToJSONSchema: [
        // payment
        {
            jsonPath: "./src/__generated__/schema/payment.json",
            typesPath: "./src/squads/payment/internals/mana-event-emitter/types.ts",
        },
        {
            jsonPath: "./src/__generated__/schema/adobo.json",
            typesPath: "./src/squads/adobo/internals/mana-event-emitter/types.ts",
        },
        {
            jsonPath: "./src/__generated__/schema/calendar.json",
            typesPath: "./src/squads/calendar/internals/mana-event-emitter/types.ts",
        },
        {
            jsonPath: "./src/__generated__/schema/communication.json",
            typesPath: "./src/squads/communication/internals/mana-event-emitter/types.ts",
        },
        {
            jsonPath: "./src/__generated__/schema/lesson.json",
            typesPath: "./src/squads/lesson/internals/mana-event-emitter/types.ts",
        },
        {
            jsonPath: "./src/__generated__/schema/syllabus.json",
            typesPath: "./src/squads/syllabus/internals/mana-event-emitter/types.ts",
        },
        {
            jsonPath: "./src/__generated__/schema/timesheet.json",
            typesPath: "./src/squads/timesheet/internals/mana-event-emitter/types.ts",
        },
        {
            jsonPath: "./src/__generated__/schema/user.json",
            typesPath: "./src/squads/user/internals/mana-event-emitter/types.ts",
        },
    ],
    graphql: {
        rootTypePath: "./src/__generated__/root-types.ts",
        schemaPath: "./schema.graphql",
        documents: [
            {
                inputDocument: "./src/services/bob/**/*.{ts,graphql}",
                outputType: "./src/services/bob/bob-types.ts",
                outputQuery: "./src/__generated__/bob/all-queries.graphql",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                rootTypePath: "./src/__generated__/bob/root-types.ts",
            },
            {
                inputDocument: "./src/services/eureka/**/*.{ts,graphql}",
                outputType: "./src/services/eureka/eureka-types.ts",
                outputQuery: "./src/__generated__/eureka/all-queries.graphql",
                schemaPath: "./src/__generated__/eureka/schema.graphql",
                rootTypePath: "./src/__generated__/eureka/root-types.ts",
            },
            {
                inputDocument: "./src/services/fatima/**/*.{ts,graphql}",
                outputType: "./src/services/fatima/fatima-types.ts",
                outputQuery: "./src/__generated__/fatima/all-queries.graphql",
                schemaPath: "./src/__generated__/fatima/schema.graphql",
                rootTypePath: "./src/__generated__/fatima/root-types.ts",
            },
            // User Squad
            {
                inputDocument: "./src/squads/user/service/bob/**/*.{ts,graphql}",
                outputType: "./src/squads/user/service/bob/bob-types.ts",
                outputQuery: "./src/squads/user/__generated__/bob/all-queries.graphql",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                rootTypePath: "./src/squads/user/__generated__/bob/root-types.ts",
            },
            {
                inputDocument: "./src/squads/user/service/eureka/**/*.{ts,graphql}",
                outputType: "./src/squads/user/service/eureka/eureka-types.ts",
                outputQuery: "./src/squads/user/__generated__/eureka/all-queries.graphql",
                schemaPath: "./src/__generated__/eureka/schema.graphql",
                rootTypePath: "./src/squads/user/__generated__/eureka/root-types.ts",
            },
            {
                inputDocument: "./src/squads/user/service/fatima/**/*.{ts,graphql}",
                outputType: "./src/squads/user/service/fatima/fatima-types.ts",
                outputQuery: "./src/squads/user/__generated__/fatima/all-queries.graphql",
                schemaPath: "./src/__generated__/fatima/schema.graphql",
                rootTypePath: "./src/squads/user/__generated__/fatima/root-types.ts",
            },
            // Syllabus Squad
            {
                inputDocument: "./src/squads/syllabus/services/eureka/**/*.{ts,graphql}",
                outputType: "./src/squads/syllabus/services/eureka/eureka-types.ts",
                outputQuery: "./src/squads/syllabus/__generated__/eureka/all-queries.graphql",
                schemaPath: "./src/__generated__/eureka/schema.graphql",
                rootTypePath: "./src/squads/syllabus/__generated__/eureka/root-types.ts",
            },
            {
                inputDocument: "./src/squads/syllabus/services/bob/**/*.{ts,graphql}",
                outputType: "./src/squads/syllabus/services/bob/bob-types.ts",
                outputQuery: "./src/squads/syllabus/__generated__/bob/all-queries.graphql",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                rootTypePath: "./src/squads/syllabus/__generated__/bob/root-types.ts",
            },
            // Lesson Squad
            {
                inputDocument: "./src/squads/lesson/service/bob/**/*.{ts,graphql}",
                outputType: "./src/squads/lesson/service/bob/bob-types.ts",
                outputQuery: "./src/squads/lesson/__generated__/bob/all-queries.graphql",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                rootTypePath: "./src/squads/lesson/__generated__/bob/root-types.ts",
            },
            {
                inputDocument: "./src/squads/lesson/service/eureka/**/*.{ts,graphql}",
                outputType: "./src/squads/lesson/service/eureka/eureka-types.ts",
                outputQuery: "./src/squads/lesson/__generated__/eureka/all-queries.graphql",
                schemaPath: "./src/__generated__/eureka/schema.graphql",
                rootTypePath: "./src/squads/lesson/__generated__/eureka/root-types.ts",
            },
            {
                inputDocument: "./src/squads/lesson/service/fatima/**/*.{ts,graphql}",
                outputType: "./src/squads/lesson/service/fatima/fatima-types.ts",
                outputQuery: "./src/squads/lesson/__generated__/fatima/all-queries.graphql",
                schemaPath: "./src/__generated__/fatima/schema.graphql",
                rootTypePath: "./src/squads/lesson/__generated__/fatima/root-types.ts",
            },
            // Communication Squad
            {
                inputDocument: "./src/squads/communication/service/bob/**/*.{ts,graphql}",
                outputType: "./src/squads/communication/service/bob/bob-types.ts",
                outputQuery: "./src/squads/communication/__generated__/bob/all-queries.graphql",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                rootTypePath: "./src/squads/communication/__generated__/bob/root-types.ts",
            },
            //Payment Squad
            {
                inputDocument: "./src/squads/payment/service/bob/**/*.{ts,graphql}",
                outputType: "./src/squads/payment/service/bob/bob-types.ts",
                outputQuery: "./src/squads/payment/__generated__/bob/all-queries.graphql",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                rootTypePath: "./src/squads/payment/__generated__/bob/root-types.ts",
            },
            {
                inputDocument: "./src/squads/payment/service/fatima/**/*.{ts,graphql}",
                outputType: "./src/squads/payment/service/fatima/fatima-types.ts",
                outputQuery: "./src/squads/payment/__generated__/fatima/all-queries.graphql",
                schemaPath: "./src/__generated__/fatima/schema.graphql",
                rootTypePath: "./src/squads/payment/__generated__/fatima/root-types.ts",
            },
            {
                inputDocument: "./src/squads/payment/service/timesheet/**/*.{ts,graphql}",
                outputType: "./src/squads/payment/service/timesheet/timesheet-types.ts",
                outputQuery: "./src/squads/payment/__generated__/timesheet/all-queries.graphql",
                schemaPath: "./src/__generated__/timesheet/schema.graphql",
                rootTypePath: "./src/squads/payment/__generated__/timesheet/root-types.ts",
            },
            // Adobo Squad - Invoice
            {
                inputDocument:
                    "./src/squads/adobo/domains/invoice/services/invoicemgmt/**/*.{ts,graphql}",
                outputType:
                    "./src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types.ts",
                outputQuery:
                    "./src/squads/adobo/domains/invoice/__generated__/invoicemgmt/all-queries.graphql",
                schemaPath:
                    "./src/squads/adobo/domains/invoice/__generated__/invoicemgmt/schema.graphql",
                rootTypePath:
                    "./src/squads/adobo/domains/invoice/__generated__/invoicemgmt/root-types.ts",
            },
            // Adobo Squad - Entry & Exit
            {
                inputDocument:
                    "./src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-records-service/**/*.{ts,graphql}",
                outputType:
                    "./src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-records-service/entryexitmgmt-types.ts",
                outputQuery:
                    "./src/squads/adobo/domains/entry-exit/__generated__/entryexitmgmt/all-queries.graphql",
                schemaPath:
                    "./src/squads/adobo/domains/entry-exit/__generated__/entryexitmgmt/schema.graphql",
                rootTypePath:
                    "./src/squads/adobo/domains/entry-exit/__generated__/entryexitmgmt/root-types.ts",
            },
            // Calendar Squad
            {
                inputDocument: "./src/squads/calendar/service/bob/**/*.{ts,graphql}",
                outputType: "./src/squads/calendar/service/bob/bob-types.ts",
                outputQuery: "./src/squads/calendar/__generated__/bob/all-queries.graphql",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                rootTypePath: "./src/squads/calendar/__generated__/bob/root-types.ts",
            },

            // Timesheet Squad
            {
                inputDocument: "./src/squads/timesheet/service/bob/**/*.{ts,graphql}",
                outputType: "./src/squads/timesheet/service/bob/bob-types.ts",
                outputQuery: "./src/squads/timesheet/__generated__/bob/all-queries.graphql",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                rootTypePath: "./src/squads/timesheet/__generated__/bob/root-types.ts",
            },
            {
                inputDocument: "./src/squads/timesheet/service/timesheet/**/*.{ts,graphql}",
                outputType: "./src/squads/timesheet/service/timesheet/timesheet-types.ts",
                outputQuery: "./src/squads/timesheet/__generated__/timesheet/all-queries.graphql",
                schemaPath: "./src/__generated__/timesheet/schema.graphql",
                rootTypePath: "./src/squads/timesheet/__generated__/timesheet/root-types.ts",
            },
        ],
    },
    hasura: {
        version: "v1.3.3",
        instances: [
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_BOB",
                },
                logFile: "./src/__generated__/bob/log.json",
                metadataPath: "./src/__generated__/bob/metadata",
                graphqlFilePaths: [
                    "./src/__generated__/bob/all-queries.graphql",
                    "./scripts/allow-list/bob-test-allow-list.graphql",
                ],
            },
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/eureka/",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/eureka",
                schemaPath: "./src/__generated__/eureka/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_EUREKA",
                },
                graphqlFilePaths: [
                    "./src/__generated__/eureka/all-queries.graphql",
                    "./scripts/allow-list/eureka-test-allow-list.graphql",
                ],
                metadataPath: "./src/__generated__/eureka/metadata",
                logFile: "./src/__generated__/eureka/log.json",
            },
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/fatima/",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/fatima",
                schemaPath: "./src/__generated__/fatima/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_FATIMA",
                },
                graphqlFilePaths: "./src/__generated__/fatima/all-queries.graphql",
                metadataPath: "./src/__generated__/fatima/metadata",
                logFile: "./src/__generated__/fatima/log.json",
            },
            // Lesson Squad
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_BOB",
                },
                logFile: "./src/__generated__/bob/log.json",
                metadataPath: "./src/__generated__/bob/metadata",
                graphqlFilePaths: "./src/squads/lesson/__generated__/bob/all-queries.graphql",
            },
            // User Squad
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_BOB",
                },
                logFile: "./src/__generated__/bob/log.json",
                metadataPath: "./src/__generated__/bob/metadata",
                graphqlFilePaths: "./src/squads/user/__generated__/bob/all-queries.graphql",
            },
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/eureka",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/eureka",
                schemaPath: "./src/__generated__/eureka/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_EUREKA",
                },
                logFile: "./src/__generated__/eureka/log.json",
                metadataPath: "./src/__generated__/eureka/metadata",
                graphqlFilePaths: "./src/squads/user/__generated__/eureka/all-queries.graphql",
            },
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/fatima/",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/fatima",
                schemaPath: "./src/__generated__/fatima/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_FATIMA",
                },
                graphqlFilePaths: "./src/squads/user/__generated__/fatima/all-queries.graphql",
                metadataPath: "./src/__generated__/fatima/metadata",
                logFile: "./src/__generated__/fatima/log.json",
            },
            // Syllabus Squad
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_BOB",
                },
                logFile: "./src/__generated__/bob/log.json",
                metadataPath: "./src/__generated__/bob/metadata",
                graphqlFilePaths: "./src/squads/syllabus/__generated__/bob/all-queries.graphql",
            },
            // Adobo Squad - Invoice
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/invoicemgmt",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/invoicemgmt",
                schemaPath:
                    "./src/squads/adobo/domains/invoice/__generated__/invoicemgmt/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_INVOICEMGMT",
                },
                logFile: "./src/squads/adobo/domains/invoice/__generated__/invoicemgmt/log.json",
                metadataPath:
                    "./src/squads/adobo/domains/invoice/__generated__/invoicemgmt/metadata",
                graphqlFilePaths:
                    "./src/squads/adobo/domains/invoice/__generated__/invoicemgmt/all-queries.graphql",
            },
            // Adobo Squad - Entry & Exit
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/entryexitmgmt",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/entryexitmgmt",
                schemaPath:
                    "./src/squads/adobo/domains/entry-exit/__generated__/entryexitmgmt/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_ENTRYEXITMGMT",
                },
                logFile:
                    "./src/squads/adobo/domains/entry-exit/__generated__/entryexitmgmt/log.json",
                metadataPath:
                    "./src/squads/adobo/domains/entry-exit/__generated__/entryexitmgmt/metadata",
                graphqlFilePaths:
                    "./src/squads/adobo/domains/entry-exit/__generated__/entryexitmgmt/all-queries.graphql",
            },
            // Calendar Squad
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_BOB",
                },
                logFile: "./src/__generated__/bob/log.json",
                metadataPath: "./src/__generated__/bob/metadata",
                graphqlFilePaths: "./src/squads/calendar/__generated__/bob/all-queries.graphql",
            },

            // Timesheet Squad
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_BOB",
                },
                logFile: "./src/__generated__/bob/log.json",
                metadataPath: "./src/__generated__/bob/metadata",
                graphqlFilePaths: "./src/squads/timesheet/__generated__/bob/all-queries.graphql",
            },
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/timesheet",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/timesheet",
                schemaPath: "./src/__generated__/timesheet/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_TIMESHEET",
                },
                logFile: "./src/__generated__/timesheet/log.json",
                metadataPath: "./src/__generated__/timesheet/metadata",
                graphqlFilePaths:
                    "./src/squads/timesheet/__generated__/timesheet/all-queries.graphql",
            },
            // Payment squad
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/",
                schemaPath: "./src/__generated__/bob/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_BOB",
                },
                logFile: "./src/__generated__/bob/log.json",
                metadataPath: "./src/__generated__/bob/metadata",
                graphqlFilePaths: "./src/squads/payment/__generated__/bob/all-queries.graphql",
            },
            {
                hasuraUrl: "https://admin.staging-green.manabie.io:31600/timesheet",
                localHasuraUrl: "https://admin.local-green.manabie.io:31600/timesheet",
                schemaPath: "./src/__generated__/timesheet/schema.graphql",
                secretEnvName: {
                    ADMIN_SECRET: "MANA_ADMIN_SECRET_TIMESHEET",
                },
                logFile: "./src/__generated__/timesheet/log.json",
                metadataPath: "./src/__generated__/timesheet/metadata",
                graphqlFilePaths:
                    "./src/squads/payment/__generated__/timesheet/all-queries.graphql",
            },
        ],
    },
    translation: [
        {
            translationPaths: [
                "./src/i18n/source/cms_en.json",
                "./src/i18n/source/cms_ja.json",
                "./src/i18n/source/cms_vi.json",
            ],
            typesPath: "./src/i18n/types.ts",
        },
        {
            translationPaths: [
                "./src/squads/adobo/domains/invoice/i18n/source/cms_en.json",
                "./src/squads/adobo/domains/invoice/i18n/source/cms_ja.json",
                "./src/squads/adobo/domains/invoice/i18n/source/cms_vi.json",
            ],
            typesPath: "./src/squads/adobo/domains/invoice/i18n/types.ts",
        },
        {
            translationPaths: [
                "./src/squads/communication/i18n/source/cms_en.json",
                "./src/squads/communication/i18n/source/cms_ja.json",
                "./src/squads/communication/i18n/source/cms_vi.json",
            ],
            typesPath: "./src/squads/communication/i18n/types.ts",
        },
        {
            translationPaths: [
                "./src/squads/adobo/domains/entry-exit/i18n/source/cms_en.json",
                "./src/squads/adobo/domains/entry-exit/i18n/source/cms_ja.json",
                "./src/squads/adobo/domains/entry-exit/i18n/source/cms_vi.json",
            ],
            typesPath: "./src/squads/adobo/domains/entry-exit/i18n/types.ts",
        },
        {
            translationPaths: [
                "./src/squads/lesson/i18n/source/cms_en.json",
                "./src/squads/lesson/i18n/source/cms_ja.json",
                "./src/squads/lesson/i18n/source/cms_vi.json",
            ],
            typesPath: "./src/squads/lesson/i18n/types.ts",
        },
        {
            translationPaths: [
                "./src/squads/calendar/i18n/source/cms_en.json",
                "./src/squads/calendar/i18n/source/cms_ja.json",
                "./src/squads/calendar/i18n/source/cms_vi.json",
            ],
            typesPath: "./src/squads/calendar/i18n/types.ts",
        },
        {
            translationPaths: [
                "./src/squads/payment/i18n/source/cms_en.json",
                "./src/squads/payment/i18n/source/cms_ja.json",
                "./src/squads/payment/i18n/source/cms_vi.json",
            ],
            typesPath: "./src/squads/payment/i18n/types.ts",
        },

        {
            translationPaths: [
                "./src/squads/syllabus/i18n/source/cms_en.json",
                "./src/squads/syllabus/i18n/source/cms_ja.json",
                "./src/squads/syllabus/i18n/source/cms_vi.json",
            ],
            typesPath: "./src/squads/syllabus/i18n/types.ts",
        },
        {
            translationPaths: [
                "./src/squads/user/i18n/source/cms_en.json",
                "./src/squads/user/i18n/source/cms_ja.json",
                "./src/squads/user/i18n/source/cms_vi.json",
            ],
            typesPath: "./src/squads/user/i18n/types.ts",
        },
        {
            translationPaths: [
                "./src/squads/timesheet/i18n/source/cms_en.json",
                "./src/squads/timesheet/i18n/source/cms_ja.json",
                "./src/squads/timesheet/i18n/source/cms_vi.json",
            ],
            typesPath: "./src/squads/timesheet/i18n/types.ts",
        },
    ],
};

export default configuration;
