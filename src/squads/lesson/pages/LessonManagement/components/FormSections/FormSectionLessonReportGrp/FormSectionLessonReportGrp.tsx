import { useMemo } from "react";

import { arrayHasItem } from "src/common/utils/other";
import { LessonForLessonReportQueried } from "src/squads/lesson/common/types";

import { Grid } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import WrapperDividerSection from "src/squads/lesson/components/Wrappers/WrapperDividerSection";
import DynamicFieldLessonReportGrp from "src/squads/lesson/pages/LessonManagement/components/DynamicFields/DynamicFieldLessonReportGrp";

import { DynamicFormSection } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface FormReportDetailGroupProps {
    configSection: DynamicFormSection;
    studentsList: LessonForLessonReportQueried["lesson_members"];
    isLastSection: boolean;
}

const FormSectionLessonReportGrp = (props: FormReportDetailGroupProps) => {
    const {
        studentsList,
        isLastSection,
        configSection: { section_id, fields },
    } = props;

    const dynamicFields = useMemo(() => {
        if (!arrayHasItem(fields)) return [];

        const mapFields = fields.map((dynamicField) => {
            const gridSize = dynamicField.display_config.grid_size || {};

            return (
                <Grid item {...gridSize} key={dynamicField.field_id}>
                    <DynamicFieldLessonReportGrp
                        dynamicField={dynamicField}
                        studentsList={studentsList}
                    />
                </Grid>
            );
        });

        return mapFields;
    }, [fields, studentsList]);

    if (!arrayHasItem(dynamicFields)) return null;

    return (
        <Grid container spacing={2} key={section_id} mb={1}>
            {dynamicFields}

            {isLastSection ? (
                <Grid item xs={12}>
                    <WrapperDividerSection>
                        <DividerDashed />
                    </WrapperDividerSection>
                </Grid>
            ) : null}
        </Grid>
    );
};

export default FormSectionLessonReportGrp;
