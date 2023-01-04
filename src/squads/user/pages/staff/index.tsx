import StaffList from "src/squads/user/modules/staff-list";

import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import TranslationProvider from "src/squads/user/providers/TranslationProvider";

export default function StaffListPage() {
    return (
        <TranslationProvider>
            <WrapperPageContent>
                <StaffList />
            </WrapperPageContent>
        </TranslationProvider>
    );
}
