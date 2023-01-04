import { useParams } from "react-router";

import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import TranslationProvider from "src/squads/user/providers/TranslationProvider";

import UserGroupDetail from "src/squads/user/modules/user-group-detail/UserGroupDetail";

const UserGroupDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <TranslationProvider>
            <WrapperPageContent>
                <UserGroupDetail id={id} />
            </WrapperPageContent>
        </TranslationProvider>
    );
};
export default UserGroupDetailPage;
