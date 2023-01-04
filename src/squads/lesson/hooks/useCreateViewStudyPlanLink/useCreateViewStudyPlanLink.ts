import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { UserRoles } from "src/squads/lesson/common/constants";
import { inferQuery } from "src/squads/lesson/service/infer-query";

import { DomainType } from "manabuf/bob/v1/lessons_pb";

import useGetLocalProfile from "src/squads/lesson/hooks/useGetLocalProfile";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface UseCreateViewStudyPlanLinkProps {
    courseId: string;
    studentId: string;
}

const useCreateViewStudyPlanLink = (props: UseCreateViewStudyPlanLinkProps): string => {
    const { courseId, studentId } = props;

    const t = useTranslate();
    const showSnackBar = useShowSnackbar();

    const { userProfile } = useGetLocalProfile();
    const userGroup = userProfile?.userGroup;
    const isTeacher =
        typeof userGroup === "string"
            ? userGroup === UserRoles.USER_GROUP_TEACHER
            : userGroup?.includes(UserRoles.USER_GROUP_TEACHER);

    const enabled = Boolean(isTeacher && courseId && studentId);

    const { data } = inferQuery({
        entity: "lessonReports",
        action: "lessonReportsRetrievePartnerDomain",
    })(
        {
            type: DomainType.DOMAIN_TYPE_TEACHER,
        },
        {
            cacheFor: 300000, // 5 minute
            enabled: enabled,
            onError(error: Error) {
                window.warner?.warn(`useCreateViewStudyPlanLink fetchPartnerDomain`, error);
                showSnackBar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );

    const domain = data?.domain;

    if ((isTeacher && !domain) || (!isTeacher && !courseId)) return "";

    if (!isTeacher) {
        return `/${MicroFrontendTypes.SYLLABUS}/${Entities.COURSES}/${courseId}/show?tab=CourseShow__studyPlanTab`;
    }

    return `${domain}#/courseDetail?course_id=${courseId}/studentStudyPlan?student_id=${studentId}`;
};

export default useCreateViewStudyPlanLink;
