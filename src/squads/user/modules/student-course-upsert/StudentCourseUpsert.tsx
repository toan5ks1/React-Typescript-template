import { useMemo, useState } from "react";

import uniq from "lodash/uniq";
import { useFormState } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem, safeStringify } from "src/common/utils/other";
import {
    StudentPackageClientWithLocation,
    StudentPackageCourseForm,
    ValidationStudentCourseErrorTypes,
} from "src/squads/user/common/types";
import { StudentCourseUpsertTable } from "src/squads/user/modules/student-course-upsert/components";

import { Grid, Box } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import ButtonDelete from "src/components/Buttons/ButtonDelete";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useCourseFieldArray from "src/squads/user/modules/student-course-upsert/hooks/useCourseFieldArray";

export const StudentCourseUpsert = () => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);

    const t = useTranslate();

    const { courses, onAdd, onDelete, update } = useCourseFieldArray();

    const [selectedCourses, setSelectedCourses] = useState<StudentPackageClientWithLocation[]>([]);

    const { errors } = useFormState<StudentPackageCourseForm>();

    const errorMessages = useMemo(
        () =>
            errors.studentPackages?.reduce<ValidationStudentCourseErrorTypes[]>(
                (accumulate, current = {}) => {
                    Object.keys(current).forEach((key) => {
                        if (!accumulate.includes(current[key].message)) {
                            accumulate.push(...current[key].message.split(","));
                        }
                    });
                    return uniq(accumulate);
                },
                []
            ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [safeStringify(errors.studentPackages)]
    );

    const componentErrorMessages = useMemo(
        () =>
            errorMessages?.map((message) => (
                <Box key={message}>{tStudents(`messages.error.studentPackage.${message}`)}</Box>
            )),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [safeStringify(errorMessages)]
    );

    const handleDeleteRows = () => {
        onDelete(selectedCourses);
        setSelectedCourses([]);
    };
    const handleSelectedItems = (courses: StudentPackageClientWithLocation[]) => {
        setSelectedCourses(courses);
    };

    return (
        <>
            <Box mb={2}>
                <Grid container spacing={2} justifyContent={"flex-end"}>
                    <Grid item>
                        <ButtonDelete
                            data-testid="StudentCourseUpsert__deleteAction"
                            onClick={handleDeleteRows}
                            disabled={!arrayHasItem(selectedCourses)}
                        />
                    </Grid>
                    <Grid item>
                        <ButtonCreate
                            variant="outlined"
                            onClick={onAdd}
                            data-testid="StudentCourseUpsert__addButton"
                        >
                            {t("ra.common.action.add")}
                        </ButtonCreate>
                    </Grid>
                </Grid>
            </Box>
            <StudentCourseUpsertTable
                courses={courses}
                errorMessage={componentErrorMessages}
                listSelectedItems={selectedCourses}
                onSelect={handleSelectedItems}
                updateRow={update}
            />
        </>
    );
};

export default StudentCourseUpsert;
