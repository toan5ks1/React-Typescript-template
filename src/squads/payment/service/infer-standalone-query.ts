import standaloneQueryClient from "src/squads/payment/internals/standalone-query-client";
import { bankQueryService } from "src/squads/payment/service/bob/bank-bob-service/bank-query-service";
import { bankBranchQueryService } from "src/squads/payment/service/bob/bank-branch-bob-service/bank-branch-query-service";
import { schoolCourseQueryService } from "src/squads/payment/service/bob/school-course-bob-service/school-course-query-service";
import { schoolInfoQueryService } from "src/squads/payment/service/bob/school-info-bob-service/school-info-query-service";
import { schoolLevelQueryService } from "src/squads/payment/service/bob/school-level-bob-service/school-level-query-service";
import { userTagQueryService } from "src/squads/payment/service/bob/user-tag-bob-service/user-tag-query-service";
import { gradeService } from "src/squads/payment/service/fatima/grade-service/grade-service";
import { timesheetConfigQueryService } from "src/squads/payment/service/timesheet/timesheet-config-timesheet-service/timesheet-config-query-service";

import { composeServices } from "@manabie-com/react-utils";

const rootService = composeServices({
    schoolInfo: schoolInfoQueryService,
    schoolLevel: schoolLevelQueryService,
    schoolCourse: schoolCourseQueryService,
    grade: gradeService,
    bank: bankQueryService,
    bankBranch: bankBranchQueryService,
    userTag: userTagQueryService,
    timesheetConfig: timesheetConfigQueryService,
});

const inferStandaloneQuery = standaloneQueryClient.createStandaloneQuery(rootService);

export default inferStandaloneQuery;
