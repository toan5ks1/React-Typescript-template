import { TestThemeProvider } from "src/squads/calendar/test-utils";
import { eventsTempData } from "src/squads/calendar/test-utils/schedule";

import CalendarEventWrapper, { CalendarEventWrapperProps } from "../CalendarEventWrapper";

import { screen, render } from "@testing-library/react";

//TODO: will improve test case later in this ticket: https://manabie.atlassian.net/browse/LT-19569

const TestApp = (isDraft = true) => {
    const event = isDraft ? eventsTempData[0] : eventsTempData[1];
    const title = event.title;
    const props: CalendarEventWrapperProps = {
        event: event,
        children: (
            <div tabIndex={0} className="rbc-event rbc-event-allday rbc-event-continues-after">
                <div className="rbc-event-content" title={title}>
                    {title}
                </div>
            </div>
        ),
    };

    return (
        <TestThemeProvider>
            <CalendarEventWrapper {...props} />
        </TestThemeProvider>
    );
};
describe("<CalendarEventWrapper />", () => {
    it("should match snapshot", () => {
        const { container } = render(TestApp());
        expect(container).toMatchSnapshot();
    });

    it("should match style when event isDraft = true", () => {
        render(TestApp());
        const wrapperElement = screen.getByTestId("CalendarEventWrapper__wrapper");
        const style = getComputedStyle(wrapperElement.children[0] as HTMLDivElement);

        expect(style.backgroundColor).toEqual("rgb(255, 255, 255)");
        expect(style.color).toEqual("rgb(123, 198, 126)");
        expect(style.border).toEqual("1px solid #7bc67e");
    });

    it("should match style when event isDraft = false", () => {
        render(TestApp(false));
        const wrapperElement = screen.getByTestId("CalendarEventWrapper__wrapper");
        const style = getComputedStyle(wrapperElement.children[0] as HTMLDivElement);

        expect(style.backgroundColor).toEqual("rgb(123, 198, 126)");
        expect(style.color).toEqual("rgb(255, 255, 255)");
        expect(style.border).toEqual("1px solid #7bc67e");
    });
});
