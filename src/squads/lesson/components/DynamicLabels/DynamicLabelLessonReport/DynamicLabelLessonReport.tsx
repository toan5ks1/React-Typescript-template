import { ReactElement } from "react";

import { LabelComponentType } from "src/squads/lesson/common/constants";
import {
    ComponentType,
    DynamicFieldProps,
    DynamicLabelValue,
} from "src/squads/lesson/common/types";

import DynamicLabelBase from "src/squads/lesson/components/DynamicLabels/DynamicLabelBase";

const LessonReportIndividualDynamicLabelMap = {
    [ComponentType.TYPOGRAPHY]: LabelComponentType.TYPOGRAPHY,
    [ComponentType.TEXT_FIELD_PERCENTAGE]: LabelComponentType.TYPOGRAPHY_WITH_VALUE_PERCENTAGE,
    [ComponentType.AUTOCOMPLETE]: LabelComponentType.TYPOGRAPHY_WITH_VALUE,
    [ComponentType.TEXT_FIELD]: LabelComponentType.TYPOGRAPHY_WITH_VALUE,
    [ComponentType.TEXT_FIELD_AREA]: LabelComponentType.TYPOGRAPHY_WITH_VALUE,
};

interface DynamicLabelLessonReportProps {
    field: DynamicFieldProps;
    dynamicLessonReportData: DynamicLabelValue[];
}
const DynamicLabelLessonReport = (props: DynamicLabelLessonReportProps): ReactElement => {
    const { field, dynamicLessonReportData } = props;

    return (
        <DynamicLabelBase
            field={field}
            dynamicData={dynamicLessonReportData}
            labelComponentType={LessonReportIndividualDynamicLabelMap[field.component_config.type]}
        />
    );
};

export default DynamicLabelLessonReport;
