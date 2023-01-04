import { ComponentProps } from "react";

import { CoursesListQuery } from "src/squads/syllabus/services/bob/bob-types";
import { inferQueryPagination } from "src/squads/syllabus/services/infer-query";
import { DataWithTotal } from "src/squads/syllabus/services/service-creator";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";

import CourseTable from "../CourseTable";

import { fireEvent, render, screen } from "@testing-library/react";
import Can from "src/contexts/Can";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/hooks/useTranslate", () => {
    return () => jest.fn();
});

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferQueryPagination: jest.fn(),
}));

jest.mock("src/components/Table/TableBase", () => {
    const original = jest.requireActual("src/components/Table/TableBase");
    return {
        __esModule: true,
        ...original,
        default: () => <div>Course Table</div>,
    };
});

const mockInferQueryPagination = (data: DataWithTotal<CoursesListQuery["courses"]>) =>
    (inferQueryPagination as jest.Mock).mockReturnValue(() => ({
        result: {
            isLoading: false,
        },
        data,
        pagination: createFakePagination({ count: data.total }),
    }));

jest.mock("src/squads/syllabus/hooks/useResourceTranslate", () => {
    return () => jest.fn();
});

jest.mock("src/contexts/Can", () => {
    return jest.fn(); // fake allow all permission
});

jest.mock("src/squads/syllabus/internals/logger");

describe(CourseTable.name, () => {
    it("should render no data message when the data is empty", () => {
        (Can as jest.Mock).mockImplementation(
            ({ children }: ComponentProps<typeof Can>) => children
        );

        mockInferQueryPagination({ data: [], total: 0 });
        render(
            <TestAppWithQueryClient>
                <CourseTable />
            </TestAppWithQueryClient>
        );

        expect(screen.queryByTestId("CourseForm__root")).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId("CourseTable__addButton"));

        expect(screen.getByTestId("CourseForm__root")).toBeInTheDocument();
    });
});
