import {
    createUseMutation,
    UseMutationOptions,
} from "src/squads/syllabus/services/service-creator";
import { MutationParams } from "src/squads/syllabus/services/service-types";
import { TestQueryWrapper } from "src/squads/syllabus/test-utils/react-hooks";

import { act, renderHook } from "@testing-library/react-hooks";

interface TopicRequest {
    topic_id: string;
    topic_name: string;
}

interface TopicResponse {
    topic_id: string;
}

const service = {
    topic: {
        mutation: {
            UPSERT: jest.fn(),
        },
    },
};

const mockTopicRequest: TopicRequest = {
    topic_id: "topic_id_1",
    topic_name: "topic name",
};

const mockTopicResponse: TopicResponse = {
    topic_id: "topic_id_1",
};

const defaultUseMutationParams: MutationParams<TopicRequest> = {
    data: mockTopicRequest,
};

const renderUseMutationHook = (
    options?: UseMutationOptions<MutationParams<TopicRequest>, TopicResponse>
) => {
    const useMutation = createUseMutation(service)({
        entity: "topic",
        action: "UPSERT",
    });
    return renderHook(() => useMutation(options), {
        wrapper: TestQueryWrapper,
    });
};

const mockTopicService = (topicResponse: TopicResponse = mockTopicResponse) => {
    (service.topic.mutation.UPSERT as jest.Mock).mockImplementation(
        (_variables: MutationParams<TopicRequest>): TopicResponse => {
            return topicResponse;
        }
    );
};

describe("createUseMutation create infer mutation", () => {
    it("should return correct data when called", async () => {
        mockTopicService();

        const { result, waitForNextUpdate } = renderUseMutationHook();

        act(() => {
            result.current.mutate(defaultUseMutationParams);
        });

        await waitForNextUpdate();

        expect(service.topic.mutation.UPSERT).toBeCalledWith(defaultUseMutationParams);

        expect(result.current.data).toEqual(mockTopicResponse);
    });

    it("should call lifecycle hooks correctly", async () => {
        mockTopicService();

        const options: UseMutationOptions<MutationParams<TopicRequest>, TopicResponse> = {
            onSuccess: jest.fn(),
        };

        const { result, waitForNextUpdate } = renderUseMutationHook(options);

        act(() => {
            result.current.mutate(defaultUseMutationParams);
        });
        await waitForNextUpdate();

        expect(service.topic.mutation.UPSERT).toBeCalledWith(defaultUseMutationParams);

        expect(options.onSuccess).toBeCalledWith(
            mockTopicResponse,
            defaultUseMutationParams,
            undefined
        );
    });
});
