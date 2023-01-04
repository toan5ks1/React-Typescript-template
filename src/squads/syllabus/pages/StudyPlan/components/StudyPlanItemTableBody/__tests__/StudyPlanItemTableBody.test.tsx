import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";

import StudyPlanItemTableBody, { StudyPlanItemTableBodyProps } from "..";
import { StudyPlanItemStatusKey } from "../../../common/constants";

import { render } from "@testing-library/react";

const columns = [
    { key: "colTopicName", title: "" },
    { key: "colLOName", title: "", render: (record: any) => record.loName },
    { key: "colAvailableFrom", title: "" },
    { key: "colAvailableTo", title: "" },
    { key: "colStart", title: "" },
    { key: "colDue", title: "" },
];

const fromDate = new Date(2010, 10, 10);
const toDate = new Date(2020, 10, 10);
const data: StudyPlanItemTableBodyProps["data"] = [
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
];

describe(StudyPlanItemTableBody.name, () => {
    it("should render study plan items grouped by topic correctly", () => {
        const { getAllByTestId } = render(
            <StudyPlanItemTableBody columns={columns} data={data} rowKey="study_plan_item_id" />,
            { container: document.createElement("tbody") }
        );
        const rows = getAllByTestId("TableBase__row");

        expect(rows).toHaveLength(data[0].studyPlanItems.length);
        expect(rows[0].querySelectorAll("td")).toHaveLength(columns.length);
        expect(rows[1].querySelectorAll("td")).toHaveLength(columns.length - 1);
        expect(rows[0].querySelector("td")).toHaveTextContent(data[0].topicName);
        expect(rows[1].querySelector("td")).toHaveTextContent(data[0].studyPlanItems[1].loName);
    });

    it("should render archived study plan items with correct styles", () => {
        const { getAllByTestId } = render(
            <StudyPlanItemTableBody columns={columns} data={data} rowKey="study_plan_item_id" />,
            { container: document.createElement("tbody") }
        );
        const archivedCell = getAllByTestId("TableBase__row")[2].querySelector("td")!;

        expect(archivedCell).toHaveStyle({
            backgroundColor: "rgb(245, 245, 245)",
            color: "rgb(189, 189, 189)",
        });
    });

    it("should not render the topic row if it is empty", () => {
        const { getAllByRole, queryByText } = render(
            <StudyPlanItemTableBody
                columns={columns}
                data={[...data, { topicId: "Topic2", topicName: "Topic 2", studyPlanItems: [] }]}
                rowKey="study_plan_item_id"
            />,
            { container: document.createElement("tbody") }
        );

        expect(queryByText("Topic 2")).not.toBeInTheDocument();
        expect(getAllByRole("row")).toHaveLength(4);
    });
});
