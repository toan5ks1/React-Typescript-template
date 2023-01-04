import CommonTranslationProvider from "src/providers/TranslationProvider";

import List from "../CourseList";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

jest.mock("src/squads/syllabus/components/RelatedCourse/CourseTable", () => ({
    __esModule: true,
    default: () => <div>This Is Course Table</div>,
}));

describe("<List /> Course table", () => {
    beforeEach(() => {
        render(
            <CommonTranslationProvider>
                <List />
            </CommonTranslationProvider>,
            { wrapper: TestApp }
        );
    });

    it("should render page title", () => {
        expect(screen.getByTestId("CourseList__title")).toHaveTextContent("Course");
    });

    it("should render the course table", () => {
        expect(screen.getByText("This Is Course Table")).toBeInTheDocument();
    });
});
