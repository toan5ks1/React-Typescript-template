import graphqlClient from "src/squads/user/internals/hasura-client";
import {
    mockListStaffWithFilterV2,
    mockListStaffWithFilterV3,
    mockListStaffWithFilterV4,
    mockUserStaffGetOneReturn,
    staffOneMockData,
} from "src/squads/user/test-utils/mocks/staff";

import staffQueriesBob from "../staff-service-bob.query";

const mockListStaffReturnV2 = {
    data: mockListStaffWithFilterV2.find_teacher_by_school_id,
    total: mockListStaffWithFilterV2.find_teacher_by_school_id_aggregate.aggregate?.count,
};

const mockListStaffReturnV3 = {
    data: mockListStaffWithFilterV3.staff,
    total: mockListStaffWithFilterV3.staff_aggregate.aggregate?.count,
};

const mockListStaffReturnV4 = {
    data: mockListStaffWithFilterV4.staff,
    total: mockListStaffWithFilterV4.staff_aggregate.aggregate?.count,
};

jest.mock("@manabie-com/graphql-client");
describe("staff-service-bob", () => {
    it("getListWithFilterV2 method", async () => {
        (graphqlClient.request as jest.Mock).mockResolvedValue({
            data: mockListStaffWithFilterV2,
        });
        const _callSpy = jest.spyOn(staffQueriesBob, "_call");
        const result = await staffQueriesBob.getListWithFilterV2({});
        expect(_callSpy).toBeCalledTimes(1);
        expect(result).toEqual(mockListStaffReturnV2);
        _callSpy.mockClear();
    });

    it("getListWithFilterV3 method", async () => {
        (graphqlClient.request as jest.Mock).mockResolvedValue({
            data: mockListStaffWithFilterV3,
        });
        const _callSpy = jest.spyOn(staffQueriesBob, "_call");
        const result = await staffQueriesBob.getListWithFilterV3({});
        expect(_callSpy).toBeCalledTimes(1);
        expect(result).toEqual(mockListStaffReturnV3);
        _callSpy.mockClear();
    });

    it("getListWithFilterV4 method", async () => {
        (graphqlClient.request as jest.Mock).mockResolvedValue({
            data: mockListStaffWithFilterV4,
        });
        const _callSpy = jest.spyOn(staffQueriesBob, "_call");
        const result = await staffQueriesBob.getListWithFilterV4({});
        expect(_callSpy).toBeCalledTimes(1);
        expect(result).toEqual(mockListStaffReturnV4);
        _callSpy.mockClear();
    });

    it("userStaffGetOne method", async () => {
        (graphqlClient.request as jest.Mock).mockResolvedValue(mockUserStaffGetOneReturn);
        const _callSpy = jest.spyOn(staffQueriesBob, "_call");
        const result = await staffQueriesBob.userGetOneStaff({ staff_id: "" });
        expect(_callSpy).toBeCalledTimes(1);
        expect(result).toEqual(staffOneMockData);
        _callSpy.mockClear();
    });
});
