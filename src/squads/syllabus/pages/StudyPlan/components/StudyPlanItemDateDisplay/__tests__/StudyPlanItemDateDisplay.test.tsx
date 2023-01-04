import { formatDate } from "src/common/utils/time";

import StudyPlanItemDateDisplay from "..";

import { render } from "@testing-library/react";

describe(StudyPlanItemDateDisplay.name, () => {
    it("should render empty character when there is no date", () => {
        const { getByTestId } = render(<StudyPlanItemDateDisplay value="" />);

        expect(getByTestId("StudyPlanItem__dateDisplay")).toHaveTextContent("--");
    });

    it("should render correctly with a valid date string", () => {
        const date = new Date();
        const { getByTestId } = render(<StudyPlanItemDateDisplay value={date.toISOString()} />);

        expect(getByTestId("StudyPlanItem__dateDisplay")).toHaveTextContent(
            formatDate(date, "LL/dd, HH:mm")
        );
    });

    it("should render date without year if the year is current", () => {
        const date = new Date();
        const { getByTestId } = render(<StudyPlanItemDateDisplay value={date.toISOString()} />);

        expect(getByTestId("StudyPlanItem__dateDisplay")).toHaveTextContent(
            formatDate(date, "LL/dd, HH:mm")
        );
    });

    it("should render date with year if the year is different", () => {
        const date = new Date();

        date.setFullYear(date.getFullYear() + 1);

        const { getByTestId } = render(<StudyPlanItemDateDisplay value={date.toISOString()} />);

        expect(getByTestId("StudyPlanItem__dateDisplay")).toHaveTextContent(
            formatDate(date, "yyyy/LL/dd, HH:mm")
        );
    });
});
