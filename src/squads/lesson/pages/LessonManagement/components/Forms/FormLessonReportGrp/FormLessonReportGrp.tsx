import { useMemo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import {
    LessonForLessonReportQueried,
    PartnerFormConfigLatestQueried,
} from "src/squads/lesson/common/types";

import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import FormSectionLessonReportGrp from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionLessonReportGrp";
import WrapperCenter from "src/squads/lesson/pages/LessonManagement/components/Wrappers/WrapperCenter";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import { isLastItemInArray } from "src/squads/lesson/pages/LessonManagement/common/array-utils";
import { DynamicFormSection } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface FormLessonReportGrpProps {
    isLoading: boolean;
    reportFormConfig: PartnerFormConfigLatestQueried | undefined;
    errorGetReportFormConfig?: Error;
    studentsList: LessonForLessonReportQueried["lesson_members"];
}

const FormLessonReportGrp = (props: FormLessonReportGrpProps) => {
    const { isLoading, errorGetReportFormConfig, reportFormConfig, studentsList } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const dynamicSections = useMemo(() => {
        const sectionsConfig: DynamicFormSection[] =
            reportFormConfig?.form_config_data?.sections || [];

        if (!arrayHasItem(sectionsConfig)) return null;

        const sections = sectionsConfig.map((section, index) => (
            <FormSectionLessonReportGrp
                key={section.section_id}
                configSection={section}
                studentsList={studentsList}
                isLastSection={!isLastItemInArray(index, sectionsConfig.length)}
            />
        ));

        return sections;
    }, [reportFormConfig?.form_config_data?.sections, studentsList]);

    if (isLoading && !reportFormConfig) {
        return (
            <WrapperCenter>
                <CircularProgressBase />
            </WrapperCenter>
        );
    }

    if (reportFormConfig && !errorGetReportFormConfig) {
        return <PaperSectionWrapper>{dynamicSections}</PaperSectionWrapper>;
    }

    return (
        <WrapperCenter>
            <TypographyPrimary>
                {tLessonManagement("errors.errorWhileFetchingFormConfig", {
                    message: tLessonManagement("errors.canNotGetPartnerFormConfig"),
                })}
            </TypographyPrimary>
        </WrapperCenter>
    );
};

export default FormLessonReportGrp;
