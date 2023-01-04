import { Features } from "src/common/constants/enum";

import useFeatureToggle from "src/squads/adobo/domains/entry-exit/hooks/useFeatureToggle";

export default function useEnableManaEventEmitter() {
    const { isEnabled } = useFeatureToggle(Features.MICRO_FRONTEND_MANA_EVENTEMITTER);

    return isEnabled;
}
