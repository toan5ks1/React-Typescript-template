import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import {
    TopicOneQuery,
    TopicOneQueryVariables,
    TopicsManyQuery,
    TopicsManyQueryVariables,
    TopicTitleQuery,
    TopicTitleQueryVariables,
} from "../../eureka-types";
import topicQueries from "../topic-service-bob.query";
import {
    createMockDataGetTopicManyQuery,
    createMockDataGetTopicOneQuery,
    createMockDataGetTopicTitleQuery,
} from "./data";

const spyCallFn = () => {
    return jest.spyOn(topicQueries, "_call");
};

jest.mock("src/internals/feature-controller", () => ({
    // FIXME: DDD LT-12785
    __esModule: true,
    default: { isFeatureEnabled: jest.fn() },
}));

describe(topicQueries.getTitle.name, () => {
    it("should called with correct variables and return correct data", async () => {
        const callFn = spyCallFn();

        const params: TopicTitleQueryVariables = { topic_id: "topicId_01" };

        const response: TopicTitleQuery = {
            topics: [createMockDataGetTopicTitleQuery()],
        };

        callFn.mockResolvedValue({
            data: response,
        });

        const result = await topicQueries.getTitle(params);

        const [body] = getLatestCallParams(callFn);

        describe("should called with correct variable", () => {
            expect(body.variables).toEqual(params);
        });

        describe("should return the first topic", () => {
            expect(result).toEqual(response.topics[0]);
        });
    });
});

describe(topicQueries.getOne.name, () => {
    it("should called with correct variables and return correct data", async () => {
        const callFn = spyCallFn();

        const params: TopicOneQueryVariables = { topic_id: "topicId_01" };

        const response: TopicOneQuery = {
            topics: [createMockDataGetTopicOneQuery()],
        };

        callFn.mockResolvedValue({
            data: response,
        });

        const result = await topicQueries.getOne(params);

        const [body] = getLatestCallParams(callFn);

        describe("should called with correct variable", () => {
            expect(body.variables).toEqual(params);
        });

        describe("should return the first topic", () => {
            expect(result).toEqual(response.topics[0]);
        });
    });
});

describe(topicQueries.getMany.name, () => {
    it("should called with correct variables and return correct data", async () => {
        const callFn = spyCallFn();

        const params: TopicsManyQueryVariables = { topic_id: "topicId_01" };

        const response: TopicsManyQuery = {
            topics: createMockDataGetTopicManyQuery(),
        };

        callFn.mockResolvedValue({
            data: response,
        });

        const result = await topicQueries.getMany(params);

        const [body] = getLatestCallParams(callFn);

        describe("should called with correct variable", () => {
            expect(body.variables).toEqual(params);
        });

        describe("should return the first book", () => {
            expect(result).toEqual(response.topics);
        });
    });
});
