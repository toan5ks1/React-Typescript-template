import { Entities, Features } from "src/common/constants/enum";
import { LocationUpsertCourses } from "src/squads/syllabus/common/types/common";

import { Box, Grid } from "@mui/material";
import AutocompleteHF from "src/components/Autocompletes/AutocompleteHF";
import DividerDashed from "src/components/Divider/DividerDashed";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import AvatarInputHF from "src/squads/syllabus/components/InputFiles/AvatarInputHF";
import LocationSelectInputHF from "src/squads/syllabus/components/LocationSelectInputHF";

import { CourseTeachingMethod } from "manabuf/mastermgmt/v1/course_pb";

import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate, { UseTranslateReturn } from "src/squads/syllabus/hooks/useTranslate";

export interface CourseFormData {
    name: string;
    iconUrl?: string;
    iconFile?: File[];
    locations: LocationUpsertCourses[];
    teachingMethod?: CourseTeachingMethodOption;
}

export interface CourseFormProps {
    isEditMode?: boolean;
    defaultTeachingMethod?: CourseTeachingMethodOption;
}

export type CourseTeachingMethodOption = {
    id: number;
    name: string;
};

const convertTeachingMethodOptions = (t: UseTranslateReturn): CourseTeachingMethodOption[] => [
    {
        id: CourseTeachingMethod.COURSE_TEACHING_METHOD_INDIVIDUAL,
        name: t("resources.choices.teachingMethod.COURSE_TEACHING_METHOD_INDIVIDUAL"),
    },
    {
        id: CourseTeachingMethod.COURSE_TEACHING_METHOD_GROUP,
        name: t("resources.choices.teachingMethod.COURSE_TEACHING_METHOD_GROUP"),
    },
];

const CourseForm = ({ isEditMode, defaultTeachingMethod }: CourseFormProps) => {
    const t = useTranslate();
    const tCourse = useResourceTranslate(Entities.COURSES);

    const { isEnabled: enabledTeachingMethod } = useFeatureToggle(
        Features.LESSON_COURSE_BACK_OFFICE_TEACHING_METHOD
    );

    const validationRules = {
        name: {
            required: {
                value: true,
                message: t("resources.input.error.required"),
            },
        },
        locations: {
            required: {
                value: true,
                message: t("resources.input.error.required"),
            },
        },
        teachingMethod: {
            required: {
                value: true,
                message: t("resources.input.error.required"),
            },
        },
    };
    const teachingMethodOptions = convertTeachingMethodOptions(t);

    return (
        <Grid container spacing={2} data-testid="CourseForm__root">
            <Grid item xs={12} container justifyContent="center">
                <AvatarInputHF shouldDelete name="iconFile" initialSource="iconUrl" mode="files" />
            </Grid>
            <Grid item xs={12}>
                <Box py={1}>
                    <DividerDashed />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <TextFieldHF
                    autoFocus
                    required
                    id="name"
                    label={tCourse("courseName")}
                    name="name"
                    rules={validationRules.name}
                />
            </Grid>
            <Grid item xs={12}>
                <LocationSelectInputHF
                    label={tCourse("location")}
                    name="locations"
                    getOptionSelectedField="locationId"
                    titleDialog={tCourse("dialogSelectLocationTitle")}
                    rules={enabledTeachingMethod ? validationRules.locations : {}}
                    required={enabledTeachingMethod}
                />
            </Grid>
            {enabledTeachingMethod && (
                <Grid item xs={12}>
                    <AutocompleteHF<CourseTeachingMethodOption>
                        id="TeachingMethodAutocompleteHF__autocomplete"
                        name="teachingMethod"
                        data-testid="TeachingMethodAutocompleteHF__autocomplete"
                        key="teachingMethod"
                        label={tCourse("teachingMethod")}
                        options={teachingMethodOptions}
                        getOptionSelectedField="id"
                        optionLabelKey="name"
                        rules={validationRules.teachingMethod}
                        required
                        disabled={isEditMode && Boolean(defaultTeachingMethod)}
                        sx={(theme) => ({
                            paddingBottom: theme.spacing(1),
                        })}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default CourseForm;
