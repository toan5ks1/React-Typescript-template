import useGrantedPermissionFieldArray from "../useGrantedPermissionFieldArray";

import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { initializeUserGroupGrantedPermission } from "src/squads/user/common/helpers/initializeFieldArray";
import { mockGrantedPermissionPackage } from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: () => ({
            watch: () => mockGrantedPermissionPackage,
            control: {},
        }),
        useFieldArray: () => ({
            fields: mockGrantedPermissionPackage,
            append: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
        }),
    };
});

jest.mock("src/common/utils/id-generator", () => ({
    genId: () => "id",
}));

describe("useGrantedPermissionFieldArray", () => {
    it("should work correctly on add, delete and update mode", () => {
        const { result } = renderHook(() => useGrantedPermissionFieldArray());

        expect(result.current.grantedPermissions).toEqual(mockGrantedPermissionPackage);

        act(() => result.current.onAdd());
        expect(result.current.append).toBeCalledTimes(1);
        expect(result.current.append).toBeCalledWith(initializeUserGroupGrantedPermission());

        act(() => result.current.onDelete(mockGrantedPermissionPackage));
        expect(result.current.remove).toBeCalledTimes(1);

        act(() => result.current.update(1, {}));
        expect(result.current.remove).toBeCalledTimes(1);
    });
});
