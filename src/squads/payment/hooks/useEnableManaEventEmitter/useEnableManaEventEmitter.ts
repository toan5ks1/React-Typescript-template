import { PaymentFeatures } from "src/squads/payment/constants/permission";

import useFeatureToggle from "../useFeatureToggle";

export default function useEnableManaEventEmitter() {
    const isEnabled = useFeatureToggle(PaymentFeatures.MICRO_FRONTEND_MANA_EVENTEMITTER).isEnabled;

    return isEnabled;
}
