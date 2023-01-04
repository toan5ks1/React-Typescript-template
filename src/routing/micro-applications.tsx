/* eslint-disable import/no-unresolved */
import { MicroFrontendTypes, Routing } from "./type";

// @ts-ignore
import { Component as Communication } from "@manabie-com/micro-frontend/communication";
// @ts-ignore
import { Component as EntryExit } from "@manabie-com/micro-frontend/entry-exit";
// @ts-ignore
import { Component as Invoice } from "@manabie-com/micro-frontend/invoice";
// @ts-ignore
import { Component as Lesson } from "@manabie-com/micro-frontend/lesson";
// @ts-ignore
import { Component as Payment } from "@manabie-com/micro-frontend/payment";
// @ts-ignore
import { Component as Platform } from "@manabie-com/micro-frontend/platform";
// @ts-ignore
import { Component as Syllabus } from "@manabie-com/micro-frontend/syllabus";
// @ts-ignore
import { Component as Timesheet } from "@manabie-com/micro-frontend/timesheet";
// @ts-ignore
import { Component as User } from "@manabie-com/micro-frontend/user";

const squadRoutings: Routing[] = [
    {
        name: MicroFrontendTypes.SYLLABUS,
        component: () => <Syllabus basename={`/${MicroFrontendTypes.SYLLABUS}`} />,
    },
    {
        name: MicroFrontendTypes.LESSON,
        component: () => <Lesson basename={`/${MicroFrontendTypes.LESSON}`} />,
    },
    {
        name: MicroFrontendTypes.COMMUNICATION,
        component: () => <Communication basename={`/${MicroFrontendTypes.COMMUNICATION}`} />,
    },
    {
        name: MicroFrontendTypes.ENTRY_EXIT,
        component: () => <EntryExit basename={`/${MicroFrontendTypes.ENTRY_EXIT}`} />,
    },
    {
        name: MicroFrontendTypes.PAYMENT,
        component: () => <Payment basename={`/${MicroFrontendTypes.PAYMENT}`} />,
    },
    {
        name: MicroFrontendTypes.USER,
        component: () => <User basename={`/${MicroFrontendTypes.USER}`} />,
    },
    {
        name: MicroFrontendTypes.TIMESHEET,
        component: () => <Timesheet basename={`/${MicroFrontendTypes.TIMESHEET}`} />,
    },
];
export default squadRoutings;
