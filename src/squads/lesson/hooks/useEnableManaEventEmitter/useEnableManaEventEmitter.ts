import { Features } from "src/common/constants/enum";

import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";

export default function useEnableManaEventEmitter() {
    const { isEnabled } = useFeatureToggle(Features.MICRO_FRONTEND_MANA_EVENTEMITTER);

    return isEnabled;
}
