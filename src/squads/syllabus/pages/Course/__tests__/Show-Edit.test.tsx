import { Lesson_CoursesOneQuery } from "src/squads/syllabus/services/bob/bob-types";
import { getCallParamsAt } from "src/squads/syllabus/test-utils/mock-utils";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import Show from "../Show";
import useUpsertCourse from "../hooks/useUpsertCourse";

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/hooks/useSyllabusPermission", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                permission: {
                    can: () => true,
                },
            };
        },
    };
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-query", () => {
    const data: ArrayElement<Lesson_CoursesOneQuery["courses"]> = {
        course_id: "course_id_1",
        name: "Course 01",
        course_books: [{ book_id: "book_01", books: [] }],
        school_id: 0,
        icon: "image_link",
        teaching_method: "COURSE_TEACHING_METHOD_INDIVIDUAL",
    };

    return {
        __esModule: true,
        inferQuery: () => () => ({
            data,
            isLoading: false,
            refetch: jest.fn(() => Promise.resolve()),
        }),
    };
});

jest.mock("src/components/Tabs/TabLayout", () => {
    const original = jest.requireActual("src/components/Tabs/TabLayout");
    return {
        __esModule: true,
        ...original,
        default: () => <div>Course Table</div>,
    };
});

jest.mock("src/squads/syllabus/pages/Course/hooks/useUpsertCourse", () => jest.fn());

jest.mock("src/squads/syllabus/pages/Course/hooks/useGetCourseLocations", () => {
    return {
        __esModule: true,
        default: () => ({
            locationIds: ["location_id1"],
            locations: [
                {
                    location_id: "location_id1",
                    name: "location 1",
                },
            ],
            isLoadingLocationIds: false,
            isLoadingLocations: false,
            updateCourseLocations: jest.fn(),
        }),
    };
});

describe(Show.name, () => {
    it("should render dialog edit and call the onEdit with data correct", async () => {
        const onEdit = jest.fn();
        (useUpsertCourse as jest.Mock).mockReturnValue({
            onEdit,
            loading: false,
        });

        render(<Show />, { wrapper: TestAppWithQueryClient });

        expect(screen.queryByTestId("CourseForm__root")).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));
        fireEvent.click(screen.getByText("ra.common.action.edit"));

        fireEvent.change(screen.getByTestId("TextFieldHF__input"), {
            target: { value: "Course Edit new name" },
        });

        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            expect(onEdit).toBeCalled();
        });

        expect(getCallParamsAt(onEdit, 0)[0]).toEqual({
            course_id: "course_id_1",
            files: undefined,
            icon: "image_link",
            name: "Course Edit new name",
            locationIdsList: ["location_id1"],
            teachingMethod: 0,
        });

        act(() => {
            getCallParamsAt(onEdit, 0)[1].onSuccess();
        });

        await waitFor(() => {
            expect(screen.queryByTestId("CourseForm__root")).not.toBeInTheDocument();
        });
    });

    it("should set new default when data is fetching", async () => {
        const onEdit = jest.fn();
        (useUpsertCourse as jest.Mock).mockReturnValue({
            onEdit,
            loading: false,
        });

        render(<Show />, { wrapper: TestAppWithQueryClient });

        expect(screen.queryByTestId("CourseForm__root")).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));
        fireEvent.click(screen.getByText("ra.common.action.edit"));

        fireEvent.change(screen.getByTestId("TextFieldHF__input"), {
            target: { value: "Course Edit new name" },
        });

        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            expect(onEdit).toBeCalled();
        });

        expect(getCallParamsAt(onEdit, 0)[0]).toEqual({
            course_id: "course_id_1",
            files: undefined,
            icon: "image_link",
            name: "Course Edit new name",
            locationIdsList: ["location_id1"],
            teachingMethod: 0,
        });

        act(() => {
            getCallParamsAt(onEdit, 0)[1].onSuccess();
        });

        await waitFor(() => {
            expect(screen.queryByTestId("CourseForm__root")).not.toBeInTheDocument();
        });
    });
});
