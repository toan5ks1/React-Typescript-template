import { RegisterOptions, UseFormReturn as UseFormMethodsHF } from "react-hook-form";

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
