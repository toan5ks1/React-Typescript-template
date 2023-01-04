import {
    BooksManyQuery,
    CourseStudyPlansListByFilterQuery,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery, inferQueryPagination } from "src/squads/syllabus/services/infer-query";

import useGetCourseStudyplan, { UseGetCourseStudyplanProps } from "../useGetCourseStudyplan";

import { renderHook } from "@testing-library/react-hooks";
import { StudyPlanStatusKey } from "src/squads/syllabus/pages/StudyPlan/common/constants";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
        inferQueryPagination: jest.fn(),
    };
});

const mockQueryCourseStudyPlanPagination = jest.fn();
const mockQueryBookMany = jest.fn();

const mockInferQuery =
    () =>
    ({ entity }: Parameters<typeof inferQuery>[0]) => {
        switch (entity) {
            case "book":
                return mockQueryBookMany;
            default:
                throw new Error("Please catch the other queries");
        }
    };

const mockInferQueryPagination =
    () =>
    ({ entity }: Parameters<typeof inferQuery>[0]) => {
        switch (entity) {
            case "courseStudyPlan":
                return mockQueryCourseStudyPlanPagination;
            default:
                throw new Error("Please catch the other queries");
        }
    };

describe(useGetCourseStudyplan.name, () => {
    const books: BooksManyQuery["books"] = [
        {
            book_id: "book_id_01",
            name: "book_name_01",
            school_id: 1,
        },
        {
            book_id: "book_id_03",
            name: "book_nam_03",
            school_id: 1,
        },
        {
            book_id: "book_id_09",
            name: "book_nam_09",
            school_id: 1,
        },
    ];

    const courseStudyplanList: CourseStudyPlansListByFilterQuery["get_list_course_study_plan_by_filter"] =
        [
            {
                course_id: "01",
                study_plan: {
                    created_at: new Date("2021/05/12, 07:15"),
                    study_plan_id: "study_plan_id_01",
                    book_id: "book_id_01",
                    grades: [5],
                    name: "study_plan_name 01",
                    status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE,
                },
                study_plan_id: "study_plan_id_01",
            },
            {
                course_id: "01",
                study_plan: {
                    created_at: new Date("2021/05/12, 07:15"),
                    study_plan_id: "study_plan_id_02",
                    book_id: "book_03",
                    name: "study_plan_name 02",
                    status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED,
                },
                study_plan_id: "study_plan_id_02",
            },
            {
                course_id: "01",
                study_plan: {
                    created_at: new Date("2021/05/12, 07:15"),
                    study_plan_id: "study_plan_id_03",
                    book_id: "book_09",
                    grades: [10, 7],
                    status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE,
                },
                study_plan_id: "study_plan_id_03",
            },
        ];
    beforeEach(() => {
        mockQueryBookMany.mockImplementation(() => {
            return { data: books };
        });
        mockQueryCourseStudyPlanPagination.mockImplementation(() => {
            return {
                result: {
                    isLoading: false,
                    refetch: jest.fn(),
                },
                data: { data: courseStudyplanList },
            };
        });

        (inferQuery as jest.Mock).mockImplementation(mockInferQuery());
        (inferQueryPagination as jest.Mock).mockImplementation(mockInferQueryPagination());
    });

    const defaultProps: UseGetCourseStudyplanProps = {
        courseId: "01",
        searchText: "",
        filter: {
            archived: true,
            bookIds: [],
            grades: [],
        },
    };

    it("should return course study plan data mapped between study-plan and book", () => {
        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useGetCourseStudyplan(defaultProps));

        expect(data).toEqual([
            {
                grades: [5],
                name: "study_plan_name 01",
                studyplanId: "study_plan_id_01",
                status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE,
            },
            {
                grades: undefined,
                name: "study_plan_name 02",
                studyplanId: "study_plan_id_02",
                status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED,
            },
            {
                grades: [10, 7],
                name: undefined,
                studyplanId: "study_plan_id_03",
                status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE,
            },
        ]);
    });
});
