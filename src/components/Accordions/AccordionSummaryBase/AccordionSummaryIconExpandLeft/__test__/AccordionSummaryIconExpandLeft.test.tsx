import { defaultAccordionSummaryIconExpandProps } from "src/test-utils/accordion";

import AccordionSummaryIconExpandLeft from "../AccordionSummaryIconExpandLeft";

import { render, screen } from "@testing-library/react";

describe(AccordionSummaryIconExpandLeft.name, () => {
    it("should match snapshot when iconExpandPosition = left", () => {
        const wrapper = render(
            <AccordionSummaryIconExpandLeft {...defaultAccordionSummaryIconExpandProps} />
        );
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct data summaryContent", () => {
        render(<AccordionSummaryIconExpandLeft {...defaultAccordionSummaryIconExpandProps} />);
        expect(screen.getByTestId("summaryContent")).toHaveTextContent(
            "Summary content icon expand"
        );
    });

    it("should render icon ExpandLess when active = true", () => {
        render(<AccordionSummaryIconExpandLeft {...defaultAccordionSummaryIconExpandProps} />);
        expect(screen.getByTestId("AccordionSummaryIconExpand__expandLess")).toBeInTheDocument();
        expect(
            screen.queryByTestId("AccordionSummaryIconExpand__expandMore")
        ).not.toBeInTheDocument();
    });

    it("should render icon ExpandMore when active = false", () => {
        render(
            <AccordionSummaryIconExpandLeft
                {...defaultAccordionSummaryIconExpandProps}
                active={false}
            />
        );
        expect(screen.getByTestId("AccordionSummaryIconExpand__expandMore")).toBeInTheDocument();
        expect(
            screen.queryByTestId("AccordionSummaryIconExpand__expandLess")
        ).not.toBeInTheDocument();
    });
});
