import StudyPlanItemTableBody, { StudyPlanItemTableBodyProps } from ".";
import { useStudyPlanItemTableColumns } from "../../hooks/studyPlanItemTable";

export interface StudyPlanItemTableBodyEditProps
    extends Omit<StudyPlanItemTableBodyProps, "columns"> {
    isShowCheckbox?: boolean;
}

const StudyPlanItemTableBodyEdit = ({ data, rowKey }: StudyPlanItemTableBodyEditProps) => {
    const columns = useStudyPlanItemTableColumns({
        classes: {},
        isEditing: true,
        sxStyles: {
            padding: { padding: "6px 16px" },
            visibilityEditColumn: {
                textAlign: "center",
            },
        },
    });

    return <StudyPlanItemTableBody columns={columns} data={data} rowKey={rowKey} />;
};

export default StudyPlanItemTableBodyEdit;
