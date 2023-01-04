import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { createMockGetSyllabusBookOne } from "src/squads/syllabus/providers/__tests__/data";

import { BookTypeKeys } from "../../common/constants";
import useBookTypeRestrictInfo from "../useBookTypeRestrictInfo";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe(useBookTypeRestrictInfo.name, () => {
    it("should return true when flag is enabled and book type is AD_HOC", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });

        const data = createMockGetSyllabusBookOne({ book_type: BookTypeKeys.BOOK_TYPE_ADHOC });
        (inferQuery as jest.Mock).mockReturnValue(() => ({ data }));

        const { result } = renderHook(() => useBookTypeRestrictInfo("BOOK_ID"));

        expect(result.current.isDisabled).toEqual(true);
    });

    it("should return true book is invalid", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });

        const data = undefined;
        (inferQuery as jest.Mock).mockReturnValue(() => ({ data }));

        const { result } = renderHook(() => useBookTypeRestrictInfo("BOOK_ID"));

        expect(result.current.isDisabled).toEqual(true);
    });

    it("should return false when flag is disabled", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: false,
            };
        });

        const data = createMockGetSyllabusBookOne({ book_type: BookTypeKeys.BOOK_TYPE_ADHOC });
        (inferQuery as jest.Mock).mockReturnValue(() => ({ data }));

        const { result } = renderHook(() => useBookTypeRestrictInfo("BOOK_ID"));

        expect(result.current.isDisabled).toEqual(false);
    });

    it("should return false when book type is not AD_HOC", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });

        const data = createMockGetSyllabusBookOne();
        (inferQuery as jest.Mock).mockReturnValue(() => ({ data }));

        const { result } = renderHook(() => useBookTypeRestrictInfo("BOOK_ID"));

        expect(result.current.isDisabled).toEqual(false);
    });
});
