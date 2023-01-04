import { mockStudyPlanItemsTableData } from "src/squads/syllabus/test-utils/study-plan";

import { Table, TableBody } from "@mui/material";
import { TableColumn } from "src/components/Table";

import { StudyPlanItemWithLoInfo } from "../../../common/types";
import StudyPlanItemTableBodyBulkEdit from "../StudyPlanItemTableBodyBulkEdit";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

const data = mockStudyPlanItemsTableData({});

const numRows = data.reduce((previous, current) => previous + current.studyPlanItems.length, 0);

const mockColumns: TableColumn<StudyPlanItemWithLoInfo>[] = [
    { key: "colTopicName" },
    { key: "colLoName" },
    { key: "colAvailableFrom" },
    { key: "colAvailableUntil" },
    { key: "colStart" },
    { key: "colDue" },
    { key: "colVisibility" },
];

jest.mock("../../../hooks/studyPlanItemTable/useStudyPlanItemTableColumns", () => ({
    __esModule: true,
    default: () => mockColumns,
}));

describe(StudyPlanItemTableBodyBulkEdit.name, () => {
    it("should render study plan items grouped by topic correctly", () => {
        render(
            <TestApp>
                <TestHookFormProvider>
                    <Table>
                        <TableBody>
                            <StudyPlanItemTableBodyBulkEdit
                                data={data}
                                selectedTopics={[data[0]]}
                                selectedItems={data[0].studyPlanItems}
                                onSelectSPItem={jest.fn}
                                onSelectTopic={jest.fn}
                            />
                        </TableBody>
                    </Table>
                </TestHookFormProvider>
            </TestApp>
        );

        expect(screen.getAllByRole("row")).toHaveLength(numRows);
    });
});
