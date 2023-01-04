import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import StartDateColumn from "../StartDateColumn";

import { render } from "@testing-library/react";

describe("<StartDateColumn/>", () => {
    const renderComponent = () => {
        return render(
            <TestHookFormProvider
                useFormOptions={{
                    defaultValues: {
                        startDate: new Date(2000, 11, 11),
                    },
                }}
            >
                <MuiPickersUtilsProvider>
                    <TestCommonAppProvider>
                        <StartDateColumn name={"startDate"} />
                    </TestCommonAppProvider>
                </MuiPickersUtilsProvider>
            </TestHookFormProvider>
        );
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
