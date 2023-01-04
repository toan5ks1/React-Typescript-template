import { createContext, useContext } from "react";

import { BrightcoveProfileData } from "src/models/brightcove";

interface IBrightcoveProfileDataContext extends BrightcoveProfileData {}

const BrightcoveProfileDataContext = createContext<IBrightcoveProfileDataContext>({
    accountId: "",
    policyKey: "",
});

export const useBrightcoveProfileDataCtx = () => useContext(BrightcoveProfileDataContext);

export default BrightcoveProfileDataContext;
