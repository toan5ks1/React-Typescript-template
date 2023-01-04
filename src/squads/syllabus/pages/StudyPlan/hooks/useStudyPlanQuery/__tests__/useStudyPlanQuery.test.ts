import {
    AssignmentsManyQueryVariables,
    LearningObjectivesManyQueryVariables,
    StudyPlanOneV2Query,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { PaginationWithTotal } from "src/squads/syllabus/services/service-creator";
import { getCallParamsAt, getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";
import { TestQueryWrapper } from "src/squads/syllabus/test-utils/react-hooks";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import useStudyPlanTopicQuery from "../../useStudyPlanTopicQuery";
import useStudyPlanQuery from "../useStudyPlanQuery";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("../../../common/utils.ts", () => ({
    groupStudyPlanItemsByTopic: () => [],
})).mock("../../useStudyPlanTopicQuery");

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const defaultPagination: PaginationWithTotal = {
    count: -1,
    limit: 10,
    offset: 0,
    onPageChange: () => {},
    onRowsPerPageChange: () => {},
    page: 0,
    rowsPerPage: 10,
};
const studyPlan: ArrayElement<StudyPlanOneV2Query["study_plans"]> = {
    study_plan_id: "StudyPlan",
    created_at: "",
    study_plan_items: [
        {
            content_structure: { topic_id: "Topic1" },
            lo_study_plan_item: { lo_id: "LO1" },
        },
        {
            content_structure: { topic_id: "Topic2" },
            assignment_study_plan_item: { assignment_id: "Assignment1" },
        },
        {
            content_structure: { topic_id: "Topic2" },
            assignment_study_plan_item: { assignment_id: "Assignment2" },
        },
    ] as ArrayElement<StudyPlanOneV2Query["study_plans"]>["study_plan_items"],
};

const mockQueryOneStudyPlan = jest.fn();
const mockQueryManyAssignment = jest.fn();
const mockQueryManyLearningObjective = jest.fn();

const mockInferQuery = ({ entity }: Parameters<typeof inferQuery>[0]) => {
    switch (entity) {
        case "studyPlan": {
            return mockQueryOneStudyPlan;
        }
        case "learningObjective": {
            return mockQueryManyLearningObjective;
        }
        case "assignment": {
            return mockQueryManyAssignment;
        }
        default:
            throw new Error("Please catch the other queries");
    }
};

describe(useStudyPlanQuery.name, () => {
    it("should return no study plan items when it is querying", () => {
        mockQueryOneStudyPlan.mockReturnValue({
            data: studyPlan,
            isFetching: true,
            refetch: () => {},
        });

        (useStudyPlanTopicQuery as jest.Mock).mockReturnValue({
            result: {
                data: { itemsList: [] },
                isFetching: false,
            },
            pagination: defaultPagination,
        });

        mockQueryManyLearningObjective.mockReturnValue({
            data: [],
            isFetching: false,
        });
        mockQueryManyAssignment.mockReturnValue({ data: [], isFetching: false });

        (inferQuery as jest.Mock).mockImplementation(mockInferQuery);

        const { result } = renderHook(() => useStudyPlanQuery(studyPlan.study_plan_id), {
            wrapper: TestQueryWrapper,
        });

        expect(result.current).toMatchObject({
            studyPlan,
            studyPlanItemsByTopic: [],
            isFetching: true,
        });
    });

    it("should return correct data when all the queries are loaded", async () => {
        const refetchStudyPlan = jest.fn();
        const refetchTopics = jest.fn();
        const refetchAssignments = jest.fn();
        const refetchLearningObjectives = jest.fn();

        mockQueryOneStudyPlan.mockReturnValue({
            data: studyPlan,
            isFetching: false,
            refetch: refetchStudyPlan,
        });

        const useStudyPlanTopicQueryMock = (useStudyPlanTopicQuery as jest.Mock).mockReturnValue({
            result: {
                data: { itemsList: [] },
                isFetching: false,
                refetch: refetchTopics,
            },
            pagination: defaultPagination,
        });

        mockQueryManyAssignment.mockImplementationOnce(() => ({
            data: [],
            isFetching: false,
            refetch: refetchAssignments,
        }));

        mockQueryManyLearningObjective.mockImplementationOnce(() => ({
            data: [],
            isFetching: false,
            refetch: refetchLearningObjectives,
        }));

        (inferQuery as jest.Mock).mockImplementation(mockInferQuery);

        const { result } = renderHook(() => useStudyPlanQuery(studyPlan.study_plan_id), {
            wrapper: TestQueryWrapper,
        });

        expect(
            getLatestCallParams(mockQueryManyAssignment)[0]
        ).toEqual<AssignmentsManyQueryVariables>({
            assignment_id: ["Assignment1", "Assignment2"],
        });

        expect(getCallParamsAt(useStudyPlanTopicQueryMock, 0)[0]).toEqual(studyPlan.study_plan_id);

        expect(
            getLatestCallParams(mockQueryManyLearningObjective)[0]
        ).toEqual<LearningObjectivesManyQueryVariables>({ lo_id: ["LO1"] });

        expect(result.current).toMatchObject({
            studyPlan,
            studyPlanItemsByTopic: [],
            isFetching: false,
        });

        await result.current.refetch();
        expect(refetchStudyPlan).toHaveBeenCalled();
        expect(refetchTopics).toHaveBeenCalled();
        expect(refetchAssignments).toHaveBeenCalled();
        expect(refetchLearningObjectives).toHaveBeenCalled();
    });

    it("should return empty data when study plan cannot be found", () => {
        mockQueryOneStudyPlan.mockReturnValue({
            isFetching: false,
            refetch: () => {},
        });

        (useStudyPlanTopicQuery as jest.Mock).mockReturnValue({
            result: {
                data: { itemsList: [] },
                isFetching: false,
            },
            pagination: defaultPagination,
        });

        mockQueryManyLearningObjective.mockImplementationOnce(() => ({
            data: [],
            isFetching: false,
        }));

        mockQueryManyAssignment.mockImplementationOnce(() => ({ data: [], isFetching: false }));

        (inferQuery as jest.Mock).mockImplementation(mockInferQuery);

        const { result } = renderHook(() => useStudyPlanQuery(studyPlan.study_plan_id), {
            wrapper: TestQueryWrapper,
        });

        expect(result.current).toMatchObject({
            studyPlanItemsByTopic: [],
            isFetching: false,
        });
    });
});
