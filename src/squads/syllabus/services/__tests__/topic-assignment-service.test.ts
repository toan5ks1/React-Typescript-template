import { topicAssignmentQueriesEureka } from "src/squads/syllabus/services/eureka/topic-assignment-eureka";

import { TopicAssignmentManyQueryVariables } from "../eureka/eureka-types";
import { topicAssignmentService } from "../topic-assignment-service";

jest.mock(
    "src/squads/syllabus/services/eureka/topic-assignment-eureka/topic-assignment-eureka.query",
    () => ({
        __esModule: true,
        default: {
            getManyByTopicId: jest.fn(),
        },
    })
);

jest.mock("src/internals/feature-controller");

describe(topicAssignmentService.query.syllabusTopicAssignmentGetManyByTopicId.name, () => {
    it("shouldn't call query and return undefined when topicId is empty string", async () => {
        const result = await topicAssignmentService.query.syllabusTopicAssignmentGetManyByTopicId({
            topic_id: "",
        });

        expect(topicAssignmentQueriesEureka.getManyByTopicId).not.toBeCalled();
        expect(result).toEqual(undefined);
    });

    it("should not call query and return undefined when missing topicId", async () => {
        const result = await topicAssignmentService.query.syllabusTopicAssignmentGetManyByTopicId(
            {} as TopicAssignmentManyQueryVariables
        );

        expect(result).toBeUndefined();
        expect(topicAssignmentQueriesEureka.getManyByTopicId).not.toBeCalled();
    });

    it("should call getManyByTopicId and return correct data after success", async () => {
        const response = "response_topicAssignment_getManyByTopicId";
        const params: TopicAssignmentManyQueryVariables = {
            topic_id: "topicId_1",
        };

        (topicAssignmentQueriesEureka.getManyByTopicId as jest.Mock).mockResolvedValue(response);

        const result = await topicAssignmentService.query.syllabusTopicAssignmentGetManyByTopicId(
            params
        );

        expect(result).toEqual(response);
        expect(topicAssignmentQueriesEureka.getManyByTopicId).toBeCalledWith(params);
    });
});
