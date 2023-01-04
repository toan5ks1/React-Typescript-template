import { useFormContext } from "src/components/Forms/HookForm";

import { renderHook, act } from "@testing-library/react-hooks";
import useDatePickerPairHF from "src/squads/lesson/hooks/useDatePickerPairHF";

jest.mock("src/components/Forms/HookForm", () => {
    const formValue = {
        start: new Date(),
        end: new Date(),
    };
    return {
        useFormContext: () => ({
            setValue: (key: string, value: Date) => {
                formValue[key] = value;
            },
            watch: (keys: string[]) => keys.map((key) => formValue[key]),
        }),
    };
});

describe("useDatePickerPairHF with default offset", () => {
    it("should not set an end date when end date after start date with a default offset", () => {
        const { result } = renderHook(() => useFormContext());
        renderHook(() => useDatePickerPairHF("start", "end"));
        const [end] = result.current.watch(["end"]);

        const today = new Date();
        expect(end.getDate()).toEqual(today.getDate());
        expect(end.getMonth()).toEqual(today.getMonth());
        expect(end.getFullYear()).toEqual(today.getFullYear());
    });

    it("should set an end date when end date before start date with a default offset", () => {
        const { result } = renderHook(() => useFormContext());

        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 3);
        result.current.setValue("start", nextDay);

        renderHook(() => useDatePickerPairHF("start", "end"));

        const [end] = result.current.watch(["end"]);
        expect(end.getDate()).toEqual(nextDay.getDate());
        expect(end.getMonth()).toEqual(nextDay.getMonth());
        expect(end.getFullYear()).toEqual(nextDay.getFullYear());
    });

    it("should set an end date when useFormContext update", () => {
        const { result } = renderHook(() => useFormContext());

        const { rerender } = renderHook(() => useDatePickerPairHF("start", "end"));

        const nextDay = new Date();
        act(() => {
            nextDay.setDate(nextDay.getDate() + 5);
            result.current.setValue("start", nextDay);
        });
        rerender();

        const [end] = result.current.watch(["end"]);

        expect(end.getDate()).toEqual(nextDay.getDate());
        expect(end.getMonth()).toEqual(nextDay.getMonth());
        expect(end.getFullYear()).toEqual(nextDay.getFullYear());
    });
});

describe("useDatePickerPairHF with offset", () => {
    it("should not set an end date when end date less then offset date start date", () => {
        const { result } = renderHook(() => useFormContext());

        result.current.setValue("start", new Date());

        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 3);
        result.current.setValue("end", nextDay);

        renderHook(() => useDatePickerPairHF("start", "end", 2));
        const [end] = result.current.watch(["end"]);

        expect(end.getDate()).toEqual(nextDay.getDate());
        expect(end.getMonth()).toEqual(nextDay.getMonth());
        expect(end.getFullYear()).toEqual(nextDay.getFullYear());
    });

    it("should set an end date when end date before start date with a default offset", () => {
        const { result } = renderHook(() => useFormContext());

        result.current.setValue("start", new Date());
        result.current.setValue("end", new Date());

        renderHook(() => useDatePickerPairHF("start", "end", 2));

        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 2);

        const [end] = result.current.watch(["end"]);
        expect(end.getDate()).toEqual(nextDay.getDate());
        expect(end.getMonth()).toEqual(nextDay.getMonth());
        expect(end.getFullYear()).toEqual(nextDay.getFullYear());
    });
});
