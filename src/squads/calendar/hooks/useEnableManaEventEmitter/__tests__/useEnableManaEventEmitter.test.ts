import { Features } from "src/common/constants/enum";

import useEnableManaEventEmitter from "../useEnableManaEventEmitter";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureToggle from "src/squads/calendar/hooks/useFeatureToggle";

jest.mock("src/squads/calendar/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe(useEnableManaEventEmitter.name, () => {
    it("should call useFeatureToggle with correct argument", () => {
        (useFeatureToggle as jest.Mock).mockReturnValue({ isEnabled: true });

        const {
            result: { current: isEnabled },
        } = renderHook(() => useEnableManaEventEmitter());

        expect(useFeatureToggle).toBeCalledWith(Features.MICRO_FRONTEND_MANA_EVENTEMITTER);
        expect(isEnabled).toEqual(true);
    });
});
