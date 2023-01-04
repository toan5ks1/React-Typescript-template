import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import SchoolHistoryDetail, { mockStudentSchoolHistoryDetail } from "../SchoolHistoryDetail";

import { render, screen, within } from "@testing-library/react";

describe("<SchoolHistoryDetail/>", () => {
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <SchoolHistoryDetail />
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot and render title correctly", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
        expect(screen.getByText("School History")).toBeInTheDocument();
    });
    it("should render data table when having data correctly", () => {
        renderComponent();

        // check header
        const headerTable = screen.getByTestId("TableBase__header");
        const headerCells = headerTable.querySelectorAll("th");
        const headerName = ["", "Level", "School Name", "Course", "Start Date", "End Date"];
        headerCells.forEach((cell, index) => {
            expect(cell).toHaveTextContent(headerName[index]);
        });

        // columns
        const bodyTable = screen.getByTestId("TableBaseBody__root");
        const colLevels = within(bodyTable).getAllByTestId("SchoolHistoryDetail__levelCell");
        const colSchoolNames = within(bodyTable).getAllByTestId(
            "SchoolHistoryDetail__schoolNameCell"
        );
        const colCourses = within(bodyTable).getAllByTestId("SchoolHistoryDetail__courseCell");
        const colStartDates = within(bodyTable).getAllByTestId(
            "SchoolHistoryDetail__startDateCell"
        );
        const colEndDates = within(bodyTable).getAllByTestId("SchoolHistoryDetail__endDateCell");

        colLevels.forEach((col, index) => {
            expect(col).toHaveTextContent(mockStudentSchoolHistoryDetail[index].level);
        });
        colSchoolNames.forEach((col, index) => {
            expect(col).toHaveTextContent(mockStudentSchoolHistoryDetail[index].schoolName);
        });
        colCourses.forEach((col, index) => {
            expect(col).toHaveTextContent(mockStudentSchoolHistoryDetail[index].course);
        });
        colStartDates.forEach((col, index) => {
            expect(col).toHaveTextContent(mockStudentSchoolHistoryDetail[index].startDate);
        });
        colEndDates.forEach((col, index) => {
            expect(col).toHaveTextContent(mockStudentSchoolHistoryDetail[index].endDate);
        });
    });
    //TODO: check no data later
});
