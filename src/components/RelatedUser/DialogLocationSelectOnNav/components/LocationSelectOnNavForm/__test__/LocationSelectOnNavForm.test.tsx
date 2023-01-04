import { mockFlattenedTreeLocations, mockTreeLocations } from "src/test-utils/locations";

import LocationSelectOnNavForm, {
    LocationSelectOnNavFormProps,
} from "src/components/RelatedUser/DialogLocationSelectOnNav/components/LocationSelectOnNavForm/LocationSelectOnNavForm";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useWatch: jest.fn(),
    };
});
describe("LocationSelectOnNavForm component", () => {
    const mockOnLocationToggled = jest.fn();
    const props: LocationSelectOnNavFormProps = {
        populatedLocationsTree: mockTreeLocations,
        onLocationToggled: mockOnLocationToggled,
    };

    it("should render all location checkboxes", () => {
        const wrapper = render(<LocationSelectOnNavForm {...props} />);
        expect(wrapper.container).toMatchSnapshot();

        mockFlattenedTreeLocations.forEach((location) => {
            expect(screen.getByText(location.name)).toBeInTheDocument();
            expect(
                screen.getByTestId(`CheckBoxLocation__${location.locationId}`)
            ).toBeInTheDocument();
        });
        expect(wrapper.container.querySelectorAll("input")).toHaveLength(
            mockFlattenedTreeLocations.length
        );
    });

    it("should call mockOnLocationToggled when clicking a checkbox", () => {
        const wrapper = render(<LocationSelectOnNavForm {...props} />);
        const firstCheckBox = wrapper.container.querySelectorAll("input")[0];
        userEvent.click(firstCheckBox);
        expect(mockOnLocationToggled).toBeCalled();
    });
});
