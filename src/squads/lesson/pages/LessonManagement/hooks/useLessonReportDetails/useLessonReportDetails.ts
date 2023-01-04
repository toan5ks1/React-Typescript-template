import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { GetStudentCourseSubscriptionsRequestQuery } from "src/squads/lesson/common/types";
import {
    LessonReportByLessonIdQuery,
    Lesson_ClassByClassIdForLessonManagementQuery,
    Lesson_LessonByLessonIdForLessonManagementV3Query,
    Lesson_SchedulerBySchedulerIdQuery,
    LocationByLocationIdQuery,
    MediasManyQuery,
} from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";

import useGetStudentCourseSubscriptions from "src/squads/lesson/hooks/useGetStudentCourseSubscriptions";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { LessonDataWithStudentSubscriptions } from "src/squads/lesson/pages/LessonManagement/common/types";

export const getStudentInfosList = (
    studentsList: ArrayElement<
        Lesson_LessonByLessonIdForLessonManagementV3Query["lessons"]
    >["lesson_members"]
): GetStudentCourseSubscriptionsRequestQuery => {
    return studentsList.map((student) => {
        return {
            studentId: student.user.user_id,
            courseId: `${student.course?.course_id}`,
        };
    });
};

export interface UseLessonReportDetailsReturn {
    isLoadingLesson: boolean;
    lessonStatus: LessonDataWithStudentSubscriptions["scheduling_status"];
    isLoadingLessonReport: boolean;
    isLoadingMedia: boolean;
    isLoadingCenter: boolean;
    isLoadingClass: boolean;
    isLoadingScheduler: boolean;
    lessonData: LessonDataWithStudentSubscriptions | undefined;
    lessonReports: ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]> | undefined;
    mediasList: MediasManyQuery["media"] | undefined;
    center: ArrayElement<LocationByLocationIdQuery["locations"]> | undefined;
    classData: ArrayElement<Lesson_ClassByClassIdForLessonManagementQuery["class"]> | undefined;
    scheduler: ArrayElement<Lesson_SchedulerBySchedulerIdQuery["scheduler"]> | undefined;
    refetchLessonAndLessonReportDetail: () => Promise<void>;
    refetchForLessonReport: {
        refetch: () => Promise<void>;
        isRefetching: boolean;
    };
}
export interface UseLessonReportDetailsProps {
    lessonId: string;
    shouldEnableQuery?: boolean;
    onQueryLessonReportSuccess?: () => void;
}

const useLessonReportDetails = (
    props: UseLessonReportDetailsProps
): UseLessonReportDetailsReturn => {
    const { lessonId, shouldEnableQuery = true, onQueryLessonReportSuccess } = props;

    const showSnackBar = useShowSnackbar();
    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const shouldQueryLesson = Boolean(lessonId) && shouldEnableQuery;

    const {
        data: lesson,
        isLoading: isLoadingLesson,
        isRefetching: isRefetchingLesson,
        refetch: refetchLesson,
    } = inferQuery({ entity: "lessons", action: "lessonsGetOne" })(
        { lesson_id: lessonId },
        {
            enabled: shouldQueryLesson,
            onError(error) {
                window.warner?.warn(`useLessonReportDetail fetchLesson`, error);
                showSnackBar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );

    const shouldQueryLessonReport = Boolean(lesson) && shouldEnableQuery;

    const {
        data: lessonReportsData,
        isLoading: isLoadingLessonReport,
        isRefetching: isRefetchingLessonReport,
        refetch: refetchLessonReport,
    } = inferQuery({ entity: "lessonReports", action: "lessonReportsGetOne" })(
        { lesson_id: lesson?.lesson_id },
        {
            enabled: shouldQueryLessonReport,
            onError(error) {
                window.warner?.warn(`useLessonReportDetail fetchLessonReport`, error);
                showSnackBar(tLessonManagement("errors.unableToGetLessonReport"), "error");
            },
            onSuccess: (lessonReports) => {
                lessonReports && onQueryLessonReportSuccess?.();
            },
        }
    );

    const shouldQueryCenter = Boolean(lesson) && Boolean(lesson?.center_id);

    const {
        data: center,
        isLoading: isLoadingCenter,
        refetch: refetchCenter,
    } = inferQuery({
        entity: "locations",
        action: "locationsGetOne",
    })(
        { location_id: lesson?.center_id || undefined },
        {
            enabled: shouldQueryCenter,
            onError(error) {
                window.warner?.warn(`useLessonReportDetail fetchCenter`, error);
                showSnackBar(tLessonManagement("errors.unableToFetchCenter"), "error");
            },
        }
    );

    const shouldQueryLessonGroup = Boolean(lesson?.lesson_group_id);

    const {
        data: lessonGroups,
        isLoading: isLoadingLessonGroup,
        refetch: refetchLessonGroups,
    } = inferQuery({
        entity: "lessonGroups",
        action: "lessonGroupsGetOne",
    })(
        { lesson_group_id: lesson?.lesson_group_id || undefined },
        {
            enabled: shouldQueryLessonGroup,
            onError(error) {
                window.warner?.warn(`useLessonReportDetail fetchLessonGroup`, error);
                showSnackBar(tLessonManagement("errors.unableToFetchLessonGroup"), "error");
            },
        }
    );

    const shouldQueryMedia = arrayHasItem(lessonGroups?.media_ids);

    const {
        data: medias = [],
        isLoading: isLoadingMedia,
        refetch: refetchLessonMedia,
    } = inferQuery({
        entity: "media",
        action: "mediaGetMany",
    })(
        { media_id: lessonGroups?.media_ids },
        {
            enabled: shouldQueryMedia,
            onError(error) {
                window.warner?.warn(`useLessonReportDetail fetchMedias`, error);
                showSnackBar(tLessonManagement("errors.unableToFetchMedia"), "error");
            },
        }
    );

    const shouldQueryClass = Boolean(lesson?.class_id);

    const {
        data: classData,
        isLoading: isLoadingClass,
        refetch: refetchClass,
    } = inferQuery({ entity: "class", action: "classGetOne" })(
        { class_id: lesson?.class_id || undefined },
        {
            enabled: shouldQueryClass,
            onError(error) {
                window.warner?.warn(`useLessonReportDetail fetchClass`, error);
                showSnackBar(tLessonManagement("errors.unableToFetchClass"), "error");
            },
        }
    );

    const studentCourseInfosList = getStudentInfosList(lesson?.lesson_members || []);

    const {
        studentSubscriptions,
        isLoadingStudentSubscriptions,
        refetchStudentCourseSubscriptions,
    } = useGetStudentCourseSubscriptions({
        studentCourseInfos: studentCourseInfosList,
    });

    const shouldQueryScheduler = Boolean(lesson?.scheduler_id);

    const {
        data: scheduler,
        isLoading: isLoadingScheduler,
        refetch: refetchScheduler,
    } = inferQuery({ entity: "scheduler", action: "schedulerGetOne" })(
        { scheduler_id: lesson?.scheduler_id || undefined },
        {
            enabled: shouldQueryScheduler,
            onError(error) {
                window.warner?.warn(`useLessonReportDetail fetchScheduler`, error);
                showSnackBar(tLessonManagement("errors.unableToFetchSchedule"), "error");
            },
        }
    );

    const refetch = async () => {
        if (shouldQueryLesson) {
            const { data } = await refetchLesson();
            if (Boolean(data?.class_id)) await refetchClass();
            if (arrayHasItem(data?.lesson_members)) await refetchStudentCourseSubscriptions();

            if (Boolean(data?.lesson_group_id)) {
                const { data } = await refetchLessonGroups();
                if (arrayHasItem(data?.media_ids)) await refetchLessonMedia();
            }
        }

        if (shouldQueryLessonReport) await refetchLessonReport();
        if (shouldQueryCenter) await refetchCenter();

        if (shouldQueryScheduler) await refetchScheduler();
    };

    const refetchLessonAndLessonReport = async () => {
        await refetchLesson();
        await refetchLessonReport();
    };

    return {
        isLoadingLesson: isLoadingLesson || isLoadingStudentSubscriptions,
        lessonStatus: lesson?.scheduling_status,
        isLoadingLessonReport,
        isLoadingMedia: isLoadingLesson || isLoadingLessonGroup || isLoadingMedia,
        lessonData: lesson ? { ...lesson, studentSubscriptions } : undefined,
        lessonReports: lessonReportsData,
        mediasList: shouldQueryMedia ? medias : [],
        center,
        isLoadingCenter,
        classData: shouldQueryClass ? classData : undefined,
        isLoadingClass,
        scheduler,
        isLoadingScheduler: isLoadingLesson || isLoadingScheduler,
        refetchLessonAndLessonReportDetail: refetch,
        refetchForLessonReport: {
            refetch: refetchLessonAndLessonReport,
            isRefetching: isRefetchingLesson || isRefetchingLessonReport,
        },
    };
};

export default useLessonReportDetails;
