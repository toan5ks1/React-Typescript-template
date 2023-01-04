import {
    updateStaffReq as mockUpdateStaffReq,
    createStaffReq as mockCreateStaffReq,
    updateStaffSettingReq as mockUpdateStaffSettingReq,
} from "src/squads/user/test-utils/mocks/staff";

import {
    createStaffReq,
    updateStaffReq,
    updateStaffSettingReq,
} from "../staff-service-usermgmt.request";

describe("Create staff request", () => {
    it("should return correctly request", () => {
        const staffReq = createStaffReq(mockCreateStaffReq);
        expect(staffReq.toObject().staff?.name).toEqual(mockCreateStaffReq.name);
        expect(staffReq.toObject().staff?.email).toEqual(mockCreateStaffReq.email);
    });
});

describe("Update staff request", () => {
    it("should return correctly request", () => {
        const staffReq = updateStaffReq(mockUpdateStaffReq);
        expect(staffReq.toObject().staff?.staffId).toEqual(mockUpdateStaffReq.staffId);
        expect(staffReq.toObject().staff?.name).toEqual(mockUpdateStaffReq.name);
        expect(staffReq.toObject().staff?.email).toEqual(mockUpdateStaffReq.email);
    });
});

describe("Update staff setting request", () => {
    it("should return correctly request", () => {
        const _mockUpdateStaffSettingReq = mockUpdateStaffSettingReq(true);
        const staffReq = updateStaffSettingReq(_mockUpdateStaffSettingReq);
        expect(staffReq.toObject().staffId).toEqual(_mockUpdateStaffSettingReq.staffId);
        expect(staffReq.toObject().autoCreateTimesheet).toEqual(
            _mockUpdateStaffSettingReq.autoCreateTimesheet
        );
    });
});
