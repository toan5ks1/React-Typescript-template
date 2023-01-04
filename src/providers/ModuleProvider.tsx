import { createContext, PropsWithChildren, useContext } from "react";

import { IAppResource } from "../models/resource";

export type ModuleCtxValue = IAppResource[];

const ModuleProviderContext = createContext<ModuleCtxValue>([]);

const { Provider } = ModuleProviderContext;

export const ModuleProvider = ({
    children,
    modules,
}: PropsWithChildren<{ modules: ModuleCtxValue }>) => {
    return <Provider value={modules}>{children}</Provider>;
};

export default ModuleProviderContext;
export const useModules = () => useContext(ModuleProviderContext);
