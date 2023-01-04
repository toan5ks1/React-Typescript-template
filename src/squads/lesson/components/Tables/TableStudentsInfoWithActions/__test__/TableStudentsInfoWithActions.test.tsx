import { TestApp } from "src/squads/lesson/test-utils";
import {
    mockCourseOptionsAutoCompleteReference,
    mockStudentInfoList,
    mockUseLessonStudentInfoListFilter,
} from "src/squads/lesson/test-utils/lesson-management";

import TableStudentsInfoWithActions, {
    TableStudentsInfoWithActionsProps,
} from "src/squads/lesson/components/Tables/TableStudentsInfoWithActions";

import { StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => jest.fn());
jest.mock("src/squads/lesson/hooks/useLessonStudentInfoListFilter", () => jest.fn());
jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => jest.fn());
jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => {
    return {
        __esModule: true,
        default: () => ({ isEnabled: true }),
    };
});
jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useGetManyLocations", () => {
    return {
        __esModule: true,
        default: (locationIds: string[]) => {
            return {
                data: locationIds.map((id) => ({ location_id: id, name: "locationName" })),
                isLoading: false,
            };
        },
    };
});

const showSnackbar = jest.fn();

const mockUseAutocompleteReference = () => {
    (useAutocompleteReference as jest.Mock).mockReset().mockImplementation(() => {
        return {
            loading: false,
            setInputVal: jest.fn(),
            options: mockCourseOptionsAutoCompleteReference,
            defaultValue: [],
        };
    });
};

const renderTableStudentsInfoWithActionsWrapper = (props: TableStudentsInfoWithActionsProps) => {
    return render(
        <TestApp>
            <TableStudentsInfoWithActions {...props} />
        </TestApp>
    );
};

const props: TableStudentsInfoWithActionsProps = {
    studentsList: mockStudentInfoList,
    updateStudentList: jest.fn(),
    updateStudentAttendance: jest.fn(),
    error: undefined,
};

describe("<TableStudentsInfoWithActions /> test for render", () => {
    beforeEach(() => {
        mockUseAutocompleteReference();
        mockUseLessonStudentInfoListFilter();
    });

    it("should render students list with attendance autocomplete", () => {
        const wrapper = renderTableStudentsInfoWithActionsWrapper(props);

        const allTableRows = wrapper.getAllByTestId("TableBase__row");
        const allAutocomplete = wrapper.getAllByTestId("TableStudentInfo__autocompleteAttendance");

        expect(allTableRows).toHaveLength(props.studentsList.length);
        expect(allAutocomplete).toHaveLength(props.studentsList.length);
    });

    it("should render error message", () => {
        const wrapper = renderTableStudentsInfoWithActionsWrapper({
            ...props,
            studentsList: [],
            error: {
                type: "validate",
                message: "No student",
            },
        });

        const errorText = wrapper.getByText("No student");
        expect(errorText).toBeVisible();
    });
});

describe("<TableStudentsInfoWithActions /> test for table actions", () => {
    beforeEach(() => {
        mockUseAutocompleteReference();
        mockUseLessonStudentInfoListFilter();
    });

    it("should open dialog add students", () => {
        const wrapper = renderTableStudentsInfoWithActionsWrapper(props);

        const addActionButton = wrapper.getByTestId("TableAction__buttonAdd");
        userEvent.click(addActionButton);

        expect(screen.getByTestId("DialogAddStudentSubscriptions__dialogContainer")).toBeVisible();
    });

    it("should remove added students", () => {
        const wrapper = renderTableStudentsInfoWithActionsWrapper(props);

        const checkBoxHeader = wrapper.getByTestId("TableHeaderWithCheckbox__checkboxHeader");
        userEvent.click(checkBoxHeader);

        const removeButton = wrapper.getByTestId("TableAction__buttonDelete");
        expect(removeButton).toBeEnabled();
        userEvent.click(removeButton);

        expect(props.updateStudentList).toBeCalledWith([]);
    });

    it("should update attendance status", () => {
        const wrapper = renderTableStudentsInfoWithActionsWrapper(props);

        const allAttendanceAutocomplete = wrapper.getAllByTestId(
            "TableStudentInfo__autocompleteAttendance"
        );

        const inputOf1stAutocomplete = within(allAttendanceAutocomplete[0]).getByTestId(
            "AutocompleteBase__input"
        );
        userEvent.click(inputOf1stAutocomplete);

        const attendOption = screen.getByText("Attend");
        userEvent.click(attendOption);

        expect(props.updateStudentAttendance).toBeCalledWith(
            props.studentsList[0].studentSubscriptionId,
            StudentAttendStatus.STUDENT_ATTEND_STATUS_ATTEND
        );
    });
});

describe("<TableStudentsInfoWithActions /> test for dialog add students", () => {
    beforeEach(() => {
        mockUseAutocompleteReference();
        mockUseLessonStudentInfoListFilter();
    });

    it("should open/close dialog add students", () => {
        const wrapper = renderTableStudentsInfoWithActionsWrapper(props);

        const addActionButton = wrapper.getByTestId("TableAction__buttonAdd");
        userEvent.click(addActionButton);

        expect(screen.getByTestId("DialogAddStudentSubscriptions__dialogContainer")).toBeVisible();

        const closeDialogButton = wrapper.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(closeDialogButton);

        expect(screen.queryByTestId("DialogAddStudentSubscriptions__dialogContainer")).toBeNull();
    });

    const openAddStudentsDialog = () => {
        const addActionButton = screen.getByTestId("TableAction__buttonAdd");
        userEvent.click(addActionButton);
    };

    const selectCheckboxOfTableHeader = () => {
        const tableStudentSubscriptions = screen.getByTestId(
            "TableStudentSubscriptions__tableContainer"
        );

        const checkBoxHeader = within(tableStudentSubscriptions).getByTestId(
            "TableHeaderWithCheckbox__checkboxHeader"
        );
        userEvent.click(checkBoxHeader);
    };

    it("should added students", () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const wrapper = renderTableStudentsInfoWithActionsWrapper({
            ...props,
            studentsList: [],
        });

        openAddStudentsDialog();
        selectCheckboxOfTableHeader(); // Select all students

        const addStudentsButton = wrapper.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(addStudentsButton);

        expect(props.updateStudentList).toBeCalledWith(mockStudentInfoList);
        expect(showSnackbar).toBeCalledWith("You have added students successfully!");
    });

    it("should added empty students list", () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const wrapper = renderTableStudentsInfoWithActionsWrapper({
            ...props,
            studentsList: mockStudentInfoList,
        });

        openAddStudentsDialog();
        selectCheckboxOfTableHeader(); // Deselect all students

        const addStudentsButton = wrapper.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(addStudentsButton);

        expect(props.updateStudentList).toBeCalledWith([]);
        expect(showSnackbar).not.toBeCalled();
    });
});
