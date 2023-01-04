import StudentList from "src/squads/user/modules/student-list";

import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import TranslationProvider from "src/squads/user/providers/TranslationProvider";

export default function StudentListPage() {
    return (
        <TranslationProvider>
            <WrapperPageContent>
                <StudentList />
            </WrapperPageContent>
        </TranslationProvider>
    );
}
