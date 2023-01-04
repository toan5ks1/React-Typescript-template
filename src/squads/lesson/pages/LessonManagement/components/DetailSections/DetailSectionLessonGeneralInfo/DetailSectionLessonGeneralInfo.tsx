import { ERPModules, Features } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { formatDate } from "src/common/utils/time";
import {
    getTeacherName,
    getDayOfWeekName,
    getDurationBetweenTwoDates,
    emptyValue,
} from "src/squads/lesson/common/utils";
import { Lesson_LessonByLessonIdForLessonManagementV3Query } from "src/squads/lesson/service/bob/bob-types";

import { Box, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyWithValue from "src/components/Typographys/TypographyWithValue";

import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { LessonStatusKeys } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface DetailSectionLessonGeneralInfoProps {
    lesson: ArrayElement<Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]>;
    isLoadingGeneralInfo: boolean;
    centerName: string;
    isLoadingCenter: boolean;
    className: string;
    isLoadingClass: boolean;
}

const DetailSectionLessonGeneralInfo = (props: DetailSectionLessonGeneralInfoProps) => {
    const { lesson, isLoadingGeneralInfo, centerName, isLoadingCenter, className, isLoadingClass } =
        props;

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);
    const showSnackBar = useShowSnackbar();
    if (!lesson.lessons_teachers) {
        showSnackBar(tLessonManagement("errors.unableToFindTeacher"), "error");
    }

    const { isEnabled: isShowLessonGroup } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_LESSON_GROUP
    );

    const dayOfWeekName = getDayOfWeekName(new Date(lesson.start_time), t);
    const totalTime = getDurationBetweenTwoDates(lesson.start_time, lesson.end_time);
    const isShowCourseAndClass = lesson.teaching_method === "LESSON_TEACHING_METHOD_GROUP";

    const isShowNotiErrorMessageNoCourse =
        isShowLessonGroup &&
        isShowCourseAndClass &&
        !lesson.course?.name &&
        lesson.scheduling_status !== LessonStatusKeys.LESSON_SCHEDULING_STATUS_DRAFT;

    if (isShowNotiErrorMessageNoCourse) {
        showSnackBar(tLessonManagement("errors.noCourseInLesson"), "error");
    }

    const theme = useTheme();
    const styleValueForClassName = {
        color: className === emptyValue ? theme.palette.grey[400] : "inherit",
    };

    const renderCourseField = isShowCourseAndClass ? (
        <Grid item xs={6}>
            <TypographyWithValue
                variant="horizontal"
                value={lesson.course?.name}
                label={tLessonManagement("columns.course")}
                isLoading={isLoadingGeneralInfo}
                dataTestidValue="DetailSectionLessonGeneralInfo__course"
            />
        </Grid>
    ) : null;

    const renderClassField = isShowCourseAndClass ? (
        <Grid item xs={6}>
            <TypographyWithValue
                variant="horizontal"
                value={className}
                label={tLessonManagement("columns.class")}
                isLoading={isLoadingClass}
                dataTestidValue="DetailSectionLessonGeneralInfo__class"
                sxValue={styleValueForClassName}
            />
        </Grid>
    ) : null;

    const colorTextTeacherNames = !arrayHasItem(lesson.lessons_teachers)
        ? theme.palette.grey["400"]
        : "inherit";

    return (
        <Box data-testid="LessonDetailsGeneralInfo__root">
            <Box mb={2}>
                <TypographyBase variant="subtitle1">
                    {tLessonManagement("generalInfo")}
                </TypographyBase>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TypographyWithValue
                        variant="horizontal"
                        value={formatDate(lesson.start_time, "yyyy/LL/dd")}
                        label={tLessonManagement("columns.lessonDate")}
                        isLoading={isLoadingGeneralInfo}
                        dataTestidValue="LessonDetailsGeneralInfo__lessonDate"
                    />
                </Grid>

                <Grid item xs={6}>
                    <TypographyWithValue
                        variant="horizontal"
                        value={dayOfWeekName}
                        label={tLessonManagement("dayOfTheWeek")}
                        isLoading={isLoadingGeneralInfo}
                        dataTestidValue="LessonDetailsGeneralInfo__dayOfWeek"
                    />
                </Grid>

                <Grid item xs={6}>
                    <TypographyWithValue
                        variant="horizontal"
                        value={formatDate(lesson.start_time, "HH:mm")}
                        label={tLessonManagement("startTime")}
                        isLoading={isLoadingGeneralInfo}
                        dataTestidValue="LessonDetailsGeneralInfo__startTime"
                    />
                </Grid>

                <Grid item xs={6}>
                    <TypographyWithValue
                        variant="horizontal"
                        value={formatDate(lesson.end_time, "HH:mm")}
                        label={tLessonManagement("endTime")}
                        isLoading={isLoadingGeneralInfo}
                        dataTestidValue="LessonDetailsGeneralInfo__endTime"
                    />
                </Grid>

                {isShowLessonGroup ? (
                    // TODO: Will keep this part when epic https://manabie.atlassian.net/browse/LT-13375 is released
                    <>
                        <Grid item xs={6}>
                            <TypographyWithValue
                                variant="horizontal"
                                value={`${totalTime} ${tLessonManagement("minutes")}`}
                                label={tLessonManagement("totalTime")}
                                isLoading={isLoadingGeneralInfo}
                                dataTestidValue="LessonDetailsGeneralInfo__totalTime"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TypographyWithValue
                                variant="horizontal"
                                value={tLessonManagement(`${lesson.teaching_medium}`)}
                                label={tLessonManagement("columns.teachingMedium")}
                                isLoading={isLoadingGeneralInfo}
                                dataTestidValue="LessonDetailsGeneralInfo__teachingMedium"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TypographyWithValue
                                variant="horizontal"
                                value={tLessonManagement(`${lesson.teaching_method}`)}
                                label={tLessonManagement("columns.teachingMethod")}
                                isLoading={isLoadingGeneralInfo}
                                dataTestidValue="LessonDetailsGeneralInfo__teachingMethod"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TypographyWithValue
                                variant="horizontal"
                                value={centerName}
                                label={tLessonManagement("columns.location")}
                                isLoading={isLoadingCenter || isLoadingGeneralInfo}
                                dataTestidValue="LessonDetailsGeneralInfo__center"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TypographyWithValue
                                variant="horizontal"
                                value={getTeacherName(lesson.lessons_teachers)}
                                label={tLessonManagement("columns.teacher")}
                                isLoading={isLoadingGeneralInfo}
                                dataTestidValue="LessonDetailsGeneralInfo__teachers"
                                styleValue={{
                                    color: colorTextTeacherNames,
                                }}
                            />
                        </Grid>
                        {renderCourseField}
                        {renderClassField}
                    </>
                ) : (
                    // TODO: will remove this part when this epic https://manabie.atlassian.net/browse/LT-13375 is releases
                    <>
                        <Grid item xs={6}>
                            <TypographyWithValue
                                variant="horizontal"
                                value={tLessonManagement(`${lesson.teaching_medium}`)}
                                label={tLessonManagement("columns.teachingMedium")}
                                isLoading={isLoadingGeneralInfo}
                                dataTestidValue="LessonDetailsGeneralInfo__teachingMedium"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TypographyWithValue
                                variant="horizontal"
                                value={tLessonManagement(`${lesson.teaching_method}`)}
                                label={tLessonManagement("columns.teachingMethod")}
                                isLoading={isLoadingGeneralInfo}
                                dataTestidValue="LessonDetailsGeneralInfo__teachingMethod"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TypographyWithValue
                                variant="horizontal"
                                value={getTeacherName(lesson.lessons_teachers)}
                                label={tLessonManagement("columns.teacher")}
                                isLoading={isLoadingGeneralInfo}
                                dataTestidValue="LessonDetailsGeneralInfo__teachers"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TypographyWithValue
                                variant="horizontal"
                                value={centerName}
                                label={tLessonManagement("columns.center")}
                                isLoading={isLoadingCenter || isLoadingGeneralInfo}
                                dataTestidValue="LessonDetailsGeneralInfo__center"
                            />
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
};

export default DetailSectionLessonGeneralInfo;
