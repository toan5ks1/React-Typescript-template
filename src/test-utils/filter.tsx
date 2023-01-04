import { screen, findByText, fireEvent, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

export const showPopover = (wrapper: RenderResult) => {
    const button = wrapper.getByTestId("ButtonDropdownWithPopover__button");
    fireEvent.click(button as HTMLButtonElement);

    const popover = wrapper.getByTestId("ButtonDropdownWithPopover__popover");
    expect(popover).toBeInTheDocument();
};

export const showPopoverAndSelectDate = async (wrapper: RenderResult, dataTestId: string) => {
    showPopover(wrapper);

    const datePicker = wrapper.getByTestId(dataTestId);
    expect(datePicker).toBeInTheDocument();

    const buttonDatePicker = datePicker.querySelector("button");
    fireEvent.click(buttonDatePicker as HTMLButtonElement); //open calendar popup
    const dialogDatePicker = document.body.querySelector("div[role=dialog]");
    expect(dialogDatePicker).toBeInTheDocument();

    const selectDate = await findByText(dialogDatePicker as HTMLElement, "15");
    fireEvent.click(selectDate as HTMLButtonElement);

    const buttonOKStartDate = await findByText(dialogDatePicker as HTMLElement, "OK");
    fireEvent.click(buttonOKStartDate as HTMLButtonElement);

    const inputDatePicker = datePicker.querySelector("input");
    expect(inputDatePicker?.value).toContain("15");
};

export const clickResetFormFilter = (wrapper: RenderResult) => {
    const buttonReset = wrapper.getByTestId("ButtonDropdownWithPopover__buttonReset");
    expect(buttonReset).toBeInTheDocument();

    fireEvent.click(buttonReset as HTMLButtonElement);
};

export const submitFormFilter = () => {
    const applyButton = screen.getByTestId("ButtonDropdownWithPopover__buttonApply");
    userEvent.click(applyButton);
};
