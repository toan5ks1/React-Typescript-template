import { PropsWithChildren } from "react";

import Confirm, { ConfirmProps } from "../Confirm";

import { render, RenderResult } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

describe("<FormDialog /> in Confirm Component", () => {
    let wrapper: RenderResult;
    const testIdDialog: string = "Dialog__background";

    beforeEach(() => {
        const props: PropsWithChildren<ConfirmProps> = {
            children: <div />,
            loading: true,
            open: true,
            onConfirm: () => {},
            cancelText: "Cancel",
            OKText: "OK",
            onCancel: () => {},
            renderer: {
                title: "Test",
                content: "Test content",
            },
        };

        wrapper = render(
            <TestApp>
                <Confirm {...props} />
            </TestApp>
        );
    });

    it("should match snapshot", () => {
        const confirmDialog = wrapper.getByTestId(testIdDialog);
        expect(confirmDialog).toMatchSnapshot();
    });

    it("should render background color correctly", () => {
        const confirmDialog = wrapper.getByTestId(testIdDialog);
        expect(confirmDialog.getElementsByClassName("MuiDialog-paper")[0]).toHaveStyle(
            "background: #FFFFFF"
        );
    });
});
