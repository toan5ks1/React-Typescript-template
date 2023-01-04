import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import CourseColumn from "../CourseColumn";

import { render } from "@testing-library/react";

describe("<CourseColumn/>", () => {
    const renderComponent = () => {
        return render(
            <TestHookFormProvider>
                <TestCommonAppProvider>
                    <CourseColumn name={""} />
                </TestCommonAppProvider>
            </TestHookFormProvider>
        );
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
});
