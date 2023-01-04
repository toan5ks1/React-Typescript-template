import { choiceAssignedStudentStatus } from "src/squads/lesson/common/choices";

import { renderHook } from "@testing-library/react-hooks";
import useAssignedStudentStatus from "src/squads/lesson/domains/AssignedStudentList/hooks/useAssignedStudentStatus";

describe("useAssignedStudentStatus", () => {
    it("should return correctly list status", () => {
        const { result } = renderHook(() => useAssignedStudentStatus());
        expect(result.current.choiceAssignedStudentStatus).toEqual(choiceAssignedStudentStatus);
    });
});
