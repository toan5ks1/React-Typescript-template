import TopicAccordion, { TopicAccordionProps } from "../TopicAccordion";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

describe(TopicAccordion.name, () => {
    const props: TopicAccordionProps = {
        name: "Topic_name",
        endNode: "Topic_actions",
        children: "To pass ts-error",
        expanded: true,
    };

    beforeEach(() => {
        render(
            <TopicAccordion {...props}>
                <span data-testid="Topic__children"></span>,
            </TopicAccordion>,
            { wrapper: TestApp }
        );
    });

    it("should render name, actions, children", () => {
        expect(screen.getByText(/Topic_name/)).toBeInTheDocument();

        expect(screen.getByText(/Topic_actions/)).toBeInTheDocument();

        expect(screen.getByTestId("Topic__children")).toBeInTheDocument();
    });
});
