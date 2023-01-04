import { UserIdentity } from "src/squads/timesheet/typings/auth-provider";

import ManaStorage, {
    createLocalStorageAdaptor,
    createStorageOption,
    StorageKey,
} from "@manabie-com/mana-storage";
import { LanguageEnums } from "src/squads/timesheet/typings/i18n-provider";

const PROFILE: StorageKey<UserIdentity> = createStorageOption({
    deserialize: true,
    persistent: false,
});

const LANG: StorageKey<LanguageEnums> = createStorageOption({
    deserialize: false,
    persistent: true,
});

const adaptor = createLocalStorageAdaptor();

const reactiveStorage = new ManaStorage(
    adaptor,
    {
        PROFILE,
        LANG,
    },
    {
        prefix: "manabie",
    }
);
export default reactiveStorage;
