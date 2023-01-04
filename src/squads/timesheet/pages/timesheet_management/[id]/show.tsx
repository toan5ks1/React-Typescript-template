import { useParams } from "react-router";
import TimesheetDetail from "src/squads/timesheet/modules/timesheet-detail";

import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import useGetLocalProfile from "src/squads/timesheet/hooks/useGetLocalProfile";

export default function TimesheetDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { userProfile } = useGetLocalProfile();

    return (
        <TranslationProvider>
            <WrapperPageContent>
                {userProfile && <TimesheetDetail id={id} userProfile={userProfile} />}
            </WrapperPageContent>
        </TranslationProvider>
    );
}
