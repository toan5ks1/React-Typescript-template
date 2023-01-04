import {
    useState,
    createContext,
    PropsWithChildren,
    useMemo,
    Dispatch,
    SetStateAction,
} from "react";

export interface UIToggleSchema {
    menu: boolean;
    appbar: boolean;
    contentSpacing: boolean;
}

const initUISchema: UIToggleSchema = {
    menu: true,
    appbar: true,
    contentSpacing: true,
};

interface UIToggleContextProps {
    uiSchema: UIToggleSchema;
    setUISchema: Dispatch<SetStateAction<UIToggleSchema>>;
}

const initialContext: UIToggleContextProps = {
    uiSchema: initUISchema,
    setUISchema: () => {},
};

export const UIToggleContext = createContext<UIToggleContextProps>(initialContext);

const UIToggleContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const [uiSchema, setUISchema] = useState(initUISchema);

    const contextValue = useMemo(() => {
        return {
            uiSchema,
            setUISchema,
        };
    }, [uiSchema]);

    return <UIToggleContext.Provider value={contextValue}>{children}</UIToggleContext.Provider>;
};

export default UIToggleContextProvider;
