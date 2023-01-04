import { isTeacher } from "src/squads/timesheet/internals/permission";
import {
    StaffTimesheetList,
    AdminTimesheetList,
} from "src/squads/timesheet/modules/timesheet-list";

import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import useGetLocalProfile from "src/squads/timesheet/hooks/useGetLocalProfile";

export default function TimesheetListPage() {
    const { userProfile } = useGetLocalProfile();

    const isTeacherLogging = userProfile && isTeacher(userProfile.userGroup);

    return (
        <TranslationProvider>
            <WrapperPageContent>
                {isTeacherLogging ? (
                    <StaffTimesheetList staffId={userProfile.id} />
                ) : (
                    <AdminTimesheetList />
                )}
            </WrapperPageContent>
        </TranslationProvider>
    );
}
