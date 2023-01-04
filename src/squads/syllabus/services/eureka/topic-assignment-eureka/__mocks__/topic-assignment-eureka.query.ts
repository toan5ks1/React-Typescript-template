import { TopicAssignmentManyQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { createArrayNumber } from "src/squads/syllabus/test-utils/utils";

export const createMockTopicAssignmentGetManyQueryData = (
    quantity: number
): TopicAssignmentManyQuery["topics_assignments"] =>
    createArrayNumber(quantity).map((i) => {
        return {
            assignment: {
                assignment_id: `topic_assignment_id${i}_getMany`,
                name: `topic_assignment_name${i}_getMany`,
                created_at: "2022-04-26T11:37:56.282708+00:00",
            },
            display_order: i,
        };
    });
