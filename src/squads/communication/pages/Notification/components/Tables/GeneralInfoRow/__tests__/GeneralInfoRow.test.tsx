import ButtonBase from "src/components/Buttons/ButtonBase";

import GeneralInfoRow from "../GeneralInfoRow";

import { render, RenderResult } from "@testing-library/react";
import TestThemeProvider from "src/squads/communication/test-utils/TestThemeProvider";

describe("<GeneralInfoRow />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <GeneralInfoRow label="Test" xsLabel={2} xsValue={10}>
                    <ButtonBase data-testid="ButtonBase__Test">Test</ButtonBase>
                </GeneralInfoRow>
            </TestThemeProvider>
        );
    });
    it("should snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct value", () => {
        expect(wrapper.getByTestId("GeneralInfoRow__label")).toHaveTextContent(
            "resources.notifications.Test"
        );
        expect(wrapper.getByTestId("ButtonBase__Test")).toHaveTextContent("Test");
    });
});
