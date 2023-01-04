import { Features } from "src/common/constants/enum";
import { selectTimeForTimePickerAMPM } from "src/squads/lesson/test-utils/date-time-picker-helper";
import {
    mockStudentInfoList,
    setupAndMockDataForCreatingLesson,
} from "src/squads/lesson/test-utils/lesson-management";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";

import { fireEvent, render, waitFor, within } from "@testing-library/react";
import LessonList from "src/squads/lesson/pages/LessonManagement/LessonList";
import TestApp from "src/squads/lesson/test-utils/TestApp";

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useLessonList", () => {
    const val = {
        isLoadingTeacher: false,
        isLoadingCenter: false,
        isLoadingLesson: false,
        refreshPage: jest.fn(),
        lessons: [],
        onSearch: () => {}, // TODO: @bao I will implement it in function search
        onFilter: () => {}, // TODO: @bao I will implement it in function filter
    };

    return () => val;
});

jest.mock("src/hooks/useGlobalLocations", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => {
    const { Features } = jest.requireActual("src/common/constants/enum");

    return {
        __esModule: true,
        default: (toggleName: Features) => {
            if (toggleName === Features.LESSON_CREATE_LESSON_GROUP) return { isEnabled: false };
            if (toggleName === Features.LESSON_MANAGEMENT_RECURRING_LESSON)
                return { isEnabled: false };
            return { isEnabled: true };
        },
    };
});

jest.mock("src/squads/lesson/hooks/useConvertMedia", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock(
    "src/squads/lesson/pages/LessonManagement/hooks/useUpsertLessonOfLessonManagement",
    () => {
        return {
            __esModule: true,
            default: jest.fn(),
        };
    }
);

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useLessonStudentInfoListFilter", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});
jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useGetManyLocations", () => {
    return {
        __esModule: true,
        default: (locationIds: string[]) => {
            return {
                data: locationIds.map((id) => ({ location_id: id, name: "Center Name 01" })),
                isLoading: false,
            };
        },
    };
});

describe("<LessonList />", () => {
    it("should create lesson successfully", async () => {
        setupAndMockDataForCreatingLesson();
        const wrapper = render(
            <TestApp>
                <TestQueryWrapper>
                    <LessonList />
                </TestQueryWrapper>
            </TestApp>
        );

        const addButton = wrapper.getByTestId("TabLessonList__buttonAdd");
        fireEvent.click(addButton);

        // Select date and time
        const startTimePicker = within(
            wrapper.getByTestId("FormLessonUpsert__lessonStartTime")
        ).getByLabelText(/Choose time, selected time is/);
        await selectTimeForTimePickerAMPM(wrapper, startTimePicker, 2, 15, "AM");

        const endTimePicker = within(
            wrapper.getByTestId("FormLessonUpsert__lessonEndTime")
        ).getByLabelText(/Choose time, selected time is/);
        await selectTimeForTimePickerAMPM(wrapper, endTimePicker, 3, 50, "AM");

        // Add teacher
        const teacherAutocompleteInput = within(
            wrapper.getByTestId("AutocompleteTeachersHF__autocomplete")
        ).getByTestId("AutocompleteBase__input");

        fireEvent.change(teacherAutocompleteInput, { target: { value: "Teacher" } });

        const teacher01 = wrapper.getByText("Teacher Name 01");
        fireEvent.click(teacher01);

        // Select center
        const centerAutocompleteInput = within(
            wrapper.getByTestId("AutocompleteLowestLevelLocationsHF__autocomplete")
        ).getByTestId("AutocompleteBase__input");

        fireEvent.change(centerAutocompleteInput, { target: { value: "Center" } });

        const center01 = wrapper.getByText("Center Name 01");
        fireEvent.click(center01);

        // Add students
        const addActionButton = wrapper.getByTestId("TableAction__buttonAdd");
        fireEvent.click(addActionButton);

        const dialogAddStudentContainer = wrapper.getByTestId(
            "DialogAddStudentSubscriptions__dialogContainer"
        );

        const checkAllStudentBox = within(dialogAddStudentContainer).getByTestId(
            "TableHeaderWithCheckbox__checkboxHeader"
        );

        fireEvent.click(checkAllStudentBox);

        const addStudentsButton = within(dialogAddStudentContainer).getByTestId(
            "FooterDialogConfirm__buttonSave"
        );
        fireEvent.click(addStudentsButton);

        await waitFor(async () => {
            const allTableRows = await wrapper.findAllByTestId("TableBase__row");
            expect(allTableRows).toHaveLength(mockStudentInfoList.length);
        });

        // Submit form
        const buttonSubmit = within(wrapper.getByTestId("LessonUpsert__dialog")).getByTestId(
            "LessonUpsertFooter__buttonPublish"
        );
        expect(buttonSubmit).toBeInTheDocument();
        fireEvent.click(buttonSubmit);

        await waitFor(() =>
            expect(wrapper.queryByTestId("LessonUpsert__dialog")).not.toBeInTheDocument()
        );
    }, 20000);
});
