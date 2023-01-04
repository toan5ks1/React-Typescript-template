import { useParams } from "react-router";
import { StudentDetail } from "src/squads/user/modules/student-detail";

import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import StudentDetailProvider from "src/squads/user/providers/StudentDetailProvider";
import TranslationProvider from "src/squads/user/providers/TranslationProvider";

export default function StudentDetailPage() {
    const { id } = useParams<{ id: string }>();

    return (
        <TranslationProvider>
            <StudentDetailProvider id={id}>
                <WrapperPageContent>
                    <StudentDetail />
                </WrapperPageContent>
            </StudentDetailProvider>
        </TranslationProvider>
    );
}
