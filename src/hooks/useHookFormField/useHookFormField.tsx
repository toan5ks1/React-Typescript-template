import { useCallback, useEffect, useState } from "react";

import {
    RegisterOptions,
    SetValueConfig,
    useFormContext,
    Path,
    UnpackNestedValue,
    PathValue,
} from "react-hook-form";

function useHookFormField<FormType, ValueType>(
    fieldName: Path<FormType>,
    defaultValue: ValueType,
    registerRules?: RegisterOptions,
    setValueConfig?: SetValueConfig
): [ValueType, (state: ValueType) => void] {
    const { register, setValue } = useFormContext<FormType>();
    const [state, setState] = useState(defaultValue);
    useEffect(() => {
        register(fieldName, registerRules);
        setValue(fieldName, defaultValue as UnpackNestedValue<PathValue<FormType, Path<FormType>>>);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // This is only meant to be ran once

    return [
        state,
        useCallback(
            (newState: ValueType) => {
                setState(newState);
                setValue(
                    fieldName,
                    newState as UnpackNestedValue<PathValue<FormType, Path<FormType>>>,
                    setValueConfig
                );
            },
            [fieldName, setValue, setValueConfig]
        ),
    ];
}
// can not be assigned to
export default useHookFormField;
