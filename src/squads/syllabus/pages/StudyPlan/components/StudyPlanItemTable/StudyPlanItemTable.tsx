import pick from "lodash/pick";
import { useFormContext } from "react-hook-form";
import { Entities, EurekaEntities } from "src/common/constants/enum";
import { getPrimaryKey } from "src/squads/syllabus/common/helpers/legacy";

import { useTheme } from "@mui/material/styles";
import HookForm from "src/components/Forms/HookForm";
import { TableBase } from "src/components/Table";

import {
    StudyPlanItemFormValues,
    StudyPlanItemsByTopic,
    StudyPlanTopicPagination,
} from "../../common/types";
import { useStudyPlanItemTableColumns } from "../../hooks/studyPlanItemTable";
import StudyPlanItemTableBody from "../StudyPlanItemTableBody";
import StudyPlanItemTableBodyEdit from "../StudyPlanItemTableBody/StudyPlanItemTableBodyEdit";
import { classes, TableContainer } from "../Table/TableContainer";
import { tableStyles } from "../Table/styles";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface StudyPlanItemTableProps {
    isEditing: boolean;
    isFetchingStudyPlanItems: boolean;
    pagination: StudyPlanTopicPagination;
    studyPlanItems: StudyPlanItemsByTopic[];
}

export const StudyPlanItemTable = (props: StudyPlanItemTableProps) => {
    const { isEditing, pagination, isFetchingStudyPlanItems, studyPlanItems } = props;
    const theme = useTheme();

    const {
        formState: { errors },
    } = useFormContext<StudyPlanItemFormValues>();
    const tCourse = useResourceTranslate(Entities.COURSES);

    const viewClasses = pick(classes, ["loNameColumn", "dateColumn", "topicColumn"]);
    const editClasses = pick(classes, [
        "dateEditColumn",
        "topicEditColumn",
        "visibilityEditColumn",
    ]);
    const columns = useStudyPlanItemTableColumns({
        classes: isEditing ? editClasses : viewClasses,
        isEditing,
    });
    const rowKey = getPrimaryKey(EurekaEntities.STUDY_PLAN_ITEMS);

    return (
        <TableContainer>
            <TableBase
                columns={columns}
                data={studyPlanItems}
                errorMessage={
                    errors.studyPlanItem && tCourse("studyPlan.error.dateFormatInvalidGeneric")
                }
                styles={tableStyles(theme)}
                body={{
                    rowKey,
                    loading: isFetchingStudyPlanItems,
                    customBody: isEditing ? (
                        <StudyPlanItemTableBodyEdit data={studyPlanItems} rowKey={rowKey} />
                    ) : (
                        <StudyPlanItemTableBody
                            columns={columns}
                            data={studyPlanItems}
                            rowKey={rowKey}
                        />
                    ),
                }}
                footer={{ pagination, rowsPerPageOptions: [5, 10, 15] }}
                tableProps={{ "data-testid": "StudyPlanItemTable" }}
            />
        </TableContainer>
    );
};

const StudyPlanItemTableView = (props: StudyPlanItemTableProps) => (
    <HookForm>
        <StudyPlanItemTable {...props} />
    </HookForm>
);

export default StudyPlanItemTableView;
