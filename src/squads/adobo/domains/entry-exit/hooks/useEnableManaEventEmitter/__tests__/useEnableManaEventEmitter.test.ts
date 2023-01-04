import { Features } from "src/common/constants/enum";

import { renderHook } from "@testing-library/react-hooks";
import useEnableManaEventEmitter from "src/squads/adobo/domains/entry-exit/hooks/useEnableManaEventEmitter";
import useFeatureToggle from "src/squads/adobo/domains/entry-exit/hooks/useFeatureToggle";

jest.mock("src/squads/adobo/domains/entry-exit/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe(useEnableManaEventEmitter.name, () => {
    it("should call useFeatureToggle with correct argument", () => {
        renderHook(() => useEnableManaEventEmitter());

        expect(useFeatureToggle).toBeCalledWith(Features.MICRO_FRONTEND_MANA_EVENTEMITTER);
    });
});
