import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import EndDateColumn from "../EndDateColumn";

import { render } from "@testing-library/react";

describe("<EndDateColumn/>", () => {
    const renderComponent = () => {
        return render(
            <TestHookFormProvider
                useFormOptions={{
                    defaultValues: {
                        endDate: new Date(2000, 11, 11),
                    },
                }}
            >
                <MuiPickersUtilsProvider>
                    <TestCommonAppProvider>
                        <EndDateColumn name={"endDate"} />
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
