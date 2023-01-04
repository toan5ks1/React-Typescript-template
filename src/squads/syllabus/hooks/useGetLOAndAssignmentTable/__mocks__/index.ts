import { KeyAssignmentTypes } from "src/squads/syllabus/common/constants/const";

import { UseGetLOAndAssignmentTableValues } from "../useGetLOAndAssignmentTable";

export const lOAndAssignmentList: UseGetLOAndAssignmentTableValues["data"] = [
    {
        school_id: 1,
        lo_id: "lo_id",
        name: "lo name",
        created_at: new Date("2021/05/12, 07:15"),
        updated_at: null,
        // TODO: remove
        subject: "ENGLISH",
        grade: 1,
    },
    {
        school_id: 1,
        lo_id: "lo_id_1",
        name: "lo name",
        created_at: new Date("2021/05/12, 07:15"),
        updated_at: null,
        // TODO: remove
        subject: "ENGLISH",
        grade: 1,
    },
    {
        school_id: 1,
        assignment_id: "assignment_id",
        name: "assignment name",
        created_at: new Date("2021/05/12, 07:15"),
        updated_at: null,
        // TODO: remove
        subject: "ENGLISH",
        grade: 1,
    },
    {
        school_id: 1,
        assignment_id: "assignment_id_1",
        name: "task assignment name",
        created_at: new Date("2021/05/12, 07:15"),
        updated_at: null,
        type: KeyAssignmentTypes.ASSIGNMENT_TYPE_TASK,
        // TODO: remove
        subject: "ENGLISH",
        grade: 1,
    },
];
