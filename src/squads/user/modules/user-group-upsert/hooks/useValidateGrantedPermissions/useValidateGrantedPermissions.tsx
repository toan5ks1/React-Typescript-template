import { LocationInformation } from "src/squads/user/common/types";
import { Role } from "src/squads/user/common/types/user-group";

import useTranslate from "src/squads/user/hooks/useTranslate";

const useValidateGrantedPermissions = () => {
    const t = useTranslate();
    const validateRole = (role: Role) => {
        if (!role.role_id || !role.role_name) return t("ra.validation.requiredAll");
    };
    const validateLocations = (locations: LocationInformation[]) => {
        if (!locations.length) return t("ra.validation.requiredAll");
    };
    return {
        validate: {
            required: {
                value: true,
                message: "0",
            },
            role: validateRole,
            locations: validateLocations,
        },
    };
};

export default useValidateGrantedPermissions;
