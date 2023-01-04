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

import { TaskAssignmentFormValues } from "../../common/types";
import useUpsertTaskAssignment, { UseUpsertTaskAssignmentReturn } from "../useUpsertTaskAssignment";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("src/squads/syllabus/hooks/useNavigation");

jest.mock("src/squads/syllabus/services/infer-mutation");

jest.mock("src/squads/syllabus/internals/logger");

const mockTaskAssignmentMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        assignment: mockTaskAssignmentMutation,
    });
};

const mockData: TaskAssignmentFormValues = {
    assignment_id: "",
    content: {
        loIdList: undefined,
        topicId: "topic1",
    },
    display_order: 6,
    files: [],
    name: "K Task Assignment",
    settings: {
        require_assignment_note: false,
        require_attachment: false,
        require_duration: false,
        require_correctness: false,
        require_understanding_level: false,
    },
    instruction: "",
    attachment: [],
};

describe(useUpsertTaskAssignment.name, () => {
    const mutate = jest.fn();

    beforeEach(() => {
        mockTaskAssignmentMutation.mockReturnValueOnce({ isLoading: false, mutate });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    // With display order is 0 the display order auto generator
    it("should create a task assignment with display order is 0", () => {
        const {
            result: { current },
        } = renderHook(() =>
            useUpsertTaskAssignment({ action: ProviderTypes.CREATE, searchUrl: "" })
        );

        const { upsertTaskAssignment } = current;

        const payload: TaskAssignmentFormValues = mockData;

        upsertTaskAssignment(payload, {});

        const { assignment_id, content, instruction, settings, files, name } = payload;

        const expectedPayload: NsAssignmentEureka.UpsertAssignment = {
            files,
            name,
            settings,
            assignmentId: assignment_id,
            content: { loIdList: content.lo_id, topicId: content.topic_id },
            displayOrder: 0,
            instruction: convertString(instruction),
            requiredGrade: false,
            maxGrade: 0,
            assignmentType: AssignmentType.ASSIGNMENT_TYPE_TASK,
        };

        expect(getCallParamsAt(mutate, 0)[0]).toEqual(expectedPayload);

        expect(getCallParamsAt(mutate, 0)[0].displayOrder).toEqual(0);
    });

    it("should update display order when editing the task assignment", () => {
        const {
            result: { current },
        } = renderHook(() =>
            useUpsertTaskAssignment({ action: ProviderTypes.UPDATE, searchUrl: "" })
        );

        const { upsertTaskAssignment } = current;

        const updatedPayload: Parameters<UseUpsertTaskAssignmentReturn["upsertTaskAssignment"]>[0] =
            mockData;

        upsertTaskAssignment(updatedPayload, {});

        const { assignment_id, content, display_order, instruction, files, name, settings } =
            updatedPayload;

        const expectedPayload: NsAssignmentEureka.UpsertAssignment = {
            files,
            name,
            settings,
            assignmentId: assignment_id,
            content: { loIdList: content.lo_id, topicId: content.topic_id },
            displayOrder: Number(display_order),
            instruction: convertString(instruction),
            requiredGrade: false,
            maxGrade: 0,
            assignmentType: AssignmentType.ASSIGNMENT_TYPE_TASK,
        };

        expect(getCallParamsAt(mutate, 0)[0]).toEqual(expectedPayload);

        expect(getCallParamsAt(mutate, 0)[0].displayOrder).toEqual(6);
    });
});
