import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useCreateTopic, { UseCreateTopicReturn } from "../useCreateTopic";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/services/infer-mutation");
jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());

const mockTopicMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        topic: mockTopicMutation,
    });
};

describe(useCreateTopic.name, () => {
    const mutateCreateFn = jest.fn();
    beforeEach(() => {
        mockTopicMutation.mockReturnValueOnce({ isLoading: false, mutate: mutateCreateFn });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
    });

    // With display order is 0 the display order auto generator
    it("should create a topic with display order is 0", () => {
        const {
            result: { current },
        } = renderHook(() => useCreateTopic());

        const { createTopic } = current;

        const payload: Parameters<UseCreateTopicReturn["createTopic"]>[0] = {
            formData: { name: "topic_name_edited" },
            chapter: {
                chapter_id: "chapter_current_id",
                grade: 1,
                name: "chapter_current_name",
                school_id: 1,
                display_order: 5,
            },
        };

        createTopic(payload, {});

        expect(getLatestCallParams(mutateCreateFn)[0].displayOrder).toEqual(0);
    });
});
