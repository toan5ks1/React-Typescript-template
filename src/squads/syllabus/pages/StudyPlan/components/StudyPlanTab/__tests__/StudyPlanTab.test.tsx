import { TestQueryWrapper } from "src/squads/syllabus/test-utils/react-hooks";
import { mockCourseId } from "src/squads/syllabus/test-utils/study-plan";

import useGetCourseStudyplan from "../../../hooks/useGetCourseStudyplan";
import StudyPlanTab from "../StudyPlanTab";

import { fireEvent, render, screen } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

jest.mock("../../../hooks/useGetCourseStudyplan");

jest.mock("src/squads/syllabus/hooks/useAutocompleteReference");

describe("<StudyPlanTab />", () => {
    it("should render CourseStudyPlanTable by default", () => {
        (useGetCourseStudyplan as jest.Mock).mockImplementation(() => ({
            data: [],
            resetPaginationOffset: () => {},
        }));

        const { getByTestId } = render(
            <TestApp>
                <TestQueryWrapper>
                    <StudyPlanTab courseId={mockCourseId} />
                </TestQueryWrapper>
            </TestApp>
        );

        expect(
            getByTestId("ToggleButtonGroupBase").querySelectorAll("button")[0]?.textContent
        ).toContain("Master");
        expect(getByTestId("CourseStudyPlanTable")).toBeInTheDocument();
    });

    it("should display dialog to create study plan when click add button", () => {
        (useGetCourseStudyplan as jest.Mock).mockImplementation(() => ({
            data: [],
            resetPaginationOffset: () => {},
        }));

        render(
            <TestApp>
                <TestQueryWrapper>
                    <StudyPlanTab courseId={mockCourseId} />
                </TestQueryWrapper>
            </TestApp>
        );

        expect(screen.queryByTestId("DialogUpsertStudyplan__root")).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId("StudyPlanTab__addStudyPlan"));

        expect(screen.getByTestId("DialogUpsertStudyplan__root")).toBeInTheDocument();

        // should display title is add study plan
        expect(screen.getByTestId("DialogFullScreen__dialogTitle").textContent).toContain(
            "Add study plan"
        );
    });
});
