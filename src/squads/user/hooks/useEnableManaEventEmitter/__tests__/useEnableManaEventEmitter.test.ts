import { Features } from "src/common/constants/enum";

import useEnableManaEventEmitter from "../useEnableManaEventEmitter";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureToggle from "src/squads/user/hooks/useFeatureToggle";

jest.mock("src/squads/user/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe(useEnableManaEventEmitter.name, () => {
    it("should call useFeatureToggle with correct argument", () => {
        renderHook(() => useEnableManaEventEmitter());

        expect(useFeatureToggle).toBeCalledWith(Features.MICRO_FRONTEND_MANA_EVENTEMITTER);
    });
});
