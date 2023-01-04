import { PropsWithChildren, useEffect, useState } from "react";

import { Entities, ProviderTypes } from "src/common/constants/enum";
import BrightcoveProfileDataContext from "src/contexts/brightcove-profile-data";
import { BrightcoveProfileData } from "src/models/brightcove";

import useDataProvider from "src/hooks/useDataProvider";

const { Provider } = BrightcoveProfileDataContext;

const BrightcoveProfileDataProvider = ({ children }: PropsWithChildren<{}>) => {
    const dataProvider = useDataProvider();
    const [profileData, setProfileData] = useState<BrightcoveProfileData>({
        accountId: "",
        policyKey: "",
    });

    useEffect(() => {
        (async () => {
            const result = await dataProvider(ProviderTypes.ONE, Entities.BRIGHTCOVE, {});
            setProfileData(result?.data);
        })();
    }, [dataProvider]);

    return <Provider value={profileData}>{children}</Provider>;
};

export default BrightcoveProfileDataProvider;
