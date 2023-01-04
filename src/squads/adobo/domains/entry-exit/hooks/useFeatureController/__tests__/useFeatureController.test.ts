import { Features } from "src/common/constants/enum";
import featureControllerFirebase from "src/internals/feature-controller";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureController from "src/squads/adobo/domains/entry-exit/hooks/useFeatureController";

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
        (featureControllerFirebase.isFeatureEnabled as jest.Mock).mockImplementation(
            (featureName: Features) => {
                return featureName === Features.FLASHCARD_MANAGEMENT;
            }
        );

        const { result } = renderHook(() => useFeatureController());

        const shortcut = result.current.featureController;
        expect(shortcut.isFeatureEnabled(Features.FLASHCARD_MANAGEMENT)).toEqual(true);
        //not exists in mock return true value
        expect(shortcut.isFeatureEnabled(Features.ASSIGNMENT_MANAGEMENT)).toEqual(false);
    });

    it("should return Unleash instance", () => {
        const { result } = renderHook(() => useFeatureController());
        const unleashClient = result.current;

        expect(typeof unleashClient.featureController.init).toEqual("function");
        expect(typeof unleashClient.featureController.isFeatureEnabled).toEqual("function");
        expect(typeof unleashClient.featureController.subscribeToRemoteChanges).toEqual("function");
    });
});
