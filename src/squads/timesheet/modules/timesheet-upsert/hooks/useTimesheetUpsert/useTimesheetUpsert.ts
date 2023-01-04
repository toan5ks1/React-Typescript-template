import { useCallback, useMemo } from "react";

import { ERPModules, ModeOpenDialog, NotifyTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { combineDateAndTime } from "src/common/utils/time";
import { grpcErrorsMap } from "src/internals/grpc";
import { convertString } from "src/squads/timesheet/common/constants/helper";
import { OtherWorkingHour, UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";
import { isTeacher } from "src/squads/timesheet/internals/permission";
import { inferMutation } from "src/squads/timesheet/service/infer-service";
import { NsTimesheetTimesheetService } from "src/squads/timesheet/service/timesheet/timesheet-service/types";

import { OtherWorkingHoursRequest } from "manabuf/timesheet/v1/timesheet_pb";

import { UseMutationOptions } from "@manabie-com/react-utils";
import useGetLocalProfile from "src/squads/timesheet/hooks/useGetLocalProfile";
import useResourceTranslate from "src/squads/timesheet/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export interface useTimesheetUpsertProps {
    mode: ModeOpenDialog;
}

export type UpsertMutationOptions = UseMutationOptions<
    NsTimesheetTimesheetService.CreateTimesheetReq | NsTimesheetTimesheetService.UpdateTimesheetReq,
    | NsTimesheetTimesheetService.CreateTimesheetResp
    | NsTimesheetTimesheetService.UpdateTimesheetResp
>;
export interface UseUpsertTimesheetReturn {
    createTimesheet: (
        data: {
            formData: UpsertTimesheetFormProps;
        },
        options: UpsertMutationOptions
    ) => Promise<void>;
    updateTimesheet: (
        data: {
            formData: UpsertTimesheetFormProps;
        },
        options: UpsertMutationOptions
    ) => Promise<void>;
}

function useTimesheetUpsert({ mode }: useTimesheetUpsertProps) {
    const t = useTranslate();
    const tTimesheetManagement = useResourceTranslate(ERPModules.TIMESHEET_MANAGEMENT);
    const showSnackbar = useShowSnackbar();
    const { userProfile } = useGetLocalProfile();

    const isTeacherLogging = userProfile && isTeacher(userProfile.userGroup);

    const isAddMode = mode === ModeOpenDialog.ADD;
    const action = useMemo(
        () => (isAddMode ? "timesheetCreateTimesheet" : "timesheetUpdateTimesheet"),
        [isAddMode]
    );

    const { mutateAsync } = inferMutation({
        entity: "timesheet",
        action,
    })({
        onSuccess: () => {
            showSnackbar(
                tTimesheetManagement(
                    `messages.success.${isAddMode ? "addTimesheet" : "updateTimesheet"}`
                )
            );
        },
    });

    const createTimesheet: UseUpsertTimesheetReturn["createTimesheet"] = useCallback(
        async ({ formData }, options) => {
            try {
                const { timesheetDate, location, staff, remark, otherWorkingHours } = formData;

                const payload: Required<NsTimesheetTimesheetService.CreateTimesheetReq> = {
                    timesheetDate,
                    locationId: convertString(location?.id?.toString()),
                    staffId: isTeacherLogging
                        ? userProfile.id
                        : convertString(staff?.id.toString()),
                    remark: remark || "",
                    listOtherWorkingHoursList: mapOtherWorkingHoursList(
                        otherWorkingHours,
                        timesheetDate
                    ),
                };
                await mutateAsync(payload, options);
            } catch (err) {
                window.warner?.error(`${action.toLowerCase()} timesheet failed`, err);
                const defaultMessage = "resources.common.createdFail";
                const error = handleUnknownError(err);
                // for possible errors that may be handled in the future, a map is a better implementation
                const details =
                    error.message === grpcErrorsMap.ALREADY_EXISTS
                        ? tTimesheetManagement("messages.error.timesheetAlreadyExists")
                        : t(error.message || defaultMessage);
                showSnackbar(details, NotifyTypes.ERROR);
            }
        },
        [action, mutateAsync, showSnackbar, t, isTeacherLogging, userProfile, tTimesheetManagement]
    );

    const updateTimesheet: UseUpsertTimesheetReturn["updateTimesheet"] = useCallback(
        async ({ formData }, options) => {
            try {
                const { remark, otherWorkingHours, timesheetDate, timesheetId = "" } = formData;
                const payload: Required<NsTimesheetTimesheetService.UpdateTimesheetReq> = {
                    timesheetId,
                    remark: remark || "",
                    listOtherWorkingHoursList: mapOtherWorkingHoursList(
                        otherWorkingHours,
                        timesheetDate
                    ),
                };
                await mutateAsync(payload, options);
            } catch (err) {
                window.warner?.error(`${action.toLowerCase()} timesheet failed`, err);
                const message = "resources.common.updatedFail";
                const error = handleUnknownError(err);
                showSnackbar(
                    `${t(message)}${isAddMode ? "." : ""} ${t(error.message || "")}`,
                    NotifyTypes.ERROR
                );
            }
        },
        [action, isAddMode, mutateAsync, showSnackbar, t]
    );

    const mapOtherWorkingHoursList = (
        otherWorkingHours: OtherWorkingHour[],
        timesheetDate?: string | null
    ): Array<OtherWorkingHoursRequest.AsObject> => {
        return otherWorkingHours.map((item) => {
            if (
                !item.startTimeAutocomplete?.value ||
                !item.endTimeAutocomplete?.value ||
                !timesheetDate
            ) {
                throw new Error("Invalid Params");
            }
            return {
                otherWorkingHoursId: item.other_working_hours_id,
                timesheetConfigId: item.workingTypeAutocomplete?.timesheet_config_id || "",
                startTime: combineDateAndTime(
                    new Date(timesheetDate),
                    item.startTimeAutocomplete?.value
                ),
                endTime: combineDateAndTime(
                    new Date(timesheetDate),
                    item.endTimeAutocomplete?.value
                ),
                remarks: item.remarks || "",
                isDelete: false,
            };
        });
    };

    return { updateTimesheet, createTimesheet };
}

export default useTimesheetUpsert;
