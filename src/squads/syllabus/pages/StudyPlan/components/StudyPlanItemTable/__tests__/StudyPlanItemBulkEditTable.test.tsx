import { mockStudyPlanItemsTableData } from "src/squads/syllabus/test-utils/study-plan";

import HookForm from "src/components/Forms/HookForm";
import MuiPickersUtilsProvider from "src/providers/MuiPickersUtilsProvider";

import {
    StudyPlanItemBulkEditTable,
    StudyPlanItemBulkEditTableProps,
} from "../StudyPlanItemBulkEditTable";
import { StudyPlanItemTableProps } from "../StudyPlanItemTable";

import { render, RenderResult, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestTranslationProvider from "src/squads/syllabus/test-utils/translate/TestTranslationProvider";

const data = mockStudyPlanItemsTableData({});

const defaultProps: StudyPlanItemBulkEditTableProps = {
    isFetchingStudyPlanItems: false,
    pagination: {
        count: -1,
        limit: 10,
        offset: 0,
        onPageChange: () => {},
        onRowsPerPageChange: () => {},
        page: 0,
        rowsPerPage: 10,
    },
    studyPlanItems: data,
};

const renderTable = (props: Partial<StudyPlanItemTableProps> = {}) => {
    return render(
        <MuiPickersUtilsProvider>
            <TestTranslationProvider>
                <HookForm>
                    <StudyPlanItemBulkEditTable {...defaultProps} {...props} />
                </HookForm>
            </TestTranslationProvider>{" "}
        </MuiPickersUtilsProvider>,
        { wrapper: TestApp }
    );
};

describe(StudyPlanItemBulkEditTable.name, () => {
    beforeEach(() => {
        renderTable();
    });

    it("should render table in Edit mode", () => {
        expect(screen.getAllByRole("columnheader")).toHaveLength(7);
        screen.getAllByRole("checkbox").forEach((checkbox) => expect(checkbox).toBeInTheDocument());
    });

    it("should render active and archived items correctly", () => {
        const rows = screen.getAllByTestId("TableBase__row");
        const activeItemRow = rows[0];
        const archivedItemRow = rows[2];

        expect(
            within(activeItemRow).getByText(`${data[0].studyPlanItems[0].loName}`)
        ).toBeInTheDocument();

        expect(within(activeItemRow).getAllByRole("cell")[1]).not.toHaveStyle({
            backgroundColor: "rgb(245, 245, 245)",
        });

        expect(
            within(archivedItemRow).getByText(`${data[0].studyPlanItems[2].loName}`)
        ).toBeInTheDocument();

        expect(within(archivedItemRow).getAllByRole("cell")[1]).toHaveStyle({
            backgroundColor: "rgb(245, 245, 245)",
        });
    });

    it("should render correct rows per page setting", () => {
        const expectedOptions = ["5", "10", "15"];

        userEvent.click(screen.getByRole("button", { name: /rows_per_page 10/i }));

        const options = within(screen.getByRole("listbox")).getAllByRole("option");

        expect(
            options.every(({ textContent }, index) => expectedOptions[index] === textContent)
        ).toEqual(true);
    });
});

describe(`${StudyPlanItemBulkEditTable.name} select study plan items`, () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = renderTable();
    });

    it("should check or un-check all items when toggle table header checkbox", () => {
        const { baseElement } = wrapper;

        const header = screen.getByTestId("TableBase__header");
        const checkbox = header.querySelector("input[type=checkbox]") as HTMLInputElement;

        userEvent.click(checkbox);

        const allCheckboxes = baseElement.querySelectorAll("input[type=checkbox]");
        allCheckboxes.forEach((checkbox) => {
            expect(checkbox).toBeChecked();
        });

        userEvent.click(checkbox);

        allCheckboxes.forEach((checkbox) => {
            expect(checkbox).not.toBeChecked();
        });
    });

    it("should check or un-check all items when toggle topic checkbox", () => {
        const topicCheckbox = screen.getByText(/Topic 1/i);

        const tableBody = wrapper.getByTestId("TableBaseBody__root");
        const allCheckboxes = tableBody.getElementsByClassName("Mui-checked");

        // In initial no checkbox checked
        expect(allCheckboxes).toHaveLength(0);

        // select all items in topic
        userEvent.click(topicCheckbox);

        expect(allCheckboxes).toHaveLength(5); // includes topic checkbox
        // Click again to unselect all items in topic
        userEvent.click(topicCheckbox);
        expect(allCheckboxes).toHaveLength(0);
    });

    // Scence: Click on topic checkbox then click to 1 item in topic
    it("should reduce one selected item ", () => {
        const topicCheckbox = screen.getByText(/Topic 1/i);
        userEvent.click(topicCheckbox);

        const tableBody = wrapper.getByTestId("TableBaseBody__root");
        const allCheckboxes = tableBody.getElementsByClassName("Mui-checked");

        expect(allCheckboxes).toHaveLength(5);

        const itemCheckbox = screen.getByText(/Learning Objective/i);
        userEvent.click(itemCheckbox);

        expect(allCheckboxes).toHaveLength(4);
    });

    it("should check or un-check item when tick on a study plan item checkbox", () => {
        const itemCheckbox = screen.getByText(/Learning Objective/i);

        userEvent.click(itemCheckbox);

        const tableBody = wrapper.getByTestId("TableBaseBody__root");
        const allCheckboxes = tableBody.getElementsByClassName("Mui-checked");

        expect(allCheckboxes).toHaveLength(2);

        userEvent.click(itemCheckbox);
        expect(allCheckboxes).toHaveLength(0);
    });

    // Scence: click 1 item, then click to topic
    it("should selected all items when tick on topic checkbox with one item in topic pre-selected", () => {
        const itemCheckbox = screen.getByText(/Learning Objective/i);

        userEvent.click(itemCheckbox);

        const topicCheckbox = screen.getByText(`${data[0].topicName}`);
        userEvent.click(topicCheckbox);

        const tableBody = screen.getByTestId("TableBaseBody__root");
        const allCheckboxes = tableBody.getElementsByClassName("Mui-checked");
        expect(allCheckboxes).toHaveLength(5);
    });
});
