import { handleOpenNewTab } from "src/common/utils/other";

import ButtonViewStudyPlan from "../ButtonViewStudyPlan";

import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useCreateViewStudyPlanLink from "src/squads/lesson/hooks/useCreateViewStudyPlanLink";
import TestThemeProvider from "src/squads/lesson/test-utils/TestThemeProvider";

jest.mock("src/squads/lesson/hooks/useCreateViewStudyPlanLink", () => jest.fn());
jest.mock("src/common/utils/other", () => ({ handleOpenNewTab: jest.fn() }));

const mockStudentId = "studentId";
const mockCourseId = "courseId";
const mockLink = "link";

describe("<ButtonViewStudyPlan />", () => {
    const renderComponent = () => {
        render(
            <TestThemeProvider>
                <ButtonViewStudyPlan studentId={mockStudentId} courseId={mockCourseId} />
            </TestThemeProvider>
        );
    };

    it("should render correctly", () => {
        renderComponent();

        const btnViewStudyPlan = screen.getByTestId("ButtonViewStudyPlan__button");
        expect(btnViewStudyPlan).toBeInTheDocument();
        expect(btnViewStudyPlan.textContent).toEqual("resources.lesson_management.viewStudyPlan");
    });

    it("should open new blank tab when on click button", () => {
        (useCreateViewStudyPlanLink as jest.Mock).mockReturnValue(mockLink);
        (handleOpenNewTab as jest.Mock).mockReturnValue(jest.fn);

        renderComponent();

        const btnViewStudyPlan = screen.getByTestId("ButtonViewStudyPlan__button");
        userEvent.click(btnViewStudyPlan);
        expect(handleOpenNewTab).toBeCalledWith(mockLink);
    });
});
