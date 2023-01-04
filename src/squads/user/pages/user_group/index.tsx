import UserGroupList from "src/squads/user/modules/user-group-list";

import TranslationProvider from "src/squads/user/providers/TranslationProvider";

export default function UserGroupListPage() {
    return (
        <TranslationProvider>
            <UserGroupList />
        </TranslationProvider>
    );
}
