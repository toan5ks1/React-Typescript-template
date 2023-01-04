import { useCallback, useMemo } from "react";

import { Entities, ModeOpenDialog, NotifyTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { UpsertStaffFormProps } from "src/squads/user/common/types";
import { Teacher } from "src/squads/user/service/bob/user-service-bob/types";
import { inferMutation } from "src/squads/user/service/infer-service";
import type { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStaffService } from "src/squads/user/service/usermgmt/staff-service-usermgmt/types";
import { CountryKeys } from "src/squads/user/typings/remote";

import { Country } from "manabuf/common/v1/enums_pb";
import { UserGroup } from "manabuf/usermgmt/v2/enums_pb";

import useBasicContent from "src/squads/user/hooks/useBasicContent";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface UseUpsertStaffProps {
    mode: ModeOpenDialog;
}

export interface StaffInfo extends Teacher {
    id: Teacher["teacher_id"];
    country: CountryKeys;
}

export type UpsertMutationOptions = UseMutationOptions<
    NsUsermgmtStaffService.CreateStaffReq | NsUsermgmtStaffService.UpdateStaffReq,
    NsUsermgmtStaffService.CreateStaffResp | NsUsermgmtStaffService.UpdateStaffResp
>;
export interface UseUpsertStaffReturn {
    createStaff: (
        data: {
            formDataUpsert: UpsertStaffFormProps;
        },
        options: UpsertMutationOptions
    ) => Promise<void>;
    updateStaff: (
        data: {
            formDataUpsert: UpsertStaffFormProps;
        },
        options: UpsertMutationOptions
    ) => Promise<void>;
}

const useUpsertStaff = (props: UseUpsertStaffProps) => {
    const { mode } = props;

    const t = useTranslate();
    const tStaff = useResourceTranslate(Entities.STAFF);
    const initialValues = useBasicContent();
    const showSnackbar = useShowSnackbar();

    const isAddMode = mode === ModeOpenDialog.ADD;
    const action = useMemo(() => (isAddMode ? "userCreateStaff" : "userUpdateStaff"), [isAddMode]);

    const { mutateAsync } = inferMutation({ entity: "staff", action })({
        onSuccess: () => {
            showSnackbar(
                `${t(
                    `ra.common.${isAddMode ? "createdSuccess" : "updatedSuccess"}`,
                    {
                        smart_count: tStaff("name"),
                    },
                    { lowercase: true }
                )}`,
                NotifyTypes.SUCCESS
            );
        },
    });

    const createStaff: UseUpsertStaffReturn["createStaff"] = useCallback(
        async ({ formDataUpsert }, options) => {
            try {
                const { name, email, userGroupsList } = formDataUpsert;

                const { country, school_id } = initialValues;
                const payload: NsUsermgmtStaffService.CreateStaffReq = {
                    name: name.trim(),
                    email: email.trim(),
                    avatar: "",
                    phoneNumber: "",
                    country: Country[country],
                    userGroup: UserGroup.USER_GROUP_TEACHER,
                    organizationId: school_id.toString(),
                    userGroupsList,
                };
                await mutateAsync(payload, options);
            } catch (err) {
                window.warner?.error(`${action.toLowerCase()} staff failed`, err);
                const message = "ra.common.createdFail";
                const error = handleUnknownError(err);
                showSnackbar(
                    `${t(message)}${isAddMode ? "." : ""} ${t(error.message || "")}`,
                    NotifyTypes.ERROR
                );
            }
        },
        [action, initialValues, isAddMode, mutateAsync, showSnackbar, t]
    );

    const updateStaff: UseUpsertStaffReturn["updateStaff"] = useCallback(
        async ({ formDataUpsert }, options) => {
            try {
                const { staffId, name, email, userGroupsList } = formDataUpsert;
                const payload: NsUsermgmtStaffService.UpdateStaffReq = {
                    staffId,
                    name: name.trim(),
                    email: email.trim(),
                    userGroupsList,
                };
                await mutateAsync(payload, options);
            } catch (err) {
                window.warner?.error(`${action.toLowerCase()} staff failed`, err);
                const message = isAddMode ? "ra.common.createdFail" : "ra.common.updatedFail";
                const error = handleUnknownError(err);
                showSnackbar(
                    `${t(message)}${isAddMode ? "." : ""} ${t(error.message || "")}`,
                    NotifyTypes.ERROR
                );
            }
        },
        [mutateAsync, isAddMode, showSnackbar, t, action]
    );

    return {
        createStaff,
        updateStaff,
    };
};

export default useUpsertStaff;
