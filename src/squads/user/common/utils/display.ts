import { COUNTRY_INFO } from "src/common/constants/const";
import { convertString } from "src/common/constants/helper";

import { Country } from "manabie-bob/enum_pb";

export function phoneNumberFormat(country: string | undefined, phoneNumber: string | undefined) {
    if (!phoneNumber) return "";

    const countrySelect = Country[country || ""] || Country.COUNTRY_JP;
    const countryCode = COUNTRY_INFO[countrySelect]?.code;

    return `(${countryCode}) ${convertString(phoneNumber)}`;
}

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
