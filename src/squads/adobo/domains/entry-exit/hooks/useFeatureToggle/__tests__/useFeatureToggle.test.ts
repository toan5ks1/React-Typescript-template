import { Features } from "src/common/constants/enum";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureController from "src/squads/adobo/domains/entry-exit/hooks/useFeatureController";
import useFeatureToggle from "src/squads/adobo/domains/entry-exit/hooks/useFeatureToggle";

jest.mock("src/squads/adobo/domains/entry-exit/hooks/useFeatureController", () => jest.fn());

describe(useFeatureToggle.name, () => {
    const isFeatureEnabledFn = jest.fn();
    const subscribeToRemoteChangesFn = jest.fn();

    beforeEach(() => {
        (useFeatureController as jest.Mock).mockImplementation(() => {
            return {
                featureController: {
                    isFeatureEnabled: isFeatureEnabledFn,
                    subscribeToRemoteChanges: subscribeToRemoteChangesFn,
                },
            };
        });
    });

    it("should return isEnabled is true isFeatureEnabled return true", () => {
        const feature: Features = Features.ENTRY_EXIT_MANAGEMENT;
        isFeatureEnabledFn.mockReturnValue(true);

        const { result } = renderHook(() => useFeatureToggle(feature));

        expect(result.current.isEnabled).toEqual(true);
        expect(isFeatureEnabledFn).toBeCalledWith(feature);
    });

    it("should return isEnabled is false isFeatureEnabled return false", () => {
        const feature: Features = Features.ENTRY_EXIT_MANAGEMENT;
        isFeatureEnabledFn.mockReturnValue(false);

        const { result } = renderHook(() => useFeatureToggle(feature));

        expect(result.current.isEnabled).toEqual(false);
        expect(isFeatureEnabledFn).toBeCalledWith(feature);
    });

    it("should not subscribe change when pass the second param is false", () => {
        const feature: Features = Features.ENTRY_EXIT_MANAGEMENT;

        renderHook(() => useFeatureToggle(feature, false));
        expect(subscribeToRemoteChangesFn).not.toBeCalled();
    });
});
