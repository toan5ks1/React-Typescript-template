import { EnvKeysForUnleash } from "src/typings/configuration";

import FeatureController, { IFeatureStorage } from "../FeatureController";

describe("FeatureController", () => {
    it("should check feature enable or not correctly", (done) => {
        enum Test {
            Feature1 = "feature1",
            Feature2 = "feature2",
        }

        const ftStorage: IFeatureStorage<Test> = {
            update: jest.fn(),
            init: () => Promise.resolve(true),
            get: (feature) => feature === "feature1",
            subscribeToRemoteChanges: jest.fn(),
            unsubscribe: jest.fn(),
        };

        const ftController = new FeatureController<Test>(ftStorage);

        ftController
            .init({
                userId: "userId_01",
                schoolId: "schoolId_01",
                env: EnvKeysForUnleash.STAGING,
            })
            .then(() => {
                expect(ftController.isFeatureEnabled(Test.Feature1)).toEqual(true);
                expect(ftController.isFeatureEnabled(Test.Feature2)).toEqual(false);
                // undefined always return true
                expect(ftController.isFeatureEnabled(undefined)).toEqual(true);
            })
            .finally(done);
    });
});
