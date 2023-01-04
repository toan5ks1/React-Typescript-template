import { UserIdentity } from "src/squads/user/typings/auth-provider";

import ManaStorage, {
    createLocalStorageAdaptor,
    createStorageOption,
    StorageKey,
} from "@manabie-com/mana-storage";
import { LanguageEnums } from "src/squads/user/typings/i18n-provider";

export type AdminProperties = {
    city_id: string | number;
    district_id: string | number;
    school_id: string | number;
    country: string;
};

export type OrganizationProperties = {
    active_organization: string;
    saved_organization: string;
};

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
        TOKEN,
        PROFILE,
        LANG,
        ADMIN_PROPERTIES,
        ORGANIZATION_INFO,
    },
    {
        prefix: "manabie",
    }
);
export default reactiveStorage;
