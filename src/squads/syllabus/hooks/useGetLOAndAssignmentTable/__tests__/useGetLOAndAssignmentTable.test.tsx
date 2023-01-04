import { sortDisplayOrderEntities } from "src/squads/syllabus/common/helpers/display-order";
import { TopicLearningObjectiveManyQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import useGetLOAndAssignmentTable, { sortLOAndAssignment } from "../useGetLOAndAssignmentTable";

import { renderHook } from "@testing-library/react-hooks";
import { createMockTopicAssignmentGetManyQueryData } from "src/squads/syllabus/services/eureka/topic-assignment-eureka/__mocks__/topic-assignment-eureka.query";

jest.mock("../../useShowSnackbar", () => jest.fn());

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const mockTopicLOGetManyData: TopicLearningObjectiveManyQuery["topics_learning_objectives"] = [
    {
        display_order: 5,
        learning_objective: {
            lo_id: "2",
            name: "name_02",
            school_id: 1,
            updated_at: new Date("2021/05/12, 07:15"),
            created_at: new Date("2021/05/12, 07:15"),
            // TODO: remove
            subject: "ENGLISH",
            grade: 1,
        },
    },
    {
        display_order: 2,
        learning_objective: {
            lo_id: "4",
            name: "name_04",
            school_id: 1,
            updated_at: new Date("2021/05/12, 07:15"),
            created_at: new Date("2021/05/12, 07:15"),
            // TODO: remove
            subject: "ENGLISH",
            grade: 1,
        },
    },
];

const mockTopicAssignmentGetManyData = createMockTopicAssignmentGetManyQueryData(2);

const learningObjectives = mockTopicLOGetManyData.map((lo) => ({
    ...lo.learning_objective,
    display_order: lo.display_order,
}));
const assignments = mockTopicAssignmentGetManyData.map((assignment) => ({
    ...assignment.assignment,
    display_order: assignment.display_order,
}));

const lOAndAssignmentSorted = [...learningObjectives, ...assignments].sort(
    sortDisplayOrderEntities
);

describe(useGetLOAndAssignmentTable.name, () => {
    const mockInferQuery =
        () =>
        ({ entity }: Parameters<typeof inferQuery>[0]) =>
        () => {
            switch (entity) {
                case "topicLearningObjective":
                    return { data: mockTopicLOGetManyData, isFetching: false };
                case "topicAssignment":
                    return { data: mockTopicAssignmentGetManyData, isFetching: false };
                default:
                    throw new Error("Please catch the other queries");
            }
        };
    beforeEach(() => {
        (inferQuery as jest.Mock).mockImplementation(mockInferQuery());
    });

    it("should return list learning objective and assignment with latest display order", () => {
        const {
            result: { current },
        } = renderHook(() => useGetLOAndAssignmentTable({ topicId: "topicId" }));
        expect(current.data).toEqual(lOAndAssignmentSorted);
    });
});

describe(sortLOAndAssignment.name, () => {
    it("should return list learning objective and assignment with latest display order", () => {
        expect(sortLOAndAssignment(mockTopicLOGetManyData, mockTopicAssignmentGetManyData)).toEqual(
            lOAndAssignmentSorted
        );
    });
});
