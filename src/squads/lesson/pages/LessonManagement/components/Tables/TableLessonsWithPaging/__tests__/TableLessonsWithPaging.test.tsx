import { MemoryRouter } from "react-router";
import { ERPModules } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { createMockTableLessonsWithPaging } from "src/squads/lesson/test-utils/lesson-management-list";

import TableLessonsWithPaging, {
    TableLessonsWithPagingProps,
} from "src/squads/lesson/pages/LessonManagement/components/Tables/TableLessonsWithPaging";

import { render, RenderResult, screen } from "@testing-library/react";

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: () => ({ isEnabled: true }),
}));

const renderTableLessonsWithPaging = (props: TableLessonsWithPagingProps) => {
    return render(
        <MemoryRouter>
            <TableLessonsWithPaging {...props} />
        </MemoryRouter>
    );
};

describe("<TableLessonsWithPaging /> have data without teacher and center", () => {
    const props = createMockTableLessonsWithPaging({
        isLoadingLesson: false,
        isLoadingLessonReport: true,
        isLoadingCenter: true,
        isLoadingTeacher: true,
        isLoadingCourse: true,
        isLoadingClass: true,
    });

    // TODO: In Phase 1, We just check table have 7 column. I will update it in the future.
    it("should show 11 columns", () => {
        const wrapper = renderTableLessonsWithPaging(props);

        const columns = wrapper.getByTestId("TableBase__header").getElementsByTagName("th");

        expect(columns).toHaveLength(11);
    });

    it("should render correct href", () => {
        const wrapper = renderTableLessonsWithPaging(props);

        const lessonDates = wrapper.getAllByTestId("TableLessonsWithPaging__lessonDate");

        lessonDates.forEach((lessonDate, index) => {
            const correctUrl = `/${MicroFrontendTypes.LESSON}/${ERPModules.LESSON_MANAGEMENT}/${props.data[index].id}/show`;
            expect(lessonDate).toHaveAttribute("href", correctUrl);
        });
    });

    it("should show loading in columns: teacher, center name, course and class", () => {
        const wrapper = renderTableLessonsWithPaging(props);

        const loadingSkeleton = wrapper.queryAllByTestId("TableLessonsWithPaging__loadingSkeleton");

        expect(loadingSkeleton).toHaveLength(8); // There are 2 lessons in table
    });
});

describe("<TableLessonsWithPaging /> have full data", () => {
    const props = createMockTableLessonsWithPaging({
        isLoadingLesson: false,
        isLoadingLessonReport: false,
        isLoadingCenter: false,
        isLoadingTeacher: false,
        isLoadingCourse: false,
        isLoadingClass: false,
    });

    let wrapper: RenderResult;
    beforeEach(() => {
        wrapper = renderTableLessonsWithPaging(props);
    });
    // TODO: In Phase 1, We just check table have 7 column. I will update it in the future.
    it("should show 11 columns", () => {
        const columns = wrapper.getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns).toHaveLength(11);
    });

    it("should render correct href", () => {
        const lessonDates = wrapper.getAllByTestId("TableLessonsWithPaging__lessonDate");

        lessonDates.forEach((lessonDate, index) => {
            const correctUrl = `/${MicroFrontendTypes.LESSON}/${ERPModules.LESSON_MANAGEMENT}/${props.data[index].id}/show`;
            expect(lessonDate).toHaveAttribute("href", correctUrl);
        });
    });

    it("should not show loading in column teacher, center name, course and class", () => {
        const loadingSkeleton = wrapper.queryAllByTestId("TableLessonsWithPaging__loadingSkeleton");

        expect(loadingSkeleton).toHaveLength(0);
    });

    it("should render course and class when lesson group is enable", () => {
        const lessonCourses = screen.getAllByTestId("TableLessonsWithPaging__course");
        expect(lessonCourses.length).toEqual(2);

        const lessonClasses = screen.getAllByTestId("TableLessonsWithPaging__class");
        expect(lessonClasses.length).toEqual(2);
    });

    it("should render empty value at course and class column when teaching method is Individual", () => {
        const firstLessonCourse = screen.getAllByTestId("TableLessonsWithPaging__course")[0];
        expect(firstLessonCourse).toHaveTextContent("--");

        const firstLessonClass = screen.getAllByTestId("TableLessonsWithPaging__class")[0];
        expect(firstLessonClass).toHaveTextContent("--");
    });

    it("should render course name and class name when teaching method is Group", () => {
        const lastLessonCourse = screen.getAllByTestId("TableLessonsWithPaging__course")[1];
        expect(lastLessonCourse).toHaveTextContent("Course Name 01");

        const lastLessonClass = screen.getAllByTestId("TableLessonsWithPaging__class")[1];
        expect(lastLessonClass).toHaveTextContent("Class 01");

        const lastLessonTeacherName = screen.getAllByTestId("TableLessonsWithPaging__teacher")[1];
        expect(lastLessonTeacherName).toHaveTextContent("Teacher 01");
    });

    it("should show pagination when there is data", () => {
        const tableFooter = screen.queryByTestId("TableBaseFooter");
        expect(tableFooter).toBeInTheDocument();
    });
});

describe("<TableLessonsWithPaging /> has no data", () => {
    const mockLessonsData = createMockTableLessonsWithPaging({
        isLoadingLesson: false,
        isLoadingLessonReport: false,
        isLoadingCenter: false,
        isLoadingTeacher: false,
        isLoadingCourse: false,
        isLoadingClass: false,
    });

    const mockEmptyLessonsListData = {
        ...mockLessonsData,
        data: [],
    };

    it("should not show pagination when there is no data", () => {
        renderTableLessonsWithPaging(mockEmptyLessonsListData);
        const tableFooter = screen.queryByTestId("TableBaseFooter");
        expect(tableFooter).not.toBeInTheDocument();
    });
});

describe("<TableLessonsWithPaging /> missing data", () => {
    const mockLessonsData = createMockTableLessonsWithPaging({
        isLoadingLesson: false,
        isLoadingLessonReport: false,
        isLoadingCenter: false,
        isLoadingTeacher: false,
        isLoadingCourse: false,
        isLoadingClass: false,
        missingFields: ["teacherNames"],
    });

    it("should render empty value at teacher name column when response data empty", () => {
        renderTableLessonsWithPaging(mockLessonsData);
        const firstLessonTeacherNames = screen.getAllByTestId("TableLessonsWithPaging__teacher")[0];
        expect(firstLessonTeacherNames).toHaveTextContent("--");
    });
});
