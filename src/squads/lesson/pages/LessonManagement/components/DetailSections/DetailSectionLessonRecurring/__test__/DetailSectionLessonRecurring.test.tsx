import {
    mockOneTimeScheduler,
    mockWeeklyRecurringScheduler,
} from "src/squads/lesson/test-utils/lesson-management";

import DetailSectionLessonRecurring, {
    DetailSectionLessonRecurringProps,
} from "src/squads/lesson/pages/LessonManagement/components/DetailSections/DetailSectionLessonRecurring";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";

const renderDetailSectionLessonRecurring = (props: DetailSectionLessonRecurringProps) => {
    return render(
        <TranslationProvider>
            <DetailSectionLessonRecurring {...props} />
        </TranslationProvider>
    );
};

describe("<DetailSectionLessonRecurring />", () => {
    it("should render Recurring Settings with end date field when lesson is weekly recurring", () => {
        const props: DetailSectionLessonRecurringProps = {
            scheduler: mockWeeklyRecurringScheduler,
            isLoadingScheduler: false,
        };
        renderDetailSectionLessonRecurring(props);

        expect(screen.getByTestId("DetailSectionLessonRecurring__root")).toBeInTheDocument();
        expect(screen.getByText("Saving Option")).toBeInTheDocument();
        expect(screen.getByText("Weekly Recurring")).toBeInTheDocument();
        expect(screen.getByText("Repeat Duration")).toBeInTheDocument();
        expect(screen.getByText("Weekly on Sunday, until 2022/11/30")).toBeInTheDocument();
    });

    it("should render Recurring Settings without end date field when lesson is one time", () => {
        const props: DetailSectionLessonRecurringProps = {
            scheduler: mockOneTimeScheduler,
            isLoadingScheduler: false,
        };
        renderDetailSectionLessonRecurring(props);

        expect(screen.getByText("One Time")).toBeInTheDocument();

        expect(
            screen.queryByTestId("DetailSectionLessonRecurring__repeatDuration")
        ).not.toBeInTheDocument();
    });

    it("should render Loading when loading Scheduler", () => {
        const props: DetailSectionLessonRecurringProps = {
            scheduler: undefined,
            isLoadingScheduler: true,
        };
        renderDetailSectionLessonRecurring(props);

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });
});
