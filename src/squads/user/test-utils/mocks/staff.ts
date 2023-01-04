import { ArrayElement } from "src/common/constants/types";
import {
    User_StaffListV2Query,
    User_StaffListV3Query,
    User_StaffOneV2Query,
    User_StaffListV4Query,
    User_UserGroupsManyReferenceV2Query,
} from "src/squads/user/service/bob/bob-types";
import { Staff, Teacher as TeacherOne } from "src/squads/user/service/bob/user-service-bob/types";
import { PaginationWithTotal } from "src/squads/user/service/service-creator";
import { userGroupsListToUserGroupIdsList } from "src/squads/user/service/usermgmt/staff-service-usermgmt";
import { NsUsermgmtStaffService } from "src/squads/user/service/usermgmt/staff-service-usermgmt/types";
import { CountryKeys } from "src/squads/user/typings/remote";

import { Country } from "manabuf/common/v1/enums_pb";
import { UserGroup } from "manabuf/usermgmt/v2/enums_pb";
import {
    CreateStaffResponse,
    UpdateStaffResponse,
    UpdateStaffSettingResponse,
} from "manabuf/usermgmt/v2/users_pb";

export const MOCK_STAFF_USERS_DATA = {
    name: "Thomas",
    email: "thomas@manabie.com",
    user_group: "USER_GROUP_TEACHER",
    avatar: "",
    country: "COUNTRY_JP",
    phone_number: "",
};
export interface Pagination {
    count: number;
    onPageChange: () => void;
    page: number;
    rowsPerPage: number;
    limit: number;
    offset: number;
    onRowsPerPageChange: () => void;
}

export interface TeacherInformation {
    teacher_by_school_ids: TeacherOne["teacher_by_school_ids"];
    users: TeacherOne["users"];
    teacher_id: TeacherOne["teacher_id"];
    id: TeacherOne["teacher_id"];
    country: CountryKeys;
}

export const mockPagination: Pagination = {
    count: 1,
    onPageChange: jest.fn(),
    page: 0,
    rowsPerPage: 10,
    limit: 10,
    offset: 0,
    onRowsPerPageChange: jest.fn(),
};

export const mockListStaffWithFilterV2: User_StaffListV2Query = {
    find_teacher_by_school_id: [...Array(5).keys()].map((value) => ({
        name: `Teacher ${value}`,
        email: `teach_email_${value}@gmail.com`,
        user_id: `user_id_${value}`,
        resource_path: "-2147483644",
    })),
    find_teacher_by_school_id_aggregate: {
        aggregate: {
            count: 5,
        },
    },
};

export const mockListStaffWithFilterV3: User_StaffListV3Query = {
    staff: [...Array(5).keys()].map((value) => ({
        staff_id: `staff_id_${value}`,
        user: {
            name: `Staff Name ${value}`,
            email: `staff_name_${value}@gmail.com`,
            user_group_members: [
                {
                    user_group: {
                        user_group_name: `Teacher ${value}`,
                        user_group_id: `user_group_id_${value}`,
                    },
                },
            ],
        },
    })),
    staff_aggregate: {
        aggregate: {
            count: 5,
        },
    },
};

export const mockListStaffWithFilterV4: User_StaffListV4Query = {
    staff: [...Array(5).keys()].map((value) => ({
        staff_id: `staff_id_${value}`,
        user: {
            name: `Staff Name ${value}`,
            email: `staff_name_${value}@gmail.com`,
            resource_path: "-2147483644",
            user_group_members: [
                {
                    user_group: {
                        user_group_name: `Teacher ${value}`,
                        user_group_id: `user_group_id_${value}`,
                    },
                },
            ],
        },
    })),
    staff_aggregate: {
        aggregate: {
            count: 5,
        },
    },
};

type StaffListQueryReturn = {
    data: User_StaffListV4Query["staff"];
    total: number;
};

export const mockListStaffReturnV4: StaffListQueryReturn = {
    data: [...Array(5).keys()].map((value) => ({
        staff_id: `staff_id_${value}`,
        user: {
            name: `Staff Name ${value}`,
            email: `staff_name_${value}@gmail.com`,
            resource_path: "-2147483644",
            user_group_members: [...Array(5).keys()].map((val) => ({
                user_group: {
                    user_group_name: `Teacher ${val}`,
                    user_group_id: `user_group_id_${val}`,
                },
            })),
        },
    })),
    total: 5,
};
interface StaffTableProp {
    data: User_StaffListV4Query["staff"];
    pagination: PaginationWithTotal;
    isFetching: boolean;
}

export const staffTableProp: StaffTableProp = {
    data: mockListStaffReturnV4.data,
    isFetching: false,
    pagination: mockPagination,
};

export const mockReturnStaffData = {
    data: mockListStaffWithFilterV4.staff,
    total: 1,
};

export const staffOneMockData: ArrayElement<User_StaffOneV2Query["staff"]> = {
    staff_id: "staff-id",
    user: {
        user_id: "Sierra",
        name: "Sierra",
        email: "sierra2022@gmail.com",
        user_group: "USER_GROUP_TEACHER",
        country: "COUNTRY_JP",
        user_group_members: [
            {
                user_group: {
                    user_group_id: "user_group_01",
                    user_group_name: "Student A",
                },
            },
            {
                user_group: {
                    user_group_id: "user_group_02",
                    user_group_name: "Student A",
                },
            },
        ],
    },
};

interface userStaffGetOneReturn {
    data: {
        staff: User_StaffOneV2Query["staff"];
    };
}

export interface StaffInformation {
    staff_id: Staff["staff_id"];
    user: ArrayElement<User_StaffOneV2Query["staff"]>["user"];
    country: CountryKeys;
}

export const mockUserStaffGetOneReturn: userStaffGetOneReturn = {
    data: {
        staff: [staffOneMockData],
    },
};

export const createMockStaff = (): StaffInformation => {
    return {
        staff_id: "staff-id",
        user: staffOneMockData.user,
        country: "COUNTRY_JP",
    };
};

export const userGroupsManyReference: User_UserGroupsManyReferenceV2Query["user_group"] = [
    ...Array(5).keys(),
].map((val) => ({
    user_group_name: `Teacher ${val}`,
    user_group_id: `user_group_id_${val}`,
}));

export const mockUseStaffInfoRulesReturn = {
    required: {
        value: true,
        message: "This field is required",
    },
    pattern: {
        email: {
            value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Email address is not valid",
        },
    },
    validate: {
        email: jest.fn(),
    },
};

export const createStaffReq: NsUsermgmtStaffService.CreateStaffReq = {
    name: MOCK_STAFF_USERS_DATA.name,
    email: MOCK_STAFF_USERS_DATA.email,
    avatar: MOCK_STAFF_USERS_DATA.avatar,
    country: Country[MOCK_STAFF_USERS_DATA.country],
    phoneNumber: "",
    userGroup: UserGroup[MOCK_STAFF_USERS_DATA.user_group],
    organizationId: "1",
    userGroupsList: [...Array(5).keys()].map((val) => ({
        user_group_name: `Teacher ${val}`,
        user_group_id: `user_group_id_${val}`,
    })),
};

export const createStaffResp: NsUsermgmtStaffService.CreateStaffResp = {
    staff: {
        staffId: "staff_id",
        ...createStaffReq,
        userGroupIdsList: userGroupsListToUserGroupIdsList(createStaffReq.userGroupsList),
    },
};

export const updateStaffReq: NsUsermgmtStaffService.UpdateStaffReq = {
    staffId: "staff_id",
    name: MOCK_STAFF_USERS_DATA.name + " edited",
    email: MOCK_STAFF_USERS_DATA.email,
    userGroupsList: [],
};

export const updateStaffSettingReq = (
    autoCreateTimesheet: boolean
): NsUsermgmtStaffService.UpdateStaffSettingReq => {
    return {
        staffId: "staff_id",
        autoCreateTimesheet,
    };
};

export const createMockCreateStaffResponse = (): CreateStaffResponse => {
    const staffResp = new CreateStaffResponse.StaffProfile();
    staffResp.setStaffId("staff_id");
    staffResp.setName(MOCK_STAFF_USERS_DATA.name);
    staffResp.setEmail(MOCK_STAFF_USERS_DATA.email);
    staffResp.setAvatar(MOCK_STAFF_USERS_DATA.avatar);
    staffResp.setCountry(Country[MOCK_STAFF_USERS_DATA.country]);
    staffResp.setPhoneNumber("");
    staffResp.setUserGroup(UserGroup[MOCK_STAFF_USERS_DATA.user_group]);
    staffResp.setOrganizationId("1");

    const resp = new CreateStaffResponse();
    resp.setStaff(staffResp);
    return resp;
};

export const createMockUpdateStaffResponse = (): UpdateStaffResponse => {
    const resp = new UpdateStaffResponse();
    resp.setSuccessful(true);
    return resp;
};

export const createMockUpdateStaffSettingResponse = (): UpdateStaffSettingResponse => {
    const resp = new UpdateStaffSettingResponse();
    resp.setSuccessful(true);
    return resp;
};

export const createMockTeacherUsersData = (overrides: Partial<TeacherInformation["users"]>) => {
    return {
        ...MOCK_STAFF_USERS_DATA,
        ...overrides,
    };
};

export const createMockTeacher = (): TeacherInformation => {
    return {
        id: "teacher_id",
        teacher_id: "teacher_id",
        country: "COUNTRY_JP",
        users: MOCK_STAFF_USERS_DATA,
        teacher_by_school_ids: [
            {
                school_id: 1,
            },
        ],
    };
};
