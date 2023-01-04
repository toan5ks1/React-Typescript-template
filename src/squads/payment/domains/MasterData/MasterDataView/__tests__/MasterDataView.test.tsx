import { MasterDataView } from "../MasterDataView";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

jest.mock("src/squads/payment/hooks/useResourceTranslate");

describe("<MasterDataView />", () => {
    test("render UI correctly", () => {
        render(
            <TestApp>
                <TestThemeProvider>
                    <MasterDataView />
                </TestThemeProvider>
            </TestApp>
        );
        expect(screen.queryByText("name")).toBeInTheDocument();
    });
});
