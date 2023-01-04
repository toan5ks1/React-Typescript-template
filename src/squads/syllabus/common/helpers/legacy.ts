import { DEFAULT_PRIMARY_KEY, PRIMARY_KEYS } from "src/common/constants/other";

import { TypeEntity } from "../../typings/react-admin";

export const getPrimaryKey = (resource: TypeEntity) => {
    return PRIMARY_KEYS[resource] || DEFAULT_PRIMARY_KEY;
};
