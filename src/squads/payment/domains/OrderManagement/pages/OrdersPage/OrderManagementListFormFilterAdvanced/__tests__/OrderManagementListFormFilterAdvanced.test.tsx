import { createMockProductsManyChoices } from "src/squads/payment/test-utils/mocks/products";

import TranslationProvider from "src/providers/TranslationProvider";

import OrderManagementListFormFilterAdvanced, {
    OrderManagementListFormFilterAdvancedProps,
} from "../OrderManagementListFormFilterAdvanced";

import { getByText, render, RenderResult, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockProductsManyChoices = createMockProductsManyChoices();
jest.mock(
    "src/squads/payment/components/Autocompletes/ProductAutocompleteHF/useProductAutocomplete",
    () => {
        return {
            __esModule: true,
            default: () => ({
                data: mockProductsManyChoices,
                isFetching: false,
            }),
        };
    }
);

const currentDay = 17;
const previousDay = 16;
const disableValueAtrr = -1;

const defaultOrderManagementListFormFilterAdvancedProps: OrderManagementListFormFilterAdvancedProps =
    {
        onEnterSearchBar: jest.fn(),
        onApplySubmit: jest.fn(),
    };

const clickToOpenAdvancedFilter = (wrapper: RenderResult) => {
    const filterButton = wrapper.getByTestId(
        "ButtonDropdownWithPopover__button"
    ) as HTMLButtonElement;

    userEvent.click(filterButton);

    const popoverContent = wrapper.getByTestId("ButtonDropdownWithPopover__popover");
    expect(popoverContent).toBeVisible();
};

const selectDateInDatePickerDialog = async (element: HTMLElement, dateSelected: number) => {
    expect(element).toBeInTheDocument();
    const datePickerButton = within(element).getByRole("button") as HTMLButtonElement;

    userEvent.click(datePickerButton);

    const dialogDatePicker = document.body.querySelector("div[role=dialog]");
    expect(dialogDatePicker).toBeInTheDocument();

    if (dialogDatePicker) {
        const selectDate = getByText(dialogDatePicker as HTMLElement, `${dateSelected}`);

        userEvent.click(selectDate as HTMLButtonElement);

        const okButtonElement = getByText(
            dialogDatePicker as HTMLElement,
            "OK"
        ) as HTMLButtonElement;
        userEvent.click(okButtonElement);
    }

    await waitFor(() => expect(dialogDatePicker).not.toBeInTheDocument());
};

const productAutocompleteSelected = (wrapper: RenderResult) => {
    const selectedTwoOptions = 2;

    const productsInputElement = screen.getByPlaceholderText("Product");
    userEvent.click(productsInputElement);
    Array(selectedTwoOptions)
        .fill("")
        .forEach(() => {
            userEvent.keyboard("{arrowdown}");
            userEvent.keyboard("{enter}");
        });

    const productsElement = wrapper.getByTestId("ProductAutocompleteHF_autocomplete");
    expect(within(productsElement).getAllByTestId("ChipAutocomplete")).toHaveLength(
        selectedTwoOptions
    );

    expect(mockProductsManyChoices.length).toBeGreaterThan(0);
    expect(within(productsElement).getAllByTestId("ChipAutocomplete__iconDelete")).toHaveLength(
        mockProductsManyChoices.length
    );
    mockProductsManyChoices.forEach((product) => {
        expect(within(productsElement).getByLabelText(product.name)).toBeInTheDocument();
    });
};

const renderComponent = (
    props: OrderManagementListFormFilterAdvancedProps = defaultOrderManagementListFormFilterAdvancedProps
) => {
    return render(
        <TestQueryWrapper>
            <TranslationProvider>
                <TestApp>
                    <TestThemeProvider>
                        <MuiPickersUtilsProvider>
                            <OrderManagementListFormFilterAdvanced {...props} />
                        </MuiPickersUtilsProvider>
                    </TestThemeProvider>
                </TestApp>
            </TranslationProvider>
        </TestQueryWrapper>
    );
};

describe("<OrderManagementListFormFilterAdvanced />", () => {
    it("should correctly render UI and all field of FormFilterAdvanced with defaultValues", () => {
        const wrapper: RenderResult = renderComponent();

        expect(wrapper.getByTestId("FormFilterAdvanced__textField")).toBeInTheDocument();

        expect(wrapper.getByTestId("ButtonDropdownWithPopover__button")).toBeInTheDocument();

        clickToOpenAdvancedFilter(wrapper);

        expect(
            wrapper.getByTestId("OrderManagementListFormFilterAdvanced__children")
        ).toBeInTheDocument();

        expect(wrapper.getByRole("heading", { name: /filters/i })).toBeInTheDocument();

        expect(
            wrapper.getByTestId("OrderManagementListFormFilterAdvanced__createdFrom")
        ).toBeInTheDocument();

        expect(
            wrapper.getByTestId("OrderManagementListFormFilterAdvanced__createdTo")
        ).toBeInTheDocument();

        expect(
            wrapper.getByTestId("OrderManagementListFormFilterAdvanced__orderType")
        ).toBeInTheDocument();

        expect(wrapper.getByTestId("ProductAutocompleteHF_autocomplete")).toBeInTheDocument();

        expect(wrapper.getByTestId("ButtonDropdownWithPopover__buttonReset")).toBeInTheDocument();

        expect(wrapper.getByTestId("ButtonDropdownWithPopover__buttonApply")).toBeInTheDocument();
    });
});

describe("<OrderManagementListFormFilterAdvanced /> handle search input", () => {
    it("should handle search correctly", () => {
        const wrapper: RenderResult = renderComponent();
        const searchText = "Search Test Case";

        const SearchElement = wrapper.getByTestId(
            "FormFilterAdvanced__textField"
        ) as HTMLInputElement;
        const inputSearchElement = within(SearchElement).getByRole("textbox");

        userEvent.type(inputSearchElement, searchText);
        expect(inputSearchElement).toHaveValue(searchText);

        userEvent.keyboard("{enter}");
        expect(defaultOrderManagementListFormFilterAdvancedProps.onEnterSearchBar).toBeCalledTimes(
            1
        );
        expect(defaultOrderManagementListFormFilterAdvancedProps.onEnterSearchBar).toBeCalledWith(
            searchText
        );
    });
});

describe("<OrderManagementListFormFilterAdvanced /> DatePickerHF validation", () => {
    it("should not be selected createdTo less than createdFrom date", async () => {
        const wrapper: RenderResult = renderComponent();
        clickToOpenAdvancedFilter(wrapper);

        const createdFromElement = wrapper.getByTestId(
            "OrderManagementListFormFilterAdvanced__createdFrom"
        );
        const createdFromInput = within(createdFromElement).getByRole(
            "textbox"
        ) as HTMLInputElement;
        await selectDateInDatePickerDialog(createdFromElement, currentDay);
        expect(createdFromInput.value).toContain(`${currentDay}`);

        const createdToElement = wrapper.getByTestId(
            "OrderManagementListFormFilterAdvanced__createdTo"
        );
        const datePickerButton = within(createdToElement).getByRole("button");
        userEvent.click(datePickerButton);
        const dialogDatePicker = document.body.querySelector("div[role=dialog]");
        expect(dialogDatePicker).toBeInTheDocument();

        if (dialogDatePicker) {
            const selectDate = within(dialogDatePicker as HTMLElement).getByText(previousDay);
            expect(selectDate).toHaveAttribute("tabindex", `${disableValueAtrr}`);
        }
    });

    it("should automatically update createdFrom equal to createdTo when createdFrom greater than createdTo", async () => {
        const createdFromDate = 20;
        const createdToDate = 17;

        const wrapper: RenderResult = renderComponent();
        clickToOpenAdvancedFilter(wrapper);

        const createdToElement = wrapper.getByTestId(
            "OrderManagementListFormFilterAdvanced__createdTo"
        );
        const createdToInput = within(createdToElement).getByRole("textbox") as HTMLInputElement;
        await selectDateInDatePickerDialog(createdToElement, createdToDate);
        expect(createdToInput.value).toContain(`${createdToDate}`);

        const createdFromElement = wrapper.getByTestId(
            "OrderManagementListFormFilterAdvanced__createdFrom"
        );
        const createdFromInput = within(createdFromElement).getByRole(
            "textbox"
        ) as HTMLInputElement;
        await selectDateInDatePickerDialog(createdFromElement, createdFromDate);
        expect(createdFromInput.value).toContain(`${createdFromDate}`);
        expect(createdToInput.value).toContain(`${createdFromDate}`);
    });
});

describe("<OrderManagementListFormFilterAdvanced /> handle reset button", () => {
    it("should disable reset button when the FormFilterAdvanced without values", () => {
        const wrapper: RenderResult = renderComponent();
        clickToOpenAdvancedFilter(wrapper);

        const resetButtonElement = wrapper.getByTestId("ButtonDropdownWithPopover__buttonReset");
        expect(resetButtonElement).toHaveAttribute("disabled");
    });

    it("should correctly reset FormFilterAdvanced which has value of one field", () => {
        const wrapper: RenderResult = renderComponent();
        clickToOpenAdvancedFilter(wrapper);

        productAutocompleteSelected(wrapper);
        const resetButtonElement = wrapper.getByTestId("ButtonDropdownWithPopover__buttonReset");
        userEvent.click(resetButtonElement);

        expect(wrapper.queryAllByTestId("ChipAutocomplete")).toHaveLength(0);
    });
});

describe("<OrderManagementListFormFilterAdvanced /> handle apply button", () => {
    it("should not call onApplySubmit when the FormFilterAdvanced without values", async () => {
        const wrapper: RenderResult = renderComponent();

        clickToOpenAdvancedFilter(wrapper);

        const applyButtonElement = wrapper.getByTestId("ButtonDropdownWithPopover__buttonApply");
        userEvent.click(applyButtonElement);
        await waitFor(() =>
            expect(
                defaultOrderManagementListFormFilterAdvancedProps.onApplySubmit
            ).not.toHaveBeenCalled()
        );
    });

    it("should call onApplySubmit when the FormFilterAdvanced with values", async () => {
        const wrapper: RenderResult = renderComponent();

        clickToOpenAdvancedFilter(wrapper);

        productAutocompleteSelected(wrapper);

        const applyButtonElement = wrapper.getByTestId("ButtonDropdownWithPopover__buttonApply");
        userEvent.click(applyButtonElement);
        await waitFor(() => {
            expect(
                defaultOrderManagementListFormFilterAdvancedProps.onApplySubmit
            ).toHaveBeenCalled();
        });
        await waitFor(() => {
            expect(defaultOrderManagementListFormFilterAdvancedProps.onApplySubmit).toBeCalledWith({
                createdFrom: null,
                createdTo: null,
                orderTypeList: [],
                productsList: mockProductsManyChoices,
            });
        });
    });

    it("should keep selected data when popover was closed", async () => {
        const wrapper: RenderResult = renderComponent();

        clickToOpenAdvancedFilter(wrapper);

        productAutocompleteSelected(wrapper);

        const applyButtonElement = wrapper.getByTestId("ButtonDropdownWithPopover__buttonApply");
        userEvent.click(applyButtonElement);

        const filterButton = wrapper.getByTestId(
            "ButtonDropdownWithPopover__button"
        ) as HTMLButtonElement;
        userEvent.click(filterButton);

        await waitFor(() => {
            expect(wrapper.getByText("You filter by :")).toBeInTheDocument();
        });

        const filterContainer = wrapper.getByTestId("FormFilterAdvanced__root");
        const chip = within(filterContainer).getByText("Product");
        expect(within(chip).getByText("Product")).toBeInTheDocument();

        await waitFor(() => {
            expect(
                wrapper.getByTestId("FormFilterAdvancedChipList__buttonClearAll")
            ).toBeInTheDocument();
        });

        clickToOpenAdvancedFilter(wrapper);

        const productsElement = wrapper.getByTestId("ProductAutocompleteHF_autocomplete");

        expect(
            within(productsElement).getByLabelText(mockProductsManyChoices[0].name)
        ).toBeInTheDocument();
    });
});
