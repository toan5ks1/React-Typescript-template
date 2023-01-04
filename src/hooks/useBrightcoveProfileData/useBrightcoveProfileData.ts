import { useBrightcoveProfileDataCtx } from "src/contexts/brightcove-profile-data";
import { BrightcoveProfileData } from "src/models/brightcove";

interface UseBrightcoveProfileDataReturns extends BrightcoveProfileData {}

function useBrightcoveProfileData(): UseBrightcoveProfileDataReturns {
    const profileData = useBrightcoveProfileDataCtx();

    return profileData;
}

export default useBrightcoveProfileData;
