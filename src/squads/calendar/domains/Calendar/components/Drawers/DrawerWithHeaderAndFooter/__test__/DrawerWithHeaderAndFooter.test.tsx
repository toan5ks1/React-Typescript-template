import { TestThemeProvider } from "src/squads/calendar/test-utils";

import DrawerWithHeaderAndFooter, {
    DrawerWithHeaderAndFooterProps,
} from "src/squads/calendar/domains/Calendar/components/Drawers/DrawerWithHeaderAndFooter/DrawerWithHeaderAndFooter";

import { render, screen } from "@testing-library/react";

describe("<DrawerWithHeaderAndFooter /> none header and footer", () => {
    const props: DrawerWithHeaderAndFooterProps = {
        onClose: jest.fn(),
        open: true,
        title: "None Action Header and Footer",
        children: <div>Test</div>,
    };

    beforeEach(() => {
        render(
            <TestThemeProvider>
                <DrawerWithHeaderAndFooter
                    data-testid="DrawerWithHeaderAndFooter__container"
                    {...props}
                />
            </TestThemeProvider>
        );
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });
});

describe("<DrawerWithHeaderAndFooter /> none header", () => {
    const props: DrawerWithHeaderAndFooterProps = {
        onClose: jest.fn(),
        open: true,
        title: "None Action Header",
        children: <div>Test</div>,
    };

    beforeEach(() => {
        render(
            <TestThemeProvider>
                {" "}
                <DrawerWithHeaderAndFooter
                    data-testid="DrawerWithHeaderAndFooter__container"
                    {...props}
                />
            </TestThemeProvider>
        );
    });

    it("should exist children", () => {
        expect(screen.getByText("Test")).toBeInTheDocument();
    });
});
