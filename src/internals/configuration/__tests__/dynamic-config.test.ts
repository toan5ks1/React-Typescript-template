import appConfigs from "src/internals/configuration";
import { AppConfigTypes, PjOwner } from "src/typings/configuration";

import { initNewConfigWithOrganization } from "../dynamic-config";

describe("dynamic configuration", () => {
    it("keep old config without organization", async () => {
        const defaultOwner = appConfigs.getCurrentPjOwner();
        const defaultEndpoint = appConfigs.getConfig(AppConfigTypes.ENDPOINT);

        await initNewConfigWithOrganization();

        expect(appConfigs.getCurrentPjOwner()).toEqual(defaultOwner);
        expect(appConfigs.getConfig(AppConfigTypes.ENDPOINT)).toEqual(defaultEndpoint);
    });

    it("init new config with organization renseikai", async () => {
        const { default: configs } = await import("src/internals/configuration/variants/renseikai");
        await initNewConfigWithOrganization(PjOwner.RENSEIKAI);

        const endpointRenseikai = configs?.[appConfigs.getCurrentEnv()]?.[AppConfigTypes.ENDPOINT];

        expect(appConfigs.getCurrentPjOwner()).toEqual(PjOwner.RENSEIKAI);
        expect(appConfigs.getConfig(AppConfigTypes.ENDPOINT)).toEqual(endpointRenseikai);
    });

    it("init new config with organization student-coach", async () => {
        const { default: configs } = await import(
            "src/internals/configuration/variants/student-coach"
        );
        await initNewConfigWithOrganization(PjOwner.STUDENT_COACH);

        const endpointStudentCoach =
            configs?.[appConfigs.getCurrentEnv()]?.[AppConfigTypes.ENDPOINT];

        expect(appConfigs.getCurrentPjOwner()).toEqual(PjOwner.STUDENT_COACH);
        expect(appConfigs.getConfig(AppConfigTypes.ENDPOINT)).toEqual(endpointStudentCoach);
    });

    it("init new config with organization e2e", async () => {
        const { default: configs } = await import("src/internals/configuration/variants/e2e");
        await initNewConfigWithOrganization(PjOwner.E2E);

        const endpointE2E = configs?.[appConfigs.getCurrentEnv()]?.[AppConfigTypes.ENDPOINT];

        expect(appConfigs.getCurrentPjOwner()).toEqual(PjOwner.E2E);
        expect(appConfigs.getConfig(AppConfigTypes.ENDPOINT)).toEqual(endpointE2E);
    });

    it("init new config with organization aic", async () => {
        const { default: configs } = await import("src/internals/configuration/variants/aic");
        await initNewConfigWithOrganization(PjOwner.AIC);

        const endpointAIC = configs?.[appConfigs.getCurrentEnv()]?.[AppConfigTypes.ENDPOINT];

        expect(appConfigs.getCurrentPjOwner()).toEqual(PjOwner.AIC);
        expect(appConfigs.getConfig(AppConfigTypes.ENDPOINT)).toEqual(endpointAIC);
    });

    it("init new config with organization ga", async () => {
        const { default: configs } = await import("src/internals/configuration/variants/ga");
        await initNewConfigWithOrganization(PjOwner.GA);

        const endpointGA = configs?.[appConfigs.getCurrentEnv()]?.[AppConfigTypes.ENDPOINT];

        expect(appConfigs.getCurrentPjOwner()).toEqual(PjOwner.GA);
        expect(appConfigs.getConfig(AppConfigTypes.ENDPOINT)).toEqual(endpointGA);
    });

    it("init new config with organization jprep", async () => {
        const { default: configs } = await import("src/internals/configuration/variants/jprep");

        await initNewConfigWithOrganization(PjOwner.JPREP);

        const endpointJPREP = configs?.[appConfigs.getCurrentEnv()]?.[AppConfigTypes.ENDPOINT];

        expect(appConfigs.getCurrentPjOwner()).toEqual(PjOwner.JPREP);
        expect(appConfigs.getConfig(AppConfigTypes.ENDPOINT)).toEqual(endpointJPREP);
    });

    it("init new config with organization manabie", async () => {
        const { default: configs } = await import("src/internals/configuration/variants/manabie");
        await initNewConfigWithOrganization(PjOwner.MANABIE);

        const endpointManabie = configs?.[appConfigs.getCurrentEnv()]?.[AppConfigTypes.ENDPOINT];

        expect(appConfigs.getCurrentPjOwner()).toEqual(PjOwner.MANABIE);
        expect(appConfigs.getConfig(AppConfigTypes.ENDPOINT)).toEqual(endpointManabie);
    });

    it("init new config with organization synersia", async () => {
        const { default: configs } = await import("src/internals/configuration/variants/synersia");
        await initNewConfigWithOrganization(PjOwner.SYNERSIA);

        const endpointSynersia = configs?.[appConfigs.getCurrentEnv()]?.[AppConfigTypes.ENDPOINT];

        expect(appConfigs.getCurrentPjOwner()).toEqual(PjOwner.SYNERSIA);
        expect(appConfigs.getConfig(AppConfigTypes.ENDPOINT)).toEqual(endpointSynersia);
    });

    it("init new config with organization tokyo", async () => {
        const { default: configs } = await import("src/internals/configuration/variants/tokyo");

        await initNewConfigWithOrganization(PjOwner.TOKYO);

        const endpoint = configs?.[appConfigs.getCurrentEnv()]?.[AppConfigTypes.ENDPOINT];

        expect(appConfigs.getCurrentPjOwner()).toEqual(PjOwner.TOKYO);
        expect(appConfigs.getConfig(AppConfigTypes.ENDPOINT)).toEqual(endpoint);
    });
});
