import { MemoryRouter } from "react-router-dom";
import { EurekaEntities, SearchEngine } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { getPrimaryKey } from "src/squads/syllabus/common/helpers/legacy";

import useStudentStudyPlanTableColumns from "../../../hooks/useStudentStudyPlanTableColumns/useStudentStudyPlanTableColumns";
import StudentStudyPlanTableBody, {
    StudentStudyPlanTableBodyProps,
} from "../StudentStudyPlanTableBody";

import { render, screen } from "@testing-library/react";
import { StudentStudyPlanInfo } from "src/squads/syllabus/pages/StudyPlan/common/types";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

const courseId = "courseId01";

const getUrlToStudyplanDetailWeExpect = (studyplanId: string) =>
    `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.STUDY_PLANS}/${studyplanId}/show?${SearchEngine.COURSE_ID}=${courseId}`;

const renderUtil = (props: Partial<StudentStudyPlanTableBodyProps>) => {
    const Wrapper = () => {
        const rowKey = getPrimaryKey(EurekaEntities.COURSE_STUDENTS);

        const { columns } = useStudentStudyPlanTableColumns(courseId);

        const defaultProps: StudentStudyPlanTableBodyProps = {
            columns,
            data: [],
            rowKey,
            ...props,
        };

        return (
            <MemoryRouter>
                <TestThemeProvider>
                    <table>
                        <tbody>
                            <StudentStudyPlanTableBody {...defaultProps} />
                        </tbody>
                    </table>
                </TestThemeProvider>
            </MemoryRouter>
        );
    };

    return render(<Wrapper />);
};

const NUMBER_STUDYPLAN_INFO_TABLE_COLUMNS = 3;
const NUMBER_STUDENT_INFO_TABLE_COLUMNS = 1;

describe("<StudentStudyPlanTableBody/>", () => {
    it("should render 1 student don't have any study plan", () => {
        const data: StudentStudyPlanTableBodyProps["data"] = [
            {
                studentId: "student_01",
                studentName: "student name 01",
                studyPlanList: [],
            },
        ];

        const { container } = renderUtil({ data });

        // Should render a table row record
        expect(screen.getByTestId("TableBase__row")).toBeInTheDocument();

        // And in that table row we have N columns equal
        expect(container.querySelectorAll("td")).toHaveLength(
            NUMBER_STUDENT_INFO_TABLE_COLUMNS + NUMBER_STUDYPLAN_INFO_TABLE_COLUMNS
        );

        // We will have total N empty value corresponding total study plan info columns
        expect(screen.getAllByText("--")).toHaveLength(NUMBER_STUDYPLAN_INFO_TABLE_COLUMNS);
    });

    it("should render correct student have 1 study plan", () => {
        const studyplanId = "studyplanId-01";
        const bookName = "book-name";
        const studyplanName = "studyplan name 01";

        const studyplan: StudentStudyPlanInfo = {
            bookId: "bookId",
            grades: [1, 3],
            studyplanId,
            bookName,
            created_at: "2021-09-01T11:37:56.282708+00:00",
            studentId: "student_01",
            name: studyplanName,
        };

        const data: StudentStudyPlanTableBodyProps["data"] = [
            {
                studentId: "student_01",
                studentName: "student name 01",
                studyPlanList: [studyplan],
            },
        ];

        renderUtil({ data });

        const linkToStudentStudyplanDetailExpect = getUrlToStudyplanDetailWeExpect(studyplanId);

        const studyplanNameElement = screen.getByTestId(
            "StudentStudyPlanTableColumns__studyPlanName"
        );

        expect(studyplanNameElement.querySelector("a")).toHaveAttribute(
            "href",
            linkToStudentStudyplanDetailExpect
        );

        expect(studyplanNameElement).toHaveTextContent(studyplanName);

        expect(screen.getByTestId("StudentStudyPlanTableBodyColumns__bookName")).toHaveTextContent(
            bookName
        );

        expect(screen.getByTestId("StudentStudyPlanTableBodyColumns__grades")).toHaveTextContent(
            "resources.choices.grades.1, resources.choices.grades.3"
        );
    });

    it("should render empty placeholder value when student study plan don't grades", () => {
        const data: StudentStudyPlanTableBodyProps["data"] = [
            {
                studentId: "student_01",
                studentName: "student name 01",
                studyPlanList: [
                    {
                        bookId: "bookId",
                        grades: [],
                        studyplanId: "01",
                        bookName: "book 01",
                        created_at: "2021-09-01T11:37:56.282708+00:00",
                        studentId: "student_01",
                        name: "study plan name",
                    },
                ],
            },
        ];

        renderUtil({ data });

        expect(screen.getByTestId("StudentStudyPlanTableBodyColumns__grades")).toHaveTextContent(
            "--"
        );
    });

    it("should render empty placeholder value when book name is null-list (Cannot get book or book not found(bad | old-data))", () => {
        const data: StudentStudyPlanTableBodyProps["data"] = [
            {
                studentId: "student_01",
                studentName: "student name 01",
                studyPlanList: [
                    {
                        bookId: "bookId",
                        grades: [1, 4],
                        studyplanId: "01",
                        created_at: "2021-09-01T11:37:56.282708+00:00",
                        studentId: "student_01",
                        name: "study plan name",
                    },
                ],
            },
        ];

        renderUtil({ data });

        expect(screen.getByTestId("StudentStudyPlanTableBodyColumns__bookName")).toHaveTextContent(
            "--"
        );
    });

    it("should render multiple student don't have any study plan", () => {
        const data: StudentStudyPlanTableBodyProps["data"] = [
            {
                studentId: "student_01",
                studentName: "student name 01",
                studyPlanList: [],
            },
            {
                studentId: "student_02",
                studentName: "student name 02",
                studyPlanList: [],
            },
        ];

        renderUtil({ data });

        expect(screen.getAllByTestId("TableBase__row")).toHaveLength(data.length);
    });

    it("should render correct student have multiple student study plan", () => {
        const data: StudentStudyPlanTableBodyProps["data"] = [
            {
                studentId: "student_01",
                studentName: "student name 01",
                studyPlanList: [
                    {
                        bookId: "bookId",
                        grades: [1, 4],
                        studyplanId: "01",
                        created_at: "2021-09-01T11:37:56.282708+00:00",
                        studentId: "student_01",
                        name: "study plan name",
                    },
                    {
                        bookId: "bookId",
                        grades: [1, 4],
                        studyplanId: "01",
                        created_at: "2021-09-01T11:37:56.282708+00:00",
                        studentId: "student_01",
                        name: "study plan name",
                    },
                ],
            },
            {
                studentId: "student_02",
                studentName: "student name 02",
                studyPlanList: [
                    {
                        bookId: "bookId",
                        grades: [1, 4],
                        studyplanId: "02",
                        created_at: "2021-09-01T11:37:56.282708+00:00",
                        studentId: "student_02",
                        name: "study plan name",
                    },
                ],
            },
        ];

        renderUtil({ data });

        const totalStudyplanOfAllStudents = data.reduce((result, currentStudentStudyplan) => {
            const currentTotalStudentStudyplan = currentStudentStudyplan.studyPlanList.length;

            return result + currentTotalStudentStudyplan;
        }, 0);

        const tableRows = screen.getAllByTestId("TableBase__row");

        // We will render N total row corresponding total studyplan of all student
        expect(tableRows).toHaveLength(totalStudyplanOfAllStudents);

        // The student row will group N studyplan via rowSpan attribute corresponding total studyplan in it
        // When don't have any study plan rowSpan should be 1
        for (let i = 0; i < data.length; i++) {
            expect(
                screen.getAllByTestId("StudentStudyPlanTableColumns__studentName")[i]
            ).toHaveAttribute("rowspan", `${data[i].studyPlanList.length || 1}`);
        }

        let nextStudentIndex = 0;
        for (let i = 0; i < data.length; i++) {
            const currentTableRow = tableRows[i];

            if (i === nextStudentIndex) {
                // The first row of student = student + the first study plan
                expect(currentTableRow.querySelectorAll("td")).toHaveLength(
                    NUMBER_STUDENT_INFO_TABLE_COLUMNS + NUMBER_STUDYPLAN_INFO_TABLE_COLUMNS
                );
                nextStudentIndex = data[i].studyPlanList.length + nextStudentIndex;
            } else {
                // From the second row of student to the next student is study plan
                expect(currentTableRow.querySelectorAll("td")).toHaveLength(
                    NUMBER_STUDYPLAN_INFO_TABLE_COLUMNS
                );
            }
        }
    });
});
