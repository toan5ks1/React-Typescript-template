import {
    createMockUpdateStaffResponse,
    createMockCreateStaffResponse,
    createMockUpdateStaffSettingResponse,
    updateStaffReq as mockUpdateStaffReq,
    createStaffReq as mockStaffReq,
    updateStaffSettingReq as mockUpdateStaffSettingReq,
} from "src/squads/user/test-utils/mocks/staff";

import { StaffServicePromiseClient } from "manabuf/usermgmt/v2/users_grpc_web_pb";

import staffServiceUsermgmt from "../staff-service-usermgmt";
import {
    createStaffReq,
    updateStaffReq,
    updateStaffSettingReq,
} from "../staff-service-usermgmt.request";

jest.mock("manabuf/usermgmt/v2/users_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/usermgmt/v2/users_grpc_web_pb");

    actual.StaffServicePromiseClient.prototype.createStaff = jest.fn();
    actual.StaffServicePromiseClient.prototype.updateStaff = jest.fn();
    actual.StaffServicePromiseClient.prototype.updateStaffSetting = jest.fn();

    return actual;
});
describe("Staff Service", () => {
    it("should call create staff method correctly", async () => {
        const mockCreateStaffResponse = createMockCreateStaffResponse();

        (StaffServicePromiseClient.prototype.createStaff as jest.Mock).mockImplementation(() => {
            return mockCreateStaffResponse;
        });

        const resp = await staffServiceUsermgmt.createStaff(mockStaffReq);
        expect(resp?.staff?.staffId).toEqual(mockCreateStaffResponse.toObject().staff?.staffId);

        expect(StaffServicePromiseClient.prototype.createStaff).toBeCalledWith(
            createStaffReq(mockStaffReq)
        );
    });
    it("should call update staff method correctly", async () => {
        const mockUpdateStaffResponse = createMockUpdateStaffResponse();

        (StaffServicePromiseClient.prototype.updateStaff as jest.Mock).mockImplementation(() => {
            return mockUpdateStaffResponse;
        });

        const resp = await staffServiceUsermgmt.updateStaff(mockUpdateStaffReq);
        expect(resp?.successful).toBe(mockUpdateStaffResponse.toObject().successful);

        expect(StaffServicePromiseClient.prototype.updateStaff).toBeCalledWith(
            updateStaffReq(mockUpdateStaffReq)
        );
    });

    it("should call update staff setting method correctly", async () => {
        const mockUpdateStaffSettingResponse = createMockUpdateStaffSettingResponse();
        const _mockUpdateStaffSettingReq = mockUpdateStaffSettingReq(true);
        (StaffServicePromiseClient.prototype.updateStaffSetting as jest.Mock).mockImplementation(
            () => {
                return mockUpdateStaffSettingResponse;
            }
        );

        const resp = await staffServiceUsermgmt.updateStaffSetting(_mockUpdateStaffSettingReq);
        expect(resp?.successful).toBe(mockUpdateStaffSettingResponse.toObject().successful);

        expect(StaffServicePromiseClient.prototype.updateStaffSetting).toBeCalledWith(
            updateStaffSettingReq(_mockUpdateStaffSettingReq)
        );
    });
});
