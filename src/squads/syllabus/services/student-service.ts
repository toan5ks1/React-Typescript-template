import { arrayHasItem } from "src/common/utils/other";
import { StudentsManyQueryVariables } from "src/squads/syllabus/services/bob/bob-types";
import { studentBobQuery } from "src/squads/syllabus/services/bob/student-service-bob";

import { defineService } from "./service-creator";
import { createEmptyResponse } from "./utils/utils";

export const studentService = defineService({
    query: {
        STUDENT_GET_MANY: (params: StudentsManyQueryVariables) => {
            if (arrayHasItem(params.user_ids)) return studentBobQuery.getMany(params);
            return createEmptyResponse(undefined);
        },
    },
});
