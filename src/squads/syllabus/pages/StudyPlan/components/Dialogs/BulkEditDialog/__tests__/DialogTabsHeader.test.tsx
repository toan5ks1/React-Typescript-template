import DialogTabsHeader from "../DialogTabsHeader";

import { render, screen } from "@testing-library/react";
import TestTranslationProvider from "src/squads/syllabus/test-utils/translate/TestTranslationProvider";

describe(DialogTabsHeader.name, () => {
    it("should render correctly", () => {
        render(
            <TestTranslationProvider>
                <DialogTabsHeader
                    title="Test dialog header"
                    tabValue={0}
                    onChangeTab={jest.fn}
                    onClose={jest.fn}
                />
            </TestTranslationProvider>
        );
        expect(screen.getByRole(/tablist/)).toBeInTheDocument();
        expect(screen.getByText(/test dialog header/i)).toBeInTheDocument();
        expect(screen.getByText(/specific date/i)).toBeInTheDocument();
        expect(screen.getByText(/postpone/i)).toBeInTheDocument();
        expect(screen.getByText(/advance/i)).toBeInTheDocument();
    });
});
