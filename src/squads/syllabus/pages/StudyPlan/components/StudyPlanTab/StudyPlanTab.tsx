import { memo, useCallback, useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import { EurekaEntities, ModeOpenDialog } from "src/common/constants/enum";

import { Box } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import { ToggleButtonBaseProps } from "src/components/Buttons/ToggleButtonBase/ToggleButtonBase";
import ToggleButtonGroupBase from "src/components/Buttons/ToggleButtonGroupBase/ToggleButtonGroupBase";
import HookForm from "src/components/Forms/HookForm";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import TypographyBase from "src/components/Typographys/TypographyBase";

import CourseStudyPlanTable from "../CourseStudyPlanTable";
import DialogUpsertStudyplan from "../DialogUpsertStudyplan";
import FormFilterAdvancedStudyPlan from "../FormFilterAdvancedStudyPlan";
import StudentStudyPlanTable from "../StudentStudyPlanTable";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { studyPlanFilterDefaultValues } from "src/squads/syllabus/pages/StudyPlan/common/constants";
import {
    FormFilterStudyPlanValues,
    StudyPlanFilter,
} from "src/squads/syllabus/pages/StudyPlan/common/types";

interface StudyPlanTabProps {
    courseId: string;
}

const StudyPlanTab = (props: StudyPlanTabProps) => {
    const { courseId } = props;

    const [open, setOpen] = useState(false);

    const t = useTranslate();
    const [resource, setResource] = useState<
        EurekaEntities.COURSE_STUDY_PLANS | EurekaEntities.STUDENT_STUDY_PLANS
    >(EurekaEntities.COURSE_STUDY_PLANS);
    const methods = useForm<FormFilterStudyPlanValues>({
        defaultValues: studyPlanFilterDefaultValues,
    });
    const [studyPlanNameKeyword, setStudyPlanNameKeyword] = useState("");
    const [studyPlanFilter, setStudyPlanFilter] = useState<StudyPlanFilter>({
        archived: false,
        bookIds: [],
        grades: [],
    });

    const buttons: ToggleButtonBaseProps[] = useMemo(
        () => [
            {
                value: EurekaEntities.COURSE_STUDY_PLANS,
                children: (
                    <TypographyBase variant="button">
                        {t(`resources.${EurekaEntities.STUDY_PLANS}.master`)}
                    </TypographyBase>
                ),
            },
            {
                value: EurekaEntities.STUDENT_STUDY_PLANS,
                children: (
                    <TypographyBase variant="button">
                        {t(`resources.${EurekaEntities.STUDY_PLANS}.individual`)}
                    </TypographyBase>
                ),
            },
        ],
        [t]
    );
    const handleChange = useCallback((_event, value) => value && setResource(value), []);

    const handleFilter = useCallback(({ archived, books, grades }: FormFilterStudyPlanValues) => {
        setStudyPlanFilter({
            archived,
            bookIds: books.map(({ book_id }) => book_id),
            grades: grades.map(({ id }) => id),
        });
    }, []);

    return (
        <>
            <Box p={3}>
                <PaperRoundedBorders>
                    <Box p={3}>
                        <Box>
                            <ToggleButtonGroupBase
                                exclusive
                                value={resource}
                                onChange={handleChange}
                                options={buttons}
                            />
                        </Box>
                        <Box
                            mt={2}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="start"
                        >
                            <HookForm methods={methods}>
                                <FormFilterAdvancedStudyPlan
                                    resource={resource}
                                    onApplySubmit={handleFilter}
                                    onEnterSearchBar={setStudyPlanNameKeyword}
                                />
                            </HookForm>
                            {resource === EurekaEntities.COURSE_STUDY_PLANS && (
                                <ButtonCreate
                                    variant="outlined"
                                    onClick={() => setOpen(true)}
                                    data-testid="StudyPlanTab__addStudyPlan"
                                >
                                    {t("ra.common.action.add")}
                                </ButtonCreate>
                            )}
                        </Box>
                        <Box mt={2}>
                            {resource === EurekaEntities.COURSE_STUDY_PLANS && (
                                <CourseStudyPlanTable
                                    courseId={courseId}
                                    filter={studyPlanFilter}
                                    keyword={studyPlanNameKeyword}
                                />
                            )}

                            {resource === EurekaEntities.STUDENT_STUDY_PLANS && (
                                <StudentStudyPlanTable
                                    courseId={courseId}
                                    filter={studyPlanFilter}
                                    keyword={studyPlanNameKeyword}
                                />
                            )}
                        </Box>
                    </Box>
                </PaperRoundedBorders>
            </Box>
            <DialogUpsertStudyplan
                mode={ModeOpenDialog.ADD}
                open={open}
                onClose={() => setOpen(false)}
                courseId={courseId}
            />
        </>
    );
};

export default memo(StudyPlanTab);
