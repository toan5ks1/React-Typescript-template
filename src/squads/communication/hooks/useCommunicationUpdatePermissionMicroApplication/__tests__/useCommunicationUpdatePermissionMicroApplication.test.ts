import { renderHook } from "@testing-library/react-hooks";
import useCommunicationUpdatePermissionMicroApplication from "src/squads/communication/hooks/useCommunicationUpdatePermissionMicroApplication";

describe(useCommunicationUpdatePermissionMicroApplication.name, () => {
    it("should return false when can not found role", () => {
        const { result } = renderHook(() => useCommunicationUpdatePermissionMicroApplication());

        expect(result.current).toEqual(false);
    });

    it("should return true when found role", () => {
        const spied = jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
            return JSON.stringify({ userGroup: "USER_GROUP_SCHOOL_ADMIN" });
        });

        const { result } = renderHook(() => useCommunicationUpdatePermissionMicroApplication());

        expect(result.current).toEqual(true);
        spied.mockReset();
    });
});
