import {
    User_StaffListV2QueryVariables,
    User_StaffListV3QueryVariables,
    User_StaffOneQueryVariables,
    User_StaffOneV2QueryVariables,
    User_StaffListV4QueryVariables,
    User_StaffTimesheetConfigQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { defineService } from "src/squads/user/service/service-creator";
import { InvalidParamError, ListQuery } from "src/squads/user/service/service-types";
import staffServiceUsermgmt from "src/squads/user/service/usermgmt/staff-service-usermgmt";
import { NsUsermgmtStaffService } from "src/squads/user/service/usermgmt/staff-service-usermgmt/types";
import { isInvalidOrEmptyVariable } from "src/squads/user/service/utils";

import staffQueriesBob from "src/squads/user/service/bob/staff-service-bob/staff-service-bob.query";

const staffService = defineService({
    query: {
        userGetManyStaffWithFilter: (variables: ListQuery<User_StaffListV2QueryVariables>) => {
            const { filter = {}, pagination } = variables;
            return staffQueriesBob.getListWithFilterV2({
                ...filter,
                ...pagination,
            });
        },
        staffGetManyByFilterV2: (variables: ListQuery<User_StaffListV3QueryVariables>) => {
            const { filter = {}, pagination } = variables;
            return staffQueriesBob.getListWithFilterV3({
                ...filter,
                ...pagination,
            });
        },
        userStaffGetManyByFilterV4: (variables: ListQuery<User_StaffListV4QueryVariables>) => {
            const { filter = {}, pagination } = variables;
            return staffQueriesBob.getListWithFilterV4({
                ...filter,
                ...pagination,
            });
        },
        userGetOneStaff: (variables: User_StaffOneQueryVariables) => {
            if (isInvalidOrEmptyVariable(variables.teacher_id)) {
                throw new InvalidParamError({
                    action: "userGetOneStaff",
                    errors: [
                        {
                            field: "teacher_id",
                            fieldValueIfNotSensitive: variables.teacher_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }
            return staffQueriesBob.getOne(variables);
        },
        userGetOneStaffV2: (variables: User_StaffOneV2QueryVariables) => {
            if (isInvalidOrEmptyVariable(variables.staff_id)) {
                throw new InvalidParamError({
                    action: "userGetOneStaffV2",
                    errors: [
                        {
                            field: "staff_id",
                            fieldValueIfNotSensitive: variables.staff_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }
            return staffQueriesBob.userGetOneStaff(variables);
        },
        userGetTimesheetConfig: (variables: User_StaffTimesheetConfigQueryVariables) => {
            if (isInvalidOrEmptyVariable(variables.staff_id)) {
                throw new InvalidParamError({
                    action: "userGetTimesheetConfig",
                    errors: [
                        {
                            field: "staff_id",
                            fieldValueIfNotSensitive: variables.staff_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }
            return staffQueriesBob.userGetTimesheetConfig(variables);
        },
    },
    mutation: {
        userCreateStaff: (data: NsUsermgmtStaffService.CreateStaffReq) => {
            return staffServiceUsermgmt.createStaff(data);
        },
        userUpdateStaff: (data: NsUsermgmtStaffService.UpdateStaffReq) => {
            return staffServiceUsermgmt.updateStaff(data);
        },
        userUpdateStaffSetting: (data: NsUsermgmtStaffService.UpdateStaffSettingReq) => {
            return staffServiceUsermgmt.updateStaffSetting(data);
        },
    },
});

export default staffService;
