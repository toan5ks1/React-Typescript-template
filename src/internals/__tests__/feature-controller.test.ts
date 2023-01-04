import { Features } from "src/common/constants/enum";
import featureController from "src/internals/feature-controller";

jest.mock("src/internals/unleash-remote-config", () => {
    const actual = jest.requireActual("src/internals/unleash-remote-config");
    actual.isEnabled = (featureName: string) => {
        if (featureName === "Syllabus_AssignmentManagement_BackOffice_AssignmentManagement")
            return true;
        return false;
    };
    return {
        __esModule: true,
        default: actual,
    };
});

describe("featureController", () => {
    it("should enable/disable the feature", async () => {
        expect(featureController.isFeatureEnabled(Features.ASSIGNMENT_MANAGEMENT)).toEqual(true);

        //dont pass any key means allow
        expect(featureController.isFeatureEnabled(undefined)).toEqual(true);

        // test invalid key
        expect(featureController.isFeatureEnabled("NOT_ALLOW_KEY" as Features)).toEqual(false);
    });
});
