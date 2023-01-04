import { UserIdentity } from "src/typings/auth-provider";

import ManaStorage, {
    createLocalStorageAdaptor,
    createStorageOption,
    StorageKey,
} from "@manabie-com/mana-storage";

const PROFILE: StorageKey<UserIdentity> = createStorageOption({
    deserialize: true,
    persistent: false,
});

const adaptor = createLocalStorageAdaptor();

const reactiveStorage = new ManaStorage(
    adaptor,
    {
        PROFILE,
    },
    {
        prefix: "manabie",
    }
);
export default reactiveStorage;
