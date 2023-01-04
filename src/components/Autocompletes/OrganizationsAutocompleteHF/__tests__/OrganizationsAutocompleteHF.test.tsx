import MuiPickersUtilsProvider from "src/providers/MuiPickersUtilsProvider";

import OrganizationsAutocompleteHF from "../OrganizationsAutocompleteHF";

import { render, RenderResult, waitFor } from "@testing-library/react";
import { withReactHookForm } from "src/test-utils/HOCs";

jest.mock("src/hooks/useAutocompleteReference");

describe("<OrganizationsAutocompleteHF />", () => {
    let wrapper: RenderResult;
    const OrganizationsAutocomplete = withReactHookForm(
        OrganizationsAutocompleteHF,
        {
            name: "organizations",
            limitChipText: "Ellipsis",
        },
        {
            defaultValues: {
                organizations: [],
            },
        }
    );

    beforeEach(() => {
        wrapper = render(
            <MuiPickersUtilsProvider>
                <OrganizationsAutocomplete />
            </MuiPickersUtilsProvider>
        );
    });

    it("should render correct UI", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(
            wrapper.getByTestId("OrganizationsAutocompleteHF__autocomplete")
        ).toBeInTheDocument();
        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
    });
});

describe("<OrganizationsAutocompleteHF /> render with defaultValue", () => {
    let wrapper: RenderResult;

    const OrganizationsAutocomplete = withReactHookForm(
        OrganizationsAutocompleteHF,
        {
            name: "organizations",
            limitChipText: "Ellipsis",
            firstOptions: [
                { domain_name: "Manabie School", tenant_id: "123", value: "Manabie School" },
            ],
        },
        {
            defaultValues: {
                organizations: [
                    { domain_name: "Manabie School", tenant_id: "123", value: "Manabie School" },
                ],
            },
        }
    );

    beforeEach(() => {
        wrapper = render(
            <MuiPickersUtilsProvider>
                <OrganizationsAutocomplete />
            </MuiPickersUtilsProvider>
        );
    });

    it("should render correct defaultValue", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );
        expect(wrapper.getByTestId("ChipAutocomplete").textContent).toEqual("Manabie School");
    });
});
