import AutocompleteDayOfWeekHF from "src/squads/lesson/components/Autocompletes/AutocompleteDayOfWeekHF";

import { render, RenderResult, waitFor } from "@testing-library/react";
import { withReactHookForm } from "src/squads/lesson/test-utils/HOCs";

const mockDayOption = {
    id: "day_id",
    name: "day_name",
};

jest.mock("src/squads/lesson/hooks/useDayOfWeek", () => {
    return () => ({
        choiceDayOfWeek: [mockDayOption],
    });
});

describe("<AutocompleteDayOfWeekHF />", () => {
    it("should render correct UI", async () => {
        const DayOfWeekAutocomplete = withReactHookForm(
            AutocompleteDayOfWeekHF,
            {
                name: "dayOfWeek",
                disableClearable: false,
                disableCloseOnSelect: true,
            },
            {
                defaultValues: {
                    dayOfWeek: undefined,
                },
            }
        );
        const wrapper: RenderResult = render(<DayOfWeekAutocomplete />);
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(wrapper.getByTestId("AutocompleteDayOfWeekHF__autocomplete")).toBeInTheDocument();
        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
    });
});

describe("<AutocompleteDayOfWeekHF /> render with firstOptions", () => {
    it("should render correct option listing", async () => {
        const AutocompleteDayOfWeek = withReactHookForm(
            AutocompleteDayOfWeekHF,
            {
                name: "dayOfWeek",
                disableClearable: false,
                disableCloseOnSelect: true,
                open: true,
                multiple: true,
                options: [mockDayOption],
            },
            {
                defaultValues: {
                    dayOfWeek: [],
                },
            }
        );
        const wrapper: RenderResult = render(<AutocompleteDayOfWeek />);

        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );
        expect(wrapper.getByTestId("AutocompleteBase__listBox")).toBeInTheDocument();
        expect(wrapper.getAllByTestId("AutocompleteBase__option")[0]).toHaveTextContent(
            mockDayOption.name
        );
    });

    it("should render correct defaultValue", async () => {
        const DayOfWeekAutocomplete = withReactHookForm(
            AutocompleteDayOfWeekHF,
            {
                name: "dayOfWeek",
                limitChipText: "Ellipsis",
                multiple: true,
            },
            {
                defaultValues: {
                    dayOfWeek: [mockDayOption],
                },
            }
        );
        const wrapper: RenderResult = render(<DayOfWeekAutocomplete />);

        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );
        expect(wrapper.getByTestId("ChipAutocomplete")).toHaveTextContent(mockDayOption.name);
    });
});
