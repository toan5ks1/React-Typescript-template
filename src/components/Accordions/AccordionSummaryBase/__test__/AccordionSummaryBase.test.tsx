import AccordionSummaryBase, { AccordionSummaryBaseProps } from "../AccordionSummaryBase";

import { render, screen } from "@testing-library/react";

const defaultAccordionSummaryBaseProps: AccordionSummaryBaseProps = {
    summaryContent: (
        <span data-testid="AccordionSummaryBase__summaryContent">Accordion Summary content</span>
    ),
    endIcon: <span data-testid="AccordionSummaryBase__endIcon">Accordion Summary end icon</span>,
};

describe(AccordionSummaryBase.name, () => {
    it("should render correct data Summary content and End icon", () => {
        render(<AccordionSummaryBase {...defaultAccordionSummaryBaseProps} />);

        expect(screen.getByTestId("AccordionSummaryBase__summaryContent")).toHaveTextContent(
            "Accordion Summary content"
        );
        expect(screen.getByTestId("AccordionSummaryBase__endIcon")).toHaveTextContent(
            "Accordion Summary end icon"
        );
    });
});
