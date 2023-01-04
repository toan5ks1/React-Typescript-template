import { ReactElement } from "react";

import { arrayHasItem } from "src/common/utils/other";
import {
    DynamicFieldProps,
    LessonReportDetailOfStudent,
    LessonReportIndividualDynamicComponentType,
} from "src/squads/lesson/common/types";

import { Grid } from "@mui/material";
import DynamicLabelAttendanceRemark from "src/squads/lesson/components/DynamicLabels/DynamicLabelAttendanceRemark";
import DynamicLabelAttendanceStatus from "src/squads/lesson/components/DynamicLabels/DynamicLabelAttendanceStatus";
import DynamicLabelLessonReport from "src/squads/lesson/components/DynamicLabels/DynamicLabelLessonReport";

export interface DetailSectionPreviousReportInfoIndProps {
    fields: DynamicFieldProps[];
    dynamicLessonReportData: LessonReportDetailOfStudent["dynamicLessonReportData"];
}

const DetailSectionPreviousReportInfoInd = (props: DetailSectionPreviousReportInfoIndProps) => {
    const { fields, dynamicLessonReportData } = props;

    if (!arrayHasItem(fields)) return <></>;

    const handleRenderDynamicSection = (field: DynamicFieldProps): ReactElement => {
        switch (field.component_config.type) {
            case LessonReportIndividualDynamicComponentType.ATTENDANCE_STATUS: {
                return <DynamicLabelAttendanceStatus dynamicData={dynamicLessonReportData} />;
            }

            case LessonReportIndividualDynamicComponentType.ATTENDANCE_REMARK: {
                return <DynamicLabelAttendanceRemark dynamicData={dynamicLessonReportData} />;
            }

            default:
                return (
                    <DynamicLabelLessonReport
                        field={field}
                        dynamicLessonReportData={dynamicLessonReportData}
                    />
                );
        }
    };

    return (
        <Grid container item spacing={2}>
            {fields.map((field) => {
                return (
                    <Grid item {...field.display_config.size} key={field.field_id}>
                        {handleRenderDynamicSection(field)}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default DetailSectionPreviousReportInfoInd;
