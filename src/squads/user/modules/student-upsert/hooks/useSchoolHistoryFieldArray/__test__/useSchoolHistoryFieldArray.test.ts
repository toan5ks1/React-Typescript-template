import { useFieldArray, UseFieldArrayReturn, useFormContext } from "react-hook-form";

import useSchoolHistoryFieldArray from "../useSchoolHistoryFieldArray";

import { renderHook, act } from "@testing-library/react-hooks";

jest.mock("react-hook-form", () => ({
    __esModule: true,
    ...jest.requireActual("react-hook-form"),
    useFormContext: jest.fn(),
    useFieldArray: jest.fn(),
}));

describe("useSchoolHistoryFieldArray", () => {
    const append = jest.fn();
    const remove = jest.fn();

    beforeEach(() => {
        (useFormContext as jest.Mock).mockReturnValue({
            control: {},
        });

        (useFieldArray as jest.Mock<Partial<UseFieldArrayReturn>>).mockReturnValue({
            fields: [],
            append,
            remove,
        });
    });
    it("should return fields onAdd onRemove", () => {
        const { result } = renderHook(() => useSchoolHistoryFieldArray());
        expect(result.current.fields).toMatchObject([]);
        expect(typeof result.current.onAdd).toBe("function");
        expect(typeof result.current.onRemove).toBe("function");
    });

    it("should call append when adding new field", () => {
        const { result } = renderHook(() => useSchoolHistoryFieldArray());

        act(() => {
            result.current.onAdd();
        });
        expect(append).toBeCalledTimes(1);
    });

    it("should call remove when removing fields", () => {
        const { result } = renderHook(() => useSchoolHistoryFieldArray());

        act(() => {
            result.current.onRemove([]);
        });
        expect(remove).toBeCalledTimes(1);
    });
});
