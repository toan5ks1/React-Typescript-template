import { Features } from "src/squads/communication/common/constants/feature-keys";

import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";

export default function useEnableManaEventEmitter() {
    const { isEnabled } = useFeatureToggle(Features.MICRO_FRONTEND_MANA_EVENTEMITTER) || {};

    return isEnabled;
}
