import ButtonPreviousReportGroup from "src/squads/lesson/components/Buttons/ButtonPreviousReportGroup";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";

describe("<ButtonPreviousReportGroup /> component", () => {
    it("should render button name and icon correctly", () => {
        render(
            <TranslationProvider>
                <ButtonPreviousReportGroup />
            </TranslationProvider>
        );
        expect(screen.getByTestId("ButtonPreviousReportGroup__button")).toBeInTheDocument();
        expect(screen.getByText("Previous Report")).toBeInTheDocument();
        expect(screen.getByTestId("HistoryOutlinedIcon")).toBeInTheDocument();
    });
});
