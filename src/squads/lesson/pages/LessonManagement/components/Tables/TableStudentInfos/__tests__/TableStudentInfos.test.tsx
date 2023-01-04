import { mockStudentInfoList } from "src/squads/lesson/test-utils/lesson-management";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";

import TableStudentInfos, {
    TableStudentInfosProps,
} from "src/squads/lesson/pages/LessonManagement/components/Tables/TableStudentInfos";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

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

const renderTableStudentInfoWrapper = (props: TableStudentInfosProps) => {
    return render(
        <TranslationProvider>
            <TableStudentInfos {...props} />
        </TranslationProvider>
    );
};

describe("<TableStudentSubscriptions />", () => {
    const props: TableStudentInfosProps = {
        studentInfosList: mockStudentInfoList,
        isLoadingStudentsCourses: false,
        isLoadingGrades: true,
        onSelect: jest.fn(),
        pagination: createMockPaginationWithTotalObject(5, 0),
        selectedStudentInfoList: [],
    };

    it("should render correct columns", () => {
        renderTableStudentInfoWrapper(props);

        const tableHeader = screen.getByTestId("TableBase__header");

        const studentNameColumn = within(tableHeader).getByText("Student Name");
        const gradeColumn = within(tableHeader).getByText("Grade");
        const courseNameColumn = within(tableHeader).getByText("Course");
        const classColumn = within(tableHeader).getByText("Class");
        const locationColumn = within(tableHeader).getByText("Location");

        expect(studentNameColumn).toBeInTheDocument();
        expect(courseNameColumn).toBeInTheDocument();
        expect(gradeColumn).toBeInTheDocument();
        expect(classColumn).toBeInTheDocument();
        expect(locationColumn).toBeInTheDocument();
    });

    it("should render skeleton instead typography", () => {
        const { container } = renderTableStudentInfoWrapper({
            ...props,
            isLoadingStudentsCourses: false,
            isLoadingGrades: true,
        });

        const skeletonCount = container.getElementsByClassName("MuiSkeleton-pulse").length;
        expect(skeletonCount).toBeGreaterThan(1);
    });

    it("should render -- if there is no data", () => {
        const removeClassFromStudentsList = mockStudentInfoList.map((student) => {
            return {
                ...student,
                classData: undefined,
            };
        });

        renderTableStudentInfoWrapper({
            ...props,
            studentInfosList: removeClassFromStudentsList,
        });

        const doubleDash = screen.getAllByText("--");
        expect(doubleDash.length).toBeGreaterThan(1);
    });

    it("should be selected student", () => {
        const selectedStudent = props.studentInfosList[0];

        renderTableStudentInfoWrapper({
            ...props,
            selectedStudentInfoList: [selectedStudent],
        });

        const checkboxCell = screen.getByRole("cell", {
            name: selectedStudent.student.studentName,
        });
        const checkbox = within(checkboxCell).getByRole("checkbox");

        expect(checkbox).toBeChecked();
    });

    it.each(props.studentInfosList)("should check each student info", (studentInfo) => {
        renderTableStudentInfoWrapper(props);

        const checkboxCell = screen.getByRole("cell", { name: studentInfo.student.studentName });
        const checkbox = within(checkboxCell).getByRole("checkbox");

        userEvent.click(checkbox);
        expect(props.onSelect).toBeCalledWith([studentInfo]);
    });

    it("should check all of students", () => {
        renderTableStudentInfoWrapper(props);

        const checkBoxHeader = screen.getByTestId("TableHeaderWithCheckbox__checkboxHeader");
        userEvent.click(checkBoxHeader);

        expect(props.onSelect).toBeCalledWith(props.studentInfosList);
    });
});
