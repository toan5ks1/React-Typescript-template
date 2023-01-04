import { DependencyList, useEffect } from "react";

import { FieldValues, useFormContext } from "react-hook-form";

interface useTriggerValidationByFormValuesChangeProps {
    fieldName: string | string[];
    deps: DependencyList;
}

const useTriggerValidationByFormValuesChange = ({
    fieldName,
    deps,
}: useTriggerValidationByFormValuesChangeProps): void => {
    const {
        trigger,
        formState: { submitCount },
    } = useFormContext<FieldValues>();

    useEffect(() => {
        if (submitCount) {
            (async () => {
                await trigger(fieldName);
            })();
        }
    }, [deps, fieldName, trigger, submitCount]);
};

export default useTriggerValidationByFormValuesChange;
