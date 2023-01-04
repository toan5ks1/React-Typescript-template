import { useMemo } from "react";

import { KeyUserNotificationStatus, UserRoles } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { RecipientInfoNotification } from "src/squads/communication/common/constants/types";
import { UserNameByIdsQuery } from "src/squads/communication/service/bob/bob-types";

import { Box, Grid } from "@mui/material";
import StyledLink from "src/components/StyledLink";
import { TableColumn, TableBase } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";
import ChipQuestionnaireStatus from "src/squads/communication/pages/Notification/components/ChipQuestionnaireStatus";
import ColumnsStudentParentName from "src/squads/communication/pages/Notification/components/Tables/ColumnStudentParentName";

import { Maybe } from "src/squads/communication/__generated__/bob/root-types";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useNotificationReceipt from "src/squads/communication/pages/Notification/hooks/useNotificationReceipt";

export interface RecipientTableProps {
    notificationId: string;
    isHaveQuestionnaireData: boolean;
}

const RecipientTable = ({ notificationId, isHaveQuestionnaireData }: RecipientTableProps) => {
    const { isEnabled: isShowQuestionnaireColumn } = useFeatureToggle(
        Features.NOTIFICATION_QUESTIONNAIRE
    );
    const {
        loading,
        notificationReceipt: data,
        parentNames,
        studentNames,
        pagination,
    } = useNotificationReceipt({
        id: notificationId,
    });

    const t = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const renderTypographyStr = (value: string) => {
        return (
            <TypographyShortenStr variant="body2" maxLength={60}>
                {value}
            </TypographyShortenStr>
        );
    };

    const getUserNameById = ({
        users,
        id,
    }: {
        users?: UserNameByIdsQuery["users"];
        id?: Maybe<string>; //map with generate type
    }): string => {
        if (!users || !users.length || !id) return "";
        return users.find((user) => user.user_id === id)?.name || "";
    };

    const columns: TableColumn<RecipientInfoNotification>[] = useMemo(() => {
        const customColumn: TableColumn<RecipientInfoNotification>[] = [
            {
                key: "user.name",
                title: t("label.recipientName"),
                render: (record) => {
                    const userGroup = record.user_group;
                    const studentId = record.student_id ? record.student_id : record.user_id; // individual user

                    const linkStudentDetail = `/${MicroFrontendTypes.USER}/${ERPModules.STUDENTS}/${studentId}/show`;

                    const studentName = getUserNameById({ users: studentNames, id: studentId });

                    const parentName = getUserNameById({
                        users: parentNames,
                        id: record.parent_id,
                    });

                    if (userGroup === UserRoles.USER_GROUP_STUDENT) {
                        return (
                            <StyledLink
                                data-testid="RecipientTable__linkName"
                                to={linkStudentDetail}
                            >
                                {renderTypographyStr(studentName)}
                            </StyledLink>
                        );
                    }

                    return (
                        <ColumnsStudentParentName
                            chipBaseProps={{
                                "data-testid": "Recipient__chipLabelParent",
                                label: t("label.parent", { smart_count: 1 }),
                                size: "small",
                            }}
                        >
                            <Grid item>
                                <StyledLink
                                    data-testid="RecipientTable__linkName"
                                    to={linkStudentDetail}
                                >
                                    {renderTypographyStr(
                                        t("label.parentOfStudent", {
                                            parentName: parentName,
                                            studentName: studentName,
                                        })
                                    )}
                                </StyledLink>
                            </Grid>
                        </ColumnsStudentParentName>
                    );
                },
            },
            {
                key: "status",
                title: t("label.status"),
                cellProps: {
                    style: {
                        width: "10%",
                    },
                },
                render: (record) => {
                    const isNewNotification =
                        record.status === KeyUserNotificationStatus.USER_NOTIFICATION_STATUS_NEW;

                    return (
                        <Box
                            data-testid="Recipient__status"
                            sx={[
                                (theme) =>
                                    isNewNotification
                                        ? { color: theme.palette.error.main }
                                        : { color: theme.palette.success.main },
                            ]}
                        >
                            <TypographyBase variant="body2">
                                {t(`userNotificationStatus.${record.status}`)}
                            </TypographyBase>
                        </Box>
                    );
                },
            },
        ];
        //TODO: remove isShowQuestionnaireColumn after NOTIFICATION_QUESTIONNAIRE release
        if (isShowQuestionnaireColumn && isHaveQuestionnaireData) {
            customColumn.splice(1, 0, {
                key: "questionnaire",
                title: t("label.questionnaire"),
                cellProps: {
                    style: {
                        width: "15%",
                    },
                },
                render: (record) => {
                    return (
                        <ChipQuestionnaireStatus
                            status={record.qn_status}
                            label={t(`questionnaireStatus.${record.qn_status}`)}
                        />
                    );
                },
            });
        }
        return customColumn;
    }, [t, isShowQuestionnaireColumn, isHaveQuestionnaireData, studentNames, parentNames]);

    return (
        <TableBase
            withIndex
            data={data}
            columns={columns}
            tableProps={{
                "data-testid": "Recipient__table",
            }}
            body={{
                rowKey: "user_notification_id",
                loading: !!loading,
                pagination: pagination,
            }}
            footer={{
                pagination: pagination,
            }}
        />
    );
};

export default RecipientTable;
