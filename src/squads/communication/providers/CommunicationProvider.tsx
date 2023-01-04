import { PropsWithChildren } from "react";

import TranslationProvider from "src/squads/communication/providers/TranslationProvider";

interface CommunicationProviderProps {}

const CommunicationProvider = ({ children }: PropsWithChildren<CommunicationProviderProps>) => {
    return <TranslationProvider>{children}</TranslationProvider>;
};

export default CommunicationProvider;
