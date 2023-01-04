import { useCallback } from "react";

import { useLocation, useParams } from "react-router";
import { Entities, EurekaEntities, MutationMenus } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { parseQuery } from "src/squads/syllabus/common/utils/url";
import logger from "src/squads/syllabus/internals/logger";
import { SettingTaskAssignment } from "src/squads/syllabus/models/assignment";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { Box, Grid, Paper, Theme } from "@mui/material";
import DoubleDash from "src/components/DoubleDash";
import ListMediaChipsBase from "src/components/ListMediaChipsBase";
import ActionPanel from "src/components/Menus/ActionPanel";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";
import Breadcrumbs from "src/squads/syllabus/components/Breadcrumbs";
import TaskAssignmentDetailField from "src/squads/syllabus/pages/TaskAssignment/components/TaskAssignmentDetailField";

import useBookTypeRestrictInfo from "../../Book/hooks/useBookTypeRestrictInfo";
import useDeleteTaskAssignment from "../hooks/useDeleteTaskAssignment";

import useBreadCrumbLOS from "src/squads/syllabus/hooks/useBreadcrumb/useBreadcrumbLOs";
import useMediaList from "src/squads/syllabus/hooks/useMediaList";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const sx = {
    paper: (theme: Theme) => ({
        padding: theme.spacing(3),
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(4),
        },
    }),
    dialogContent: {
        overflowWrap: "anywhere",
    },
};

const TaskAssignmentDetail = () => {
    const { breadcrumbInfos, loading } = useBreadCrumbLOS();
    const { id: assignmentId } = useParams<{ id: string }>();
    const t = useTranslate();
    const tTask = useResourceTranslate(EurekaEntities.TASK_ASSIGNMENTS);
    const showSnackbar = useShowSnackbar();

    const { search } = useLocation();
    const navigation = useNavigation();
    const { bookId } = parseQuery();

    const { data: task, isLoading: isLoadingTaskAssignment } = inferQuery({
        entity: "assignment",
        action: "syllabusAssignmentGetOne",
    })(
        {
            assignment_id: assignmentId,
        },
        {
            enabled: Boolean(assignmentId),
            onError: (error) => {
                logger.warn("[TaskAssignmentDetail]", error);

                showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );

    const { isDisabled } = useBookTypeRestrictInfo(bookId as string);

    const { deleteTaskAssignment } = useDeleteTaskAssignment();

    const { mediaList = [] } = useMediaList({ mediaIds: task?.attachment });

    const onMutation = useCallback(
        async (action: MutationMenus) => {
            switch (action) {
                case "edit":
                    return navigation.push(
                        `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.TASK_ASSIGNMENTS}/${assignmentId}/edit${search}`
                    );
                case "delete": {
                    return deleteTaskAssignment(
                        { assignmentIdsList: [assignmentId] },
                        {
                            onSuccess: () => {
                                navigation.push(
                                    `/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}/${bookId}/show`
                                );
                            },
                        }
                    );
                }
                default: {
                    return;
                }
            }
        },
        [navigation, assignmentId, search, deleteTaskAssignment, bookId]
    );

    if (!task || isLoadingTaskAssignment) return null;

    const { name, attachment, instruction, settings } = task;

    const requiredItemNames: string[] = Object.keys(SettingTaskAssignment).reduce((acc, key) => {
        const isValidSetting =
            Object.keys(settings).includes(SettingTaskAssignment[key]) &&
            settings[SettingTaskAssignment[key]];
        if (!isValidSetting) return acc;
        return [...acc, tTask(key)];
    }, [] as string[]);

    return (
        <WrapperPageContent data-testid="TaskAssignmentDetail__root">
            <Breadcrumbs loading={loading} breadcrumbInfos={breadcrumbInfos} name={name} />
            <WrapperPageHeader
                title={name}
                action={
                    <ActionPanel
                        record={task}
                        actions={[MutationMenus.EDIT, MutationMenus.DELETE]}
                        recordName={name}
                        onAction={onMutation}
                        buttonStyle="square"
                        disabled={isDisabled}
                    />
                }
            />

            <Grid container spacing={3}>
                <Grid item sm={12} md={4}>
                    <Paper elevation={2} sx={sx.paper}>
                        <Box mb={3}>
                            <TypographyHeader>{tTask("attachment")}</TypographyHeader>
                        </Box>
                        {attachment ? (
                            <ListMediaChipsBase medias={mediaList} />
                        ) : (
                            <TypographyBase
                                variant="body1"
                                color="textPrimary"
                                data-testid="TaskAssignmentDetail__noAttachment"
                            >
                                {tTask("noInformation")}
                            </TypographyBase>
                        )}
                    </Paper>
                </Grid>
                <Grid item sm={12} md={8}>
                    <Paper elevation={2} sx={sx.paper}>
                        <Box mb={3}>
                            <TypographyHeader>{tTask("taskInformation")}</TypographyHeader>
                        </Box>

                        <Grid container spacing={3}>
                            <TaskAssignmentDetailField
                                label={tTask("name")}
                                value={name}
                                dataTestId="TaskAssignmentDetail__name"
                            />
                            {instruction && (
                                <TaskAssignmentDetailField
                                    label={tTask("description")}
                                    value={instruction}
                                    dataTestId="TaskAssignmentDetail__instruction"
                                />
                            )}
                            <TaskAssignmentDetailField
                                label={tTask("requiredItems")}
                                value={
                                    requiredItemNames.length > 0 ? (
                                        requiredItemNames.join(", ")
                                    ) : (
                                        <DoubleDash />
                                    )
                                }
                                dataTestId="TaskAssignmentDetail__requiredItems"
                            />
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </WrapperPageContent>
    );
};

export default TaskAssignmentDetail;
