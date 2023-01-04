import { choiceAssignedStudentStatus } from "src/squads/lesson/common/choices";

describe("choices", () => {
    it("choiceAssignedStudentStatus", () => {
        expect(choiceAssignedStudentStatus).toEqual([
            {
                id: "STUDENT_ASSIGNED_STATUS_UNDER_ASSIGNED",
                name: "resources.choices.assignedStudentStatus.STUDENT_ASSIGNED_STATUS_UNDER_ASSIGNED",
            },
            {
                id: "STUDENT_ASSIGNED_STATUS_JUST_ASSIGNED",
                name: "resources.choices.assignedStudentStatus.STUDENT_ASSIGNED_STATUS_JUST_ASSIGNED",
            },
            {
                id: "STUDENT_ASSIGNED_STATUS_OVER_ASSIGNED",
                name: "resources.choices.assignedStudentStatus.STUDENT_ASSIGNED_STATUS_OVER_ASSIGNED",
            },
        ]);
    });
});
