import { useState } from "react";

import get from "lodash/get";
import { useFormState } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { PartnerFormConfigLatestQueried } from "src/squads/lesson/common/types";

import { Grid } from "@mui/material";
import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import { TableActions } from "src/components/Table";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import ListStudent from "src/squads/lesson/components/Lists/ListStudent";
import DialogBulkUpdateAttendance from "src/squads/lesson/pages/LessonManagement/components/Dialogs/DialogBulkUpdateAttendance";
import FormSectionReportStack from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionReportStack";
import WrapperCenter from "src/squads/lesson/pages/LessonManagement/components/Wrappers/WrapperCenter";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import { LessonManagementReportsIndividualData } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface FormLessonReportIndProps {
    isLoadingData: boolean;
    lessonReportData: LessonManagementReportsIndividualData;
    partnerFormConfig: PartnerFormConfigLatestQueried | undefined;
    errorGetPartnerFormConfig?: Error;
}

const FormLessonReportInd = (props: FormLessonReportIndProps) => {
    const { isLoadingData, lessonReportData, partnerFormConfig, errorGetPartnerFormConfig } = props;
    const { students, lessonId, lessonReportId } = lessonReportData;

    const [selectedStudent, setSelectedStudent] = useState<
        ArrayElement<LessonManagementReportsIndividualData["students"]>
    >(students[0]);
    const [isOpenBulkAction, setIsOpenBulkAction] = useState<boolean>(false);

    const { errors } = useFormState<LessonManagementReportsIndividualData>();

    const showSnackbar = useShowSnackbar();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const handleSaveBulkUpdateAttendance = () => {
        setIsOpenBulkAction(false);
        showSnackbar(tLessonManagement("messages.bulkActionSuccessfully"));
    };

    if (isLoadingData && !partnerFormConfig) {
        return (
            <WrapperCenter>
                <CircularProgressBase />
            </WrapperCenter>
        );
    }

    if (partnerFormConfig && !errorGetPartnerFormConfig) {
        return (
            <PaperSectionWrapper>
                <TableActions
                    data-testid="FormLessonReportInd__tableAction"
                    title={tLessonManagement("lessonReport")}
                    ButtonAddProps={{
                        onClick: () => setIsOpenBulkAction(true),
                        children: tLessonManagement("actions.bulkAction"),
                        startIcon: null,
                    }}
                    shouldShowDeleteButton={false}
                />

                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <ListStudent
                            onSelect={setSelectedStudent}
                            students={students}
                            errors={get(errors, "lessonReportDetails")}
                        />
                    </Grid>

                    <Grid item xs={8}>
                        <FormSectionReportStack
                            lessonId={lessonId}
                            lessonReportId={lessonReportId}
                            students={students}
                            selectedStudent={selectedStudent}
                            partnerFormConfig={partnerFormConfig}
                        />
                    </Grid>
                </Grid>

                {isOpenBulkAction && (
                    <DialogBulkUpdateAttendance
                        open={isOpenBulkAction}
                        onClose={() => setIsOpenBulkAction(false)}
                        onSave={handleSaveBulkUpdateAttendance}
                        students={students}
                    />
                )}
            </PaperSectionWrapper>
        );
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

export default FormLessonReportInd;
