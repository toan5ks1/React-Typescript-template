import { MicroFrontendTypes, Routing } from "./type";

import Adobo from "src/squads/adobo/routing/MicroRouting";
import Calendar from "src/squads/calendar/routing/MicroRouting";
import Communication from "src/squads/communication/routing/MicroRouting";
import Lesson from "src/squads/lesson/routing/MicroRouting";
import Payment from "src/squads/payment/routing/MicroRouting";
import Syllabus from "src/squads/syllabus/routing/MicroRouting";
import Timesheet from "src/squads/timesheet/routing/MicroRouting";
import User from "src/squads/user/routing/MicroRouting";

const squadRoutings: Routing[] = [
    {
        name: MicroFrontendTypes.SYLLABUS,
        component: Syllabus,
    },
    {
        name: MicroFrontendTypes.USER,
        component: User,
    },
    {
        name: MicroFrontendTypes.LESSON,
        component: Lesson,
    },
    {
        name: MicroFrontendTypes.COMMUNICATION,
        component: Communication,
    },
    {
        name: MicroFrontendTypes.ENTRY_EXIT,
        component: Adobo,
    },
    {
        name: MicroFrontendTypes.PAYMENT,
        component: Payment,
    },
    {
        name: MicroFrontendTypes.INVOICE,
        component: Adobo,
    },
    {
        name: MicroFrontendTypes.CALENDAR,
        component: Calendar,
    },
    {
        name: MicroFrontendTypes.TIMESHEET,
        component: Timesheet,
    },
];

export default squadRoutings;
