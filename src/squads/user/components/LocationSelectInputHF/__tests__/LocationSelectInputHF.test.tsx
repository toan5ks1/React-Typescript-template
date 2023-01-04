import { LocationInformation, LocationInformationHasura } from "src/squads/user/common/types";
import {
    getMockLocations,
    getMockLocationsHasura,
} from "src/squads/user/test-utils/mocks/locations";
import { TestHookForm, TestThemeProvider } from "src/squads/user/test-utils/providers";

import LocationSelectInputHF, { LocationSelectInputHFProps } from "../LocationSelectInputHF";

import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/user/hooks/useMapTreeLocations");

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: () => true,
}));

describe("<LocationSelectInputHF />", () => {
    const locations = getMockLocations(5);
    const renderComponent = (
        locationsProps?: LocationInformation[] | LocationInformationHasura[],
        overrideProps?: Partial<LocationSelectInputHFProps>
    ) => {
        return render(
            <TestHookForm defaultValues={{ locations: locationsProps }}>
                <TestThemeProvider>
                    <LocationSelectInputHF
                        label="Location"
                        name="locations"
                        getOptionSelectedField="locationId"
                        {...overrideProps}
                    />
                </TestThemeProvider>
            </TestHookForm>
        );
    };
    it("should match snapshot", () => {
        const { container } = renderComponent();

        expect(container).toMatchSnapshot();
    });

    it("should match snapshot with default value", () => {
        const { container } = renderComponent(locations);

        expect(container).toMatchSnapshot("with default value");
    });

    it("should match snapshot with default value hasura", () => {
        const locationsHasura = getMockLocationsHasura(5);

        const { container } = renderComponent(locationsHasura);

        const input = screen.getByTestId("AutocompleteBase__input");

        fireEvent.keyDown(input, { key: "ArrowDown" });

        expect(container).toMatchSnapshot("with default value hasura");
    });

    it("should render correctly with default value", () => {
        renderComponent(locations);

        const tagBoxes = screen.getAllByTestId("LocationSelectInputHF__tagBox");
        expect(tagBoxes).toHaveLength(locations.length);

        for (let index = 0; index < tagBoxes.length; index++) {
            const tagBox = tagBoxes[index];
            const expectLocationName = locations[index].name;
            const chip = within(tagBox).getByTestId("LocationSelectInputHF__ChipTag");
            expect(chip).toBeInTheDocument();
            expect(chip).toHaveTextContent(expectLocationName);
        }
    });

    it("should render correctly with limitTags props", () => {
        const locations = getMockLocations(10);

        const limitTags = 5;
        renderComponent(locations, { limitTags });

        const tagBoxes = screen.getAllByTestId("LocationSelectInputHF__tagBox");
        expect(tagBoxes).toHaveLength(limitTags);

        const chipLimitTags = screen.getByTestId("LocationSelectInputHF__ChipLimitTags");

        expect(chipLimitTags).toBeInTheDocument();
        expect(chipLimitTags).toHaveTextContent(`+ ${locations.length - limitTags}`);
    });

    it("should display DialogTreeLocations", () => {
        renderComponent();

        const input = screen.getByTestId("AutocompleteBase__input");
        fireEvent.keyDown(input, { key: "ArrowDown" });

        const treeLocationDialog = screen.getByTestId("DialogTreeLocations");
        expect(treeLocationDialog).toBeInTheDocument();
        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
        expect(treeLocationDialog).not.toBeInTheDocument();
    });

    it("should render correctly when click X button", () => {
        renderComponent(locations);

        const container = screen.getByTestId("LocationSelectInputHF");
        const clearButton = within(container).getByLabelText("Clear");

        userEvent.click(clearButton);

        expect(screen.queryByTestId("LocationSelectInputHF__tagBox")).not.toBeInTheDocument();
    });
    it("should add more a tag location when adding on popup", () => {
        renderComponent(locations);

        const input = screen.getByTestId("AutocompleteBase__input");

        fireEvent.keyDown(input, { key: "ArrowDown" });

        const treeLocationDialog = screen.getByTestId("DialogTreeLocations");

        expect(treeLocationDialog).toBeInTheDocument();

        userEvent.click(within(treeLocationDialog).getByText("Location 12"));

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        const locationSelectInput = screen.getByTestId("LocationSelectInputHF");

        expect(within(locationSelectInput).getByText("Location 12")).toBeInTheDocument();
    });

    it("should remove a tag location on edited mode", () => {
        const locations = getMockLocations(4, 9);

        renderComponent(locations);

        expect(screen.getAllByTestId("LocationSelectInputHF__tagBox")).toHaveLength(
            locations.length
        );

        const input = screen.getByTestId("AutocompleteBase__input");

        fireEvent.keyDown(input, { key: "ArrowDown" });

        const treeLocationDialog = screen.getByTestId("DialogTreeLocations");

        expect(treeLocationDialog).toBeInTheDocument();

        userEvent.click(within(treeLocationDialog).getByText("Location 12"));

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        expect(screen.getAllByTestId("LocationSelectInputHF__tagBox")).toHaveLength(
            locations.length - 1
        );
    });

    it("should update dialog when remove tag locations", () => {
        const locations = getMockLocations(1, 11);

        renderComponent(locations);
        //Clear
        const container = screen.getByTestId("LocationSelectInputHF");

        const clearButton = within(container).getByLabelText("Clear");

        userEvent.click(clearButton);

        expect(screen.queryByTestId("LocationSelectInputHF__tagBox")).not.toBeInTheDocument();

        const input = screen.getByTestId("AutocompleteBase__input");

        // Check on dialog
        fireEvent.keyDown(input, { key: "ArrowDown" });

        const treeLocationDialog = screen.getByTestId("DialogTreeLocations");

        expect(treeLocationDialog).toBeInTheDocument();

        const wrapperLocation12 = within(treeLocationDialog)
            .getByText("Location 12")
            .closest("div");

        const checkBox = wrapperLocation12?.querySelector("input");

        expect(checkBox).not.toBeChecked();
    });

    it("should not update input when selecting and cancel selected", async () => {
        renderComponent();

        const input = screen.getByTestId("AutocompleteBase__input");

        fireEvent.keyDown(input, { key: "ArrowDown" });

        const treeLocationDialog = screen.getByTestId("DialogTreeLocations");

        expect(treeLocationDialog).toBeInTheDocument();

        userEvent.click(within(treeLocationDialog).getByText("Location 12"));

        userEvent.click(within(treeLocationDialog).getByTestId("FooterDialogConfirm__buttonClose"));

        expect(screen.queryByTestId("LocationSelectInputHF__tagBox")).not.toBeInTheDocument();
    });
});
