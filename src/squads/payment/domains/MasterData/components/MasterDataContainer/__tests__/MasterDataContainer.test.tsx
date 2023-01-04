import { MasterDataContainer } from "../MasterDataContainer";

import { render, RenderResult } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

jest.mock("src/squads/payment/hooks/useResourceTranslate");

describe("<MasterDataContainer />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(
            <TestApp>
                <TestThemeProvider>
                    <MasterDataContainer />
                </TestThemeProvider>
            </TestApp>
        );
    });

    it("should render UI correctly", () => {
        expect(wrapper.getByTestId("MasterView__typeSelect")).toBeInTheDocument();
        expect(wrapper.getByPlaceholderText("placeholder.masterData")).toBeInTheDocument();
        expect(wrapper.getByTestId("MasterView__importButton")).toBeInTheDocument();
        expect(wrapper.getByTestId("MasterDataContainer_container")).toBeInTheDocument();
    });
});
