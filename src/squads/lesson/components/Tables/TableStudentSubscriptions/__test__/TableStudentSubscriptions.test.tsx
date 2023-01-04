import { TestApp } from "src/squads/lesson/test-utils";
import { mockStudentInfoList } from "src/squads/lesson/test-utils/lesson-management";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";

import TableStudentSubscriptions, {
    TableStudentSubscriptionsProps,
} from "src/squads/lesson/components/Tables/TableStudentSubscriptions";

import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const renderTableStudentInfoWrapper = (props: TableStudentSubscriptionsProps) => {
    return render(
        <TestApp>
            <TableStudentSubscriptions {...props} />
        </TestApp>
    );
};

describe("<TableStudentSubscriptions />", () => {
    const props: TableStudentSubscriptionsProps = {
        isLoadingStudentsCourses: false,
        isLoadingGrades: true,
        onSelect: jest.fn(),
        pagination: createMockPaginationWithTotalObject(5, 0),
        selectedStudentInfoList: [],
        studentInfoList: mockStudentInfoList,
    };

    it("should render correct columns", () => {
        const wrapper = renderTableStudentInfoWrapper(props);

        const tableHeader = wrapper.getByTestId("TableBase__header");

        const studentNameColumn = within(tableHeader).getByText("Student Name");
        const courseNameColumn = within(tableHeader).getByText("Course Name");
        const gradeColumn = within(tableHeader).getByText("Grade");
        // TODO: In Phase 1, We don't have teaching type. Will update it in the future.
        // const teachingTypeColumn = within(tableHeader).getByText("Teaching Type");

        expect(studentNameColumn).toBeVisible();
        expect(courseNameColumn).toBeVisible();
        expect(gradeColumn).toBeVisible();
        // TODO: In Phase 1, We don't have teaching type. Will update it in the future.
        // expect(teachingTypeColumn).toBeVisible();
    });

    it("should render skeleton instead typography", () => {
        const wrapper = renderTableStudentInfoWrapper({
            ...props,
            isLoadingStudentsCourses: false,
            isLoadingGrades: true,
        });

        expect(
            wrapper.container.getElementsByClassName("MuiSkeleton-pulse").length
        ).toBeGreaterThan(0);
    });

    it("should selected table checkboxes", () => {
        const wrapper = renderTableStudentInfoWrapper({
            ...props,
            selectedStudentInfoList: [props.studentInfoList[0]],
        });

        expect(wrapper.queryAllByRole("checkbox", { checked: true })).toHaveLength(1);
    });

    it("should selectable table checkboxes", () => {
        const wrapper = renderTableStudentInfoWrapper(props);

        const checkBoxHeader = wrapper.getByTestId("TableHeaderWithCheckbox__checkboxHeader");
        userEvent.click(checkBoxHeader);

        expect(props.onSelect).toBeCalledWith(props.studentInfoList);
    });
});
