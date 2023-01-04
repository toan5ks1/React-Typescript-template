import { fireEvent, getByRole, RenderResult, within } from "@testing-library/react";

export const changeSelectValue = (wrapper: RenderResult, testId: string, selectionText: string) => {
    const selectElement = wrapper.getByTestId(testId);
    expect(selectElement).toBeInTheDocument();
    fireEvent.mouseDown(getByRole(selectElement, "button"));
    const listbox = wrapper.queryByRole("listbox");
    expect(listbox).not.toBeNull();
    if (listbox) {
        const option = within(listbox).getByText(selectionText);
        fireEvent.click(option);
    }
};

export const sleep = (time: number = 5000) => new Promise((resolve) => setTimeout(resolve, time));
