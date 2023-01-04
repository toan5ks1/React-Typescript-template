import { useMemo } from "react";

import { LessonForLessonReportQueried } from "src/squads/lesson/common/types";

import ButtonPreviousReportGroup from "src/squads/lesson/components/Buttons/ButtonPreviousReportGroup";
import DynamicFieldBaseV2 from "src/squads/lesson/pages/LessonManagement/components/DynamicFields/DynamicFieldBaseV2";
import ToggleTableLessonReportGrp from "src/squads/lesson/pages/LessonManagement/components/Toggles/ToggleTableLessonReportGrp";

import {
    DynamicField,
    StaticFieldComponent,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import useGetDynamicFieldProps from "src/squads/lesson/pages/LessonManagement/hooks/useGetDynamicFieldProps";

export interface DynamicFieldLessonReportGrpProps {
    dynamicField: DynamicField;
    studentsList: LessonForLessonReportQueried["lesson_members"];
}

const DynamicFieldLessonReportGrp = (props: DynamicFieldLessonReportGrpProps) => {
    const { dynamicField, studentsList } = props;

    const { getToggleTableProps } = useGetDynamicFieldProps({});

    const dynamicLessonReportGrpComponent = useMemo(() => {
        const componentType = dynamicField.component_config.type;

        switch (componentType) {
            case StaticFieldComponent.ATTENDANCE_STATUS:
            case StaticFieldComponent.ATTENDANCE_REMARK:
            case StaticFieldComponent.LINK_VIEW_STUDY_PLAN:
                return null;

            case StaticFieldComponent.BUTTON_PREVIOUS_REPORT:
                return <ButtonPreviousReportGroup />;

            case StaticFieldComponent.TOGGLE_TABLE: {
                const componentProps = getToggleTableProps(dynamicField);

                return (
                    <ToggleTableLessonReportGrp {...componentProps} studentsList={studentsList} />
                );
            }

            default:
                return (
                    <DynamicFieldBaseV2
                        nameHF={`dynamicFieldDetails.${dynamicField.field_id}`}
                        componentType={componentType}
                        dynamicField={dynamicField}
                    />
                );
        }
    }, [dynamicField, getToggleTableProps, studentsList]);

    return dynamicLessonReportGrpComponent;
};

export default DynamicFieldLessonReportGrp;
