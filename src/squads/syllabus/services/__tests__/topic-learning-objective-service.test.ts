import { genId } from "src/squads/syllabus/common/utils/generator";

import { TopicLearningObjectiveManyQueryVariables } from "../eureka/eureka-types";
import { topicLearningObjectiveQueriesBob } from "../eureka/topic-learning-objective";
import { bobTopicLearningObjectiveService } from "../topic-learning-objective-service";

jest.mock(
    "src/squads/syllabus/services/eureka/topic-learning-objective/topic-learning-objective-bob.query",
    () => ({
        __esModule: true,
        default: {
            getMany: jest.fn(),
        },
    })
);

jest.mock("src/internals/feature-controller");

describe(`test for query getMany topic learning objective ${bobTopicLearningObjectiveService.query.TOPIC_LEARNING_OBJECTIVE_GET_MANY.name}`, () => {
    it("shouldn't call query and return undefined when missing identity", async () => {
        const result =
            await bobTopicLearningObjectiveService.query.TOPIC_LEARNING_OBJECTIVE_GET_MANY(
                {} as TopicLearningObjectiveManyQueryVariables
            );

        expect(topicLearningObjectiveQueriesBob.getMany).not.toBeCalled();
        expect(result).toEqual(undefined);
    });

    it("should return correct after query success", async () => {
        const queryResponse = genId();
        (topicLearningObjectiveQueriesBob.getMany as jest.Mock).mockResolvedValue(queryResponse);

        const params: TopicLearningObjectiveManyQueryVariables = { topic_id: "topicId_01" };

        const result =
            await bobTopicLearningObjectiveService.query.TOPIC_LEARNING_OBJECTIVE_GET_MANY(params);

        expect(topicLearningObjectiveQueriesBob.getMany).toBeCalledWith(params);
        expect(result).toEqual(queryResponse);
    });
});
