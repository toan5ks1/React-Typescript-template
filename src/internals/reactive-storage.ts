import { UserIdentity } from "src/typings/auth-provider";
import { GlobalLocationTypeWithLocations } from "src/typings/locations-provider";

import { GradeMap } from "../models/grade";
import { TimezoneOptions } from "../models/timezone";

import ManaStorage, {
    createLocalStorageAdaptor,
    createStorageOption,
    StorageKey,
} from "@manabie-com/mana-storage";
import { LanguageEnums } from "src/typings/i18n-provider";

export type AdminProperties = {
    city_id: string | number;
    district_id: string | number;
    school_id: string | number;
    country: string;
};

export type GlobalLocationTypes = GlobalLocationTypeWithLocations[];

export type OrganizationProperties = {
    active_organization: string;
    saved_organization: string;
};

const GRADE_MAP: StorageKey<GradeMap> = createStorageOption({
    deserialize: true,
    persistent: false,
});

const TOKEN: StorageKey<string> = createStorageOption({
    deserialize: false,
    persistent: false,
});

const PROFILE: StorageKey<UserIdentity> = createStorageOption({
    deserialize: true,
    persistent: false,
});

const LANG: StorageKey<LanguageEnums> = createStorageOption({
    deserialize: false,
    persistent: true,
});

const TIMEZONE: StorageKey<TimezoneOptions> = createStorageOption({
    deserialize: true,
    persistent: true,
});

// TODO: Remove this after SORTED_LOCATIONS_TYPES is stable
const LOCATIONS: StorageKey<GradeMap> = createStorageOption({
    deserialize: true,
    persistent: false,
});

const SORTED_LOCATIONS_TYPES: StorageKey<GlobalLocationTypes> = createStorageOption({
    deserialize: true,
    persistent: false,
});

const ADMIN_PROPERTIES: StorageKey<AdminProperties> = createStorageOption({
    deserialize: true,
    persistent: false,
});

const ORGANIZATION_INFO: StorageKey<OrganizationProperties> = createStorageOption({
    deserialize: true,
    persistent: true,
});

const adaptor = createLocalStorageAdaptor();

const reactiveStorage = new ManaStorage(
    adaptor,
    {
        GRADE_MAP,
        TOKEN,
        PROFILE,
        LANG,
        TIMEZONE,
        ADMIN_PROPERTIES,
        ORGANIZATION_INFO,
        LOCATIONS,
        SORTED_LOCATIONS_TYPES,
    },
    {
        prefix: "manabie",
    }
);
export default reactiveStorage;
