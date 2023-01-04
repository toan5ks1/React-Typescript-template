import ProductListItemAccordion from "src/squads/payment/components/Sections/ProductListSection/ProductListItem/ProductListItemAccordion";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const onChange = jest.fn();

describe("<ProductListAccordion />", () => {
    beforeEach(() => {
        render(
            <ProductListItemAccordion
                base={<span>Base component</span>}
                onChange={onChange}
                size="large"
            >
                <span>Child component</span>
            </ProductListItemAccordion>
        );
    });

    it("should render base and child component", () => {
        expect(screen.getByText("Base component")).toBeInTheDocument();
        expect(screen.getByText("Child component")).toBeInTheDocument();
    });

    it("should call onChange accordion when clicking on accordion summary", () => {
        userEvent.click(screen.getByText("Base component"));

        expect(onChange).toBeCalled();
    });
});
