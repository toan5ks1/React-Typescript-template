import { Features } from "src/common/constants/enum";

import useFeatureToggle from "src/squads/user/hooks/useFeatureToggle";

export function useEditStaffEmailFeatureFlag() {
    return useFeatureToggle(Features.STAFF_MANAGEMENT_STAFF_EMAIL_EDITABLE).isEnabled;
}
