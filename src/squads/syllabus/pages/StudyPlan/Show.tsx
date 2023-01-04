import { useCallback, useState } from "react";

import { useParams } from "react-router";
import { ModeOpenDialog } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { KeyStudyPlanTypes } from "src/squads/syllabus/common/constants/const";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import DialogUpsertStudyplan from "./components/DialogUpsertStudyplan";
import StudyPlanAction from "./components/StudyPlanAction";
import StudyPlanInfo from "./components/StudyPlanInfo";
import StudyPlanItemTableAction from "./components/StudyPlanItemTableAction";
import { Box } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import Loading from "src/components/Loading";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";
import Breadcrumbs from "src/squads/syllabus/components/Breadcrumbs";

import logger from "../../internals/logger";
import useStudyPlanQuery from "./hooks/useStudyPlanQuery";

import useBreadcrumbStudyPlan from "src/squads/syllabus/hooks/useBreadcrumb/useBreadcrumbStudyPlan";
import useConvertGrade from "src/squads/syllabus/hooks/useConvertGrade";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { StudyPlanFormData } from "src/squads/syllabus/pages/StudyPlan/common/types";

const Show = () => {
    const { id: studyPlanId } = useParams<{ id: string }>();
    const {
        studyPlan,
        studyPlanItemsByTopic,
        isFetching: isFetchingStudyPlanItems,
        pagination,
        refetch: refetchStudyPlanItems,
        refetchStudyPlan,
    } = useStudyPlanQuery(studyPlanId);

    const { breadcrumbInfos, loading } = useBreadcrumbStudyPlan();

    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const [open, setOpen] = useState<boolean>(false);
    const { convertGradesToArrayGradeObject } = useConvertGrade();

    const handleOpenEditStudyPlanDialog = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const handleCloseEditStudyPlanDialog = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const bookId = convertString(studyPlan?.book_id);

    const { data: bookData } = inferQuery({
        action: "syllabusBookGetTitle",
        entity: "book",
    })(
        { book_id: bookId },
        {
            enabled: Boolean(studyPlan?.book_id),
            onError: (error) => {
                logger.warn("syllabusBookGetTitle", error);

                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    if (!studyPlan && isFetchingStudyPlanItems) return <Loading />;

    if (!studyPlan) return null;

    const bookName = convertString(bookData?.name);

    const isCourseStudyPlan =
        !studyPlan.master_study_plan_id &&
        studyPlan.study_plan_type === KeyStudyPlanTypes.STUDY_PLAN_TYPE_COURSE;

    const defaultEditStudyPlanFormValues: StudyPlanFormData = {
        name: convertString(studyPlan.name),
        book: {
            book_id: convertString(studyPlan.book_id),
            name: bookName,
            value: bookName,
        },
        grades: convertGradesToArrayGradeObject(studyPlan.grades),
        trackSchoolProgress: !!studyPlan.track_school_progress,
    };

    return (
        <WrapperPageContent>
            <Breadcrumbs
                loading={loading}
                breadcrumbInfos={breadcrumbInfos}
                name={studyPlan.name}
            />

            <WrapperPageHeader
                title={convertString(studyPlan.name)}
                action={
                    isCourseStudyPlan && (
                        <StudyPlanAction
                            studyPlan={studyPlan}
                            refetchStudyPlan={refetchStudyPlan}
                            handleOpenEditStudyPlanDialog={handleOpenEditStudyPlanDialog}
                        />
                    )
                }
            />
            <StudyPlanInfo
                bookId={bookId}
                bookName={bookName}
                grades={studyPlan.grades}
                trackSchoolProgress={Boolean(studyPlan.track_school_progress)}
            />
            <Box mb={2} mt={2}>
                <DividerDashed />
            </Box>
            <StudyPlanItemTableAction
                studyPlan={studyPlan}
                studyPlanItems={studyPlanItemsByTopic}
                isFetchingStudyPlanItems={isFetchingStudyPlanItems}
                pagination={pagination}
                refetchStudyPlanItems={refetchStudyPlanItems}
                isMasterStudyPlan={isCourseStudyPlan}
            />
            <DialogUpsertStudyplan
                mode={ModeOpenDialog.EDIT}
                open={open}
                onClose={handleCloseEditStudyPlanDialog}
                courseId={convertString(studyPlan.course_id)}
                studyPlanId={studyPlanId}
                defaultValues={defaultEditStudyPlanFormValues}
                refetchStudyPlanInfo={refetchStudyPlan}
            />
        </WrapperPageContent>
    );
};

export default Show;
