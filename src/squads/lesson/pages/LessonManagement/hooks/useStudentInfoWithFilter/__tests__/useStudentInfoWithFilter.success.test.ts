import { inferQuery, inferQueryWithGRPCPagination } from "src/squads/lesson/service/infer-query";
import { generateSampleDataWithStudentInfo } from "src/squads/lesson/test-utils/class-course";
import { getLatestCallParams } from "src/squads/lesson/test-utils/mock-utils";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";

import { act, renderHook } from "@testing-library/react-hooks";
import useGetGradeAndStatusOfStudents from "src/squads/lesson/hooks/useGetGradeAndStatusOfStudents";
import useStudentInfoWithFilter from "src/squads/lesson/pages/LessonManagement/hooks/useStudentInfoWithFilter";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useGetGradeAndStatusOfStudents", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
    inferQueryWithGRPCPagination: jest.fn(),
}));

const {
    studentSubscriptionsQueried,
    gradesManyQueried,
    studentsManyQueried,
    coursesManyQueried,
    classesManyQueried,
    studentInfos,
} = generateSampleDataWithStudentInfo();

const mockInferQueryGRPCPagination = () => {
    const inferQueryGRPCMockFunc = jest.fn();
    const goToFirstPageMockFunc = jest.fn();

    (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(() =>
        inferQueryGRPCMockFunc.mockImplementation(() => {
            return {
                results: {
                    data: {
                        itemsList: studentSubscriptionsQueried,
                        nextPage: jest.fn(),
                        previousPage: jest.fn(),
                        totalLesson: 10,
                        totalItems: 10,
                    },
                    isFetching: false,
                },
                pagination: createMockPaginationWithTotalObject(10, 0),
                goToFirstPage: goToFirstPageMockFunc,
            };
        })
    );

    return { inferQueryGRPCMockFunc, goToFirstPageMockFunc };
};

const mockUseGetGradeAndStatusOfStudents = () => {
    (useGetGradeAndStatusOfStudents as jest.Mock).mockImplementation(() => {
        return {
            isLoading: false,
            mapGradeOfStudents: gradesManyQueried,
            refetch: jest.fn(),
        };
    });
};

const mockInferQuery = () => {
    (inferQuery as jest.Mock).mockImplementation(
        ({
            entity,
            action,
        }: {
            entity: "students" | "courses" | "class";
            action: "studentsGetMany" | "coursesGetMany" | "classGetMany";
        }) => {
            switch (true) {
                case entity === "students" && action === "studentsGetMany":
                    return () => ({ data: studentsManyQueried, isFetching: false });

                case entity === "courses" && action === "coursesGetMany":
                    return () => ({ data: coursesManyQueried, isFetching: false });

                case entity === "class" && action === "classGetMany":
                    return () => ({ data: classesManyQueried, isFetching: false });
            }
        }
    );
};

describe("useStudentInfoWithFilter", () => {
    it("should return student infos list", () => {
        mockInferQueryGRPCPagination();
        mockInferQuery();
        mockUseGetGradeAndStatusOfStudents();

        const { result } = renderHook(() => useStudentInfoWithFilter());
        expect(result.current.studentInfosList).toEqual(studentInfos);
    });

    it("should apply filter criteria", () => {
        const { inferQueryGRPCMockFunc, goToFirstPageMockFunc } = mockInferQueryGRPCPagination();
        mockInferQuery();
        mockUseGetGradeAndStatusOfStudents();

        const { result } = renderHook(() => useStudentInfoWithFilter());

        const { handleApplyFilterCriteria, handleEnterSearchBar } = result.current;

        const samplePayload: Parameters<typeof handleApplyFilterCriteria>[0] = {
            classes: [{ class_id: "Class_Id", name: "Class Name" }],
            courses: [{ course_id: "Course_Id", name: "Course Name", school_id: 123 }],
            grades: [{ id: 123, name: "Grade Name" }],
            locations: [{ locationId: "Location_Id", name: "Location Name" }],
        };

        act(() => handleApplyFilterCriteria(samplePayload));
        act(() => handleEnterSearchBar("Sample Student Name"));

        expect(goToFirstPageMockFunc).toBeCalled();

        const [queryGRPCPayload] = getLatestCallParams(inferQueryGRPCMockFunc);
        expect(queryGRPCPayload).toEqual({
            filter: {
                courseIdList: ["Course_Id"],
                gradeList: ["123"],
                classIdList: ["Class_Id"],
                locationIdList: ["Location_Id"],
            },
            keyword: "Sample Student Name",
        });
    });
});
