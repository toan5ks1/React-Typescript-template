import { useMemo } from "react";

import pick from "lodash/pick";
import { useFormContext } from "react-hook-form";
import { Entities } from "src/common/constants/enum";

import { useTheme } from "@mui/material/styles";
import TableWithCheckbox from "src/components/Table/TableWithCheckbox";

import { StudyPlanItemFormValues, StudyPlanItemWithLoInfo } from "../../common/types";
import {
    useBulkSelectStudyPlanItems,
    useStudyPlanItemTableColumns,
} from "../../hooks/studyPlanItemTable";
import StudyPlanItemTableBodyBulkEdit from "../StudyPlanItemTableBody/StudyPlanItemTableBodyBulkEdit";
import { classes, TableContainer } from "../Table/TableContainer";
import { tableStyles } from "../Table/styles";
import { BulkActions } from "./BulkActions";
import { StudyPlanItemTableProps } from "./StudyPlanItemTable";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

// TODO: Optimize performance
// - Restutructure table to keep depenencies as much as posible
// - Restructure list data to flat map to avoid multi-level nested

const rowsPerPageOptions = [5, 10, 15];
const rowKey = "topicId";

const editClasses = pick(classes, ["dateEditColumn", "topicEditColumn", "visibilityEditColumn"]);

export interface StudyPlanItemBulkEditTableProps
    extends Omit<StudyPlanItemTableProps, "isEditing"> {}

export const StudyPlanItemBulkEditTable = ({
    pagination,
    isFetchingStudyPlanItems,
    studyPlanItems,
}: StudyPlanItemBulkEditTableProps) => {
    const theme = useTheme();
    const styles = tableStyles(theme);

    const {
        formState: { errors },
    } = useFormContext<StudyPlanItemFormValues>();

    const tCourse = useResourceTranslate(Entities.COURSES);

    const columns = useStudyPlanItemTableColumns({
        classes: editClasses,
        isEditing: true,
    });

    const { selectedList, handleSelectTopic, handleSelectItem, setSelectedList } =
        useBulkSelectStudyPlanItems();

    const selectedItems = useMemo(() => {
        return selectedList.reduce((acc: StudyPlanItemWithLoInfo[], current) => {
            return current.studyPlanItems ? [...acc, ...current.studyPlanItems] : acc;
        }, []);
    }, [selectedList]);

    return (
        <>
            <BulkActions selectedItems={selectedItems} />
            <TableContainer>
                <TableWithCheckbox
                    columns={columns}
                    data={studyPlanItems}
                    errorMessage={
                        errors.studyPlanItem && tCourse("studyPlan.error.dateFormatInvalidGeneric")
                    }
                    styles={styles}
                    body={{
                        rowKey,
                        loading: isFetchingStudyPlanItems,
                        customBody: (
                            <StudyPlanItemTableBodyBulkEdit
                                selectedTopics={selectedList}
                                selectedItems={selectedItems}
                                data={studyPlanItems}
                                onSelectTopic={handleSelectTopic}
                                onSelectSPItem={handleSelectItem}
                            />
                        ),
                    }}
                    footer={{ pagination, rowsPerPageOptions }}
                    tableProps={{ "data-testid": "StudyPlanItemBulkEditTable" }}
                    onSelect={setSelectedList}
                    listSelectedItems={selectedList}
                />
            </TableContainer>
        </>
    );
};
