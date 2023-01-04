import { formatDate } from "src/common/utils/time";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";

import CommonTranslationProvider from "src/providers/TranslationProvider";

import StudyPlanItemTable, { StudyPlanItemTableProps } from "..";
import { StudyPlanItemStatusKey } from "../../../common/constants";

import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

const fromDate = new Date(2010, 10, 10);
const toDate = new Date(2020, 10, 10);
const studyPlanItemsByTopic = [
    {
        topicId: "Topic1",
        topicName: "Topic 1",
        studyPlanItems: [
            {
                study_plan_item_id: "StudyPlanItem1",
                loName: "Learning Objective",
                loType: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
                status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
                available_from: fromDate,
                available_to: toDate,
                start_date: fromDate,
                end_date: toDate,
            },
            {
                study_plan_item_id: "StudyPlanItem2",
                loName: "Flash Card",
                loType: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_FLASH_CARD,
                status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
                available_from: fromDate,
                available_to: toDate,
                end_date: toDate,
            },
            {
                study_plan_item_id: "StudyPlanItem3",
                loName: "Offline Study",
                loType: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_OFFLINE_LEARNING,
                status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED,
                available_from: fromDate,
                available_to: toDate,
                start_date: fromDate,
                end_date: toDate,
            },
            {
                study_plan_item_id: "StudyPlanItem4",
                loName: "Assignment",
                status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
                available_from: fromDate,
                available_to: toDate,
                start_date: fromDate,
                end_date: toDate,
            },
        ],
    },
    {
        topicId: "Topic2",
        topicName: "Topic 2",
        studyPlanItems: [
            {
                study_plan_item_id: "StudyPlanItem1",
                loName: "Learning Objective",
                loType: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
                status: "STUDY_PLAN_ITEM_STATUS_ACTIVE",
                available_from: fromDate,
                available_to: toDate,
                start_date: fromDate,
                end_date: toDate,
            },
        ],
    },
] as StudyPlanItemTableProps["studyPlanItems"];
const defaultProps: StudyPlanItemTableProps = {
    isEditing: false,
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
    studyPlanItems: studyPlanItemsByTopic,
};

describe(StudyPlanItemTable.name, () => {
    it("should render table in the correct mode based on isEditing", () => {
        let wrapper = render(
            <CommonTranslationProvider>
                <StudyPlanItemTable {...defaultProps} />
            </CommonTranslationProvider>
        );

        expect(wrapper.getAllByRole("columnheader")).toHaveLength(6);

        wrapper.unmount();
        wrapper = render(
            <CommonTranslationProvider>
                <StudyPlanItemTable {...defaultProps} isEditing />
            </CommonTranslationProvider>
        );

        expect(wrapper.getAllByRole("columnheader")).toHaveLength(7);
    });

    it("should render active and archived items correctly", () => {
        const { getAllByTestId, getAllByText } = render(
            <CommonTranslationProvider>
                <StudyPlanItemTable {...defaultProps} />
            </CommonTranslationProvider>
        );
        const rows = getAllByTestId("TableBase__row");
        const activeItemRow = rows[0];
        const archivedItemRow = rows[2];

        within(activeItemRow)
            .getAllByRole("button")
            .forEach((button) => expect(button).toBeEnabled());

        expect(
            within(activeItemRow).getByText(`${studyPlanItemsByTopic[0].studyPlanItems[0].loName}`)
        ).toBeInTheDocument();

        expect(within(activeItemRow).getAllByRole("cell")[1]).not.toHaveStyle({
            backgroundColor: "rgb(245, 245, 245)",
        });

        within(archivedItemRow)
            .getAllByRole("button")
            .forEach((button) => expect(button).toBeDisabled());

        expect(
            within(archivedItemRow).getByText(
                `${studyPlanItemsByTopic[0].studyPlanItems[2].loName}`
            )
        ).toBeInTheDocument();

        expect(within(archivedItemRow).getAllByRole("cell")[1]).toHaveStyle({
            backgroundColor: "rgb(245, 245, 245)",
        });

        expect(getAllByText(formatDate(fromDate, "yyyy/LL/dd, HH:mm")).length).toBeGreaterThan(0);
        expect(getAllByText(formatDate(toDate, "yyyy/LL/dd, HH:mm")).length).toBeGreaterThan(0);
    });

    it("should render correct rows per page setting", () => {
        const { getByRole } = render(
            <CommonTranslationProvider>
                <StudyPlanItemTable {...defaultProps} />
            </CommonTranslationProvider>,
            { wrapper: TestApp }
        );
        const expectedOptions = ["5", "10", "15"];

        userEvent.click(getByRole("button", { name: "Rows per page: 10" }));

        const options = within(getByRole("listbox")).getAllByRole("option");

        expect(
            options.every(({ textContent }, index) => expectedOptions[index] === textContent)
        ).toEqual(true);
    });
});
