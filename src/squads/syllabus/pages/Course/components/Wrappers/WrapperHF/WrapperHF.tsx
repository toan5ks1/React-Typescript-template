import { ReactNode, useMemo } from "react";

import {
    DeepPartial,
    FieldValues,
    UnpackNestedValue,
    useForm,
    UseFormHandleSubmit,
} from "react-hook-form";

import HookForm from "src/components/Forms/HookForm";

interface WrapperHFRenderProps<T> {
    handleSubmit: UseFormHandleSubmit<T>; // Should use only handleSubmit from useForm to avoid re-render
}

export interface WrapperHFProps<T> {
    defaultValues?: UnpackNestedValue<DeepPartial<T>>;
    render: (props: WrapperHFRenderProps<T>) => ReactNode;
}

const WrapperHF = <T extends FieldValues>(props: WrapperHFProps<T>) => {
    const { defaultValues, render } = props;

    const methodsHF = useForm<T>({ defaultValues });

    const renderChildren = useMemo(() => {
        return render({ handleSubmit: methodsHF.handleSubmit });
    }, [methodsHF.handleSubmit, render]);

    return <HookForm methods={methodsHF}>{renderChildren}</HookForm>;
};

export default WrapperHF;
