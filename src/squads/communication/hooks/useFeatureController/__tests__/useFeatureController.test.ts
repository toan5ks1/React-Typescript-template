import featureControllerUnleash from "src/internals/feature-controller";
import { Features } from "src/squads/communication/common/constants/feature-keys";

import useFeatureController from "../useFeatureController";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/internals/feature-controller");

describe("useFeatureController", () => {
    it("should return object with 2 functions: init and isFeatureEnabled", () => {
        const { result } = renderHook(() => useFeatureController());

        expect(typeof result.current.featureController.init).toEqual("function");
        expect(typeof result.current.featureController.isFeatureEnabled).toEqual("function");
        expect(typeof result.current.featureController.subscribeToRemoteChanges).toEqual(
            "function"
        );
    });

    it("should return correct isFeatureEnabled base on featureController from internals/", () => {
        (featureControllerUnleash.isFeatureEnabled as jest.Mock).mockImplementation(
            (featureName: Features) => {
                return featureName === Features.NOTIFICATION_QUESTIONNAIRE;
            }
        );

        const { result } = renderHook(() => useFeatureController());

        const shortcut = result.current.featureController;

        expect(shortcut.isFeatureEnabled(Features.NOTIFICATION_QUESTIONNAIRE)).toEqual(true);
        expect(shortcut.isFeatureEnabled(Features.NOTIFICATION_SCHEDULE_MANAGEMENT)).toEqual(false);
    });

    it("should return Unleash instance", () => {
        const { result } = renderHook(() => useFeatureController());
        const unleashClient = result.current;

        expect(typeof unleashClient.featureController.init).toEqual("function");
        expect(typeof unleashClient.featureController.isFeatureEnabled).toEqual("function");
        expect(typeof unleashClient.featureController.subscribeToRemoteChanges).toEqual("function");
    });
});
