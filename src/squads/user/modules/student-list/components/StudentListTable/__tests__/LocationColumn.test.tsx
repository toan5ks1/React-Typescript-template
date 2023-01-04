import {
    createMockListStudentWithFilter,
    createMockMapLocations,
} from "src/squads/user/test-utils/mocks/student";

import LocationColumn, { LocationColumnProps } from "../LocationColumn";

import { render, screen } from "@testing-library/react";

describe("<GradeColumn/>", () => {
    const mockStudents = createMockListStudentWithFilter("id01");
    const mockLocations = createMockMapLocations(mockStudents[0].user_id);
    const renderComponent = (props?: Partial<LocationColumnProps>) => {
        return render(
            <LocationColumn
                studentId={"id01"}
                isLoading={false}
                mapLocations={mockLocations}
                {...props}
            />
        );
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should render content 'Location 1, Location 2'", () => {
        renderComponent();

        const locations = mockLocations
            .get("id01")
            ?.map((item) => item.name)
            .join(", ");

        expect(screen.getByText(locations!)).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnLocation__content")).toBeInTheDocument();
    });

    it("should render loading", () => {
        renderComponent({ isLoading: true });

        expect(screen.getByTestId("TableColumnLocation__loading")).toBeInTheDocument();
    });
});
