import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import NsSyllabus_LearningObjectiveService from "src/squads/syllabus/services/eureka/learning-objective/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getCallParamsAt } from "src/squads/syllabus/test-utils/mock-utils";

import useCreateLOs from "../useCreateLOs";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import { CreateLOFormData, losWithAssignmentTypes } from "src/squads/syllabus/pages/LO/common/type";
import { createMockTopicGetOneQueryData } from "src/squads/syllabus/services/eureka/topic-service-bob/__mocks__/topic-service-bob.query";

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-mutation");

const mockLOsMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        learningObjective: mockLOsMutation,
    });
};

const mockTopicGetOneData = createMockTopicGetOneQueryData();

const mockCreateLOFormData: CreateLOFormData[] = [
    {
        name: "K LO",
        type: losWithAssignmentTypes.LO,
    },
    {
        name: "K Assignment",
        type: losWithAssignmentTypes.ASSIGNMENT,
    },
    {
        name: "K Task Assignment",
        type: "TASK_ASSIGNMENT",
    },
];

describe(useCreateLOs.name, () => {
    const mockMutate = jest.fn();
    const mockShowSnackbar = jest.fn();

    beforeEach(() => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({
            data: mockTopicGetOneData,
            isLoading: false,
        }));

        mockLOsMutation.mockReturnValueOnce({ isLoading: false, mutate: mockMutate });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);

        (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);
    });

    // With display order is 0 the display order auto generator
    it("should create a lo with display order is 0", () => {
        const {
            result: { current },
        } = renderHook(() => useCreateLOs({ topicId: mockTopicGetOneData.topic_id }));

        const { createLOs } = current;

        const payload: CreateLOFormData = mockCreateLOFormData[0];

        createLOs(payload, {});

        const { name, type: typeString } = payload;
        const { topic_id, school_id } = mockTopicGetOneData;
        const type = typeString as keyof typeof KeyLOTypes;

        const expectedPayload: NsSyllabus_LearningObjectiveService.UpsertLOs = {
            name,
            type,
            topicId: topic_id,
            schoolId: school_id,
            displayOrder: 0,
        };

        expect(getCallParamsAt(mockMutate, 0)[0]).toEqual(expectedPayload);

        expect(getCallParamsAt(mockMutate, 0)[0].displayOrder).toEqual(0);
    });

    // Prevent creating assignment when using createLOs hook
    it("should prevent assignment type when creating LOs", () => {
        const {
            result: { current },
        } = renderHook(() => useCreateLOs({ topicId: mockTopicGetOneData.topic_id }));

        const { createLOs } = current;

        const payload: CreateLOFormData = mockCreateLOFormData[1];

        createLOs(payload, {});

        expect(mockShowSnackbar).toBeCalledWith("ra.common.someThingWentWrong", "error");
    });

    it("should prevent task assignment type when creating LOs", () => {
        const {
            result: { current },
        } = renderHook(() => useCreateLOs({ topicId: mockTopicGetOneData.topic_id }));

        const { createLOs } = current;

        const payload: CreateLOFormData = mockCreateLOFormData[2];

        createLOs(payload, {});

        expect(mockShowSnackbar).toBeCalledWith("ra.common.someThingWentWrong", "error");
    });
});
