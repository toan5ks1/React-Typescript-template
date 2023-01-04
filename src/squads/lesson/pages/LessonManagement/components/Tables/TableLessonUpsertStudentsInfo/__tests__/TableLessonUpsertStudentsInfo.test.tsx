import { TestThemeProvider } from "src/squads/lesson/test-utils";
import { makeAStudentInfo } from "src/squads/lesson/test-utils/class-course";
import { selectAutocompleteOptionByLabel } from "src/squads/lesson/test-utils/utils";

import TableLessonUpsertStudentsInfo, {
    TableLessonUpsertStudentsInfoProps,
} from "src/squads/lesson/pages/LessonManagement/components/Tables/TableLessonUpsertStudentsInfo/TableLessonUpsertStudentsInfo";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

const renderTableLessonUpsertStudentsInfo = (props: TableLessonUpsertStudentsInfoProps) => {
    render(
        <TranslationProvider>
            <TestThemeProvider>
                <TableLessonUpsertStudentsInfo {...props} />
            </TestThemeProvider>
        </TranslationProvider>
    );
};

describe("TableLessonUpsertStudentsInfo", () => {
    const props: TableLessonUpsertStudentsInfoProps = {
        studentInfosList: [makeAStudentInfo(1), makeAStudentInfo(2)],
        selectedStudentInfosList: [],
        errorMessage: undefined,
        updateStudentAttendance: jest.fn(),
        onSelect: jest.fn(),
    };

    it("should render columns", () => {
        renderTableLessonUpsertStudentsInfo(props);

        const tableHeader = screen.getByTestId("TableBase__header");

        const studentNameColumn = within(tableHeader).getByText("Student Name");
        const courseNameColumn = within(tableHeader).getByText("Course");
        const gradeColumn = within(tableHeader).getByText("Grade");
        const attendanceColumn = within(tableHeader).getByText("Attendance");
        const locationColumn = within(tableHeader).getByText("Location");

        expect(studentNameColumn).toBeInTheDocument();
        expect(courseNameColumn).toBeInTheDocument();
        expect(gradeColumn).toBeInTheDocument();
        expect(attendanceColumn).toBeInTheDocument();
        expect(locationColumn).toBeInTheDocument();
    });

    it("should update student's attendance status", () => {
        renderTableLessonUpsertStudentsInfo(props);

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

    it("should clear student's attendance status", () => {
        const studentInfosListWithAttendance = props.studentInfosList.map((studentInfo) => ({
            ...studentInfo,
            attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_ATTEND,
        }));

        renderTableLessonUpsertStudentsInfo({
            ...props,
            studentInfosList: studentInfosListWithAttendance,
        });

        const clearAttendanceStatusIcons = screen.getAllByTestId("CloseIcon");

        clearAttendanceStatusIcons.forEach((icon, index) => {
            userEvent.click(icon);

            const studentInfo = props.studentInfosList[index];

            expect(props.updateStudentAttendance).toBeCalledWith(
                studentInfo.student.studentId + studentInfo.course.courseId,
                StudentAttendStatus.STUDENT_ATTEND_STATUS_EMPTY
            );
        });
    });

    it.each(props.studentInfosList)("should select student by checkboxes", (studentInfo) => {
        renderTableLessonUpsertStudentsInfo(props);

        const checkboxCell = screen.getByRole("cell", {
            name: studentInfo.student.studentName,
        });
        const checkbox = within(checkboxCell).getByRole("checkbox");

        userEvent.click(checkbox);
        expect(props.onSelect).toBeCalledWith([studentInfo]);
    });
});
