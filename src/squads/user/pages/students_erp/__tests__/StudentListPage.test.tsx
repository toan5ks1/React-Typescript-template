import {
    createMockMapCourses,
    createMockMapLocations,
    createMockQueryCourses,
    createMockStudentTableData,
} from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import StudentListPage from "../index";

import { render } from "@testing-library/react";
import useGenerateStudentQrPdf, {
    UseGenerateStudentQrPdfReturn,
} from "src/squads/user/hooks/useGenerateStudentQrPdf";
import useNormalizeCourses, {
    UseNormalizeCoursesReturn,
} from "src/squads/user/modules/student-list/hooks/useNormalizeCourses";
import useStudentListLocation, {
    UseStudentListLocationReturn,
} from "src/squads/user/modules/student-list/hooks/useStudentListLocation";

jest.mock("src/squads/user/hooks/useUserFeatureFlag");

jest.mock("src/squads/user/modules/student-list/hooks/useFilterStudents");
jest.mock("src/squads/user/modules/student-list/hooks/useQueryStudents");
jest.mock("src/squads/user/modules/student-list/hooks/useNormalizeCourses", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useGenerateStudentQrPdf", () => jest.fn());
jest.mock("src/squads/user/modules/student-list/hooks/useStudentListLocation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockStudentTableData = createMockStudentTableData(false);
const mockStudents = mockStudentTableData.data;
const mockLocations = createMockMapLocations();
const mockCourses = createMockQueryCourses(1, mockStudents[0].user_id);
const mockMapCourses = createMockMapCourses(mockStudents[0].user_id);

test("StudentListPage", () => {
    (useGenerateStudentQrPdf as jest.Mock<UseGenerateStudentQrPdfReturn>).mockReturnValue({
        generatePdf: jest.fn(),
        isLoading: false,
    });
    (useStudentListLocation as jest.Mock<UseStudentListLocationReturn>).mockReturnValue({
        isLoading: false,
        mapLocations: mockLocations,
        refetch: () => {},
    });
    (useNormalizeCourses as jest.Mock<UseNormalizeCoursesReturn>).mockReturnValue({
        loaded: true,
        mapCourses: mockMapCourses,
        courses: mockCourses,
    });

    const { container } = render(
        <TestCommonAppProvider>
            <TestQueryWrapper>
                <StudentListPage />
            </TestQueryWrapper>
        </TestCommonAppProvider>
    );
    expect(container).toMatchSnapshot();
});
