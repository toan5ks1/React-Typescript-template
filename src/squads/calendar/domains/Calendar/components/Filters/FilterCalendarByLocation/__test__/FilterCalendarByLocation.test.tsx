import { mockLocationTypes } from "src/squads/calendar/test-utils/location-types";
import { mockLocationsV2 } from "src/squads/calendar/test-utils/locations";

import FilterCalendarByLocation from "src/squads/calendar/domains/Calendar/components/Filters/FilterCalendarByLocation";

import { fireEvent, getByRole, render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/calendar/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

jest.mock("src/squads/calendar/domains/Calendar/hooks/useLocationsListByLocationTypes", () => {
    return {
        __esModule: true,
        default: () => ({
            data: mockLocationsV2,
            isLoading: false,
        }),
    };
});

jest.mock("src/squads/calendar/domains/Calendar/hooks/useLocationTypesList", () => {
    return {
        __esModule: true,
        default: () => ({
            data: mockLocationTypes,
            isLoading: false,
        }),
    };
});

const props = { onChange: jest.fn() };

const renderFilterCalendarByLocation = (): RenderResult => {
    return render(<FilterCalendarByLocation {...props} />);
};

describe("<FilterCalendarByLocation />", () => {
    it("should render <FilterCalendarByLocation /> correctly", () => {
        renderFilterCalendarByLocation();
        expect(screen.getByTestId("SelectLocationType__select")).toBeInTheDocument();
        expect(screen.getByTestId("AutocompleteLocation__wrap")).toBeInTheDocument();
    });

    it("should open list box when click SelectLocationType", () => {
        renderFilterCalendarByLocation();
        const selectLocationType = screen.getByTestId("SelectLocationType__select");
        fireEvent.mouseDown(getByRole(selectLocationType, "button"));

        const listbox = screen.getByRole("listbox");
        expect(listbox).toBeInTheDocument();
        expect(listbox).not.toBeNull();
    });

    it("should call onChange when change option from AutocompleteLocation", () => {
        renderFilterCalendarByLocation();

        const autocompleteLocationInput = screen.getByTestId("AutocompleteBase__input");
        expect(autocompleteLocationInput).toBeInTheDocument();

        userEvent.type(autocompleteLocationInput as HTMLInputElement, mockLocationsV2[0].name);
        userEvent.keyboard("{ArrowDown}");
        userEvent.keyboard("{Enter}");

        expect(autocompleteLocationInput).toHaveValue(mockLocationsV2[0].name);
        expect(props.onChange).toBeCalled();
        expect(props.onChange).toBeCalledWith(mockLocationsV2[0].location_id);
    });
});
