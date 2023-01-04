import { TestThemeProvider } from "src/squads/lesson/test-utils";
import { makeAStudentInfo } from "src/squads/lesson/test-utils/class-course";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";
import { selectAutocompleteOptionByLabel } from "src/squads/lesson/test-utils/utils";

import TableStudentsInfoWithActionsV2, {
    TableStudentsInfoWithActionsV2Props,
} from "src/squads/lesson/pages/LessonManagement/components/Tables/TableStudentsInfoWithActionsV2/TableStudentsInfoWithActionsV2";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useStudentInfoWithFilter from "src/squads/lesson/pages/LessonManagement/hooks/useStudentInfoWithFilter";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/TestQueryWrapper";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useStudentInfoWithFilter", () => {
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
                data: locationIds.map((id) => ({ location_id: id, name: "Location Name" })),
                isLoading: false,
            };
        },
    };
});

const setupMocks = () => {
    const studentInfosListMock = [
        makeAStudentInfo(1),
        makeAStudentInfo(2),
        makeAStudentInfo(3),
        makeAStudentInfo(4),
    ];

    (useStudentInfoWithFilter as jest.Mock).mockImplementation(() => {
        return {
            studentInfosList: studentInfosListMock,
            isLoadingStudentsCourses: false,
            isLoadingGrades: false,
            pagination: createMockPaginationWithTotalObject(),
            handleEnterSearchBar: jest.fn(),
            handleApplyFilterCriteria: jest.fn(),
        };
    });

    return { studentInfosListMock };
};

const renderTableStudentsInfoWithActionsWrapper = (props: TableStudentsInfoWithActionsV2Props) => {
    render(
        <TestQueryWrapper>
            <TranslationProvider>
                <TestThemeProvider>
                    <TableStudentsInfoWithActionsV2 {...props} />
                </TestThemeProvider>
            </TranslationProvider>
        </TestQueryWrapper>
    );
};

describe("TableStudentsInfoWithActionsV2", () => {
    const props: TableStudentsInfoWithActionsV2Props = {
        studentInfosList: [makeAStudentInfo(1), makeAStudentInfo(2)],
        updateStudentList: jest.fn(),
        updateStudentAttendance: jest.fn(),
        error: undefined,
    };

    it("should see error message", () => {
        setupMocks();

        renderTableStudentsInfoWithActionsWrapper({
            ...props,
            studentInfosList: [],
            error: {
                type: "validate",
                message: "This field is required",
            },
        });

        const messageBox = screen.getByRole("alert");
        expect(within(messageBox).getByText("This field is required")).toBeInTheDocument();
    });

    //TODO: after catch multiple error in https://manabie.atlassian.net/browse/LT-18801, @lesson will fix under case
    it.skip("should remove all students", () => {
        renderTableStudentsInfoWithActionsWrapper(props);

        props.studentInfosList.forEach((studentInfo) => {
            const checkboxCell = screen.getByRole("cell", {
                name: studentInfo.student.studentName,
            });
            const checkbox = within(checkboxCell).getByRole("checkbox");

            userEvent.click(checkbox);
        });

        const removeButton = screen.getByTestId("TableAction__buttonDelete");
        userEvent.click(removeButton);

        expect(props.updateStudentList).toBeCalledWith([]);
    });

    it("should open/close dialog add students", () => {
        setupMocks();
        renderTableStudentsInfoWithActionsWrapper(props);

        const addActionButton = screen.getByTestId("TableAction__buttonAdd");
        userEvent.click(addActionButton);

        expect(screen.getByRole("dialog")).toBeInTheDocument();

        const closeButton = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(closeButton);

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should add more students", () => {
        const showSnackbar = jest.fn();

        const { studentInfosListMock } = setupMocks();
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderTableStudentsInfoWithActionsWrapper(props);

        const addActionButton = screen.getByTestId("TableAction__buttonAdd");
        userEvent.click(addActionButton);

        const dialogWrapper = screen.getByRole("dialog");
        const tableBody = within(dialogWrapper).getByTestId("TableBaseBody__root");
        const uncheckedBoxes = within(tableBody).getAllByRole("checkbox", { checked: false });

        uncheckedBoxes.forEach((uncheckedBox) => {
            userEvent.click(uncheckedBox);
        });

        const addStudentsButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(addStudentsButton);

        expect(props.updateStudentList).toBeCalledWith(studentInfosListMock);
        expect(showSnackbar).toBeCalledWith("You have added students successfully!");
    });

    it("should deselect all selected students", () => {
        const showSnackbar = jest.fn();

        setupMocks();
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        renderTableStudentsInfoWithActionsWrapper(props);

        const addActionButton = screen.getByTestId("TableAction__buttonAdd");
        userEvent.click(addActionButton);

        const dialogWrapper = screen.getByRole("dialog");
        const tableBody = within(dialogWrapper).getByTestId("TableBaseBody__root");
        const checkedBoxes = within(tableBody).getAllByRole("checkbox", { checked: true });

        checkedBoxes.forEach((checkedBox) => {
            userEvent.click(checkedBox);
        });

        const addStudentsButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(addStudentsButton);

        expect(props.updateStudentList).toBeCalledWith([]);
        expect(showSnackbar).not.toBeCalled();
    });

    it("should update student's attendance status", () => {
        renderTableStudentsInfoWithActionsWrapper(props);

        const attendanceStatusAutocompleteInput = screen.getAllByRole("combobox");

        attendanceStatusAutocompleteInput.forEach((input, index) => {
            userEvent.click(input);
            selectAutocompleteOptionByLabel("Attend");

            const studentInfo = props.studentInfosList[index];

            expect(props.updateStudentAttendance).toBeCalledWith(
                studentInfo.student.studentId + studentInfo.course.courseId,
                StudentAttendStatus.STUDENT_ATTEND_STATUS_ATTEND
            );
        });
    });
});
