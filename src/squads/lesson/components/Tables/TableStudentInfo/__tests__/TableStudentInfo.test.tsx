import { TestApp } from "src/squads/lesson/test-utils";
import { mockStudentInfoList } from "src/squads/lesson/test-utils/lesson-management";

import TableStudentInfo, {
    TableStudentInfoProps,
} from "src/squads/lesson/components/Tables/TableStudentInfo";

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

const renderTableStudentsInfoWithActionsWrapper = (props: TableStudentInfoProps) => {
    return render(
        <TestApp>
            <TableStudentInfo {...props} />
        </TestApp>
    );
};

const props: TableStudentInfoProps = {
    studentsList: mockStudentInfoList,
    selectedStudentsList: [],
    errorMessage: undefined,
    updateStudentAttendance: jest.fn(),
    onSelect: jest.fn(),
};

describe("<TableStudentInfo /> test for render", () => {
    it("should render columns", () => {
        const wrapper = renderTableStudentsInfoWithActionsWrapper(props);

        const tableHeader = wrapper.getByTestId("TableBase__header");

        const studentNameColumn = within(tableHeader).getByText("Student Name");
        const courseNameColumn = within(tableHeader).getByText("Course");
        const gradeColumn = within(tableHeader).getByText("Grade");
        const attendanceColumn = within(tableHeader).getByText("Attendance");
        const centerColumn = within(tableHeader).getByText("Center");

        expect(studentNameColumn).toBeVisible();
        expect(courseNameColumn).toBeVisible();
        expect(gradeColumn).toBeVisible();
        expect(attendanceColumn).toBeVisible();
        expect(centerColumn).toBeVisible();
    });

    it("should render selected students", () => {
        const wrapper = renderTableStudentsInfoWithActionsWrapper({
            ...props,
            selectedStudentsList: [props.studentsList[0]],
        });

        expect(wrapper.queryAllByRole("checkbox", { checked: true })).toHaveLength(1);

        const allUncheckedBoxes = wrapper.queryAllByRole("checkbox", { checked: false });
        userEvent.click(allUncheckedBoxes[1]); // 0 is checkbox in header table

        expect(wrapper.queryAllByRole("checkbox", { checked: true })).toHaveLength(3); // All checkboxes is checked
        expect(props.onSelect).toBeCalledWith(mockStudentInfoList);
    });

    it("should render attendance status", () => {
        let modStudentInfoList = [...mockStudentInfoList];
        modStudentInfoList[1].attendanceStatus = StudentAttendStatus.STUDENT_ATTEND_STATUS_ATTEND;

        const wrapper = renderTableStudentsInfoWithActionsWrapper({
            ...props,
            studentsList: modStudentInfoList,
        });

        const allAttendanceAutocomplete = wrapper.getAllByTestId(
            "TableStudentInfo__autocompleteAttendance"
        );

        const inputOf1stAutocomplete = within(allAttendanceAutocomplete[0]).getByTestId(
            "AutocompleteBase__input"
        );
        expect(inputOf1stAutocomplete).toHaveValue("");

        const inputOf2ndAutocomplete = within(allAttendanceAutocomplete[1]).getByTestId(
            "AutocompleteBase__input"
        );
        expect(inputOf2ndAutocomplete).toHaveValue("Attend");
    });

    it("should update attendance", async () => {
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

        expect(inputOf1stAutocomplete).toHaveValue("Attend");

        // FIXME: For some reason, cannot access the clear button
        // const clearAttendOptionButton = within(allAttendanceAutocomplete[0]).getByTestId(
        //     "TableStudentInfo__iconClear"
        // );
        // userEvent.click(clearAttendOptionButton);

        // expect(props.updateStudentAttendance).toBeCalledWith(
        //     props.studentsList[0].studentSubscriptionId,
        //     StudentAttendStatus.STUDENT_ATTEND_STATUS_EMPTY
        // );

        // expect(inputOf1stAutocomplete).toHaveValue("");
    });
});
