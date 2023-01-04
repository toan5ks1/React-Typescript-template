import { StudentUserAttrsFragment } from "src/squads/syllabus/services/bob/bob-types";
import {
    BooksManyQuery,
    GetListCourseStudentStudyPlansByFilterQuery,
    GetManyStudentStudyPlansByFilterQuery,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery, inferQueryPagination } from "src/squads/syllabus/services/infer-query";
import { DataWithTotal } from "src/squads/syllabus/services/service-creator";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";

import useStudentStudyPlansQuery, {
    StudentStudyPlansByCourseIdReturn,
} from "../useStudentStudyPlansQuery";

import { renderHook } from "@testing-library/react-hooks";
import { StudyPlanListByStudent } from "src/squads/syllabus/pages/StudyPlan/common/types";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");
jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
        inferQueryPagination: jest.fn(),
    };
});

const mockQueryCourseStudentPagination = jest.fn();
const mockQueryBookMany = jest.fn();
const mockQueryStudentMany = jest.fn();
const mockQueryStudentStudyPlan = jest.fn();

const mockInferQuery =
    () =>
    ({ entity }: Parameters<typeof inferQuery>[0]) => {
        switch (entity) {
            case "book":
                return mockQueryBookMany;
            case "studentStudyPlan":
                return mockQueryStudentStudyPlan;
            case "student":
                return mockQueryStudentMany;
            default:
                throw new Error("Please catch the other queries");
        }
    };

const mockInferQueryPagination =
    () =>
    ({ entity }: Parameters<typeof inferQuery>[0]) => {
        switch (entity) {
            case "courseStudent":
                return mockQueryCourseStudentPagination;
            default:
                throw new Error("Please catch the other queries");
        }
    };

const courseStudentMockData: DataWithTotal<
    GetListCourseStudentStudyPlansByFilterQuery["get_list_course_student_study_plans_by_filter"]
> = {
    data: [
        {
            course_id: "courseId1",
            student_id: "studentId2",
        },
        {
            course_id: "courseId1",
            student_id: "studentId1",
        },
    ],
    total: 2,
};

const studentMockData: StudentUserAttrsFragment[] = [
    {
        user_id: "studentId2",
        name: "K Student 2",
        email: "kStudent2@manabie.com",
        avatar: null,
    },
    {
        user_id: "studentId1",
        name: "K Student 1",
        email: "kStudent1@manabie.com",
        avatar: null,
    },
];

const studentStudyPlanMockData: GetManyStudentStudyPlansByFilterQuery["get_student_study_plans_by_filter"] =
    [
        {
            study_plan_id: "studyPlanId3",
            name: "study plan name 01",
            created_at: "",
            master_study_plan_id: null,
            book_id: "book 01",
            grades: [],
            student_study_plans: [
                {
                    student_id: "studentId1",
                },
            ],
        },
        {
            study_plan_id: "studyPlanId2",
            name: "study plan name 02",
            created_at: "2021-04-26T11:37:56.282708+00:00",
            master_study_plan_id: null,
            student_study_plans: [
                {
                    student_id: "studentId2",
                },
            ],
        },
        {
            study_plan_id: "studyPlanId1",
            name: "study plan name 03",
            created_at: "2021-04-01T11:37:56.282708+00:00",
            master_study_plan_id: null,
            book_id: "book 03",
            grades: [4, 8],
            student_study_plans: [
                {
                    student_id: "studentId2",
                },
            ],
        },
    ];

const books: BooksManyQuery["books"] = [
    {
        book_id: "book 01",
        country: "COUNTRY_NONE",
        name: "Book 01",
        school_id: -2147483644,
        subject: "SUBJECT_NONE",
    },
    {
        book_id: "book 03",
        country: "COUNTRY_NONE",
        name: "Book 03",
        school_id: -2147483644,
        subject: "SUBJECT_NONE",
    },
];

const studyPlanListByStudent: StudyPlanListByStudent[] = [
    {
        studentId: "studentId2",
        studentName: "K Student 2",
        studyPlanList: [
            {
                grades: [],
                name: "study plan name 02",
                studyplanId: "studyPlanId2",
                created_at: "2021-04-26T11:37:56.282708+00:00",
                bookId: undefined,
                studentId: "studentId2",
            },
            {
                grades: [4, 8],
                name: "study plan name 03",
                studyplanId: "studyPlanId1",
                bookId: "book 03",
                created_at: "2021-04-01T11:37:56.282708+00:00",
                studentId: "studentId2",
            },
        ],
    },
    {
        studentId: "studentId1",
        studentName: "K Student 1",
        studyPlanList: [
            {
                grades: [],
                name: "study plan name 01",
                studyplanId: "studyPlanId3",
                bookId: "book 01",
                created_at: "",
                studentId: "studentId1",
            },
        ],
    },
];
const pagination = createFakePagination();

describe(useStudentStudyPlansQuery.name, () => {
    it("should return correctly data", () => {
        mockQueryCourseStudentPagination.mockImplementation(() => {
            return {
                result: { isLoading: false },
                data: { data: courseStudentMockData.data.map((item) => item.student_id) },
                pagination,
            };
        });

        mockQueryStudentMany.mockImplementation(() => ({
            data: studentMockData,
            isLoading: false,
        }));

        mockQueryBookMany.mockImplementation(() => ({
            data: books,
            isFetching: false,
        }));

        mockQueryStudentStudyPlan.mockImplementation(() => ({
            data: studentStudyPlanMockData,
            isLoading: false,
            isFetching: false,
        }));

        (inferQuery as jest.Mock).mockImplementation(mockInferQuery());
        (inferQueryPagination as jest.Mock).mockImplementation(mockInferQueryPagination());

        const { result } = renderHook(() =>
            useStudentStudyPlansQuery({
                courseId: "courseId1",
                filter: { bookIds: [], grades: [] },
                keyword: "",
            })
        );

        expect(result.current.studyPlanListByStudent).toEqual<
            StudentStudyPlansByCourseIdReturn["studyPlanListByStudent"]
        >(studyPlanListByStudent);

        expect(result.current.pagination).toEqual(pagination);
    });
});
