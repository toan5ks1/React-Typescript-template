import { useMemo } from "react";

import { KeyNotificationTargetGroupSelect, UserRoles } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import {
    CoursesMany,
    InfoNotification,
    StudentsMany,
} from "src/squads/communication/common/constants/types";

import { Box } from "@mui/material";

import InfoNotificationDetailSentTableRow from "./InfoNotificationDetailSentTableRow";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface InfoNotificationTableDivProps {
    notificationInfo: InfoNotification;
    courses: CoursesMany;
    receivers: StudentsMany;
}

const sx = {
    root: {
        maxWidth: "690px",
        minWidth: "360px",
        borderSpacing: 0,
    },
    tableBody: {
        display: "table-row-group",
    },
};

const InfoNotificationDetailSentTable = ({
    courses,
    notificationInfo,
    receivers,
}: InfoNotificationTableDivProps) => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
    const t = useTranslate();

    const courseNames: string[] = useMemo(() => {
        const courseFilter = notificationInfo?.target_groups?.course_filter;

        if (!courseFilter || !courseFilter.type) return [""];

        return courseFilter.type ===
            KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST
            ? courses.map((course) => course.name)
            : [tNotification(`targetGroupSelect.${courseFilter.type}`)];
    }, [courses, notificationInfo?.target_groups?.course_filter, tNotification]);

    const gradeNames: string[] = useMemo(() => {
        const gradeFilter = notificationInfo?.target_groups?.grade_filter;

        if (!gradeFilter || !gradeFilter.type) return [""];

        return gradeFilter.type &&
            gradeFilter.type ===
                KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST
            ? gradeFilter.grades.map((grade: number) => t(`resources.choices.grades.${grade}`))
            : [tNotification(`targetGroupSelect.${gradeFilter.type}`)];
    }, [notificationInfo?.target_groups?.grade_filter, t, tNotification]);

    const userGroupNames: string[] = useMemo(() => {
        const userGroupFilter = notificationInfo.target_groups?.user_group_filter;
        if (!userGroupFilter || !userGroupFilter.user_group) return [""];

        return userGroupFilter?.user_group.map((group: typeof UserRoles) =>
            t(`resources.choices.user_group.${group}`)
        );
    }, [notificationInfo.target_groups?.user_group_filter, t]);

    return (
        <Box sx={sx.root} data-testid="InfoNotificationDetailSentTable__container">
            <Box sx={sx.tableBody}>
                <InfoNotificationDetailSentTableRow
                    rowLabel={`${tNotification("label.courses")}:`}
                    rowItems={courseNames}
                />
                <InfoNotificationDetailSentTableRow
                    rowLabel={`${tNotification("label.grades")}:`}
                    rowItems={gradeNames}
                />
                <InfoNotificationDetailSentTableRow
                    rowLabel={`${tNotification("label.individualRecipient")}:`}
                    rowItems={
                        receivers && receivers.map((student: StudentsMany[0]) => student.name)
                    }
                />
                <InfoNotificationDetailSentTableRow
                    rowLabel={`${tNotification("label.userType")}:`}
                    rowItems={userGroupNames}
                />
            </Box>
        </Box>
    );
};

export default InfoNotificationDetailSentTable;
