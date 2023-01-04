import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import SchoolFields from "../SchoolFields";

import { render, screen } from "@testing-library/react";

describe("<SchoolFields/>", () => {
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <TestHookFormProvider
                    useFormOptions={{ defaultValues: { schoolLevel: [], schoolName: [] } }}
                >
                    <SchoolFields />
                </TestHookFormProvider>
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot and render title", () => {
        const { container } = renderComponent();

        expect(container).toMatchSnapshot();
        expect(screen.getByText("School")).toBeInTheDocument();
    });
});
