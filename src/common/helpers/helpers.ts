import { TypeEntity } from "../../typings/react-admin";
import { DEFAULT_PRIMARY_KEY, PRIMARY_KEYS } from "../constants/other";

export const getPrimaryKey = (resource: TypeEntity) => {
    return PRIMARY_KEYS[resource] || DEFAULT_PRIMARY_KEY;
};

interface FirstOptionsChoiceProps {
    firstChoiceLabel: string;
    key?: string;
    keyValue?: string;
}

//hack for all first options
export function firstOptionsChoice<T extends any>({
    firstChoiceLabel,
    keyValue = "value",
    key = "id",
}: FirstOptionsChoiceProps): T {
    return {
        [keyValue]: firstChoiceLabel,
        [key]: undefined,
    } as T;
}
