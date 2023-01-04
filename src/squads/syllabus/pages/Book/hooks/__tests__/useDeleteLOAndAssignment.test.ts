import { Entities, EurekaEntities } from "src/common/constants/enum";
import { NsAssignmentEureka } from "src/squads/syllabus/services/eureka/assignment-eureka";
import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useDeleteLOAndAssignment, {
    UseDeleteLOAndAssignmentProps,
} from "../useDeleteLOAndAssignment";
import useDeleteLOs from "../useDeleteLOs";

import { renderHook } from "@testing-library/react-hooks";
import useDeleteAssignment from "src/squads/syllabus/pages/Book/hooks/useDeleteAssignment";
import useDeleteTaskAssignment from "src/squads/syllabus/pages/TaskAssignment/hooks/useDeleteTaskAssignment";

jest.mock("src/squads/syllabus/pages/Book/hooks/useDeleteLOs", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/pages/Book/hooks/useDeleteAssignment", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/pages/TaskAssignment/hooks/useDeleteTaskAssignment", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockLOId = "lo_id";
const mockAssignmentId = "assignment_id";
const mockDeleteLOs = jest.fn();
const mockDeleteAssignment = jest.fn();
const mockDeleteTaskAssignment = jest.fn();
const mockOnSuccess = jest.fn();

describe(useDeleteLOAndAssignment.name, () => {
    beforeEach(() => {
        (useDeleteLOs as jest.Mock).mockImplementation(() => ({
            deleteLOs: mockDeleteLOs,
            isLoading: false,
        }));
        (useDeleteAssignment as jest.Mock).mockImplementation(() => ({
            deleteAssignment: mockDeleteAssignment,
            isLoading: false,
        }));
        (useDeleteTaskAssignment as jest.Mock).mockImplementation(() => ({
            deleteTaskAssignment: mockDeleteTaskAssignment,
            isLoading: false,
        }));
    });

    it("should call deleteLOs when delete LO", () => {
        const mockProps: UseDeleteLOAndAssignmentProps = { entity: Entities.LOS };

        const {
            result: { current },
        } = renderHook(() => useDeleteLOAndAssignment(mockProps));

        const { deleteLOsAndAssignment } = current;

        deleteLOsAndAssignment(mockLOId, { onSuccess: mockOnSuccess });

        const params = getLatestCallParams(
            mockDeleteLOs
        )[0] as NsSyllabus_Yasuo_CoursesService.DeleteLos;

        expect(params.loIdsList).toEqual<NsSyllabus_Yasuo_CoursesService.DeleteLos["loIdsList"]>([
            mockLOId,
        ]);

        const options = getLatestCallParams(mockDeleteLOs)[1];

        options.onSuccess();

        expect(mockOnSuccess).toBeCalled();
    });

    it("should call deleteAssignment when delete assignment", () => {
        const mockProps: UseDeleteLOAndAssignmentProps = { entity: EurekaEntities.ASSIGNMENTS };

        const {
            result: { current },
        } = renderHook(() => useDeleteLOAndAssignment(mockProps));

        const { deleteLOsAndAssignment } = current;

        deleteLOsAndAssignment(mockAssignmentId, { onSuccess: mockOnSuccess });

        const params = getLatestCallParams(
            mockDeleteAssignment
        )[0] as NsAssignmentEureka.DeleteAssignments;

        expect(params.assignmentIdsList).toEqual<
            NsAssignmentEureka.DeleteAssignments["assignmentIdsList"]
        >([mockAssignmentId]);

        const options = getLatestCallParams(mockDeleteAssignment)[1];

        options.onSuccess();

        expect(mockOnSuccess).toBeCalled();
    });

    it("should call deleteTaskAssignment when delete task assignment", () => {
        const mockProps: UseDeleteLOAndAssignmentProps = {
            entity: EurekaEntities.TASK_ASSIGNMENTS,
        };

        const {
            result: { current },
        } = renderHook(() => useDeleteLOAndAssignment(mockProps));

        const { deleteLOsAndAssignment } = current;

        deleteLOsAndAssignment(mockAssignmentId, { onSuccess: mockOnSuccess });

        const params = getLatestCallParams(
            mockDeleteTaskAssignment
        )[0] as NsAssignmentEureka.DeleteAssignments;

        expect(params.assignmentIdsList).toEqual<
            NsAssignmentEureka.DeleteAssignments["assignmentIdsList"]
        >([mockAssignmentId]);

        const options = getLatestCallParams(mockDeleteTaskAssignment)[1];

        options.onSuccess();

        expect(mockOnSuccess).toBeCalled();
    });
});
