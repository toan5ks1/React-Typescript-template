import { Entities } from "src/common/constants/enum";
import { CoursesListQuery } from "src/squads/syllabus/services/bob/bob-types";
import { inferQueryPagination } from "src/squads/syllabus/services/infer-query";
import { DataWithTotal } from "src/squads/syllabus/services/service-creator";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";

import CourseTable from "../CourseTable";

import { render } from "@testing-library/react";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/hooks/useTranslate", () => {
    return () => jest.fn();
});

jest.mock("src/squads/syllabus/hooks/useResourceTranslate", () => {
    return () => jest.fn();
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferQueryPagination: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => {
    return {
        __esModule: true,
        default: () => ({ isEnabled: true }),
    };
});

const mockCourseListDataWithTotal: DataWithTotal<CoursesListQuery["courses"]> = {
    data: [
        {
            course_id: "course1",
            name: "Course A",
            school_id: 1,
        },
        {
            course_id: "course2",
            name: "Course B",
            school_id: 1,
        },
    ],
    total: 2,
};

const mockInferQueryPagination = (data: DataWithTotal<CoursesListQuery["courses"]>) =>
    (inferQueryPagination as jest.Mock).mockReturnValue(() => ({
        result: {
            isLoading: false,
        },
        data,
        pagination: createFakePagination({ count: data.total }),
    }));

describe("<CourseTable />", () => {
    it("should render no data message when the data is empty", () => {
        mockInferQueryPagination({ data: [], total: 0 });

        const { getByTestId } = render(
            <TestAppWithQueryClient>
                <CourseTable />
            </TestAppWithQueryClient>
        );

        expect(getByTestId("TableBase__noDataMessage")).toBeInTheDocument();
    });

    it("should render courses correctly", () => {
        const { data, total } = mockCourseListDataWithTotal;

        mockInferQueryPagination(mockCourseListDataWithTotal);

        const { getByTestId, getAllByTestId } = render(
            <TestAppWithQueryClient>
                <CourseTable />
            </TestAppWithQueryClient>
        );
        const rows = getAllByTestId("TableBase__row");

        expect(getByTestId("TableBaseBody__root").children).toHaveLength(total);
        expect(getAllByTestId("CourseTable__courseName")[0].textContent).toEqual(data[0].name);
        expect(getAllByTestId("CourseTable__courseName")[0].closest("a")?.href).toMatch(
            `/${Entities.COURSES}/${data[0].course_id}/show`
        );
        expect(rows[0].firstChild!.textContent).toEqual("1");
        expect(rows[1].firstChild!.textContent).toEqual("2");
    });
});
