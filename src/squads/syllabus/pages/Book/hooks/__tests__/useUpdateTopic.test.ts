import NsSyllabus_TopicService from "src/squads/syllabus/services/eureka/topic-service/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useUpdateTopic, { UseUpdateTopicReturn } from "../useUpdateTopic";

import { renderHook } from "@testing-library/react-hooks";
import { createMockDataGetTopicManyQuery } from "src/squads/syllabus/services/eureka/topic-service-bob/__tests__/data";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());

jest.mock("src/squads/syllabus/services/infer-mutation");
const mockTopicMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        topic: mockTopicMutation,
    });
};

describe(useUpdateTopic.name, () => {
    const mutate = jest.fn();
    beforeEach(() => {
        mockTopicMutation.mockReturnValueOnce({ isLoading: false, mutate });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
    });

    it("should update topic with name, icon and keep current infos", () => {
        const {
            result: { current },
        } = renderHook(() => useUpdateTopic());

        const updatePayload: Parameters<UseUpdateTopicReturn["updateTopic"]>[0] = {
            formData: { name: "topic_name_edited" },
            topic: createMockDataGetTopicManyQuery([], { quantity: 1 })[0],
        };

        current.updateTopic(updatePayload, {});

        const payloadExpect: NsSyllabus_TopicService.UpsertTopics = {
            ...updatePayload.topic,
            icon_url: updatePayload.topic.icon_url as string,
            schoolId: updatePayload.topic.school_id,
            displayOrder: updatePayload.topic.display_order as number,
            chapterId: updatePayload.topic.chapter_id as string,
            name: updatePayload.formData.name,
            files: [],
        };

        expect(getLatestCallParams(mutate)[0]).toEqual(payloadExpect);

        // Make sure keep the display order
        expect(getLatestCallParams(mutate)[0].displayOrder).toEqual(
            updatePayload.topic.display_order
        );
    });
});
