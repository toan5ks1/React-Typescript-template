import useTimesheetUpdatePermissionMicroApplication from "../useTimesheetUpdatePermissionMicroApplication";

import { renderHook } from "@testing-library/react-hooks";

describe("useTimesheetUpdatePermissionMicroApplication", () => {
    it("should return false when can not found role", () => {
        const { result } = renderHook(() => useTimesheetUpdatePermissionMicroApplication());

        expect(result.current).toEqual(false);
    });

    it("should return true when found role", async () => {
        const spied = jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
            return JSON.stringify({ userGroup: "USER_GROUP_SCHOOL_ADMIN" });
        });

        const { result } = renderHook(() => useTimesheetUpdatePermissionMicroApplication());

        expect(result.current).toEqual(true);
        spied.mockReset();
    });
});
