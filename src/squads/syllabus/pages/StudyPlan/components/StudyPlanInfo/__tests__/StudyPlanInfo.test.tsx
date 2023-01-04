import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { mockStudyPlanInfo } from "src/squads/syllabus/test-utils/study-plan";

import StudyPlanInfo from "src/squads/syllabus/pages/StudyPlan/components/StudyPlanInfo";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestingRouter from "src/squads/syllabus/test-utils/TestingRouter";

describe("<StudyPlanInfo />", () => {
    let wrapper: RenderResult;

    const gradesString = `Grade ${mockStudyPlanInfo.grades.join(", Grade ")}`;
    const trackSchoolProgressString = mockStudyPlanInfo.trackSchoolProgress ? "Yes" : "No";
    const redirectUrl = `/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}/${mockStudyPlanInfo.bookId}/show`;

    beforeEach(() => {
        wrapper = render(
            <TestApp>
                <TestingRouter redirectUrl={redirectUrl}>
                    <StudyPlanInfo {...mockStudyPlanInfo} />
                </TestingRouter>
            </TestApp>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correctly info of <StudyPlanInfo />", () => {
        expect(screen.getByText(mockStudyPlanInfo.bookName)).toBeInTheDocument();
        expect(screen.getByText(gradesString)).toBeInTheDocument();
        expect(screen.getByText(trackSchoolProgressString)).toBeInTheDocument();
    });

    it("should redirect to book detail page when clicking on book name", () => {
        const bookName = screen.getByText(mockStudyPlanInfo.bookName);

        fireEvent.click(bookName);

        expect(screen.getByTestId("TestingRouter__redirectUrl")).toHaveTextContent(redirectUrl);
    });
});
