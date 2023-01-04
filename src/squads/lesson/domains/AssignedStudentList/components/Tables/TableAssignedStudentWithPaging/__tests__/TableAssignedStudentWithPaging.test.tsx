import { createMockTableAssignedStudentWithPaging } from "src/squads/lesson/test-utils/assigned-student-list";

import TableAssignedStudentWithPaging, {
    TableAssignedStudentWithPagingProps,
} from "src/squads/lesson/domains/AssignedStudentList/components/Tables/TableAssignedStudentWithPaging";

import { render, screen } from "@testing-library/react";
import { AssignedStudentListTypes } from "src/squads/lesson/domains/AssignedStudentList/common/types";

const renderTableAssignedStudentWithPaging = (props: TableAssignedStudentWithPagingProps) => {
    return render(<TableAssignedStudentWithPaging {...props} />);
};

describe("<TableAssignedStudentWithPaging /> have data without location, course and student", () => {
    const props = createMockTableAssignedStudentWithPaging({
        isLoadingAssignedStudentList: false,
        isLoadingLocation: true,
        isLoadingCourse: true,
        isLoadingStudent: true,
        isFiltered: true,
        tableAssignedStudentType: AssignedStudentListTypes.RECURRING,
        mockTest: true,
    });

    it("should show 9 columns", () => {
        renderTableAssignedStudentWithPaging(props);
        const columns = screen.getByTestId("TableBase__header").getElementsByTagName("th");

        expect(columns).toHaveLength(9);
    });

    it("should show loading in columns: location, course and student", () => {
        renderTableAssignedStudentWithPaging(props);
        const loadingSkeleton = screen.queryAllByTestId(
            "TableAssignedStudentWithPaging__loadingSkeleton"
        );

        expect(loadingSkeleton).toHaveLength(3);
    });
});

describe("<TableAssignedStudentWithPaging /> recurring list have full data", () => {
    const props = createMockTableAssignedStudentWithPaging({
        isLoadingAssignedStudentList: false,
        isLoadingLocation: false,
        isLoadingCourse: false,
        isLoadingStudent: false,
        isFiltered: false,
        tableAssignedStudentType: AssignedStudentListTypes.RECURRING,
        mockTest: true,
    });

    beforeEach(() => {
        renderTableAssignedStudentWithPaging(props);
    });

    it("should show 9 columns", () => {
        const columns = screen.getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns).toHaveLength(9);
    });

    it("should have Slot Gap and Week columns", () => {
        const columnWeek = screen.getByTestId("TableAssignedStudentWithPaging__week");
        expect(columnWeek).toBeInTheDocument();
        const columnSlotGap = screen.getByTestId("TableAssignedStudentWithPaging__slotGap");
        expect(columnSlotGap).toBeInTheDocument();
    });

    it("should not show loading in column: location, course and student", () => {
        const loadingSkeleton = screen.queryAllByTestId(
            "TableAssignedStudentWithPaging__loadingSkeleton"
        );

        expect(loadingSkeleton).toHaveLength(0);
    });

    it("should show pagination when there is data", () => {
        const tableFooter = screen.getByTestId("TableBaseFooter");
        expect(tableFooter).toBeInTheDocument();
    });
});

describe("<TableAssignedStudentWithPaging /> slot list have full data", () => {
    const props = createMockTableAssignedStudentWithPaging({
        isLoadingAssignedStudentList: false,
        isLoadingLocation: false,
        isLoadingCourse: false,
        isLoadingStudent: false,
        isFiltered: false,
        tableAssignedStudentType: AssignedStudentListTypes.SLOT,
        mockTest: true,
    });

    beforeEach(() => {
        renderTableAssignedStudentWithPaging(props);
    });

    it("should show 9 columns", () => {
        const columns = screen.getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns).toHaveLength(9);
    });

    it("should have Assigned Slot and Duration columns", () => {
        const columnDuration = screen.getByTestId("TableAssignedStudentWithPaging__duration");
        expect(columnDuration).toBeInTheDocument();
        const columnAssignedSlot = screen.getByTestId(
            "TableAssignedStudentWithPaging__assignedSlot"
        );
        expect(columnAssignedSlot).toBeInTheDocument();
    });

    it("should not show loading in column: location, course and student", () => {
        const loadingSkeleton = screen.queryAllByTestId(
            "TableAssignedStudentWithPaging__loadingSkeleton"
        );

        expect(loadingSkeleton).toHaveLength(0);
    });

    it("should show pagination when there is data", () => {
        const tableFooter = screen.getByTestId("TableBaseFooter");
        expect(tableFooter).toBeInTheDocument();
    });
});

describe("<TableAssignedStudentWithPaging /> has no data", () => {
    const mockAssignedStudentData = createMockTableAssignedStudentWithPaging({
        isLoadingAssignedStudentList: false,
        isLoadingLocation: false,
        isLoadingCourse: false,
        isLoadingStudent: false,
        isFiltered: false,
        tableAssignedStudentType: AssignedStudentListTypes.RECURRING,
        mockTest: true,
    });

    const mockEmptyLessonsListData: TableAssignedStudentWithPagingProps = {
        ...mockAssignedStudentData,
        assignedStudentsList: [],
    };

    it("should show table no data message but not have pagination when there is no data", () => {
        renderTableAssignedStudentWithPaging(mockEmptyLessonsListData);
        const noDataMessage = screen.getByTestId("TableBase__noDataMessage");
        expect(noDataMessage).toBeInTheDocument();

        const tableFooter = screen.queryByTestId("TableBaseFooter");
        expect(tableFooter).not.toBeInTheDocument();
    });
});
