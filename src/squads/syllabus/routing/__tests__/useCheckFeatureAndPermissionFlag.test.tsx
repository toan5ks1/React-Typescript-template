import { Entities, Features } from "src/common/constants/enum";
import permission from "src/squads/syllabus/internals/permission";

import useCheckFeatureAndPermissionFlag from "../useCheckFeatureAndPermissionFlag";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureController from "src/app/useFeatureController";

jest.mock("src/squads/syllabus/internals/permission/permission", () => {
    const originalModule = jest.requireActual(
        "src/squads/syllabus/internals/permission/permission"
    );
    return {
        ...originalModule,
        can: jest.fn(originalModule.can),
    };
});

jest.mock("src/app/useFeatureController", () => jest.fn());

describe("useCheckFeatureAndPermissionFlag hook", () => {
    const isFeatureEnabledFn = jest.fn();
    beforeEach(() => {
        (useFeatureController as jest.Mock).mockImplementation(() => {
            return {
                featureController: {
                    isFeatureEnabled: isFeatureEnabledFn,
                },
            };
        });
    });

    it("should allow route when permission and feature flag are not passed", () => {
        const { result } = renderHook(() => useCheckFeatureAndPermissionFlag());

        expect(result.current({})).toEqual(true);
    });

    it("should allow route when permission and feature flag are passed", () => {
        isFeatureEnabledFn.mockReturnValue(true);
        (permission.can as jest.Mock).mockReturnValue(true);

        const { result } = renderHook(() => useCheckFeatureAndPermissionFlag());

        expect(
            result.current({
                permissionConfigs: {
                    subject: Entities.COURSES,
                    action: "show",
                },
                featureConfigs: {
                    feature: Features.EXAM_LO_MANAGEMENT,
                },
            })
        ).toEqual(true);

        expect(permission.can).toBeCalledWith(Entities.COURSES, "show");
        expect(isFeatureEnabledFn).toBeCalledWith(Features.EXAM_LO_MANAGEMENT);
    });

    it("should deny route when permission is denied", () => {
        isFeatureEnabledFn.mockReturnValue(true);
        (permission.can as jest.Mock).mockReturnValue(false);

        const { result } = renderHook(() => useCheckFeatureAndPermissionFlag());

        expect(
            result.current({
                permissionConfigs: {
                    subject: Entities.COURSES,
                    action: "show",
                },
                featureConfigs: {
                    feature: Features.EXAM_LO_MANAGEMENT,
                },
            })
        ).toEqual(false);

        expect(permission.can).toBeCalledWith(Entities.COURSES, "show");
        expect(isFeatureEnabledFn).toBeCalledWith(Features.EXAM_LO_MANAGEMENT);
    });

    it("should deny route when only pass the permission's config and permission is denied", () => {
        (permission.can as jest.Mock).mockReturnValue(false);

        const { result } = renderHook(() => useCheckFeatureAndPermissionFlag());

        expect(
            result.current({
                permissionConfigs: {
                    subject: Entities.TEACHERS,
                    action: "show",
                },
            })
        ).toEqual(false);

        expect(permission.can).toBeCalledWith(Entities.TEACHERS, "show");
        expect(isFeatureEnabledFn).not.toBeCalled();
    });

    it("should allow route when only pass the permission's config and permission is allowed", () => {
        (permission.can as jest.Mock).mockReturnValue(true);

        const { result } = renderHook(() => useCheckFeatureAndPermissionFlag());

        expect(
            result.current({
                permissionConfigs: {
                    subject: Entities.COURSES,
                    action: "show",
                },
            })
        ).toEqual(true);

        expect(permission.can).toBeCalledWith(Entities.COURSES, "show");
        expect(isFeatureEnabledFn).not.toBeCalled();
    });

    it("should allow route when only pass the remote config and feature flag is allowed", () => {
        isFeatureEnabledFn.mockReturnValue(true);

        const { result } = renderHook(() => useCheckFeatureAndPermissionFlag());

        expect(
            result.current({
                featureConfigs: {
                    feature: Features.EXAM_LO_MANAGEMENT,
                },
            })
        ).toEqual(true);

        expect(permission.can).not.toBeCalled();
        expect(isFeatureEnabledFn).toBeCalledWith(Features.EXAM_LO_MANAGEMENT);
    });
});
