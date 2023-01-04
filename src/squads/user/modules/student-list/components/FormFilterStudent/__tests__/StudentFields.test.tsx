import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import StudentFields from "../StudentFields";

import { render, screen } from "@testing-library/react";

describe("<StudentFields/>", () => {
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <TestHookFormProvider
                    useFormOptions={{ defaultValues: { grades: [], isNotLogged: false } }}
                >
                    <StudentFields
                        grades={{
                            name: "grades",
                            chipLabel: "",
                            inputLabel: "Grades",
                            isApplied: false,
                            defaultValue: [],
                        }}
                        isNotLogged={{
                            name: "isNotLogged",
                            chipLabel: "",
                            inputLabel: "NotLogged",
                            isApplied: false,
                            defaultValue: false,
                        }}
                    />
                </TestHookFormProvider>
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot and render title", () => {
        const { container } = renderComponent();

        expect(container).toMatchSnapshot();
        expect(screen.getByText("Student")).toBeInTheDocument();
    });
});
