import { useRef, useState } from "react";

import { Redirect, useHistory, useParams } from "react-router";
import { ERPModules, Features } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { formatDate } from "src/common/utils/time";
import { MicroFrontendTypes } from "src/routing/type";
import { emptyValue } from "src/squads/lesson/common/utils";

import AddIcon from "@mui/icons-material/Add";
import { Box, Tab } from "@mui/material";
import Breadcrumbs from "src/components/Breadcrumbs";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import TabLayout, { TabLayoutRefs } from "src/components/Tabs/TabLayout";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import HeaderLessonDetailWithAction from "src/squads/lesson/pages/LessonManagement/components/Headers/HeaderLessonDetailWithAction";
import TabLessonDetail from "src/squads/lesson/pages/LessonManagement/components/Tabs/TabLessonDetail";
import TabLessonReport from "src/squads/lesson/pages/LessonManagement/components/Tabs/TabLessonReport";

import { arrayHasItem } from "@manabie-com/mana-utils";
import useFeatureToggle from "src/squads/lesson/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useSafeSetState from "src/squads/lesson/hooks/useSafeState";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import { MapTabReturns } from "src/squads/lesson/hooks/useTabs";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import LessonReportUpsertGrp from "src/squads/lesson/pages/LessonManagement/LessonReportUpsertGrp";
import LessonReportUpsertInd from "src/squads/lesson/pages/LessonManagement/LessonReportUpsertInd";
import {
    LessonReportTabs,
    LessonReportUpsertMode,
    LessonTeachingMethodKeys,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import useLessonReportDetails from "src/squads/lesson/pages/LessonManagement/hooks/useLessonReportDetails";
import useTransformReportUpsertData from "src/squads/lesson/pages/LessonManagement/hooks/useTransformReportUpsertData";

interface DialogReportUpsertState {
    isOpen: boolean;
    mode: LessonReportUpsertMode;
}

const LessonDetail = () => {
    const { lessonId } = useParams<{ lessonId: string }>();
    const history = useHistory();
    const tabLayoutRef = useRef<TabLayoutRefs>();

    const showSnackBar = useShowSnackbar();

    const tCommon = useTranslate();

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const { isEnabled: isEnabledShowAlertWhenNoStudent } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_SHOW_ALERT_WHEN_NO_STUDENT
    );

    const { isEnabled: isEnabledLessonReportGroup } = useFeatureToggle(
        Features.LESSON_MANAGEMENT_LESSON_REPORT_GROUP
    );

    const { convertLessonReportData } = useTransformReportUpsertData();

    const [isRefetchingData, setIsRefetchingData] = useState<boolean>(false);
    const [shouldChangeTabNumber, setShouldChangeTabNumber] = useState<boolean>(false);
    const [openAlertNoMemberDialog, setOpenAlertNoMemberDialog] = useSafeSetState(false);

    const [dialogReportUpsertState, setDialogReportUpsertState] = useState<DialogReportUpsertState>(
        { isOpen: false, mode: "INIT" }
    );

    const handleChangeTabNumber = (tab: LessonReportTabs) => {
        tabLayoutRef.current && tabLayoutRef.current.changeCurrentTab(tab);
    };

    const {
        lessonStatus,
        lessonData,
        isLoadingLesson,
        lessonReports,
        isLoadingLessonReport,
        refetchLessonAndLessonReportDetail,
        isLoadingMedia,
        mediasList,
        center,
        isLoadingCenter,
        classData,
        scheduler,
        isLoadingClass,
        isLoadingScheduler,
        refetchForLessonReport,
    } = useLessonReportDetails({
        lessonId,
        onQueryLessonReportSuccess: () => {
            shouldChangeTabNumber && handleChangeTabNumber(LessonReportTabs.REPORTS);
            isRefetchingData && setIsRefetchingData(false);
        },
    });

    const handleUpsertLessonReportSuccess = async () => {
        setIsRefetchingData(true);
        setShouldChangeTabNumber(true);
        await refetchForLessonReport.refetch();
        setDialogReportUpsertState({ isOpen: false, mode: "INIT" });
    };

    // Currently all our customers don't need Delete Report feature
    // https://manabie.atlassian.net/browse/LT-8942
    // const handleDeleteLessonReportSuccessfully = () => {
    //     refetchLessonAndLessonReportDetail();
    //     showSnackBar(tLessonManagement("messages.deletedIndividualReportSuccessfully"));
    //     setShouldChangeTabNumber(false);
    //     handleChangeTabNumber(LessonReportTabs.LESSON_INFO);
    // };

    const handleUpdateLessonSuccess = async () => {
        setShouldChangeTabNumber(false);
        await refetchLessonAndLessonReportDetail();
    };

    if (!lessonId) {
        showSnackBar(tLessonManagement("errors.unableToGetLessonId"), "error");
        return <Redirect to={`/${MicroFrontendTypes.LESSON}/${ERPModules.LESSON_MANAGEMENT}`} />;
    }

    if (isLoadingLesson)
        return (
            <Box textAlign="center">
                <CircularProgressBase />
            </Box>
        );

    if (!lessonData) {
        return (
            <TypographyBase>{tLessonManagement("errors.unableToFindLessonInfo")}</TypographyBase>
        );
    }

    const createTabsList = (): MapTabReturns[] => {
        const tabsList = [
            {
                tabName: <Tab label={tLessonManagement("lessonInfo")} />,
                tabPanel: (
                    <Box py={3}>
                        <TabLessonDetail
                            lesson={lessonData}
                            isLoadingLesson={isLoadingLesson}
                            isLoadingMedia={isLoadingMedia}
                            mediasList={mediasList}
                            centerName={convertString(center?.name)}
                            isLoadingCenter={isLoadingCenter}
                            className={classData?.name || emptyValue}
                            isLoadingClass={isLoadingClass}
                            scheduler={scheduler}
                            isLoadingScheduler={isLoadingScheduler}
                            onUpdatedLesson={handleUpdateLessonSuccess}
                        />
                    </Box>
                ),
            },
        ];

        if (lessonReports) {
            tabsList.push({
                tabName: <Tab label={tLessonManagement("report")} />,
                tabPanel: (
                    <Box pt={3}>
                        <TabLessonReport
                            isInLessonManagement={true}
                            lessonData={lessonData}
                            lessonReports={lessonReports}
                            isLoading={isLoadingLessonReport || refetchForLessonReport.isRefetching}
                            onEditLessonReport={() => {
                                setDialogReportUpsertState({ isOpen: true, mode: "EDIT" });
                            }}
                            // Currently all our customers don't need Delete Report feature
                            // https://manabie.atlassian.net/browse/LT-8942
                            // onDeleteSuccess={handleDeleteLessonReportSuccessfully}
                        />
                    </Box>
                ),
            });
        }

        return tabsList;
    };

    const getTabAction = () => {
        if (isLoadingLessonReport) return <CircularProgressBase />;

        if (!isLoadingLessonReport && !lessonReports) {
            return (
                <ButtonPrimaryOutlined
                    startIcon={<AddIcon />}
                    onClick={() => {
                        if (
                            isEnabledShowAlertWhenNoStudent &&
                            !arrayHasItem(lessonData.lesson_members)
                        ) {
                            setOpenAlertNoMemberDialog(true);
                            return;
                        }
                        setDialogReportUpsertState({ isOpen: true, mode: "CREATE" });
                    }}
                    data-testid="LessonDetail__createReportButton"
                >
                    {tLessonManagement("report")}
                </ButtonPrimaryOutlined>
            );
        }

        return undefined;
    };

    const formatLessonReportDate = formatDate(lessonData.start_time, "yyyy/LL/dd");
    const { lessonReportData, partnerFormConfig } = convertLessonReportData({
        lessonData,
        lessonReports,
    });

    const lessonReportUpsertDialog = (isOpen: boolean, mode: LessonReportUpsertMode) => {
        if (!isOpen) return null;

        const lessonTeachingMethod = lessonData?.teaching_method;

        if (
            lessonTeachingMethod === LessonTeachingMethodKeys.LESSON_TEACHING_METHOD_GROUP &&
            isEnabledLessonReportGroup
        ) {
            return (
                <LessonReportUpsertGrp
                    open={isOpen}
                    mode={mode}
                    onClose={() => {
                        setDialogReportUpsertState({ isOpen: false, mode: "INIT" });
                    }}
                    onUpsertSuccess={() => {
                        setDialogReportUpsertState({ isOpen: false, mode: "INIT" });
                    }}
                    lessonId={lessonReportData.lessonId}
                    studentsList={lessonReportData.students}
                />
            );
        }

        return (
            <LessonReportUpsertInd
                openDialogUpsertReport={isOpen}
                mode={mode}
                isLoading={isLoadingLessonReport || isRefetchingData}
                onUpsertSuccess={handleUpsertLessonReportSuccess}
                lessonReportData={lessonReportData}
                partnerFormConfig={partnerFormConfig}
                onCloseDialog={() => {
                    setDialogReportUpsertState({ isOpen: false, mode: "INIT" });
                }}
            />
        );
    };

    return (
        <>
            <WrapperPageContent data-testid="LessonDetail__root">
                <Breadcrumbs
                    resource={ERPModules.LESSON_MANAGEMENT}
                    name={formatLessonReportDate}
                />
                <HeaderLessonDetailWithAction
                    freq={scheduler?.freq}
                    lessonTitle={convertString(formatLessonReportDate)}
                    lessonId={lessonId}
                    isLoadingLesson={isLoadingLesson}
                    lessonStatus={convertString(lessonStatus)}
                    onDeleteSuccess={() => {
                        showSnackBar(tLessonManagement("messages.success.deleteLesson"));
                        history.push(
                            `/${MicroFrontendTypes.LESSON}/${ERPModules.LESSON_MANAGEMENT}`
                        );
                    }}
                />
                <TabLayout
                    hasDivider
                    mapTabs={createTabsList()}
                    tabHeaderAction={getTabAction()}
                    ref={tabLayoutRef}
                />
            </WrapperPageContent>

            {isEnabledShowAlertWhenNoStudent && (
                <DialogWithHeaderFooter
                    open={openAlertNoMemberDialog}
                    textSave={tCommon("ra.action.close")}
                    shouldShowCancelButton={false}
                    onSave={() => setOpenAlertNoMemberDialog(false)}
                    onClose={() => setOpenAlertNoMemberDialog(false)}
                    title={tLessonManagement("actions.alert")}
                >
                    <TypographyTextSecondary>
                        {tLessonManagement("cannotCreateLessonReportWhenLessonNoMember")}
                    </TypographyTextSecondary>
                </DialogWithHeaderFooter>
            )}

            {lessonReportUpsertDialog(dialogReportUpsertState.isOpen, dialogReportUpsertState.mode)}
        </>
    );
};

export default LessonDetail;
