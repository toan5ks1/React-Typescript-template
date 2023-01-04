import { formatDate } from "src/common/utils/time";
import { selectFullDatePicker } from "src/squads/user/test-utils/date-time-picker-helper";
import {
    courseOptions as mockCourseOptions,
    createMockStudentCourseUpsert,
    mockDraftCourses,
} from "src/squads/user/test-utils/mocks/student";
import {
    TestCommonAppProvider,
    TestHookFormProvider,
    TestStudentDetailProvider,
    TestThemeProvider,
} from "src/squads/user/test-utils/providers";

import TranslationProvider from "src/providers/TranslationProvider";
import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import { StudentCourseUpsertTable } from "../StudentCourseUpsertTable";

import { render, within, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { UseNormalizeStudentDetailReturn } from "src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail";

const mockCourse = createMockStudentCourseUpsert();
jest.mock("src/squads/user/hooks/useUserFeatureFlag");
jest.mock("src/squads/user/modules/student-course-upsert/hooks/useFetchCourseAutocomplete", () => {
    const result = {
        options: [
            ...mockCourseOptions,
            {
                name: `Center 1`,
                location_id: `center_0`,
                location_type: `center`,
                parent_location_id: `parent_center`,
                access_path: "",
                is_archived: false,
            },
        ],
        setInputValDebounced: jest.fn(),
    };
    return {
        __esModule: true,
        default: () => result,
    };
});

jest.mock("src/squads/user/modules/student-course-upsert/hooks/useCourseFormValidation", () => {
    const result = {
        validate: {
            required: {
                value: true,
                message: "",
            },
            course: true,
        },
    };
    return {
        __esModule: true,
        default: () => {
            return result;
        },
    };
});
jest.mock("src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail", () => {
    const { createMockStudent } = require("src/squads/user/test-utils/mocks/student");
    const mockResult: UseNormalizeStudentDetailReturn = {
        isLoading: false,
        student: createMockStudent({ id: "student_id_01", current_grade: 10 }),
        refetch: jest.fn(),
    };

    return {
        __esModule: true,
        default: () => {
            return mockResult;
        },
    };
});

jest.mock("src/squads/user/modules/student-course-upsert/hooks/useCourseLocations", () => {
    const result = {
        options: [
            {
                name: `Center 1`,
                location_id: `center_0`,
                location_type: `center`,
                parent_location_id: `parent_center`,
                access_path: "",
                is_archived: false,
            },
        ],
        loading: false,
    };
    return {
        __esModule: true,
        default: () => result,
    };
});

jest.mock("src/squads/user/modules/student-course-upsert/hooks/useCourseClasses", () => {
    const result = {
        options: [
            {
                name: `Class 1`,
                class_id: `class_1`,
            },
        ],
        loading: false,
    };
    return {
        __esModule: true,
        default: () => result,
    };
});

describe("<StudentCourseUpsertTable />", () => {
    const onSelect = jest.fn();
    const updateRow = jest.fn();

    const renderComponent = () => {
        return render(
            <TranslationProvider>
                <TestCommonAppProvider>
                    <TestThemeProvider>
                        <MuiPickersUtilsProvider>
                            <TestHookFormProvider>
                                <TestStudentDetailProvider>
                                    <StudentCourseUpsertTable
                                        courses={[mockCourse, mockDraftCourses]}
                                        onSelect={onSelect}
                                        updateRow={updateRow}
                                    />
                                </TestStudentDetailProvider>
                            </TestHookFormProvider>
                        </MuiPickersUtilsProvider>
                    </TestThemeProvider>
                </TestCommonAppProvider>
            </TranslationProvider>
        );
    };

    it("should render UI correctly", () => {
        renderComponent();

        expect(screen.getByTestId("StudentCourseUpsertTable")).toBeInTheDocument();

        const header = screen.getByTestId("TableBase__header");

        const columns = within(header).getAllByTestId("TableHeaderWithCheckbox__cellHeader");

        expect(columns.length).toEqual(5);

        expect(screen.getAllByTestId("TableBase__row").length).toEqual(2);
    });

    it("should be call onSelect when user selected course", () => {
        renderComponent();

        const checkBox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        expect(checkBox.length).toEqual(2);

        userEvent.click(checkBox[1]);

        expect(onSelect).toBeCalledWith([mockDraftCourses]);
    });

    it("should be fill on type form", async () => {
        const wrapper = renderComponent();

        const courseInputs = screen.getAllByTestId("StudentCourseUpsertTable__courseName");
        const courseInput = within(courseInputs[1]).getByTestId("AutocompleteBase__input");

        userEvent.type(courseInput, "course");
        expect(await screen.findAllByTestId("AutocompleteBase__option")).toHaveLength(3);

        userEvent.click(screen.getByText("course1_14-12-2021"));

        expect(courseInput).toHaveValue("course1_14-12-2021");

        const locationInputs = screen.getAllByTestId("StudentCourseUpsertTable__location");

        const locationInput = within(locationInputs[0]).getByTestId("AutocompleteBase__input");

        userEvent.click(locationInput);
        userEvent.keyboard("{ArrowDown}");
        userEvent.keyboard("{Enter}");
        await waitFor(() => {
            expect(locationInput).toHaveValue("Center 1");
        });

        const classInputs = screen.getAllByTestId("StudentCourseUpsertTable__class");

        const classInput = within(classInputs[0]).getByTestId("AutocompleteBase__input");

        userEvent.click(classInput);
        userEvent.keyboard("{ArrowDown}");
        userEvent.keyboard("{Enter}");
        await waitFor(() => {
            expect(classInput).toHaveValue("Class 1");
        });

        const startDate = screen.getAllByTestId("StudentCourseUpsertTable__startDate")[1];
        const now = new Date();

        await selectFullDatePicker(wrapper, startDate, now);

        expect(startDate.querySelector("input")).toHaveValue(formatDate(now, "yyyy/LL/dd"));

        const endDate = screen.getAllByTestId("StudentCourseUpsertTable__endDate")[1];
        await selectFullDatePicker(wrapper, endDate, now);

        expect(endDate.querySelector("input")).toHaveValue(formatDate(now, "yyyy/LL/dd"));
    }, 10000);
});
