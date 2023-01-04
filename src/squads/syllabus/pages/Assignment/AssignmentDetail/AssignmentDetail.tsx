import { useCallback } from "react";

import { useLocation, useParams } from "react-router";
import { Entities, EurekaEntities, MutationMenus } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { parseQuery } from "src/squads/syllabus/common/utils/url";
import { SettingAssignment } from "src/squads/syllabus/models/assignment";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import AssignmentCheckboxGroup from "../components/AssignmentCheckboxGroup";
import AssignmentVerticalField from "../components/AssignmentVerticalField";
import { Box, Grid, Paper, Theme } from "@mui/material";
import ListMediaChipsBase from "src/components/ListMediaChipsBase";
import ActionPanel from "src/components/Menus/ActionPanel";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";
import Breadcrumbs from "src/squads/syllabus/components/Breadcrumbs";

import useDeleteAssignment from "../../Book/hooks/useDeleteAssignment";

import useBreadCrumbLOS from "src/squads/syllabus/hooks/useBreadcrumb/useBreadcrumbLOs";
import useMediaList from "src/squads/syllabus/hooks/useMediaList";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

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
    settings: (theme: Theme) => ({
        paddingTop: theme.spacing(1 / 2),
        paddingBottom: theme.spacing(1 / 2),
    }),
};

const keySettings = Object.values(SettingAssignment);

const AssignmentDetail = () => {
    const { breadcrumbInfos, loading } = useBreadCrumbLOS();
    const { id: assignmentId } = useParams<{ id: string }>();
    const tAssignment = useResourceTranslate(EurekaEntities.ASSIGNMENTS);

    const { search } = useLocation();
    const navigation = useNavigation();
    const { bookId } = parseQuery();

    const { data: assignment, isLoading: isLoadingAssignment } = inferQuery({
        entity: "assignment",
        action: "syllabusAssignmentGetOne",
    })(
        {
            assignment_id: assignmentId,
        },
        {
            enabled: Boolean(assignmentId),
        }
    );

    const { mediaList = [] } = useMediaList({ mediaIds: assignment?.attachment });

    const { deleteAssignment } = useDeleteAssignment();

    const onMutation = useCallback(
        async (action: string) => {
            switch (action) {
                case "edit":
                    return navigation.push(
                        `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.ASSIGNMENTS}/${assignmentId}/edit${search}`
                    );
                case "delete": {
                    return deleteAssignment(
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
        [navigation, assignmentId, search, deleteAssignment, bookId]
    );

    if (!assignment || isLoadingAssignment) return null;

    const {
        name,
        is_required_grade: isRequiredGrade,
        max_grade: maxGrade,
        instruction,
        settings,
    } = assignment;

    return (
        <WrapperPageContent data-testid="AssignmentDetail__root">
            <Breadcrumbs loading={loading} breadcrumbInfos={breadcrumbInfos} name={name} />
            <WrapperPageHeader
                title={name}
                action={
                    <ActionPanel
                        record={assignment}
                        actions={[MutationMenus.EDIT, MutationMenus.DELETE]}
                        recordName={name}
                        onAction={onMutation}
                        buttonStyle="square"
                    />
                }
            />
            <main>
                <Grid container spacing={3}>
                    <Grid item sm={12} md={4}>
                        <Paper elevation={2} sx={sx.paper}>
                            <Box mb={3}>
                                <TypographyHeader>{tAssignment(`attachment`)}</TypographyHeader>
                            </Box>

                            <ListMediaChipsBase medias={mediaList} />
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={8}>
                        <Paper elevation={2} sx={sx.paper}>
                            <Box mb={3}>
                                <TypographyHeader>{tAssignment(`assignmentInfo`)}</TypographyHeader>
                            </Box>

                            <Grid container spacing={3}>
                                <Grid item sm={6}>
                                    <AssignmentVerticalField
                                        label={tAssignment(`gradingMethod`)}
                                        value={
                                            isRequiredGrade
                                                ? tAssignment("value")
                                                : tAssignment("doesNotRequireGrading")
                                        }
                                        valueTypoProps={{
                                            "data-testid": "ShowAssignment__gradingMethod",
                                        }}
                                    />
                                </Grid>
                                {maxGrade ? (
                                    <Grid item sm={6}>
                                        <AssignmentVerticalField
                                            label={tAssignment(`maxGrade`)}
                                            value={maxGrade}
                                            valueTypoProps={{
                                                "data-testid": "ShowAssignment__maxGrade",
                                            }}
                                        />
                                    </Grid>
                                ) : null}
                                {instruction && (
                                    <Grid item sm={12}>
                                        <AssignmentVerticalField
                                            label={""}
                                            value={instruction}
                                            valueTypoProps={{
                                                "data-testid": "ShowAssignment__instruction",
                                            }}
                                        />
                                    </Grid>
                                )}
                                <Grid item sm={12} container spacing={0}>
                                    {keySettings.map((key) => {
                                        const value = settings ? settings[key] : false;

                                        return (
                                            <Grid item sm={6} key={key} sx={sx.settings}>
                                                <AssignmentCheckboxGroup
                                                    checkedSetting={value}
                                                    keySetting={key}
                                                />
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </main>
        </WrapperPageContent>
    );
};

export default AssignmentDetail;
