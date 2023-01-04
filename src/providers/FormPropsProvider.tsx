import { createContext, PropsWithChildren, useContext } from "react";

export interface FormPropsContextValue {
    readOnly: boolean;
}

const FormPropsContext = createContext<FormPropsContextValue>({ readOnly: false });

const { Provider } = FormPropsContext;

export const FormPropsProvider = ({
    children,
    readOnly,
}: PropsWithChildren<{ readOnly: boolean }>) => {
    return <Provider value={{ readOnly }}>{children}</Provider>;
};

export default FormPropsContext;
export const useFormProps = () => useContext(FormPropsContext);
