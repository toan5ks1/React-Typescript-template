import { useState } from "react";

import { ERPModules, Features } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import {
    Lesson_SchedulerBySchedulerIdQuery,
    MediasManyQuery,
} from "src/squads/lesson/service/bob/bob-types";

import { EditOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import ButtonEdit from "src/components/Buttons/ButtonEdit";
import DividerDashed from "src/components/Divider/DividerDashed";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";
import DetailSectionLessonGeneralInfo from "src/squads/lesson/pages/LessonManagement/components/DetailSections/DetailSectionLessonGeneralInfo";
import DetailSectionLessonMaterials from "src/squads/lesson/pages/LessonManagement/components/DetailSections/DetailSectionLessonMaterials";
import DetailSectionLessonRecurring from "src/squads/lesson/pages/LessonManagement/components/DetailSections/DetailSectionLessonRecurring";
import DetailSectionLessonStudents from "src/squads/lesson/pages/LessonManagement/components/DetailSections/DetailSectionLessonStudents";

import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import LessonUpsert from "src/squads/lesson/pages/LessonManagement/LessonUpsert";
import { LessonDataWithStudentSubscriptions } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface TabLessonDetailProps {
    lesson: LessonDataWithStudentSubscriptions;
    isLoadingLesson: boolean;
    isLoadingMedia: boolean;
    isLoadingCenter: boolean;
    mediasList: MediasManyQuery["media"] | undefined;
    centerName: string;
    className: string;
    isLoadingClass: boolean;
    scheduler: ArrayElement<Lesson_SchedulerBySchedulerIdQuery["scheduler"]> | undefined;
    isLoadingScheduler: boolean;
    onUpdatedLesson: () => Promise<void>;
}

const renderDivider = (
    <Box my={3}>
        <DividerDashed />
    </Box>
);

const TabLessonDetail = (props: TabLessonDetailProps) => {
    const {
        lesson,
        isLoadingLesson,
        mediasList,
        isLoadingMedia,
        centerName,
        isLoadingCenter,
        className,
        isLoadingClass,
        scheduler,
        isLoadingScheduler,
        onUpdatedLesson,
    } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const { isEnabled: isEnabledLessonGroup } = useFeatureToggle(
        Features.LESSON_CREATE_LESSON_GROUP
    );

    const { isEnabled: isEnabledRecurringLesson } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_RECURRING_LESSON
    );

    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    const isLoadingPage =
        isLoadingLesson || isLoadingMedia || isLoadingCenter || isLoadingScheduler || !lesson;

    const handleEditLessonSuccess = async () => {
        await onUpdatedLesson();
        setIsCreateDialogOpen(false);
    };

    const getLessonScheduler = () => {
        if (!lesson.scheduler_id && !scheduler)
            return {
                scheduler_id: "MISSING_SCHEDULER_ID",
                start_date: lesson.start_time,
                end_date: lesson.end_time,
                freq: "once",
            };
        return scheduler;
    };
    return (
        <Box data-testid="TabLessonDetail__container">
            <WrapperPageHeader
                title={tLessonManagement("lessonDetail")}
                action={
                    <ButtonEdit
                        isLoading={isLoadingPage}
                        disabled={isLoadingPage}
                        variant="outlined"
                        onClick={() => setIsCreateDialogOpen(true)}
                        data-testid="TabLessonDetail__buttonEdit"
                        startIcon={<EditOutlined />}
                    />
                }
            />
            <DetailSectionLessonGeneralInfo
                lesson={lesson}
                isLoadingGeneralInfo={isLoadingLesson}
                centerName={centerName}
                isLoadingCenter={isLoadingCenter}
                className={className}
                isLoadingClass={isLoadingClass}
            />

            {isEnabledRecurringLesson ? (
                <>
                    {renderDivider}
                    <DetailSectionLessonRecurring
                        scheduler={getLessonScheduler()}
                        isLoadingScheduler={isLoadingScheduler}
                    />
                </>
            ) : null}

            {renderDivider}
            <DetailSectionLessonStudents
                lessonMembers={lesson.lesson_members}
                isLoading={isLoadingLesson}
            />
            {renderDivider}
            <DetailSectionLessonMaterials
                mediasList={mediasList}
                isLoadingMedias={isLoadingMedia}
            />

            {isCreateDialogOpen && (
                <LessonUpsert
                    isOpen={isCreateDialogOpen}
                    mode="EDIT"
                    isEnabledLessonGroup={isEnabledLessonGroup}
                    lesson={lesson}
                    centerName={centerName}
                    className={className}
                    mediasList={mediasList}
                    scheduler={scheduler}
                    onUpsertSuccessfully={handleEditLessonSuccess}
                    onCloseUpsertDialog={() => setIsCreateDialogOpen(false)}
                />
            )}
        </Box>
    );
};

export default TabLessonDetail;
