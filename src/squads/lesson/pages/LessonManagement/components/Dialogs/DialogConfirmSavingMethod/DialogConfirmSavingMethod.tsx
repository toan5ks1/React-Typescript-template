import { ERPModules } from "src/common/constants/enum";

import { Box } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import RadioGroupHF from "src/squads/lesson/components/RadioGroups/RadioGroupHF";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import { LessonSavingMethodKeys } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface DialogConfirmSavingMethodProps
    extends Pick<DialogWithHeaderFooterProps, "open" | "onSave" | "onClose"> {}

const DialogConfirmSavingMethod = (props: DialogConfirmSavingMethodProps) => {
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    return (
        <DialogWithHeaderFooter
            {...props}
            title={tLessonManagement("recurringLesson.editRecurringLessons")}
            data-testid="DialogConfirmSavingMethod__dialog"
            maxWidth="xs"
            minWidthBox="xs"
        >
            <Box pb={1}>
                <TypographyTextSecondary variant="caption">
                    {tLessonManagement("recurringLesson.pleaseSelectAnOptionToSave")}
                </TypographyTextSecondary>
            </Box>
            <RadioGroupHF
                name="methodSaving"
                data-testid="DialogConfirmSavingMethod__radioRecurringLesson"
                options={[
                    {
                        id: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
                        value: tLessonManagement("recurringLesson.onlyThisLesson"),
                    },
                    {
                        id: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE,
                        value: tLessonManagement("recurringLesson.thisAndTheFollowingLessons"),
                    },
                ]}
                onChange={() => {}}
            />
        </DialogWithHeaderFooter>
    );
};

export default DialogConfirmSavingMethod;
