import { useParams } from "react-router";
import StaffDetail from "src/squads/user/modules/staff-detail";

import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import TranslationProvider from "src/squads/user/providers/TranslationProvider";

const StaffDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <TranslationProvider>
            <WrapperPageContent>
                <StaffDetail id={id} />
            </WrapperPageContent>
        </TranslationProvider>
    );
};
export default StaffDetailPage;
