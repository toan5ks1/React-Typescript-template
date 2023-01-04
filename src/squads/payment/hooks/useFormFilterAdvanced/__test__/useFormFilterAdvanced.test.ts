import { useFormContext } from "react-hook-form";
import { FilterAppliedObjectsMap } from "src/common/constants/types";

import useFormFilterAdvanced, { UseFormFilterAdvancedReturn } from "../useFormFilterAdvanced";

import { act, renderHook, RenderHookResult } from "@testing-library/react-hooks";

type FormTestValues = {
    name: string;
};

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");
    const formValue = { name: "" };

    return {
        ...originalModule,
        useFormContext: () => {
            return {
                setValue: (key: string, value: string) => {
                    formValue[key] = value;
                },
                watch: (key?: string) => (key ? formValue[key] : formValue),
                getValues: (key?: string) => (key ? formValue[key] : formValue),
                handleSubmit: jest.fn(),
                reset: jest.fn(),
            };
        },
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar");

const convertFilterFieldsObjects = (
    isApplied: boolean
): FilterAppliedObjectsMap<FormTestValues> => ({
    name: {
        name: "name",
        inputLabel: "name",
        isApplied: isApplied,
        defaultValue: "",
    },
});

describe("useFormFilterAdvanced", () => {
    const onApplySubmit = jest.fn();
    const defaultValue: FormTestValues = { name: "" };

    const { result: formContext } = renderHook(() => useFormContext<FormTestValues>());

    const renderUseFormFilterAdvanced = (
        isNoData: boolean,
        filterFieldObjects: FilterAppliedObjectsMap<FormTestValues>
    ): RenderHookResult<null, UseFormFilterAdvancedReturn<FormTestValues>> => {
        return renderHook(() =>
            useFormFilterAdvanced<FormTestValues>({
                defaultValue,
                isNoData,
                filterFieldObjects,
                onApplySubmit,
                ...formContext.current,
            })
        );
    };

    afterEach(() => {
        jest.resetAllMocks();
    });

    it("handle apply filter", () => {
        const isNoData = false;
        const filterFieldObjects = convertFilterFieldsObjects(false);

        const { result: hookResult } = renderUseFormFilterAdvanced(isNoData, filterFieldObjects);

        act(() => {
            formContext.current.setValue("name", "Test Name");
            hookResult.current.onApply({ name: "Test Name" });
        });

        expect(hookResult.current.filterApplied.length).toEqual(1);

        expect(onApplySubmit).toBeCalled();
        expect(onApplySubmit).toHaveBeenCalledWith({ name: "Test Name" });
    });

    it("handle reset filter", () => {
        const isNoData = false;
        const filterFieldObjects = convertFilterFieldsObjects(false);

        const { result: hookResult } = renderUseFormFilterAdvanced(isNoData, filterFieldObjects);

        act(() => {
            formContext.current.setValue("name", "Test Name");
            hookResult.current.onReset();
        });

        expect(formContext.current.reset).toBeCalled();
        expect(formContext.current.reset).toHaveBeenCalledWith(defaultValue);
        expect(onApplySubmit).toBeCalled();
        expect(onApplySubmit).toHaveBeenCalledWith(defaultValue);
    });

    it("handle close popover", () => {
        const isNoData = false;
        const filterFieldObjects = convertFilterFieldsObjects(false);

        const { result: hookResult } = renderUseFormFilterAdvanced(isNoData, filterFieldObjects);

        act(() => {
            formContext.current.setValue("name", "Test Name");
            hookResult.current.onClosePopover();
        });

        expect(formContext.current.reset).toBeCalled();
        expect(formContext.current.reset).toHaveBeenCalledWith({ name: "Test Name" });
    });

    it("handle delete chip filter", () => {
        const isNoData = false;
        const filterFieldObjects = convertFilterFieldsObjects(true);

        const { result: hookResult } = renderUseFormFilterAdvanced(isNoData, filterFieldObjects);

        act(() => {
            formContext.current.setValue("name", "Test Name");
            hookResult.current.onDelete("name");
        });

        expect(formContext.current.reset).toBeCalled();
        expect(formContext.current.reset).toHaveBeenCalledWith({ name: "" });
        expect(onApplySubmit).toBeCalled();
        expect(onApplySubmit).toHaveBeenCalledWith({ name: "" });
    });
});
