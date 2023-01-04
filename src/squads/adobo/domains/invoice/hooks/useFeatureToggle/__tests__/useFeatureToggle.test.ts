import { Features } from "src/common/constants/enum";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureController from "src/squads/adobo/domains/invoice/hooks/useFeatureController";
import useFeatureToggle from "src/squads/adobo/domains/invoice/hooks/useFeatureToggle";

jest.mock("src/squads/adobo/domains/invoice/hooks/useFeatureController", () => jest.fn());

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
        const feature: Features = Features.NOTIFICATION_QUESTIONNAIRE;
        isFeatureEnabledFn.mockReturnValue(true);

        const { result } = renderHook(() => useFeatureToggle(feature));

        expect(result.current.isEnabled).toEqual(true);
        expect(isFeatureEnabledFn).toBeCalledWith(feature);
    });

    it("should return isEnabled is false isFeatureEnabled return false", () => {
        const feature: Features = Features.NOTIFICATION_QUESTIONNAIRE;
        isFeatureEnabledFn.mockReturnValue(false);

        const { result } = renderHook(() => useFeatureToggle(feature));

        expect(result.current.isEnabled).toEqual(false);
        expect(isFeatureEnabledFn).toBeCalledWith(feature);
    });

    it("should not subscribe change when pass the second param is false", () => {
        const feature: Features = Features.NOTIFICATION_QUESTIONNAIRE;

        renderHook(() => useFeatureToggle(feature, false));
        expect(subscribeToRemoteChangesFn).not.toBeCalled();
    });
});
