import {
    ParentsManyQueryVariables,
    ParentRelationshipsByUserIdQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { defineService } from "src/squads/user/service/service-creator";
import { ListQuery } from "src/squads/user/service/service-types";
import studentServiceUsermgmt from "src/squads/user/service/usermgmt/student-service-usermgmt";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";

import studentParentQueriesBob from "src/squads/user/service/bob/student-parent-service-bob/student-parent-bob.query";

const studentParentService = defineService({
    query: {
        userGetManyParentsByStudentIds: (variables: ListQuery<ParentsManyQueryVariables>) => {
            const student_ids = variables.filter?.student_ids || [];

            return studentParentQueriesBob.getManyParentIDs({ student_ids });
        },
        userGetParentRelationshipsByParentId: (
            variables: ListQuery<ParentRelationshipsByUserIdQueryVariables>
        ) => {
            const userId = variables.filter?.userId;
            return studentParentQueriesBob.getParentRelationships({ userId });
        },
    },

    mutation: {
        userCreateParent: (data: NsUsermgmtStudentService.UpsertParent) => {
            return studentServiceUsermgmt.createParent(data);
        },
        userUpdateParent: (data: NsUsermgmtStudentService.UpsertParent) => {
            return studentServiceUsermgmt.updateParent(data);
        },
        userRemoveParent: (data: NsUsermgmtStudentService.RemoveParentReq) => {
            return studentServiceUsermgmt.removeParent(data);
        },
    },
});

export default studentParentService;
