import locationsService from "./bob/locations-service";
import staffService from "./bob/staff-service";
import lessonHoursService from "./timesheet/lesson-hours-service";
import otherWorkingHoursService from "./timesheet/other-working-hours-service";
import timesheetConfigService from "./timesheet/timesheet-config-service";
import timesheetService from "./timesheet/timesheet-service";

import {
    composeServices,
    createUseQuery,
    createUseMutation,
    createUseQueryPagination,
} from "@manabie-com/react-utils";

// compose all services into service map
const rootService = composeServices({
    location: locationsService,
    timesheet: timesheetService,
    otherWorkingHours: otherWorkingHoursService,
    timesheetConfig: timesheetConfigService,
    staff: staffService,
    lessonHours: lessonHoursService,
});

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().
export const inferQuery = createUseQuery(rootService);

export const inferQueryPagination = createUseQueryPagination(rootService);

export const inferMutation = createUseMutation(rootService);
