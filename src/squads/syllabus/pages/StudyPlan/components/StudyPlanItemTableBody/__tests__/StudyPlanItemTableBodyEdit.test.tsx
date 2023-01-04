import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";

import { Table, TableBody } from "@mui/material";
import { TableColumn } from "src/components/Table";

import { StudyPlanItemStatusKey } from "../../../common/constants";
import { StudyPlanItemWithLoInfo } from "../../../common/types";
import StudyPlanItemTableBodyEdit, {
    StudyPlanItemTableBodyEditProps,
} from "../StudyPlanItemTableBodyEdit";

import { render } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

const fromDate = new Date(2010, 10, 10);
const toDate = new Date(2020, 10, 10);
const data: StudyPlanItemTableBodyEditProps["data"] = [
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
                study_plan_item_id: "StudyPlanItem5",
                loName: "Learning Objective",
                loType: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
                status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
                available_from: fromDate,
                available_to: toDate,
                start_date: fromDate,
                end_date: toDate,
            },
            {
                study_plan_item_id: "StudyPlanItem6",
                loName: "Flash Card",
                loType: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_FLASH_CARD,
                status: StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE,
                available_from: fromDate,
                available_to: toDate,
                end_date: toDate,
            },
        ],
    },
];
const numRows = data.reduce((previous, current) => previous + current.studyPlanItems.length, 0);

describe(StudyPlanItemTableBodyEdit.name, () => {
    it("should render the structure correctly", () => {
        const mockColumns: TableColumn<StudyPlanItemWithLoInfo>[] = [
            { key: "colTopicName" },
            { key: "colLoName" },
            { key: "colAvailableFrom" },
            { key: "colAvailableUntil" },
            { key: "colStart" },
            { key: "colDue" },
            { key: "colVisibility" },
        ];
        const numCells = data.reduce(
            (previous, current) => previous + current.studyPlanItems.length * mockColumns.length,
            0
        );

        jest.mock("../../../hooks/studyPlanItemTable/useStudyPlanItemTableColumns", () => ({
            __esModule: true,
            default: () => mockColumns,
        }));

        const { getAllByRole } = render(
            <TestApp>
                <TestHookFormProvider>
                    <Table>
                        <TableBody>
                            <StudyPlanItemTableBodyEdit data={data} rowKey={"study_plan_item_id"} />
                        </TableBody>
                    </Table>
                </TestHookFormProvider>
            </TestApp>
        );

        expect(getAllByRole("row")).toHaveLength(numRows);

        // 3 cells from the first group and 1 cell from the second group are merged
        expect(getAllByRole("cell")).toHaveLength(numCells - 3 - 1);
    });

    it("should render study plan item controls correctly", () => {
        const { getAllByRole } = render(
            <TestApp>
                <TestHookFormProvider>
                    <Table>
                        <TableBody>
                            <StudyPlanItemTableBodyEdit data={data} rowKey={"study_plan_item_id"} />
                        </TableBody>
                    </Table>
                </TestHookFormProvider>
            </TestApp>
        );

        expect(getAllByRole("textbox")).toHaveLength(numRows * 4);

        // Plus 1 from TestHookFormProvider
        expect(getAllByRole("button")).toHaveLength(numRows * 2 + 1);
    });
});
