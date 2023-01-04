import reactiveStorage from "../../internals/reactive-storage";
import useUpdatePermissionMicroApplication from "../useUpdatePermissionMicroApplication";

import { renderHook } from "@testing-library/react-hooks";

describe("useUpdatePermissionMicroApplication", () => {
    it("should return false when can not found role", () => {
        const { result } = renderHook(() => useUpdatePermissionMicroApplication());

        expect(result.current).toEqual(false);
    });

    it("should return true when found role", async () => {
        reactiveStorage.set("PROFILE", {
            id: "unit-test",
            name: "unit-test@manabie",
            country: 5,
            phoneNumber: "",
            email: "unit-test@manabie",
            avatar: "",
            deviceToken: "",
            userGroup: "USER_GROUP_SCHOOL_ADMIN",
            createdAt: { seconds: 1653533999, nanos: 0 },
            updatedAt: { seconds: 1653533999, nanos: 0 },
            schoolIdsList: [-2147483639],
            schoolsList: [{ schoolId: 123, schoolName: "Manabie" }],
            schoolName: "Manabie",
            schoolId: 123,
            countryName: "COUNTRY_JP",
        });

        const { result } = renderHook(() => useUpdatePermissionMicroApplication());

        expect(result.current).toEqual(true);
        reactiveStorage.clear("PROFILE");
    });
});
