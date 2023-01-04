import { AppConfigTypes, EnvKeys, PjOwner } from "src/typings/configuration";

export default {
    getDefaultEnv: () => ({
        env: EnvKeys.DEVELOPMENT,
        pjOwner: PjOwner.MANABIE,
    }),
    getConfig: jest
        .fn()
        .mockImplementation(
            () => require("../variants/manabie").default[EnvKeys.DEVELOPMENT][AppConfigTypes.AUTH]
        ),
    getEndpoints: jest.fn(() => ({ OCR: "OCR" })),
    getCurrentEnv: jest.fn(() => EnvKeys.DEVELOPMENT),
    getCurrentPjOwner: jest.fn(() => PjOwner.MANABIE),
};
