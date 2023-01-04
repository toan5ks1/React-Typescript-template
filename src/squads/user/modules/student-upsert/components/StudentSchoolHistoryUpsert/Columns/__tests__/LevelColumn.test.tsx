import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import LevelColumn from "../LevelColumn";

import { render } from "@testing-library/react";

describe("<LevelColumn/>", () => {
    const renderComponent = () => {
        return render(
            <TestHookFormProvider>
                <TestCommonAppProvider>
                    <LevelColumn name={""} />
                </TestCommonAppProvider>
            </TestHookFormProvider>
        );
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
