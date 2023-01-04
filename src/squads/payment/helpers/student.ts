import { Payment_GetStudentsManyV3Query } from "src/squads/payment/service/bob/bob-types";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { isNotUndefinedOrNull } from "src/squads/payment/utils/types";

export const getStudentName = (
    user: ArrayElement<Payment_GetStudentsManyV3Query["students"]>["user"]
) => (user ? `${user.last_name} ${user.first_name}` : "");

export const getSelectedStudentIdsFromQuery = (
    query: string | (string | null)[] | null
): string[] => {
    return typeof query === "string"
        ? [query]
        : Array.isArray(query)
        ? query.filter(isNotUndefinedOrNull)
        : [];
};
