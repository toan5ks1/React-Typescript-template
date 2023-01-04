import { memo } from "react";

import { UserAddress } from "src/squads/user/common/types";

import TooltipColumn from "src/squads/user/components/Tables/ColumnTables/TooltipColumn";

import useLocale from "src/squads/user/hooks/useLocale";
import { LanguageEnums } from "src/squads/user/typings/i18n-provider";

export interface HomeAddressColumnProps {
    isLoading: boolean;
    homeAddress?: UserAddress;
}
export function userAddressFormat(address?: UserAddress) {
    if (!address) return;
    return `${address?.postal_code} ${address?.prefecture?.name}${address?.city}${address?.first_street}${address?.second_street}`;
}

function HomeAddressColumn({ isLoading, homeAddress }: HomeAddressColumnProps) {
    const locale = useLocale();

    const postalCode = homeAddress?.postal_code || "";
    const prefecture = homeAddress?.prefecture?.name || "";
    const city = homeAddress?.city || "";
    const firstStreet = homeAddress?.first_street || "";
    const secondStreet = homeAddress?.second_street || "";

    let homeAddressContent = `${postalCode} ${prefecture} ${city} ${firstStreet} ${secondStreet}`;
    if (locale === LanguageEnums.JA) {
        const [postalCode, ...rest] = homeAddressContent.split(" ");
        homeAddressContent = `${postalCode} ${rest.join("")}`;
    }

    return (
        <TooltipColumn
            isLoading={isLoading}
            content={homeAddressContent.trim()}
            dataTestIdContent="TableColumnHomeAddress__content"
            dataTestIdLoading="TableColumnHomeAddress__loading"
            maxLines={1}
        />
    );
}
export default memo(HomeAddressColumn);
