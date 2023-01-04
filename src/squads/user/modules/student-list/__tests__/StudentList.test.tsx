import { usePrevious } from "react-use";
import {
    createMockMapCourses,
    createMockMapLocations,
    createMockMapGradeOfStudents,
    createMockQueryCourses,
    createMockStudentTableData,
    createMockHomeAddress,
} from "src/squads/user/test-utils/mocks/student";
import { TestQueryWrapper, TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import StudentList from "../StudentList";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useGenerateStudentQrPdf, {
    UseGenerateStudentQrPdfReturn,
} from "src/squads/user/hooks/useGenerateStudentQrPdf";
import useFilterStudents, {
    UseFilterStudentsReturn,
} from "src/squads/user/modules/student-list/hooks/useFilterStudents";
import useNormalizeCourses, {
    UseNormalizeCoursesReturn,
} from "src/squads/user/modules/student-list/hooks/useNormalizeCourses";
import useNormalizeGrades, {
    UseNormalizedGradesReturn,
} from "src/squads/user/modules/student-list/hooks/useNormalizeGrades";
import useQueryStudents, {
    UseQueryStudentsReturn,
} from "src/squads/user/modules/student-list/hooks/useQueryStudents";
import useStudentHomeAddresses, {
    useStudentHomeAddressesReturn,
} from "src/squads/user/modules/student-list/hooks/useStudentHomeAddresses";
import useStudentListLocation, {
    UseStudentListLocationReturn,
} from "src/squads/user/modules/student-list/hooks/useStudentListLocation";

jest.mock("src/squads/user/hooks/useUserFeatureFlag")
    .mock("src/squads/user/hooks/useGenerateStudentQrPdf", () => ({
        __esModule: true,
        default: jest.fn(),
    }))
    .mock("src/squads/user/modules/student-list/hooks/useFilterStudents", () => ({
        __esModule: true,
        default: jest.fn(),
    }))
    .mock("src/squads/user/modules/student-list/hooks/useQueryStudents", () => ({
        __esModule: true,
        default: jest.fn(),
    }))
    .mock("src/squads/user/modules/student-list/hooks/useNormalizeCourses", () => ({
        __esModule: true,
        default: jest.fn(),
    }))
    .mock("src/squads/user/modules/student-list/hooks/useStudentListLocation", () => ({
        __esModule: true,
        default: jest.fn(),
    }))
    .mock("src/squads/user/hooks/useGetGradeAndStatusOfStudents", () => ({
        __esModule: true,
        default: jest.fn(),
    }))
    .mock("src/squads/user/modules/student-list/hooks/useNormalizeGrades", () => ({
        __esModule: true,
        default: jest.fn(),
    }))
    .mock("src/squads/user/modules/student-list/hooks/useStudentHomeAddresses", () => ({
        __esModule: true,
        default: jest.fn(),
    }))
    .mock("react-use", () => {
        const actual = jest.requireActual("react-use");
        return {
            ...actual,
            usePrevious: jest.fn(),
        };
    });

describe("<StudentList />", () => {
    const mockStudentTableData = createMockStudentTableData(false);
    const mockStudents = mockStudentTableData.data;
    const mockPagination = mockStudentTableData.pagination;
    const mockCourses = createMockQueryCourses(1, mockStudents[0].user_id);
    const mockMapGrades = createMockMapGradeOfStudents(mockStudents[0].user_id);
    const mockMapCourses = createMockMapCourses(mockStudents[0].user_id);
    const mockLocations = createMockMapLocations(mockStudents[0].user_id);
    const mockHomeAddress = createMockHomeAddress(mockStudents[0].user_id);

    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <StudentList />
                </TestQueryWrapper>
            </TestCommonAppProvider>
        );
    };

    const onFilter = jest.fn();
    const onSearch = jest.fn();
    const refetchStudents = jest.fn();
    const resetPaginationOffset = jest.fn();

    beforeEach(() => {
        (useGenerateStudentQrPdf as jest.Mock<UseGenerateStudentQrPdfReturn>).mockReturnValue({
            generatePdf: jest.fn(),
            isLoading: false,
        });
        (useFilterStudents as jest.Mock<UseFilterStudentsReturn>).mockReturnValue({
            filter: {
                keyword: "",
                grades: [],
                courses: [],
                isNotLogged: true,
            },
            onFilter,
            onSearch,
        });
        (useQueryStudents as jest.Mock<UseQueryStudentsReturn>).mockReturnValue({
            students: mockStudents,
            pagination: mockPagination,
            loading: false,
            refetchStudents,
            resetPaginationOffset,
            isFetching: false,
        });
        (useNormalizeCourses as jest.Mock<UseNormalizeCoursesReturn>).mockReturnValue({
            loaded: true,
            mapCourses: mockMapCourses,
            courses: mockCourses,
        });
        (useStudentListLocation as jest.Mock<UseStudentListLocationReturn>).mockReturnValue({
            isLoading: false,
            mapLocations: mockLocations,
            refetch: () => {},
        });
        (useNormalizeGrades as jest.Mock<UseNormalizedGradesReturn>).mockReturnValue({
            loading: false,
            mapGrades: mockMapGrades,
            getGradeName: () => "",
        });
        (useStudentHomeAddresses as jest.Mock<useStudentHomeAddressesReturn>).mockReturnValue({
            isLoading: false,
            mapHomeAddresses: mockHomeAddress,
        });
        (usePrevious as jest.Mock).mockReturnValue({
            keyword: "",
            grades: [],
            courses: [],
            isNotLogged: true,
        });
    });

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        renderComponent();

        expect(screen.getByTestId("StudentList")).toBeInTheDocument();
        expect(screen.getByTestId("StudentListNavbar__root")).toBeInTheDocument();
        expect(screen.getByTestId("TableStudent__table")).toBeInTheDocument();
    });

    it("should render correct UI if have no Data", () => {
        (useQueryStudents as jest.Mock<UseQueryStudentsReturn>).mockReturnValue({
            students: [],
            pagination: mockPagination,
            loading: false,
            refetchStudents,
            resetPaginationOffset,
            isFetching: false,
        });

        renderComponent();

        expect(screen.getByTestId("LookingFor__icon")).toBeInTheDocument();
        expect(screen.getByText("No Result")).toBeInTheDocument();
        expect(
            screen.getByText("Please use try again with different keywords or filters")
        ).toBeInTheDocument();
    });

    it("should render correct Students Length", () => {
        renderComponent();

        expect(screen.getAllByTestId("TableBase__row")).toHaveLength(mockStudents.length);
    });

    it("should call onSeach and onFilter", async () => {
        renderComponent();

        const valueSearch = "search";

        const inputSearch = screen.getByPlaceholderText("Enter your keyword");
        userEvent.type(inputSearch, valueSearch);

        await waitFor(() => {
            expect(inputSearch).toHaveValue(valueSearch);
        });

        userEvent.keyboard("{enter}");

        expect(onSearch).toBeCalledTimes(1);
        expect(onSearch).toBeCalledWith(valueSearch);

        userEvent.click(screen.getByTestId("ButtonDropdownWithPopover__button"));

        userEvent.click(await screen.findByTestId("CheckboxLabelHF_isNotLogged"));

        userEvent.click(screen.getByTestId("ButtonDropdownWithPopover__buttonApply"));

        await waitFor(() => {
            expect(onFilter).toBeCalledTimes(1);
        });
    });

    it("should call resetPaginationOffset if filter not equal to prevFilter", () => {
        (useFilterStudents as jest.Mock).mockReturnValue({
            filter: {
                keyword: "changed keyword",
                grades: [],
                courses: [],
                isNotLogged: true,
            },
            onFilter,
            onSearch,
        });

        renderComponent();

        expect(resetPaginationOffset).toBeCalledTimes(1);
    });
});
