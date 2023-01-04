import { Features } from "src/common/constants/enum";

import useFeatureToggle from "../useFeatureToggle";

export default function useEnableManaEventEmitter() {
    const { isEnabled } = useFeatureToggle(Features.MICRO_FRONTEND_MANA_EVENTEMITTER);

    return isEnabled;
}
