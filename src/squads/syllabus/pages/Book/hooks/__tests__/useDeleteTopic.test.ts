import logger from "src/squads/syllabus/internals/logger";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useDeleteTopic from "../useDeleteTopic";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";

jest.mock("src/squads/syllabus/internals/logger");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-mutation");

const mockTopicIdsList = ["topic_id"];
const mockErrorMsg = Error("ERROR_DELETE_TOPIC");

const mockShowSnackbar = jest.fn();
const mockTopicMutation = jest.fn();
const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        topic: mockTopicMutation,
    });
};

describe(useDeleteTopic.name, () => {
    const mockMutate = jest.fn();
    const mockOnSuccess = jest.fn();

    beforeEach(() => {
        mockTopicMutation.mockReturnValueOnce({ mutate: mockMutate, isLoading: false });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
        (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);
    });

    it("should call onSuccess when delete a topic by topicId", () => {
        const {
            result: { current },
        } = renderHook(() => useDeleteTopic({ onSuccess: mockOnSuccess }));

        const { deleteTopic } = current;

        const payload: NsSyllabus_Yasuo_CoursesService.DeleteTopics = {
            topicIdsList: mockTopicIdsList,
        };

        deleteTopic(payload, {});

        const params = getLatestCallParams(
            mockMutate
        )[0] as NsSyllabus_Yasuo_CoursesService.DeleteTopics;

        expect(params.topicIdsList).toEqual<
            NsSyllabus_Yasuo_CoursesService.DeleteTopics["topicIdsList"]
        >(mockTopicIdsList);

        const options = getLatestCallParams(mockTopicMutation)[0];

        options.onSuccess();

        expect(mockShowSnackbar).toBeCalledWith("ra.common.deleteSuccess");
        expect(mockOnSuccess).toBeCalled();
    });

    it("should call onError when delete a topic failed", () => {
        const {
            result: { current },
        } = renderHook(() => useDeleteTopic({ onSuccess: mockOnSuccess }));

        const { deleteTopic } = current;

        const payload: NsSyllabus_Yasuo_CoursesService.DeleteTopics = {
            topicIdsList: mockTopicIdsList,
        };

        deleteTopic(payload, {});

        const options = getLatestCallParams(mockTopicMutation)[0];

        options.onError(mockErrorMsg);

        expect(mockShowSnackbar).toBeCalledWith("ra.common.deleteFail", "error");
        expect(logger.warn).toBeCalledWith("[useDeleteTopic] TOPIC delete", mockErrorMsg);
        expect(mockOnSuccess).not.toBeCalled();
    });
});
