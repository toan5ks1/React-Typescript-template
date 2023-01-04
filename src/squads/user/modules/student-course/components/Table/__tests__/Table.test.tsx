import { formatDate } from "src/common/utils/time";
import { createMockStudentCourse } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { StudentCourseTable } from "../Table";

import { render, screen, within } from "@testing-library/react";

const mockCourse = createMockStudentCourse("student_id");

describe("<StudentCourseTable />", () => {
    it("should render UI with courses", () => {
        render(
            <TestCommonAppProvider>
                <StudentCourseTable dataSource={[mockCourse]} loading={false} />
            </TestCommonAppProvider>
        );

        expect(screen.getByTestId("StudentCourseTable")).toBeInTheDocument();

        const header = screen.getByTestId("TableBase__header");
        const columns = within(header).getAllByTestId("TableBase__cellHeader");
        expect(columns.length).toEqual(5);

        expect(screen.getByTestId("StudentCourseTable__name")).toHaveTextContent(
            mockCourse.course.name
        );

        expect(screen.getByTestId("StudentCourseTable__location")).toHaveTextContent(
            mockCourse.location?.name || ""
        );
        expect(screen.getByTestId("StudentCourseTable__class")).toHaveTextContent(
            mockCourse.class?.name || ""
        );
        expect(screen.getByTestId("StudentCourseTable__startDate")).toHaveTextContent(
            formatDate(mockCourse.start, "yyyy/LL/dd")
        );
        expect(screen.getByTestId("StudentCourseTable__endDate")).toHaveTextContent(
            formatDate(mockCourse.end, "yyyy/LL/dd")
        );
    });

    it("should render UI with missing course", () => {
        render(
            <TestCommonAppProvider>
                <StudentCourseTable dataSource={[]} loading={false} />
            </TestCommonAppProvider>
        );

        expect(screen.getByTestId("StudentCourseTable")).toBeInTheDocument();
        const columns = screen.getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns.length).toEqual(6);
        expect(screen.getByTestId("TableBase__noDataMessage")).toBeInTheDocument();
    });
});
