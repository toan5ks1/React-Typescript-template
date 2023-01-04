import AutocompleteLowestLevelLocationsHF from "src/squads/lesson/components/Autocompletes/AutocompleteLowestLevelLocationsHF";

import { render, RenderResult, waitFor } from "@testing-library/react";
import { withReactHookForm } from "src/squads/lesson/test-utils/HOCs";

jest.mock("src/squads/lesson/hooks/useAutocompleteReference");

describe("<AutocompleteLowestLevelLocationsHF />", () => {
    const AutocompleteLowestLevelLocations = withReactHookForm(
        AutocompleteLowestLevelLocationsHF,
        {
            name: "locations",
            disableClearable: false,
            disableCloseOnSelect: true,
            firstOptions: [
                { location_id: undefined, value: "All Locations", name: "All Locations" },
            ],
        },
        {
            defaultValues: {
                locations: [
                    { location_id: undefined, value: "All Locations", name: "All Locations" },
                ],
            },
        }
    );

    it("should render correct UI", async () => {
        const wrapper: RenderResult = render(<AutocompleteLowestLevelLocations />);
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(
            wrapper.getByTestId("AutocompleteLowestLevelLocationsHF__autocomplete")
        ).toBeInTheDocument();
        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
        expect(wrapper.getByLabelText("Clear")).toBeInTheDocument();
    });
});

describe("<AutocompleteLowestLevelLocationsHF /> render with defaultValue", () => {
    // TODO: Mock data query to test list option will be show
    const AutocompleteLowestLevelLocations = withReactHookForm(
        AutocompleteLowestLevelLocationsHF,
        {
            name: "locations",
            limitChipText: "Ellipsis",
            firstOptions: [
                { location_id: undefined, value: "All Locations", name: "All Locations" },
            ],
        },
        {
            defaultValues: {
                locations: [
                    { location_id: undefined, value: "All Locations", name: "All Locations" },
                ],
            },
        }
    );
    it("should render correct defaultValue", async () => {
        const wrapper: RenderResult = render(<AutocompleteLowestLevelLocations />);
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );
        expect(wrapper.getByTestId("ChipAutocomplete").textContent).toEqual("All Locations");
    });
});
