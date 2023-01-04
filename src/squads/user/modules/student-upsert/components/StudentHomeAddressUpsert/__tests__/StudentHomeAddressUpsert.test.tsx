import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import StudentHomeAddressUpsert from "../StudentHomeAddressUpsert";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { withReactHookForm } from "src/squads/user/test-utils/HOCs";

describe("<StudentHomeAddressUpsert/>", () => {
    const renderComponent = () => {
        const StudentHomeAddressUpsertHF = withReactHookForm(StudentHomeAddressUpsert);
        return render(
            <TestCommonAppProvider>
                <StudentHomeAddressUpsertHF />
            </TestCommonAppProvider>
        );
    };
    it("should match snapshot", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render UI correctly", () => {
        renderComponent();
        expect(screen.getByTestId("StudentHomeAddressUpsert__inputPostalCode")).toBeInTheDocument();
        expect(
            screen.getByTestId("StudentHomeAddressUpsert__autoCompletePrefecture")
        ).toBeInTheDocument();
        expect(screen.getByTestId("StudentHomeAddressUpsert__inputCity")).toBeInTheDocument();
        expect(
            screen.getByTestId("StudentHomeAddressUpsert__inputFirstStreet")
        ).toBeInTheDocument();
        expect(
            screen.getByTestId("StudentHomeAddressUpsert__inputSecondStreet")
        ).toBeInTheDocument();
    });
    it("should limit 10 digits on postal code field", () => {
        renderComponent();
        const postalCodeField = screen.getByTestId("StudentHomeAddressUpsert__inputPostalCode");
        userEvent.type(postalCodeField, "0123456789-123");
        expect(postalCodeField).toHaveValue("0123456789");
    });
});
