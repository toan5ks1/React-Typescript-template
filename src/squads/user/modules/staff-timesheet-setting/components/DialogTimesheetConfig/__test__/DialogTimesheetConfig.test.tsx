import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import DialogTimesheetConfig, { DialogTimesheetConfigProp } from "../DialogTimesheetConfig";

import { fireEvent, render } from "@testing-library/react";

describe("<DialogTimesheetConfig /> ENABLE mode", () => {
    const props: DialogTimesheetConfigProp = {
        isEnable: true,
        open: true,
        onSave: jest.fn(),
        onClose: jest.fn(),
    };

    const renderComponent = (props: DialogTimesheetConfigProp) => {
        return render(
            <TestCommonAppProvider>
                <DialogTimesheetConfig {...props} />
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot", () => {
        const wrapper = renderComponent(props);
        expect(wrapper.queryByTestId("DialogTimesheetConfig")).toMatchSnapshot();
    });

    it("should call the onClose function", () => {
        const wrapper = renderComponent(props);

        const button = wrapper.getByTestId("FooterDialogConfirm__buttonClose");
        fireEvent.click(button);

        expect(props.onClose).toBeCalledTimes(1);
    });

    it("should render message require", async () => {
        const wrapper = renderComponent(props);

        const button = wrapper.getByTestId("FooterDialogConfirm__buttonSave");
        fireEvent.click(button);

        expect(props.onSave).toBeCalledTimes(1);
    });
});

describe("<DialogTimesheetConfig /> DISABLE mode", () => {
    const props: DialogTimesheetConfigProp = {
        isEnable: true,
        open: true,
        onSave: jest.fn(),
        onClose: jest.fn(),
    };

    const renderComponent = (props: DialogTimesheetConfigProp) => {
        return render(
            <TestCommonAppProvider>
                <DialogTimesheetConfig {...props} />
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot", () => {
        const wrapper = renderComponent(props);

        expect(wrapper.queryByTestId("DialogTimesheetConfig")).toMatchSnapshot();
    });

    it("should call the onClose function", () => {
        const wrapper = renderComponent(props);

        const button = wrapper.getByTestId("FooterDialogConfirm__buttonClose");
        fireEvent.click(button);

        expect(props.onClose).toBeCalledTimes(1);
    });
});
