import { useMemo, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { ERPModules, Features } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";

import { Box, Tab } from "@mui/material";
import NoResultPage from "src/components/NoResultPage";
import TabLayout, { TabLayoutRefs } from "src/components/Tabs/TabLayout";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import { formFilterDefaultValues } from "src/squads/lesson/pages/LessonManagement/components/Forms/FormFilterAdvancedLesson";
import TableLessonsWithPaging from "src/squads/lesson/pages/LessonManagement/components/Tables/TableLessonsWithPaging";
import TabLessonList from "src/squads/lesson/pages/LessonManagement/components/Tabs/TabLessonList";

import useGlobalLocations from "src/hooks/useGlobalLocations";
import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import { MapTabReturns } from "src/squads/lesson/hooks/useTabs";
import LessonUpsert from "src/squads/lesson/pages/LessonManagement/LessonUpsert";
import { LessonListTabs } from "src/squads/lesson/pages/LessonManagement/common/types";
import useLessonList from "src/squads/lesson/pages/LessonManagement/hooks/useLessonList";
import { FormFilterLessonManagementValues } from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForFormFilterAdvancedLessonManagement";

const LessonList = () => {
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const tabLayoutRef = useRef<TabLayoutRefs>();

    const { locations } = useGlobalLocations();

    const locationIds = useMemo(
        () => locations.map((location) => location.locationId),
        [locations]
    );

    const { isEnabled: isEnabledLessonGroup } = useFeatureToggle(
        Features.LESSON_CREATE_LESSON_GROUP
    );

    const {
        isLoadingLesson: isLoadingLessonFuture,
        isLoadingLessonReport: isLoadingLessonReportFuture,
        isLoadingCenter: isLoadingCenterLessonFuture,
        isLoadingTeacher: isLoadingTeacherLessonFuture,
        isLoadingCourse: isFutureLessonLoadingCourse,
        isLoadingClass: isFutureLessonLoadingClass,
        isSearching: isSearchingForFutureLesson,
        isFiltered: isFilteredForFutureLesson,
        lessons: lessonsFuture,
        pagination: paginationLessonFuture,
        onSearch: onSearchLessonFuture,
        onFilter: onFilterLessonFuture, // TODO: remove this fn when Lesson Group is enabled (LT-13375)
        onFilterV2: onFilterV2LessonFuture,
        keyword: keywordLessonsFuture,
        refreshPage: refreshFutureLessonsList,
    } = useLessonList({ isFutureLesson: true, locationIdsList: locationIds });

    const {
        isLoadingLesson: isLoadingLessonPast,
        isLoadingLessonReport: isLoadingLessonReportPast,
        isLoadingCenter: isLoadingCenterLessonPast,
        isLoadingTeacher: isLoadingTeacherLessonPast,
        isLoadingCourse: isPastLessonLoadingCourse,
        isLoadingClass: isPastLessonLoadingClass,
        isSearching: isSearchingForPastLesson,
        isFiltered: isFilteredForPastLesson,
        lessons: lessonsPast,
        pagination: paginationLessonPast,
        onSearch: onSearchLessonPast,
        onFilter: onFilterLessonPast, // TODO: remove this fn when Lesson Group is enabled (LT-13375)
        onFilterV2: onFilterV2LessonPast,
        keyword: keywordLessonsPast,
        refreshPage: refreshPastLessonsList,
    } = useLessonList({ isFutureLesson: false, locationIdsList: locationIds });

    const methodsLessonFuture = useForm<FormFilterLessonManagementValues>({
        defaultValues: formFilterDefaultValues,
    });

    const methodsLessonPast = useForm<FormFilterLessonManagementValues>({
        defaultValues: formFilterDefaultValues,
    });

    const isShowNoResultPageOnFutureLesson =
        isEnabledLessonGroup &&
        !arrayHasItem(lessonsFuture) &&
        (isSearchingForFutureLesson || isFilteredForFutureLesson);

    const isShowNoResultPageOnPastLesson =
        isEnabledLessonGroup &&
        !arrayHasItem(lessonsPast) &&
        (isSearchingForPastLesson || isFilteredForPastLesson);

    const handleCreateTabsList = (): MapTabReturns[] => {
        const tabsList = [
            {
                tabName: <Tab label={tLessonManagement("futureLessons")} />,
                tabPanel: (
                    <TabLessonList
                        onCreate={() => setIsCreateDialogOpen(true)}
                        table={
                            isShowNoResultPageOnFutureLesson ? (
                                <Box pt={10}>
                                    <NoResultPage />
                                </Box>
                            ) : (
                                <TableLessonsWithPaging
                                    key="LessonList__listFuture"
                                    data={lessonsFuture}
                                    isLoadingLesson={isLoadingLessonFuture}
                                    isLoadingLessonReport={isLoadingLessonReportFuture}
                                    isLoadingTeacher={isLoadingTeacherLessonFuture}
                                    isLoadingCenter={isLoadingCenterLessonFuture}
                                    isLoadingCourse={isFutureLessonLoadingCourse}
                                    isLoadingClass={isFutureLessonLoadingClass}
                                    pagination={paginationLessonFuture}
                                />
                            )
                        }
                        methods={methodsLessonFuture}
                        onFilter={onFilterLessonFuture}
                        onFilterV2={onFilterV2LessonFuture}
                        onSearch={onSearchLessonFuture}
                        keyword={keywordLessonsFuture}
                    />
                ),
            },
            {
                tabName: <Tab label={tLessonManagement("pastLessons")} />,
                tabPanel: (
                    <TabLessonList
                        onCreate={() => setIsCreateDialogOpen(true)}
                        table={
                            isShowNoResultPageOnPastLesson ? (
                                <Box pt={10}>
                                    <NoResultPage />
                                </Box>
                            ) : (
                                <TableLessonsWithPaging
                                    key="LessonList__listPast"
                                    data={lessonsPast}
                                    isLoadingLesson={isLoadingLessonPast}
                                    isLoadingLessonReport={isLoadingLessonReportPast}
                                    isLoadingTeacher={isLoadingTeacherLessonPast}
                                    isLoadingCenter={isLoadingCenterLessonPast}
                                    isLoadingCourse={isPastLessonLoadingCourse}
                                    isLoadingClass={isPastLessonLoadingClass}
                                    pagination={paginationLessonPast}
                                />
                            )
                        }
                        methods={methodsLessonPast}
                        onFilter={onFilterLessonPast}
                        onFilterV2={onFilterV2LessonPast}
                        onSearch={onSearchLessonPast}
                        keyword={keywordLessonsPast}
                    />
                ),
            },
        ];

        return tabsList;
    };

    const handleCreateLessonSuccessfully = async (
        data: NsLesson_Bob_LessonsService.UpsertLessons
    ) => {
        const startOfTheDay = new Date();
        startOfTheDay.setHours(0, 0, 0, 0);

        if (data.startTime >= startOfTheDay) {
            await refreshFutureLessonsList();

            setIsCreateDialogOpen(false);
            tabLayoutRef.current?.changeCurrentTab(LessonListTabs.FUTURE_LESSON);
            return;
        }

        await refreshPastLessonsList();

        setIsCreateDialogOpen(false);
        tabLayoutRef.current?.changeCurrentTab(LessonListTabs.PAST_LESSON);

        const endDate = data.savingOption?.recurrence?.endDate;
        if (endDate >= startOfTheDay) await refreshFutureLessonsList();
    };

    return (
        <WrapperPageContent data-testid="LessonList__root">
            <TypographyPageTitle title={tLessonManagement("name")} />
            <TabLayout hasDivider mapTabs={handleCreateTabsList()} ref={tabLayoutRef} />
            {isCreateDialogOpen && (
                <LessonUpsert
                    isOpen={isCreateDialogOpen}
                    mode="CREATE"
                    isEnabledLessonGroup={isEnabledLessonGroup}
                    onUpsertSuccessfully={handleCreateLessonSuccessfully}
                    onCloseUpsertDialog={() => setIsCreateDialogOpen(false)}
                />
            )}
        </WrapperPageContent>
    );
};

export default LessonList;
