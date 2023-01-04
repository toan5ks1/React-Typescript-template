import { Entities } from "src/common/constants/enum";
import { TestApp } from "src/squads/lesson/test-utils";
import { selectDatePicker } from "src/squads/lesson/test-utils/date-time-picker-helper";
import { showPopover, submitFormFilter } from "src/squads/lesson/test-utils/filter";
import {
    expectNowDateStr,
    expectNowTimeStr,
    mockCentersAutocompleteList,
    mockCourseAutocompleteList,
    mockDayOfWeekAutocompleteList,
    mockGradeAutocompleteList,
    mockStudentAutocompleteList,
    mockTeacherAutocompleteList,
    mockDefaultSearchKeyword,
    mockFillDataFilterV2,
    mockLessonStatusAutocompleteList,
    mockClassAutocompleteList,
} from "src/squads/lesson/test-utils/lesson-management";

import FormFilterAdvancedLessonV2, {
    FormFilterAdvancedLessonV2Props,
    formFilterDefaultValuesV2,
} from "src/squads/lesson/pages/LessonManagement/components/Forms/FormFilterAdvancedLessonV2/FormFilterAdvancedLessonV2";

import { screen, render, RenderResult, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useClassManyWithNullableCourse from "src/squads/lesson/pages/LessonManagement/hooks/useClassManyWithNullableCourse";
import { FormFilterLessonManagementValuesV2 } from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForLessonManagementListFormFilterAdvancedV2";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/TestQueryWrapper";

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => jest.fn());

jest.mock("src/squads/lesson/hooks/useDayOfWeek", () => {
    return () => ({
        choiceDayOfWeek: mockDayOfWeekAutocompleteList,
    });
});

jest.mock("src/squads/lesson/hooks/useLessonStatus", () => ({
    __esModule: true,
    default: () => ({ choiceLessonStatus: mockLessonStatusAutocompleteList }),
}));

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useClassManyWithNullableCourse", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: () => ({ isEnabled: true }),
}));

const renderComponent = (formData: FormFilterLessonManagementValuesV2, defaultKeyword?: string) => {
    const props: FormFilterAdvancedLessonV2Props = {
        onApplySubmit: jest.fn(),
        onEnterSearchBar: jest.fn(),
        defaultKeyword: defaultKeyword || "",
    };

    (useAutocompleteReference as jest.Mock).mockImplementation(({ resource }) => {
        switch (resource) {
            case Entities.TEACHERS:
                return {
                    options: mockTeacherAutocompleteList,
                    loading: false,
                    setInputVal: jest.fn(),
                };
            case Entities.LOCATIONS:
                return {
                    options: mockCentersAutocompleteList,
                    loading: false,
                    setInputVal: jest.fn(),
                };
            case Entities.STUDENTS:
                return {
                    options: mockStudentAutocompleteList,
                    loading: false,
                    setInputVal: jest.fn(),
                };
            case Entities.COURSES:
                return {
                    options: mockCourseAutocompleteList,
                    loading: false,
                    setInputVal: jest.fn(),
                };
        }
    });

    (useClassManyWithNullableCourse as jest.Mock).mockImplementation(() => {
        return {
            classes: mockClassAutocompleteList,
            isLoading: false,
        };
    });

    const wrapper: RenderResult = render(
        <TestApp>
            <TestQueryWrapper>
                <TestHookFormProvider
                    useFormOptions={{
                        defaultValues: formData,
                    }}
                >
                    <FormFilterAdvancedLessonV2 {...props} />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </TestApp>
    );

    return { wrapper, props };
};

describe("<FormFilterAdvancedLessonV2 /> render correctly", () => {
    it("should render correctly all field of form filter", () => {
        const { wrapper } = renderComponent(formFilterDefaultValuesV2);
        showPopover(wrapper);

        const filterFormContainer = screen.getByTestId("FormFilterAdvancedLessonV2__root");
        expect(filterFormContainer).toBeInTheDocument();

        const autocompleteLessonStatusElm = screen.getByTestId(
            "AutocompleteLessonStatusHF__autocomplete"
        );
        expect(autocompleteLessonStatusElm).toBeInTheDocument();

        const fromDateElm = screen.getByTestId("FormFilterAdvancedLessonV2__fromDate");
        expect(fromDateElm).toBeInTheDocument();

        const toDateElm = screen.getByTestId("FormFilterAdvancedLessonV2__toDate");
        expect(toDateElm).toBeInTheDocument();

        const dayOfWeekAutoCompleteElm = screen.getByTestId(
            "AutocompleteDayOfWeekHF__autocomplete"
        );
        expect(dayOfWeekAutoCompleteElm).toBeInTheDocument();

        const startTimeElm = screen.getByTestId("FormFilterAdvancedLessonV2__startTime");
        expect(startTimeElm).toBeInTheDocument();

        const endTimeElm = screen.getByTestId("FormFilterAdvancedLessonV2__endTime");
        expect(endTimeElm).toBeInTheDocument();

        const teacherAutoCompleteElm = screen.getByTestId("AutocompleteTeachersHF__autocomplete");
        expect(teacherAutoCompleteElm).toBeInTheDocument();

        const centersAutoCompleteElm = screen.getByTestId(
            "AutocompleteLowestLevelLocationsHF__autocomplete"
        );
        expect(centersAutoCompleteElm).toBeInTheDocument();

        const studentsAutoCompleteElm = screen.getByTestId("AutocompleteStudentsHF__autocomplete");
        expect(studentsAutoCompleteElm).toBeInTheDocument();

        const gradesAutoCompleteElm = screen.getByTestId("AutocompleteGradesHF__autocomplete");
        expect(gradesAutoCompleteElm).toBeInTheDocument();

        const coursesAutoCompleteElm = screen.getByTestId("AutocompleteCoursesHF__autocomplete");
        expect(coursesAutoCompleteElm).toBeInTheDocument();

        const autocompleteClassElm = screen.getByTestId(
            "AutocompleteClassesOfManyCoursesHF__autocomplete"
        );
        expect(autocompleteClassElm).toBeInTheDocument();
    });

    it("should show correctly form filter data", () => {
        const { wrapper } = renderComponent(mockFillDataFilterV2, mockDefaultSearchKeyword);
        const searchELm = screen.getByTestId("FormFilterAdvanced__textField");
        const searchInput = within(searchELm).getByRole("textbox");
        expect(searchInput).toHaveValue(mockDefaultSearchKeyword);

        showPopover(wrapper);

        const autocompleteLessonStatusElm = screen.getByTestId(
            "AutocompleteLessonStatusHF__autocomplete"
        );
        const lessonStatusChip = within(autocompleteLessonStatusElm).getByTestId(
            "ChipAutocomplete"
        );
        expect(lessonStatusChip).toHaveTextContent(mockLessonStatusAutocompleteList[0].name);

        const fromDateElm = screen.getByTestId("FormFilterAdvancedLessonV2__fromDate");
        const fromDateInput = within(fromDateElm).getByRole("textbox");
        expect(fromDateInput).toHaveValue(expectNowDateStr);

        const toDateElm = screen.getByTestId("FormFilterAdvancedLessonV2__toDate");
        const toDateInput = within(toDateElm).getByRole("textbox");
        expect(toDateInput).toHaveValue(expectNowDateStr);

        const dayOfWeekElm = screen.getByTestId("AutocompleteDayOfWeekHF__autocomplete");
        const dayOfWeekChip = within(dayOfWeekElm).getByTestId("ChipAutocomplete");
        expect(dayOfWeekChip).toHaveTextContent(mockDayOfWeekAutocompleteList[0].name);

        const startTimeElm = screen.getByTestId("FormFilterAdvancedLessonV2__startTime");
        expect(startTimeElm.querySelector("input")).toHaveValue(expectNowTimeStr);

        const endTimeElm = screen.getByTestId("FormFilterAdvancedLessonV2__endTime");
        expect(endTimeElm.querySelector("input")).toHaveValue(expectNowTimeStr);

        const teacherAutoCompleteElm = screen.getByTestId("AutocompleteTeachersHF__autocomplete");
        const teacherChip = within(teacherAutoCompleteElm).getByTestId("ChipAutocomplete");
        expect(teacherChip).toHaveTextContent(mockTeacherAutocompleteList[0].name);

        const centersAutoCompleteElm = screen.getByTestId(
            "AutocompleteLowestLevelLocationsHF__autocomplete"
        );
        const centerChip = within(centersAutoCompleteElm).getByTestId("ChipAutocomplete");
        expect(centerChip).toHaveTextContent(mockCentersAutocompleteList[0].name);
        const studentsAutoCompleteElm = screen.getByTestId("AutocompleteStudentsHF__autocomplete");
        const studentChip = within(studentsAutoCompleteElm).getByTestId("ChipAutocomplete");
        expect(studentChip).toHaveTextContent(mockStudentAutocompleteList[0].name);

        const gradesAutoCompleteElm = screen.getByTestId("AutocompleteGradesHF__autocomplete");
        const gradeChip = within(gradesAutoCompleteElm).getByTestId("ChipAutocomplete");
        expect(gradeChip).toHaveTextContent(mockGradeAutocompleteList[0].name);

        const coursesAutoCompleteElm = screen.getByTestId("AutocompleteCoursesHF__autocomplete");
        const courseChip = within(coursesAutoCompleteElm).getByTestId("ChipAutocomplete");
        expect(courseChip).toHaveTextContent(mockCourseAutocompleteList[0].name);

        const autocompleteClassElm = screen.getByTestId(
            "AutocompleteClassesOfManyCoursesHF__autocomplete"
        );
        const classChip = within(autocompleteClassElm).getByTestId("ChipAutocomplete");
        expect(classChip).toHaveTextContent(mockClassAutocompleteList[0].name);
    });
});

describe("<FormFilterAdvancedLessonV2 /> handle search correctly", () => {
    it("should call search function when enter input search", () => {
        const { props } = renderComponent(formFilterDefaultValuesV2, mockDefaultSearchKeyword);
        const searchELm = screen.getByTestId("FormFilterAdvanced__textField");
        const searchInput = within(searchELm).getByRole("textbox");
        userEvent.type(searchInput, "{enter}");

        expect(props.onEnterSearchBar).toBeCalledWith(mockDefaultSearchKeyword);
    });
});

describe("<FormFilterAdvancedLesson /> handle filter correctly", () => {
    it("should not call onApplySubmit after dont mutate any field in filter form", async () => {
        const { wrapper, props } = renderComponent(formFilterDefaultValuesV2);
        showPopover(wrapper);
        submitFormFilter();
        await waitFor(() => expect(props.onApplySubmit).not.toBeCalled());
    });

    it("should allow to submit when select fromDate and not toDate", async () => {
        const { wrapper, props } = renderComponent(formFilterDefaultValuesV2);
        showPopover(wrapper);
        await selectDatePicker(wrapper, "FormFilterAdvancedLessonV2__fromDate", 20);
        submitFormFilter();
        await waitFor(() => expect(props.onApplySubmit).toBeCalled());
    });

    it("should allow to submit when select toDate and not fromDate", async () => {
        const { wrapper, props } = renderComponent(formFilterDefaultValuesV2);
        showPopover(wrapper);
        await selectDatePicker(wrapper, "FormFilterAdvancedLessonV2__toDate", 20);
        submitFormFilter();
        await waitFor(() => expect(props.onApplySubmit).toBeCalled());
    });

    it("should allow to submit when select endTime and not startTime", async () => {
        const { wrapper, props } = renderComponent(formFilterDefaultValuesV2);
        showPopover(wrapper);
        const endTimeElm = screen.getByTestId("FormFilterAdvancedLessonV2__endTime");
        const endTimeElmInput = within(endTimeElm).getByTestId("AutocompleteBase__input");
        userEvent.click(endTimeElmInput);

        const endTimeOption = screen.getByText("00:15");
        userEvent.click(endTimeOption);
        submitFormFilter();
        await waitFor(() => expect(props.onApplySubmit).toBeCalled());
    });

    it("should allow to submit when select startTime and not endTime", async () => {
        const { wrapper, props } = renderComponent(formFilterDefaultValuesV2);
        showPopover(wrapper);
        const startTimeElm = screen.getByTestId("FormFilterAdvancedLessonV2__startTime");
        const startTimeElmInput = within(startTimeElm).getByTestId("AutocompleteBase__input");
        userEvent.click(startTimeElmInput);

        const startTimeOption = screen.getByText("00:15");
        userEvent.click(startTimeOption);
        submitFormFilter();
        await waitFor(() => expect(props.onApplySubmit).toBeCalled());
    });
});
