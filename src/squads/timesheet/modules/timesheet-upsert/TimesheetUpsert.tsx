import { Entities, ERPModules, ModeOpenDialog, NotifyTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { MicroFrontendTypes } from "src/routing/type";
import { TimesheetInformation, UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";

import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import FormTimesheetInfo from "src/squads/timesheet/modules/timesheet-upsert/components/FormTimesheetInfo";

import useRedirect from "src/squads/timesheet/hooks/useRedirect";
import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";
import useTimesheetUpsert from "src/squads/timesheet/modules/timesheet-upsert/hooks/useTimesheetUpsert";
import useTimesheetUpsertFormMethods from "src/squads/timesheet/modules/timesheet-upsert/hooks/useTimesheetUpsertFormMethods";

export interface TimesheetUpsertProps {
    open: boolean;
    mode: ModeOpenDialog;
    timesheet?: TimesheetInformation;
    onClose: () => void;
    onSave?: () => void;
}

const TimesheetUpsert = (props: TimesheetUpsertProps) => {
    const { open, mode, timesheet, onClose, onSave } = props;
    const history = useRedirect();

    const t = useTranslate();

    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);

    const showSnackbar = useShowSnackbar();

    const timesheetUpsertFormMethods = useTimesheetUpsertFormMethods(timesheet, mode);

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = timesheetUpsertFormMethods;

    const handleOnSuccess = () => {
        onClose();
    };

    const { createTimesheet, updateTimesheet } = useTimesheetUpsert({ mode });

    const handleUpsertTimesheet = async (formData: UpsertTimesheetFormProps) => {
        try {
            if (mode === ModeOpenDialog.ADD) {
                return await createTimesheet(
                    { formData },
                    {
                        onSuccess: (resp) => {
                            handleOnSuccess();
                            if ("timesheetId" in resp && resp.timesheetId) {
                                history.push(
                                    `/${MicroFrontendTypes.TIMESHEET}/${Entities.TIMESHEET_MANAGEMENT}/${resp.timesheetId}/show`
                                );
                            } else {
                                showSnackbar(t("resources.common.createdFail"), NotifyTypes.ERROR);
                            }
                        },
                    }
                );
            }

            return await updateTimesheet(
                {
                    formData,
                },
                {
                    onSuccess: (resp) => {
                        if ("success" in resp && resp.success) {
                            onClose();
                            if (onSave) onSave();
                        } else {
                            showSnackbar(t("resources.common.updatedFail"), NotifyTypes.ERROR);
                        }
                    },
                }
            );
        } catch (err) {
            window.warner?.warn("Upsert a timesheet error", err);
            const error = handleUnknownError(err);
            showSnackbar(t(error.message), "error");
        }
    };

    return (
        <DialogFullScreenHF
            title={tTimesheetManagement(
                mode === ModeOpenDialog.ADD ? "titles.createTimesheet" : "titles.editTimesheet"
            )}
            open={open}
            onClose={onClose}
            onSave={handleSubmit(handleUpsertTimesheet)}
            methods={timesheetUpsertFormMethods}
            isShowingBackdrop={isSubmitting}
            dialogCancelConfirmProps={{
                textSave: t("resources.action.leave"),
            }}
            textSave={t("resources.action.save")}
            textClose={t("resources.action.cancel")}
            data-testid="DialogFullScreenHF__container"
        >
            <PaperSectionWrapper>
                <FormTimesheetInfo mode={mode} timesheet={timesheet} />
            </PaperSectionWrapper>
        </DialogFullScreenHF>
    );
};

export default TimesheetUpsert;
