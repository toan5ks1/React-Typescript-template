import { EurekaEntities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";

import useGetCourseStudyplan, {
    UseGetCourseStudyplanValues,
} from "../../../hooks/useGetCourseStudyplan";
import CourseStudyPlanTable, { CourseStudyPlanTableProps } from "../CourseStudyPlanTable";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { StudyPlanStatusKey } from "src/squads/syllabus/pages/StudyPlan/common/constants";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";
import TestingRouter from "src/squads/syllabus/test-utils/TestingRouter";

jest.mock("src/squads/syllabus/pages/StudyPlan/hooks/useGetCourseStudyplan", () => jest.fn());

const renderUtil = async ({ redirectUrl }: { redirectUrl?: string }) => {
    const defaultProps: CourseStudyPlanTableProps = {
        courseId: "courseId",
        filter: {
            grades: [],
            bookIds: [],
            archived: false,
        },
        keyword: "",
    };
    const wrapper = render(
        <TestApp>
            <TestThemeProvider>
                <TestingRouter redirectUrl={redirectUrl}>
                    <CourseStudyPlanTable {...defaultProps} />
                </TestingRouter>
            </TestThemeProvider>
        </TestApp>
    );
    await waitFor(() => wrapper.queryAllByTestId("TableSke__item").length === 0);
};

describe("<CourseStudyPlanTable /> without searching result", () => {
    const pagination = createFakePagination();

    it("should render correctly UI when having course master in table", async () => {
        const studyplanName = "Study plan for first week";
        const bookName = "Book Name 1";
        const values: UseGetCourseStudyplanValues = {
            data: [
                {
                    name: studyplanName,
                    grades: [5, 4],
                    studyplanId: "studyplanId",
                    bookName,
                },
            ],
            pagination,
            isLoading: false,
            isFetchingBook: false,
            isFetching: false,
            resetPaginationOffset: () => {},
        };
        (useGetCourseStudyplan as jest.Mock).mockImplementation(() => values);
        await renderUtil({});

        expect(screen.getByText(studyplanName)).toBeInTheDocument();
        expect(screen.getByTestId("CourseStudyPlanTable__bookCol")).toHaveTextContent(bookName);
        expect(screen.getByTestId("CourseStudyPlanTable__gradeCol")).toHaveTextContent(
            "Grade 5, Grade 4"
        );
    });

    // For compatible with old data
    it("should render empty value grade when grade is old data (null-list)", async () => {
        const values: UseGetCourseStudyplanValues = {
            data: [
                {
                    name: "studyplanName",
                    grades: null,
                    studyplanId: "studyplanId",
                    bookName: "bookName",
                },
            ],
            pagination,
            isLoading: false,
            isFetchingBook: false,
            isFetching: false,
            resetPaginationOffset: () => {},
        };
        (useGetCourseStudyplan as jest.Mock).mockImplementation(() => values);
        await renderUtil({});
        const gradeCol = screen.getByTestId("CourseStudyPlanTable__gradeCol");

        expect(gradeCol).toHaveTextContent("--");
    });

    it("should render empty value when cannot get the book name", async () => {
        const values: UseGetCourseStudyplanValues = {
            data: [
                {
                    name: "studyplanName",
                    grades: null,
                    studyplanId: "studyplanId",
                },
            ],
            pagination,
            isLoading: false,
            isFetchingBook: false,
            isFetching: false,
            resetPaginationOffset: () => {},
        };
        (useGetCourseStudyplan as jest.Mock).mockImplementation(() => values);

        await renderUtil({});
        const bookCol = screen.getByTestId("CourseStudyPlanTable__bookCol");

        expect(bookCol).toHaveTextContent("--");
    });

    it("should render empty value when grade is an empty array ", async () => {
        const values: UseGetCourseStudyplanValues = {
            data: [
                {
                    name: "studyplanName",
                    grades: [],
                    studyplanId: "studyplanId",
                },
            ],
            pagination,
            isLoading: false,
            isFetchingBook: false,
            isFetching: false,
            resetPaginationOffset: () => {},
        };
        (useGetCourseStudyplan as jest.Mock).mockImplementation(() => values);
        await renderUtil({});
        const gradeCol = screen.getByTestId("CourseStudyPlanTable__gradeCol");
        expect(gradeCol).toHaveTextContent("--");
    });

    it("should render table row with background color when study plan is archived", async () => {
        const values: UseGetCourseStudyplanValues = {
            data: [
                {
                    name: "studyplanName_1",
                    grades: null,
                    studyplanId: "studyplanId_1",
                    status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE,
                },
                {
                    name: "studyplanName archived 1",
                    grades: null,
                    studyplanId: "studyplanId_2",
                    status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED,
                },
                {
                    name: "studyplanName_3",
                    grades: null,
                    studyplanId: "studyplanId_3",
                    status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE,
                },
                {
                    name: "studyplanName archived 2",
                    grades: null,
                    studyplanId: "studyplanId_4",
                    status: StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED,
                },
            ],
            pagination,
            isLoading: false,
            isFetchingBook: false,
            isFetching: false,
            resetPaginationOffset: () => {},
        };
        (useGetCourseStudyplan as jest.Mock).mockImplementation(() => values);

        await renderUtil({});

        const tableRows = screen.getAllByTestId("TableBase__row");

        values.data.forEach((studyPlan, index) => {
            const td = tableRows[index].querySelector("td");
            const tdStyle = window.getComputedStyle(td as HTMLElement);

            if (studyPlan.status === StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED) {
                expect(tdStyle.backgroundColor).toBe("rgb(245, 245, 245)"); // computed from #F5F5F5
            } else {
                expect(tdStyle.backgroundColor).toBe("");
            }
        });
    });

    it("should redirect to study plan detail page when clicking on study plan name", async () => {
        const studyplanName = "Study plan for first week";
        const studyplanId = "studyplanId";
        const redirectUrl = `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.STUDY_PLANS}/${studyplanId}/show`;
        const values: UseGetCourseStudyplanValues = {
            data: [
                {
                    name: studyplanName,
                    grades: [],
                    studyplanId,
                },
            ],
            pagination,
            isLoading: false,
            isFetchingBook: false,
            isFetching: false,
            resetPaginationOffset: () => {},
        };
        (useGetCourseStudyplan as jest.Mock).mockImplementation(() => values);
        await renderUtil({ redirectUrl });

        const studyPlanName = screen.getByText(studyplanName);

        fireEvent.click(studyPlanName);

        expect(screen.getByTestId("TestingRouter__redirectUrl")).toHaveTextContent(redirectUrl);
    });
});
