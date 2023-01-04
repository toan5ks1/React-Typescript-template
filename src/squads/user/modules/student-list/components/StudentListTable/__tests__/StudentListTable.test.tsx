import { useLocation } from "react-router";
import { capitalizeFirstLetter } from "src/squads/user/common/utils/display";
import { createMockPaginationWithTotalObject } from "src/squads/user/test-utils/mocks/pagination";
import {
    createMockListStudentWithFilter,
    createMockMapCourses,
    createMockMapLocations,
    createMockMapGradeOfStudents,
    createMockQueryCourses,
    createMockHomeAddress,
} from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import StudentListTable, { StudentListTableProps, useColumns } from "../StudentListTable";

import { render, screen, within } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import useGetStudentGradeNameByCountry from "src/squads/user/hooks/useGetStudentGradeNameByCountry";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import useNormalizeCourses, {
    UseNormalizeCoursesReturn,
} from "src/squads/user/modules/student-list/hooks/useNormalizeCourses";
import useNormalizeGrades, {
    UseNormalizedGradesReturn,
} from "src/squads/user/modules/student-list/hooks/useNormalizeGrades";
import useStudentHomeAddresses, {
    useStudentHomeAddressesReturn,
} from "src/squads/user/modules/student-list/hooks/useStudentHomeAddresses";
import useStudentListLocation, {
    UseStudentListLocationReturn,
} from "src/squads/user/modules/student-list/hooks/useStudentListLocation";

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");

    return {
        ...actual,
        useLocation: jest.fn(),
    };
});

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/student-list/hooks/useNormalizeCourses", () => jest.fn());

jest.mock("src/squads/user/modules/student-list/hooks/useStudentListLocation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/modules/student-list/hooks/useNormalizeGrades", () => jest.fn());

jest.mock("src/squads/user/modules/student-list/hooks/useStudentHomeAddresses", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<StudentListTable />", () => {
    const mockPagination = createMockPaginationWithTotalObject();
    const mockStudents = createMockListStudentWithFilter("id01");
    const mockMapCourses = createMockMapCourses(mockStudents[0].user_id);
    const mockMapGrades = createMockMapGradeOfStudents(mockStudents[0].user_id);
    const mockLocations = createMockMapLocations(mockStudents[0].user_id);
    const mockCourse = createMockQueryCourses(2, mockStudents[0].user_id);
    const mockHomeAddress = createMockHomeAddress(mockStudents[0].user_id);

    const renderComponent = (props: StudentListTableProps) => {
        return render(
            <TestCommonAppProvider>
                <StudentListTable {...props} />
            </TestCommonAppProvider>
        );
    };

    beforeEach(() => {
        (useLocation as jest.Mock).mockImplementation(() => {
            return {
                pathname: "/students_erp",
            };
        });

        (useNormalizeCourses as jest.Mock<UseNormalizeCoursesReturn>).mockReturnValue({
            loaded: true,
            mapCourses: mockMapCourses,
            courses: mockCourse,
        });

        (useStudentListLocation as jest.Mock<UseStudentListLocationReturn>).mockReturnValue({
            isLoading: false,
            mapLocations: mockLocations,
            refetch: () => {},
        });

        (useNormalizeGrades as jest.Mock<UseNormalizedGradesReturn>).mockReturnValue({
            loading: false,
            mapGrades: mockMapGrades,
            getGradeName: jest.fn(() => "Grade 1"),
        });
        (useStudentHomeAddresses as jest.Mock<useStudentHomeAddressesReturn>).mockReturnValue({
            isLoading: false,
            mapHomeAddresses: mockHomeAddress,
        });
        (useUserFeatureToggle as jest.Mock<boolean>).mockReturnValue(true);
    });

    const props: StudentListTableProps = {
        dataSource: mockStudents,
        loading: false,
        pagination: mockPagination,
        onSelect: jest.fn(),
        listSelectedItems: [mockStudents[0]],
    };

    it("should match snapshot", () => {
        const { container } = renderComponent(props);

        expect(container).toMatchSnapshot();
    });

    it("should render a table column correctly", () => {
        renderComponent(props);
        const { result } = renderHook(() => useColumns({ studentIds: ["01"] }), {
            wrapper: TestCommonAppProvider,
        });

        const titles = result.current.map((student) => student.title);

        const fitColumns = ["", ...titles];

        const columns = screen.getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns.length).toEqual(fitColumns.length);

        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            expect(column).toHaveTextContent(fitColumns[i]);
        }
        expect(screen.getByTestId("TableColumnName__content")).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnPhoneticName__content")).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnEmail__content")).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnCourse__content")).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnLocation__content")).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnGrade__content")).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnStatus__content")).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnHomeAddress__content")).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnSchool__content")).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnContactPreference__content")).toBeInTheDocument();
    });

    it("should have checked boxes when there are selected items", async () => {
        renderComponent(props);

        expect(screen.queryAllByRole("checkbox", { checked: true })).toHaveLength(
            mockStudents.length + 1
        );
    });

    it("should have no checked boxes once header checkbox is clicked", async () => {
        renderComponent(props);

        const checkboxHeader = screen
            .getByTestId("TableHeaderWithCheckbox__checkboxHeader")
            .querySelector("input") as HTMLInputElement;

        userEvent.click(checkboxHeader); // Uncheck all

        expect(screen.queryAllByRole("checkbox", { checked: true })).toHaveLength(0);
    });

    it("should render correct data Students", () => {
        renderComponent(props);

        const { result } = renderHook(() => useGetStudentGradeNameByCountry(), {
            wrapper: TestCommonAppProvider,
        });

        const studentTableBody = screen.getByTestId("TableBaseBody__root");

        const nameColumns = within(studentTableBody).getAllByTestId("TableColumnName__content");
        const phoneticNameColumns = within(studentTableBody).getAllByTestId(
            "TableColumnPhoneticName__content"
        );
        const emailColumns = within(studentTableBody).getAllByTestId("TableColumnEmail__content");
        const courseColumns = within(studentTableBody).getAllByTestId("TableColumnCourse__content");
        const locationColumns = within(studentTableBody).getAllByTestId(
            "TableColumnLocation__content"
        );
        const statusColumns = within(studentTableBody).getAllByTestId("TableColumnStatus__content");
        const gradeColumn = within(studentTableBody).getAllByTestId("TableColumnGrade__content");
        const homeAddressColumns = within(studentTableBody).getAllByTestId(
            "TableColumnHomeAddress__content"
        );

        nameColumns.forEach((col, index) => {
            expect(col).toHaveTextContent(mockStudents[index].name);
        });

        phoneticNameColumns.forEach((col, index) => {
            expect(col).toHaveTextContent(mockStudents[index].name);
        });
        emailColumns.forEach((col, index) => {
            expect(col).toHaveTextContent(mockStudents[index].name);
        });

        courseColumns.forEach((col, index) => {
            const courseMap = mockMapCourses.get(mockStudents[index].user_id);
            expect(col).toHaveTextContent(courseMap?.courses?.map((item) => item.name).join(", ")!);
        });

        locationColumns.forEach((col, index) => {
            const locationMap = mockLocations.get(mockStudents[index].user_id);
            expect(col).toHaveTextContent(locationMap?.map((item) => item.name).join(", ")!);
        });

        gradeColumn.forEach((col, index) => {
            const gradeMap = mockMapGrades.get(mockStudents[index].user_id)!;
            expect(col).toHaveTextContent(
                result.current.getStudentGradeName(gradeMap.current_grade!)!
            );
        });

        statusColumns.forEach((col, index) => {
            const gradeMap = mockMapGrades.get(mockStudents[index].user_id)!;
            const enrollmentStatus = gradeMap.enrollment_status;
            const split = enrollmentStatus.split("_");
            expect(col).toHaveTextContent(
                capitalizeFirstLetter(split[split.length - 1].toLocaleLowerCase())
            );
        });
        homeAddressColumns.forEach((col, index) => {
            const homeAddress = mockHomeAddress.get(mockStudents[index].user_id)!;
            const { postal_code, prefecture, city, first_street, second_street } = homeAddress;
            const expectedValue = `${postal_code} ${prefecture?.name} ${city} ${first_street} ${second_street}`;
            expect(col).toHaveTextContent(expectedValue);
        });
    });
});
