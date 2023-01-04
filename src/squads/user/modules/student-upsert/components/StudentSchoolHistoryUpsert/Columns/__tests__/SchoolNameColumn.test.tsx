import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import SchoolNameColumn from "../SchoolNameColumn";

import { render } from "@testing-library/react";

describe("<SchoolNameColumn/>", () => {
    const renderComponent = () => {
        return render(
            <TestHookFormProvider>
                <TestCommonAppProvider>
                    <SchoolNameColumn name={""} />
                </TestCommonAppProvider>
            </TestHookFormProvider>
        );
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
