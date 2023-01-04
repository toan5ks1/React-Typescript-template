import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { AppError } from "src/squads/syllabus/internals/errors";
import logger from "src/squads/syllabus/internals/logger";
import NsSyllabus_LearningObjectiveService from "src/squads/syllabus/services/eureka/learning-objective/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getCallParamsAt, getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useUpdateLOs, { UpdateLOsParams } from "../useUpdateLOs";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import { mockLOByTopicIdQueryData } from "src/squads/syllabus/services/eureka/topic-learning-objective/__mocks__/topic-learning-objective-bob.query";

jest.mock("src/squads/syllabus/internals/logger");
jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-mutation");

const mockAppErrorMsg = new AppError("ra.manabie-error.invalid_params");

const mockLOsMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        learningObjective: mockLOsMutation,
    });
};

const mockLOByTopicIdData = mockLOByTopicIdQueryData({
    study_guide: "study_guide",
    video: "video",
    prerequisites: [],
});

describe(useUpdateLOs.name, () => {
    const mockMutate = jest.fn();
    const mockShowSnackbar = jest.fn();

    beforeEach(() => {
        mockLOsMutation.mockReturnValueOnce({ isLoading: false, mutate: mockMutate });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);

        (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);
    });

    it("should update successfully lo with name and keep current infos", () => {
        const {
            result: { current },
        } = renderHook(() => useUpdateLOs());

        const { updateLOs } = current;

        const { name, topic_id } = mockLOByTopicIdData;

        const params: UpdateLOsParams = {
            formData: { name: `Update ${name}` },
            LOData: mockLOByTopicIdData,
            topicId: topic_id!,
        };

        updateLOs(params, {});

        const {
            type: typeStr,
            display_order,
            lo_id,
            school_id,
            video,
            study_guide,
            prerequisites,
        } = params.LOData;
        const displayOrder = display_order ?? 1;
        const type = typeStr as keyof typeof KeyLOTypes;

        const expectedPayload: NsSyllabus_LearningObjectiveService.UpsertLOs = {
            ...params.formData,
            loId: lo_id,
            schoolId: school_id,
            type,
            topicId: params.topicId,
            displayOrder,
            video: video as string,
            studyGuide: study_guide as string,
            prerequisitesList: prerequisites,
        };

        expect(getCallParamsAt(mockMutate, 0)[0]).toEqual(expectedPayload);

        expect(getCallParamsAt(mockMutate, 0)[0].displayOrder).toEqual(
            expectedPayload.displayOrder
        );

        getLatestCallParams(mockLOsMutation)[0].onSuccess();

        expect(mockShowSnackbar).toBeCalledWith("ra.common.updatedSuccess");
    });

    it("should update lo failed with error message", () => {
        const {
            result: { current },
        } = renderHook(() => useUpdateLOs());

        const { updateLOs } = current;

        const { name, topic_id } = mockLOByTopicIdData;

        const params: UpdateLOsParams = {
            formData: { name: `Update ${name}` },
            LOData: mockLOByTopicIdData,
            topicId: topic_id!,
        };

        updateLOs(params, {});

        getLatestCallParams(mockLOsMutation)[0].onError(mockAppErrorMsg);

        expect(logger.warn).toBeCalledWith("[useUpdateLOs]", mockAppErrorMsg);
        expect(mockShowSnackbar).toBeCalledWith(
            "ra.common.updatedFail ra.manabie-error.invalid_params",
            "error"
        );
    });
});
