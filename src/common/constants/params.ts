import { MicroFrontendTypes } from "src/routing/type";

import { TypeEntity } from "../../typings/react-admin";
import { SearchEngine, Entities, EurekaEntities, ERPModules } from "./enum";

// only add strict params
export type QueryParamType = {
    query?: SearchEngine;
    resource: TypeEntity;
    translateKey?: string;
    rootResource?: TypeEntity;
    rootQuery?: SearchEngine;
    rootId?: SearchEngine;
    back?: {
        search: { [x in SearchEngine]?: SearchEngine };
    };
    basename: MicroFrontendTypes;
};

export const QueryParamsService: {
    [x in TypeEntity]?: QueryParamType[];
} = {
    [Entities.LOS]: [
        {
            resource: Entities.BOOKS,
            query: SearchEngine.BOOK_ID,
            basename: MicroFrontendTypes.SYLLABUS,
        },
        {
            resource: Entities.CHAPTERS,
            query: SearchEngine.CHAPTER_ID,
            rootResource: Entities.BOOKS,
            rootId: SearchEngine.BOOK_ID,
            basename: MicroFrontendTypes.SYLLABUS,
        },
        {
            resource: Entities.TOPICS,
            rootResource: Entities.BOOKS,
            rootId: SearchEngine.BOOK_ID,
            query: SearchEngine.PARENT_ID,
            basename: MicroFrontendTypes.SYLLABUS,
        },
    ],
    [EurekaEntities.ASSIGNMENTS]: [
        {
            resource: Entities.BOOKS,
            query: SearchEngine.BOOK_ID,
            basename: MicroFrontendTypes.SYLLABUS,
        },
        {
            resource: Entities.CHAPTERS,
            query: SearchEngine.CHAPTER_ID,
            rootResource: Entities.BOOKS,
            rootId: SearchEngine.BOOK_ID,
            basename: MicroFrontendTypes.SYLLABUS,
        },
        {
            rootResource: Entities.BOOKS,
            rootId: SearchEngine.BOOK_ID,
            resource: Entities.TOPICS,
            query: SearchEngine.PARENT_ID,
            basename: MicroFrontendTypes.SYLLABUS,
        },
    ],
    [Entities.QUIZZES]: [
        {
            resource: Entities.LOS,
            query: SearchEngine.PARENT_ID,
            basename: MicroFrontendTypes.SYLLABUS,
        },
        {
            resource: Entities.TOPICS,
            query: SearchEngine.TOPIC_ID,
            basename: MicroFrontendTypes.SYLLABUS,
        },
    ],
    [EurekaEntities.STUDY_PLANS]: [
        {
            resource: Entities.COURSES,
            basename: MicroFrontendTypes.SYLLABUS,
            translateKey: `resources.${Entities.COURSES}.name`,
        },
        {
            resource: Entities.COURSES,
            query: SearchEngine.COURSE_ID,
            basename: MicroFrontendTypes.SYLLABUS,
        },
    ],
    [ERPModules.LIVE_LESSONS]: [
        {
            resource: ERPModules.LIVE_LESSONS,
            basename: MicroFrontendTypes.LESSON,
            translateKey: "resources.live_lessons.lessonManagement",
        },
    ],
    [ERPModules.LESSON_MANAGEMENT]: [
        {
            resource: ERPModules.LESSON_MANAGEMENT,
            basename: MicroFrontendTypes.LESSON,
            translateKey: "resources.lesson_management.name",
        },
    ],
    [ERPModules.NOTIFICATIONS]: [
        {
            resource: ERPModules.NOTIFICATIONS,
            basename: MicroFrontendTypes.COMMUNICATION,
            translateKey: "resources.notifications.name",
        },
    ],
    [ERPModules.STUDENTS]: [
        {
            resource: ERPModules.STUDENTS,
            basename: MicroFrontendTypes.USER,
            translateKey: "resources.students_erp.titles.studentManagement",
        },
    ],
    [Entities.TEACHERS]: [
        {
            resource: Entities.TEACHERS,
            basename: MicroFrontendTypes.USER,
            translateKey: "resources.teachers.title",
        },
    ],
    [Entities.STAFF]: [
        {
            resource: Entities.STAFF,
            basename: MicroFrontendTypes.USER,
            translateKey: "resources.staff.titles.staffManagement",
        },
    ],
    [Entities.ORDERS]: [
        {
            resource: Entities.ORDERS,
            basename: MicroFrontendTypes.PAYMENT,
            translateKey: `resources.${Entities.ORDERS}.name`,
        },
    ],
    [Entities.USER_GROUP]: [
        {
            resource: Entities.USER_GROUP,
            basename: MicroFrontendTypes.USER,
            translateKey: `resources.${Entities.USER_GROUP}.name`,
        },
    ],
    [Entities.TIMESHEET_MANAGEMENT]: [
        {
            resource: Entities.TIMESHEET_MANAGEMENT,
            basename: MicroFrontendTypes.TIMESHEET,
            translateKey: `resources.${Entities.TIMESHEET_MANAGEMENT}.name`,
        },
    ],
};
