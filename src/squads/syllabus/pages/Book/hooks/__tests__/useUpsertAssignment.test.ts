import { ProviderTypes } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { NsAssignmentEureka } from "src/squads/syllabus/services/eureka/assignment-eureka/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getCallParamsAt } from "src/squads/syllabus/test-utils/mock-utils";

import { AssignmentType } from "manabuf/eureka/v1/enums_pb";

import { AssignmentFormValues } from "../../../Assignment/common/types";
import useUpsertAssignment, { UseUpsertAssignmentReturn } from "../useUpsertAssignment";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("src/squads/syllabus/hooks/useNavigation");

jest.mock("src/squads/syllabus/services/infer-mutation");

const mockAssignmentMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        assignment: mockAssignmentMutation,
    });
};

const mockData: AssignmentFormValues = {
    assignment_id: "",
    content: {
        loIdList: undefined,
        topicId: "topic1",
    },
    display_order: 6,
    files: [],
    is_required_grade: true,
    name: "K Assignment",
    settings: {
        require_assignment_note: false,
        require_attachment: false,
        require_video_submission: false,
        allow_late_submission: false,
        allow_resubmission: false,
    },
    max_grade: 13,
    instruction: "",
    attachment: [],
};

describe(useUpsertAssignment.name, () => {
    const mutate = jest.fn();

    beforeEach(() => {
        mockAssignmentMutation.mockReturnValueOnce({ isLoading: false, mutate });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    // With display order is 0 the display order auto generator
    it("should create a assignment with display order is 0", () => {
        const {
            result: { current },
        } = renderHook(() => useUpsertAssignment({ action: ProviderTypes.CREATE, searchUrl: "" }));

        const { upsertAssignment } = current;

        const payload: AssignmentFormValues = mockData;

        upsertAssignment(payload, {});

        const {
            assignment_id,
            content,
            instruction,
            is_required_grade,
            max_grade,
            settings,
            files,
            name,
        } = payload;

        const expectedPayload: NsAssignmentEureka.UpsertAssignment = {
            files,
            name,
            settings,
            assignmentId: assignment_id,
            content: { loIdList: content.lo_id, topicId: content.topic_id },
            displayOrder: 0,
            instruction: convertString(instruction),
            requiredGrade: Boolean(is_required_grade),
            maxGrade: Number(max_grade),
            assignmentType: AssignmentType.ASSIGNMENT_TYPE_LEARNING_OBJECTIVE,
        };

        expect(getCallParamsAt(mutate, 0)[0]).toEqual(expectedPayload);

        expect(getCallParamsAt(mutate, 0)[0].displayOrder).toEqual(0);
    });

    it("should update display order when editing the assignment", () => {
        const {
            result: { current },
        } = renderHook(() => useUpsertAssignment({ action: ProviderTypes.UPDATE, searchUrl: "" }));

        const { upsertAssignment } = current;

        const updatedPayload: Parameters<UseUpsertAssignmentReturn["upsertAssignment"]>[0] =
            mockData;

        upsertAssignment(updatedPayload, {});

        const {
            assignment_id,
            content,
            display_order,
            instruction,
            is_required_grade,
            max_grade,
            files,
            name,
            settings,
        } = updatedPayload;

        const expectedPayload: NsAssignmentEureka.UpsertAssignment = {
            files,
            name,
            settings,
            assignmentId: assignment_id,
            content: { loIdList: content.lo_id, topicId: content.topic_id },
            displayOrder: Number(display_order),
            instruction: convertString(instruction),
            requiredGrade: Boolean(is_required_grade),
            maxGrade: Number(max_grade),
            assignmentType: AssignmentType.ASSIGNMENT_TYPE_LEARNING_OBJECTIVE,
        };

        expect(getCallParamsAt(mutate, 0)[0]).toEqual(expectedPayload);

        expect(getCallParamsAt(mutate, 0)[0].displayOrder).toEqual(6);
    });
});
