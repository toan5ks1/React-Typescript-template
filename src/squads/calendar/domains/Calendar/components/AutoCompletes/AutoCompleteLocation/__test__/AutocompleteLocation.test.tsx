import { mockLocations } from "src/squads/calendar/test-utils/locations";

import AutocompleteLocation from "src/squads/calendar/domains/Calendar/components/Autocompletes/AutocompleteLocation";
import TranslationProvider from "src/squads/calendar/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/calendar/domains/Calendar/hooks/useLocationsListByLocationTypes", () => {
    return {
        __esModule: true,
        default: () => ({
            data: mockLocations,
            isLoading: false,
        }),
    };
});

describe("<AutocompleteLocation />", () => {
    it("should match value when select option", () => {
        render(
            <TranslationProvider>
                <AutocompleteLocation locationTypeId={"location_type_id_1"} />
            </TranslationProvider>
        );
        const autocompleteLocationInput = screen.getByRole("combobox");
        userEvent.click(autocompleteLocationInput);

        const firstListBoxChild = document.querySelector(
            "[role='listbox'] li:nth-child(1)"
        ) as Element;
        expect(firstListBoxChild).toBeInTheDocument();
        userEvent.click(firstListBoxChild);

        expect(autocompleteLocationInput).toHaveValue("Demo");
    });
});
