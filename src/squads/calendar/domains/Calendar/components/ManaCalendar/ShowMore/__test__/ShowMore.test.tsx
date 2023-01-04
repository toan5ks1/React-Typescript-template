import ShowMore from "../ShowMore";

import { render } from "@testing-library/react";
import { CalendarShowMoreProps } from "src/squads/calendar/domains/Calendar/types";

//TODO: will improve test case later in this ticket: https://manabie.atlassian.net/browse/LT-19569

const props: CalendarShowMoreProps = {
    total: 1,
};

describe("<ShowMore />", () => {
    it("should match snapshot", () => {
        const { container } = render(<ShowMore {...props} />);

        expect(container).toMatchSnapshot();
    });
});
