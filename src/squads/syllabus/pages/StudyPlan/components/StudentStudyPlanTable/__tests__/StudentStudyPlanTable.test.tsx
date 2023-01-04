import { EurekaEntities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { createMockPaginationWithTotalObject } from "src/squads/syllabus/test-utils/pagination";

import CommonTranslationProvider from "src/providers/TranslationProvider";

import StudentStudyPlanTable, { StudentStudyPlanTableProps } from "../StudentStudyPlanTable";

import { fireEvent, render, RenderResult, screen, within } from "@testing-library/react";
import { convertGradesToString } from "src/squads/syllabus/pages/StudyPlan/common/helpers";
import { StudyPlanListByStudent } from "src/squads/syllabus/pages/StudyPlan/common/types";
import useStudentStudyPlansQuery from "src/squads/syllabus/pages/StudyPlan/hooks/useStudentStudyPlansQuery";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestingRouter from "src/squads/syllabus/test-utils/TestingRouter";

jest.mock("src/squads/syllabus/pages/StudyPlan/hooks/useStudentStudyPlansQuery", () => jest.fn());

const studyPlanListByStudent: StudyPlanListByStudent[] = [
    {
        studentId: "studentId1",
        studentName: "K Student 1",
        studyPlanList: [
            {
                studyplanId: "studyPlanId1",
                name: "K Study Plan",
                bookId: "bookId1",
                bookName: "K Book 1",
                grades: [5],
                created_at: "2021-10-26T11:37:56.282708+00:00",
                master_study_plan_id: null,
                studentId: "studentId1",
            },
            {
                studyplanId: "studyPlanId2",
                name: "K Study Plan for K Student 1 and 2",
                bookId: "bookId2",
                bookName: "K Book 2",
                grades: [1, 2, 6],
                created_at: "2021-10-01T11:37:56.282708+00:00",
                master_study_plan_id: null,
                studentId: "studentId1",
            },
        ],
    },
    {
        studentId: "studentId2",
        studentName: "K Student 2",
        studyPlanList: [],
    },
    {
        studentId: "studentId3",
        studentName: "K Student 3",
        studyPlanList: [
            {
                studyplanId: "studyPlanId3",
                name: "K Study Plan for K Student 1 and 2",
                bookId: "bookId2",
                bookName: "K Book 2",
                grades: [1, 2, 6],
                created_at: "2021-10-26T11:37:56.282708+00:00",
                master_study_plan_id: null,
                studentId: "studentId3",
            },
        ],
    },
    {
        studentId: "studentId4",
        studentName: "K Student 4",
        studyPlanList: [
            {
                studyplanId: "studyPlanId4",
                name: "K Study Plan 4",
                bookId: "bookId3",
                bookName: "K Book 3",
                grades: [12],
                created_at: "2021-09-26T11:37:56.282708+00:00",
                master_study_plan_id: null,
                studentId: "studentId4",
            },
        ],
    },
];

const defaultProps: StudentStudyPlanTableProps = {
    courseId: "courseId126",
    filter: { bookIds: [], grades: [] },
    keyword: "",
};

const testIdStudentName = "StudentStudyPlanTableColumns__studentName";
const testIdStudyPlanName = "StudentStudyPlanTableColumns__studyPlanName";
const testIdBookAssociation = "StudentStudyPlanTableColumns__bookAssociation";
const testIdGrade = "StudentStudyPlanTableColumns__grade";

describe("<StudentStudyPlanTable /> without searching result", () => {
    let wrapper: RenderResult;

    const student1 = studyPlanListByStudent[0];
    const student2 = studyPlanListByStudent[1];
    const studyPlan1 = student1.studyPlanList[0];
    const studyPlan2 = student1.studyPlanList[1];

    const redirectUrl = `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.STUDY_PLANS}/${studyPlan1.studyplanId}/show`;

    beforeEach(() => {
        (useStudentStudyPlansQuery as jest.Mock).mockReturnValue({
            studyPlanListByStudent,
            isLoading: false,
            pagination: createMockPaginationWithTotalObject(5),
            resetPaginationOffset: () => {},
        });
        wrapper = render(
            <TestApp>
                <TestingRouter redirectUrl={redirectUrl}>
                    <CommonTranslationProvider>
                        <StudentStudyPlanTable {...defaultProps} />
                    </CommonTranslationProvider>
                </TestingRouter>
            </TestApp>
        );
    });

    it(`should render correctly ${student1.studentName} with ${student1.studyPlanList.length} study plans`, () => {
        const rows = wrapper.getAllByTestId("TableBase__row");
        const rowStudyPlan1 = rows[0];
        const rowStudyPlan2 = rows[1];

        expect(rows.length).toEqual(5);

        expect(within(rowStudyPlan1).getByTestId(testIdStudentName)).toHaveTextContent(
            student1.studentName
        );
        expect(within(rowStudyPlan1).getByTestId(testIdStudyPlanName)).toHaveTextContent(
            String(studyPlan1.name)
        );
        expect(within(rowStudyPlan1).getByTestId(testIdBookAssociation)).toHaveTextContent(
            String(studyPlan1.bookName)
        );
        expect(within(rowStudyPlan1).getByTestId(testIdGrade)).toHaveTextContent(
            convertGradesToString(studyPlan1.grades, "Grade")
        );

        expect(within(rowStudyPlan2).getByTestId(testIdStudyPlanName)).toHaveTextContent(
            String(studyPlan2.name)
        );
        expect(within(rowStudyPlan2).getByTestId(testIdBookAssociation)).toHaveTextContent(
            String(studyPlan2.bookName)
        );
        expect(within(rowStudyPlan2).getByTestId(testIdGrade)).toHaveTextContent(
            convertGradesToString(studyPlan2.grades, "Grade")
        );

        expect(screen.getByText("1-5 of 5")).toBeInTheDocument();
    });

    it(`should render correctly ${student2.studentName} with no study plan`, () => {
        const rows = wrapper.getAllByTestId("TableBase__row");
        const rowStudent2 = rows[2];

        expect(within(rowStudent2).getByTestId(testIdStudentName)).toHaveTextContent(
            student2.studentName
        );
        expect(within(rowStudent2).getByTestId(testIdStudyPlanName)).toHaveTextContent("--");
        expect(within(rowStudent2).getByTestId(testIdBookAssociation)).toHaveTextContent("--");
        expect(within(rowStudent2).getByTestId(testIdGrade)).toHaveTextContent("--");
    });

    it("should redirect to study plan detail page when clicking on study plan name", () => {
        const studyPlanName = screen.getByText(String(studyPlan1.name));

        fireEvent.click(studyPlanName);

        expect(screen.getByTestId("TestingRouter__redirectUrl")).toHaveTextContent(redirectUrl);
    });
});
