import { Entities, Features } from "src/common/constants/enum";
import { IAppResource } from "src/models/resource";
import FeatureController, { IFeatureStorage } from "src/packages/feature-controller";

import useAppInit from "../useAppInit";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureController from "src/app/useFeatureController";

jest.mock("src/app/useAppPermission", () => {
    const instance = {
        rules: [{ action: "create", resource: "quiz" }],
    };
    const permission = {
        getInstance: () => instance,
    };
    const useAppPermissionMock = () => {
        return { permission };
    };
    return useAppPermissionMock;
});

jest.mock("src/app/useFeatureController", () => jest.fn());

type GenerateMockFeatureControllerType = Partial<IFeatureStorage<Features>>;

describe("useAppInit should return allowed modules and app ready state", () => {
    const appModules: IAppResource[] = [
        {
            name: Entities.BOOKS,
            key: Entities.BOOKS,
            translateKey: "name",
        },
    ];
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
        const mockFunctionControllerContainerResult = {
            featureController: generateMockFeatureControllerContainer({}),
        };

        const mockUseFeatureController = () => mockFunctionControllerContainerResult;
        (useFeatureController as jest.Mock).mockImplementation(mockUseFeatureController);

        const emptyAppModules: IAppResource[] = [];

        const { result } = renderHook(() => useAppInit(emptyAppModules));

        expect(result.current).toEqual({
            modules: emptyAppModules,
            ready: false,
        });
    });

    it("should init success when passed in not-empty modules array", async () => {
        const subscribeToRemoteChangesContainerCallback = jest.fn();

        const mockFunctionControllerContainerResult = {
            featureController: generateMockFeatureControllerContainer({
                subscribeToRemoteChanges: (callback) => {
                    subscribeToRemoteChangesContainerCallback();
                    callback();
                },
            }),
        };

        const mockUseFeatureController = () => mockFunctionControllerContainerResult;
        (useFeatureController as jest.Mock).mockImplementation(mockUseFeatureController);

        const { result, waitForNextUpdate } = renderHook(() => useAppInit(appModules));

        await waitForNextUpdate();

        expect(result.current).toEqual({
            modules: appModules,
            ready: true,
        });

        expect(subscribeToRemoteChangesContainerCallback).toBeCalledTimes(1);
    });

    it("should init failed but still make app ready when unleash can not init ", async () => {
        const mockFunctionResult = {
            featureController: generateMockFeatureControllerContainer({
                init: () => Promise.reject(false),
            }),
        };
        const mockUseFeatureController = () => mockFunctionResult;
        (useFeatureController as jest.Mock).mockImplementation(mockUseFeatureController);

        const { result, waitForNextUpdate } = renderHook(() => useAppInit(appModules));

        await waitForNextUpdate();

        expect(result.current).toEqual({
            modules: [],
            ready: true,
        });
    });

    it("should unsubscribe when unmounting the hook", async () => {
        const mockUnsubscribeUnleash = jest.fn();
        const mockFunctionResult = {
            featureController: generateMockFeatureControllerContainer({
                unsubscribe: mockUnsubscribeUnleash,
            }),
        };
        const mockUseFeatureController = () => mockFunctionResult;
        (useFeatureController as jest.Mock).mockImplementation(mockUseFeatureController);

        const { waitForNextUpdate, unmount } = renderHook(() => useAppInit(appModules));

        await waitForNextUpdate();

        unmount();

        expect(mockUnsubscribeUnleash).toBeCalledTimes(1);
    });
});
