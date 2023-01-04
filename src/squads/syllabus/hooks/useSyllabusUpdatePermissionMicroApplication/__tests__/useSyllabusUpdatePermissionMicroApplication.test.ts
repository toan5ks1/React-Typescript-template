import useSyllabusUpdatePermissionMicroApplication from "../useSyllabusUpdatePermissionMicroApplication";

import { renderHook } from "@testing-library/react-hooks";

describe(useSyllabusUpdatePermissionMicroApplication.name, () => {
    it("should return false when can not found role", () => {
        const { result } = renderHook(() => useSyllabusUpdatePermissionMicroApplication());

        expect(result.current).toEqual(false);
    });

    it("should return true when found role", async () => {
        const spied = jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
            return JSON.stringify({ userGroup: "USER_GROUP_SCHOOL_ADMIN" });
        });

        const { result } = renderHook(() => useSyllabusUpdatePermissionMicroApplication());

        expect(result.current).toEqual(true);
        spied.mockReset();
    });
});
