import { mockTimesheetData } from "src/squads/timesheet/test-utils/mocks/timesheet";
import { TestCommonAppProvider, TestingRouter } from "src/squads/timesheet/test-utils/providers";

import LessonHoursSection, {
    LessonHoursSectionProps,
} from "src/squads/timesheet/modules/timesheet-detail/components/DetailSections/LessonHoursSection/LessonHoursSection";

import { render, screen } from "@testing-library/react";

const renderComponent = (props: LessonHoursSectionProps) => {
    return render(
        <TestCommonAppProvider>
            <TestingRouter>
                <LessonHoursSection {...props} />
            </TestingRouter>
        </TestCommonAppProvider>
    );
};

describe("<LessonHoursSection />", () => {
    const props: LessonHoursSectionProps = {
        timesheet: mockTimesheetData,
        loading: false,
    };
    it("should render match snapshot", () => {
        const wrapper = renderComponent(props);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        renderComponent(props);

        expect(screen.getByTestId("LessonHoursSection__root")).toBeInTheDocument();
        expect(screen.getByTestId("LessonHoursSection__title")).toHaveTextContent("Lesson Hours");
        expect(screen.getByTestId("LessonHoursSection__lessonHours")).toBeInTheDocument();

        expect(screen.getByTestId("LessonHoursTable__table")).toBeInTheDocument();
    });
});
