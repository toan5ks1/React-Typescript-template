import { TestCommonAppProvider } from "src/squads/timesheet/test-utils/providers";

import ChipLessonStatus from "src/squads/timesheet/modules/timesheet-detail/components/DetailSections/LessonHoursSection/ChipLessonStatus/ChipLessonStatus";
import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";

const renderComponent = (status: string) => {
    return render(
        <TestCommonAppProvider>
            <TranslationProvider>
                <ChipLessonStatus data-testid="ChipLessonStatus" status={status} />
            </TranslationProvider>
        </TestCommonAppProvider>
    );
};

describe("<ChipLessonStatus />", () => {
    it("should be match snapshot LESSON_SCHEDULING_STATUS_PUBLISHED", () => {
        const wrapper = renderComponent("LESSON_SCHEDULING_STATUS_PUBLISHED");
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should be match snapshot LESSON_SCHEDULING_STATUS_COMPLETED", () => {
        const wrapper = renderComponent("LESSON_SCHEDULING_STATUS_COMPLETED");
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should be match snapshot LESSON_SCHEDULING_STATUS_CANCELED", () => {
        const wrapper = renderComponent("LESSON_SCHEDULING_STATUS_CANCELED");
        expect(wrapper.container).toMatchSnapshot();
    });

    it(`should render correct label with status Published`, () => {
        renderComponent("LESSON_SCHEDULING_STATUS_PUBLISHED");

        expect(screen.getByText(`Published`)).toBeInTheDocument();
    });

    it(`should render correct label with status Completed`, () => {
        renderComponent("LESSON_SCHEDULING_STATUS_COMPLETED");

        expect(screen.getByText(`Completed`)).toBeInTheDocument();
    });

    it(`should render correct label with status Canceled`, () => {
        renderComponent("LESSON_SCHEDULING_STATUS_CANCELED");

        expect(screen.getByText(`Canceled`)).toBeInTheDocument();
    });
});
