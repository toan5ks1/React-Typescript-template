import { Features } from "src/squads/communication/common/constants/feature-keys";

import useEnableManaEventEmitter from "../useEnableManaEventEmitter";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";

jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe(useEnableManaEventEmitter.name, () => {
    it("should call useFeatureToggle with correct argument", () => {
        renderHook(() => useEnableManaEventEmitter());

        expect(useFeatureToggle).toBeCalledWith(Features.MICRO_FRONTEND_MANA_EVENTEMITTER);
    });
});
