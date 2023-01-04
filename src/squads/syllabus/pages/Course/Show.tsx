import { useMemo, useState } from "react";

import { useParams } from "react-router";
import { Entities, Features, ModeOpenDialog } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { grpcErrorsMap } from "src/internals/grpc/errors";
import permission from "src/squads/syllabus/internals/permission";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { Box, Grid, Tab, Theme } from "@mui/material";
import Loading from "src/components/Loading";
import TabLayout from "src/components/Tabs/TabLayout";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";
import LessonTab from "src/squads/syllabus/components/RelatedCourse/LessonTab";
import MoreAction from "src/squads/syllabus/components/RelatedCourse/MoreAction";
import SettingsTab from "src/squads/syllabus/components/RelatedCourse/SettingsTab";
import ClassTab from "src/squads/syllabus/pages/Course/components/ClassTab";
import {
    CourseFormData,
    CourseTeachingMethodOption,
} from "src/squads/syllabus/pages/Course/components/CourseForm";
import DialogUpsertCourse from "src/squads/syllabus/pages/Course/components/DialogUpsertCourse";
import StudyPlanTab from "src/squads/syllabus/pages/StudyPlan/components/StudyPlanTab";

import { CourseTeachingMethod } from "manabuf/mastermgmt/v1/course_pb";

import logger from "../../internals/logger";

import useDialog from "src/squads/syllabus/hooks/useDialog";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import { MapTabReturns } from "src/squads/syllabus/hooks/useTabs";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import useGetCourseLocations from "src/squads/syllabus/pages/Course/hooks/useGetCourseLocations";
import useUpsertCourse from "src/squads/syllabus/pages/Course/hooks/useUpsertCourse";

const sx = {
    tabs: (theme: Theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: `${theme.shape.borderRadius}px`,
        background: theme.palette.other?.backgroundLight,

        "& > hr": {
            display: "none",
        },
    }),
    tabPanel: (theme: Theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderTop: 0,
        borderRadius: `${theme.shape.borderRadius}px`,
    }),
};

const Show = () => {
    const { id: courseId } = useParams<{ id: string }>();
    const { open, onOpen, onClose } = useDialog();
    const showSnackbar = useShowSnackbar();

    const {
        data,
        isLoading: isLoadingCourse,
        refetch,
    } = inferQuery({ entity: "courses", action: "lessonCourseGetOne" })(
        { course_id: courseId },
        {
            enabled: Boolean(courseId),
            onError: (error) => {
                logger.warn("lessonCourseGetOne", error);

                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    const t = useTranslate();
    const tCourse = useResourceTranslate(Entities.COURSES);
    const tClass = useResourceTranslate(Entities.CLASS);

    const { onEdit, isSubmiting } = useUpsertCourse({
        isEdit: true,
    });

    const { isEnabled: isStudyPlanV2Enabled } = useFeatureToggle(Features.STUDY_PLAN_MANAGEMENT);
    const { isEnabled: isClassManagementEnabled } = useFeatureToggle(
        Features.LESSON_COURSE_MANAGEMENT_CLASS_MANAGEMENT
    );

    const {
        locationIds,
        locations,
        isLoading: isLoadingLocation,
        updateCourseLocations,
    } = useGetCourseLocations({
        courseId: data?.course_id,
    });

    const isHaveLocations = arrayHasItem(locationIds) && locations;

    const locationsDefault = useMemo((): CourseFormData["locations"] => {
        if (!isHaveLocations) return [];

        return locations.map(({ location_id, name }) => ({ locationId: location_id, name }));
    }, [isHaveLocations, locations]);

    const defaultTeachingMethod = useMemo((): CourseTeachingMethodOption | undefined => {
        if (!data?.teaching_method) return;
        const defaultOption: CourseTeachingMethodOption = {
            id: Number(CourseTeachingMethod[data?.teaching_method]),
            name: t(`resources.choices.teachingMethod.${data?.teaching_method}`),
        };
        return defaultOption;
    }, [data, t]);

    const onSave = async (formData: CourseFormData) => {
        const { name, iconFile, iconUrl, locations, teachingMethod } = formData;
        const locationIdsList = locations?.map((location) => location.locationId);
        setErr("");
        await onEdit(
            {
                name,
                course_id: data?.course_id,
                files: iconFile,
                icon: iconUrl,
                locationIdsList,
                teachingMethod: teachingMethod?.id,
            },
            {
                onSuccess: () => {
                    refetch()
                        .finally(() => updateCourseLocations())
                        .finally(() => onClose());
                },
                onError: (error: Error) => {
                    if (error.message == grpcErrorsMap.ALREADY_EXISTS) {
                        setErr(tCourse("locationAlreadyExists"));
                    }
                },
            }
        );
    };

    const onClosePopup = () => {
        onClose();
        setErr("");
    };

    const [err, setErr] = useState("");

    if (isLoadingCourse || !data || isLoadingLocation) return <Loading />;

    const courseName = data.name;
    const checkLessonGroupPermission = permission.can("lesson_groups", "list");

    const tabList: MapTabReturns[] = [
        ...(checkLessonGroupPermission
            ? [
                  {
                      tabName: (
                          <Tab label={tCourse("lesson")} data-testid="CourseShow__lessonTab" />
                      ),
                      tabPanel: <LessonTab courseId={courseId} />,
                  },
              ]
            : []),
        ...(isStudyPlanV2Enabled
            ? [
                  {
                      tabName: (
                          <Tab
                              label={tCourse("studyPlan.title")}
                              data-testid="CourseShow__studyPlanTab"
                          />
                      ),
                      tabPanel: <StudyPlanTab courseId={courseId} />,
                  },
              ]
            : []),
        ...(isClassManagementEnabled
            ? [
                  {
                      tabName: <Tab label={tClass("class")} data-testid="CourseShow__classTab" />,
                      tabPanel: <ClassTab courseId={courseId} />,
                  },
              ]
            : []),
        {
            tabName: <Tab label={tCourse("settings")} data-testid="CourseShow__settingTab" />,
            tabPanel: (
                <SettingsTab
                    course={data}
                    refetch={() => {
                        void refetch();
                        void updateCourseLocations();
                    }}
                    locations={locations || []}
                    isLoadingLocation={isLoadingLocation}
                />
            ),
        },
    ];

    return (
        <>
            {open && (
                <DialogUpsertCourse
                    mode={ModeOpenDialog.EDIT}
                    onClose={onClosePopup}
                    open={open}
                    errorMessage={err}
                    isSubmiting={isSubmiting}
                    onSave={onSave}
                    defaultValues={{
                        name: courseName,
                        iconUrl: data.icon || undefined,
                        locations: locationsDefault,
                        teachingMethod: defaultTeachingMethod,
                    }}
                />
            )}

            <Box pb={3}>
                <WrapperPageContent>
                    <WrapperPageHeader
                        title={courseName}
                        action={
                            <MoreAction
                                recordId={courseId}
                                onEdit={onOpen}
                                recordName={courseName}
                            />
                        }
                        width="100%"
                    />

                    <Grid item xs={12} data-testid="CourseShow__tab">
                        <TabLayout
                            tabsSx={sx.tabs}
                            tabPanelSx={sx.tabPanel}
                            mapTabs={tabList}
                            customOptions={{
                                updateInQuery: true,
                            }}
                            showCustomTestId
                            addTabNameToQuery={true}
                        />
                    </Grid>
                </WrapperPageContent>
            </Box>
        </>
    );
};

export default Show;
