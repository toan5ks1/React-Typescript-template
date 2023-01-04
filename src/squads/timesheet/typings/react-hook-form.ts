import {
    RegisterOptions,
    UseControllerProps,
    UseFormReturn as UseFormMethodsHF,
} from "react-hook-form";

//TODO: merge rules with HookFormControllerOptionProps, will create another PR
export interface UseFormRules {
    rules?: Exclude<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
}

export interface UseFormMethods<T> {
    methods?: UseFormMethodsHF<T>;
}

export interface UseFormType<T = any>
    extends Pick<
            UseFormMethodsHF<T>,
            | "register"
            | "formState"
            | "control"
            | "setValue"
            | "getValues"
            | "watch"
            | "reset"
            | "handleSubmit"
        >,
        UseFormRules {}

// TODO: Remove "control" after refactor HFComponent
export interface HookFormCommonProps<T = any>
    extends Pick<UseFormMethodsHF<T>, "register" | "control">,
        Pick<UseFormType<T>, "rules" | "formState" | "setValue" | "getValues" | "watch"> {}

export interface HookFormControllerOptionProps<T = any>
    extends Pick<UseControllerProps<T>, "rules" | "name"> {}
