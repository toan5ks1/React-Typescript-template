import { UserIdentity } from "src/typings/auth-provider";

import ManaStorage, {
    createLocalStorageAdaptor,
    createStorageOption,
    StorageKey,
} from "@manabie-com/mana-storage";
import { LanguageEnums } from "src/squads/syllabus/typings/i18n-provider";

export type AdminProperties = {
    city_id: string | number;
    district_id: string | number;
    school_id: string | number;
    country: string;
};

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

const adaptor = createLocalStorageAdaptor();

const reactiveStorage = new ManaStorage(
    adaptor,
    {
        PROFILE,
        LANG,
        ADMIN_PROPERTIES,
    },
    {
        prefix: "manabie",
    }
);
export default reactiveStorage;
