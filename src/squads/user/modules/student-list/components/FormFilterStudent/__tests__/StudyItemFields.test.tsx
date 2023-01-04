import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import StudyItemFields from "../StudyItemFields";

import { render, screen } from "@testing-library/react";

describe("<StudyItemFields/>", () => {
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <TestHookFormProvider useFormOptions={{ defaultValues: { courses: [] } }}>
                    <StudyItemFields
                        courses={{
                            name: "courses",
                            chipLabel: "",
                            inputLabel: "Courses",
                            isApplied: false,
                            defaultValue: [],
                        }}
                    />
                </TestHookFormProvider>
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot and render title", () => {
        const { container } = renderComponent();

        expect(container).toMatchSnapshot();
        expect(screen.getByText("Study Item")).toBeInTheDocument();
    });
});
