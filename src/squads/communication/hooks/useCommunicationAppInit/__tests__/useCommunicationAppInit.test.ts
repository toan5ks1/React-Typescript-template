import FeatureController, { IFeatureStorage } from "src/packages/feature-controller";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { rawRoutes } from "src/squads/communication/routing/routings";

import useCommunicationAppInit from "../useCommunicationAppInit";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureController from "src/squads/communication/hooks/useFeatureController";

jest.mock("src/squads/communication/hooks/useCommunicationPermission", () => {
    const instance = {
        rules: [{ action: "create", resource: "notification" }],
    };

    const permission = {
        getInstance: () => instance,
        can: (subject: string, action: string) => {
            if (action === "show" && subject === "notifications") {
                return true;
            }

            return false;
        },
        currentRoles: [],
        update: jest.fn(),
    };

    const useCommunicationPermissionMock = () => {
        return { permission };
    };

    return useCommunicationPermissionMock;
});

jest.mock("src/squads/communication/hooks/useFeatureController", () => jest.fn());

type GenerateMockFeatureControllerType = Partial<IFeatureStorage<Features>>;

describe("useCommunicationAppInit should return allowed modules and app ready state", () => {
    const generateMockFeatureController = (props: GenerateMockFeatureControllerType = {}) => {
        const mockFeatureController = new FeatureController<Features>({
            init: () => Promise.resolve(true),
            get: jest.fn(),
            update: jest.fn(),
            subscribeToRemoteChanges: jest.fn(),
            unsubscribe: jest.fn(),
            ...props,
        });
        return mockFeatureController;
    };

    const generateMockFeatureControllerContainer = (props: GenerateMockFeatureControllerType) => {
        const mockFeatureControllerUnleash = generateMockFeatureController(props);
        return mockFeatureControllerUnleash;
    };

    it("should not init when modules are empty", async () => {
        const mockFunctionControllerResult = {
            featureController: generateMockFeatureControllerContainer({}),
        };

        const mockUseFeatureControllerCommunication = () => mockFunctionControllerResult;

        (useFeatureController as jest.Mock).mockImplementation(
            mockUseFeatureControllerCommunication
        );

        const { result, waitForNextUpdate } = renderHook(() => useCommunicationAppInit(rawRoutes));

        await waitForNextUpdate();

        expect(result.current.routes).toEqual([rawRoutes[0]]);
        expect(result.current.ready).toEqual(true);
    });

    it("should init success when passed in not-empty modules array", async () => {
        const subscribeToRemoteChangesCallback = jest.fn();

        const mockFunctionControllerResult = {
            featureController: generateMockFeatureControllerContainer({
                subscribeToRemoteChanges: (callback) => {
                    subscribeToRemoteChangesCallback();
                    callback();
                },
            }),
        };

        const mockUseFeatureControllerCommunication = () => mockFunctionControllerResult;

        (useFeatureController as jest.Mock).mockImplementation(
            mockUseFeatureControllerCommunication
        );

        const { result, waitForNextUpdate } = renderHook(() => useCommunicationAppInit(rawRoutes));

        await waitForNextUpdate();

        expect(result.current.routes).toEqual([rawRoutes[0]]);
        expect(result.current.ready).toEqual(true);
        expect(subscribeToRemoteChangesCallback).toBeCalledTimes(1);
    });

    it("should init failed but still make app ready when unleash can not init ", async () => {
        const mockFunctionControllerResult = {
            featureController: generateMockFeatureControllerContainer({
                init: () => Promise.reject(false),
            }),
        };
        const mockUseFeatureControllerCommunication = () => mockFunctionControllerResult;
        (useFeatureController as jest.Mock).mockImplementation(
            mockUseFeatureControllerCommunication
        );
        const { result, waitForNextUpdate } = renderHook(() => useCommunicationAppInit(rawRoutes));

        await waitForNextUpdate();
        expect(result.current.routes).toEqual([]);
        expect(result.current.ready).toEqual(true);
    });

    it("should unsubscribe when unmounting the hook", () => {
        const mockUnsubscribeUnleash = jest.fn();
        const mockFunctionControllerResult = {
            featureController: generateMockFeatureControllerContainer({
                unsubscribe: mockUnsubscribeUnleash,
            }),
        };
        const mockUseFeatureControllerCommunication = () => mockFunctionControllerResult;
        (useFeatureController as jest.Mock).mockImplementation(
            mockUseFeatureControllerCommunication
        );
        const { unmount } = renderHook(() => useCommunicationAppInit(rawRoutes));

        unmount();
        expect(mockUnsubscribeUnleash).toBeCalledTimes(1);
    });
});
