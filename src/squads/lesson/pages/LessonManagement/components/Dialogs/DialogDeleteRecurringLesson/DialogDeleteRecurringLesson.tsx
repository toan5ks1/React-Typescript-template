import { ERPModules } from "src/common/constants/enum";

import { Box } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import RadioGroupHF from "src/squads/lesson/components/RadioGroups/RadioGroupHF";
import WrapperHF from "src/squads/lesson/pages/LessonManagement/components/Wrappers/WrapperHF/WrapperHF";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate/index";
import {
    LessonSavingMethodKeys,
    LessonSavingMethodType,
} from "src/squads/lesson/pages/LessonManagement/common/types";

export interface DialogDeleteRecurringLessonProps
    extends Pick<DialogWithHeaderFooterProps, "open" | "onClose"> {
    onSave: (value: LessonSavingMethodType) => void;
}

export interface FormDeleteRecurringLessonRenderProps {
    methodDeleteRecurringLesson: LessonSavingMethodType;
}

const DialogDeleteRecurringLesson = (props: DialogDeleteRecurringLessonProps) => {
    const { onSave } = props;
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const t = useTranslate();

    const handleSave = (data: FormDeleteRecurringLessonRenderProps) => {
        onSave(data.methodDeleteRecurringLesson);
    };

    return (
        <WrapperHF<FormDeleteRecurringLessonRenderProps>
            defaultValues={{
                methodDeleteRecurringLesson:
                    LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
            }}
            render={({ handleSubmit }) => {
                return (
                    <DialogWithHeaderFooter
                        {...props}
                        textSave={t("ra.action.delete")}
                        title={tLessonManagement("recurringLesson.deleteRecurringLessons")}
                        data-testid="DialogDeleteRecurringLessonMethod__dialog"
                        footerConfirmButtonProps={{ color: "error" }}
                        onSave={handleSubmit(handleSave)}
                    >
                        <Box pb={1}>
                            <TypographyTextSecondary variant="body1">
                                {tLessonManagement(
                                    "recurringLesson.titleWarningDeleteRecurringLessons"
                                )}
                            </TypographyTextSecondary>
                        </Box>
                        <RadioGroupHF
                            directionGird="column"
                            name="methodDeleteRecurringLesson"
                            data-testid="DialogDeleteRecurringLesson__radioRecurringLesson"
                            options={[
                                {
                                    id: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
                                    value: tLessonManagement("recurringLesson.onlyThisLesson"),
                                },
                                {
                                    id: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE,
                                    value: tLessonManagement(
                                        "recurringLesson.thisAndTheFollowingLessons"
                                    ),
                                },
                            ]}
                        />
                    </DialogWithHeaderFooter>
                );
            }}
        />
    );
};

export default DialogDeleteRecurringLesson;
