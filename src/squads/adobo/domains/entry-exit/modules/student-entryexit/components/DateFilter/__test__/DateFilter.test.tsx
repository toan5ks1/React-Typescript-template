import { TestCommonAppProvider } from "src/squads/adobo/domains/entry-exit/test-utils/providers";

import DateFilter from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/components/DateFilter";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockSetDateFilterRange = jest.fn();

const renderComponent = () => {
    return render(
        <TestCommonAppProvider>
            <DateFilter setDateFilterRange={mockSetDateFilterRange} />
        </TestCommonAppProvider>
    );
};

describe("<DateFilter />", () => {
    it("should display 'all' as the default option", () => {
        renderComponent();
        expect(screen.getByText("All")).toBeInTheDocument();
    });

    it("should display all options when clicked", () => {
        const wrapper = renderComponent();
        const selectInput = wrapper.getByRole("button", { name: "Date filter" });
        userEvent.click(selectInput);
        const optionsWrapper = screen.getByRole("listbox");
        expect(within(optionsWrapper).getByRole("option", { name: "All" })).toBeInTheDocument();
        expect(
            within(optionsWrapper).getByRole("option", { name: "This month" })
        ).toBeInTheDocument();
        expect(
            within(optionsWrapper).getByRole("option", { name: "Last month" })
        ).toBeInTheDocument();
        expect(
            within(optionsWrapper).getByRole("option", { name: "This year" })
        ).toBeInTheDocument();
    });

    it("should change the selected option", () => {
        const wrapper = renderComponent();
        const selectInput = wrapper.getByRole("button", { name: "Date filter" });
        userEvent.click(selectInput);
        const optionsWrapper = screen.getByRole("listbox");
        userEvent.click(within(optionsWrapper).getByRole("option", { name: "This month" }));
        expect(
            screen.getByTestId("StudentEntryExitRecords__dateFilter").firstChild
        ).toHaveTextContent("This month");
    });
});
