import { ERPModules } from "src/common/constants/enum";

import { Box, Grid, SxProps, Theme } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import AutocompleteLowestLevelLocationsHF from "src/squads/lesson/components/Autocompletes/AutocompleteLowestLevelLocationsHF";
import AutocompleteTeachersHF from "src/squads/lesson/components/Autocompletes/AutocompleteTeachersHF";
import AutocompleteTimeOfDayHF from "src/squads/lesson/components/Autocompletes/AutocompleteTimeOfDayHF";
import DatePickerHF from "src/squads/lesson/components/DatePickers/DatePickerHF";
import RadioGroupHF from "src/squads/lesson/components/RadioGroups/RadioGroupHF";
import WrapperDividerSection from "src/squads/lesson/components/Wrappers/WrapperDividerSection";
import AutocompleteClassesInCourseOfLocationHF from "src/squads/lesson/pages/LessonManagement/components/Autocompletes/AutocompleteClassesInCourseOfLocationHF";
import AutocompleteCoursesOfLocationHF from "src/squads/lesson/pages/LessonManagement/components/Autocompletes/AutocompleteCoursesOfLocationHF";
import FormSectionLessonDate from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionLessonDate";
import FormSectionLessonMaterial from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionLessonMaterial";
import FormSectionLessonStudentV2 from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionLessonStudentV2";
import FormSectionLessonTeachingMethod from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionLessonTeachingMethod";
import FormSectionLessonTime from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionLessonTime";
import FormSectionRecurringLesson from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionRecurringLesson";

import { CreateLessonSavingMethod } from "manabuf/bob/v1/lessons_pb";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import {
    LessonManagementUpsertFormType,
    LessonSavingMethodKeys,
    LessonTeachingMediumKeys,
    LessonTeachingMethodKeys,
    LessonUpsertMode,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import useValidateRulesForLessonDate from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForLessonDate";

export interface FormLessonUpsertProps {
    mode: LessonUpsertMode;
    lessonData?: LessonManagementUpsertFormType;
    isEnabledRecurringLesson: boolean;
    isSavingDraftLesson: boolean;
}

const inputRequiredTranslationPath = "resources.input.error.required";
const getTranslationKey = (key: string) => `resources.${ERPModules.LESSON_MANAGEMENT}.${key}`;

const FormLessonUpsertV2 = (props: FormLessonUpsertProps) => {
    const { lessonData, mode, isEnabledRecurringLesson, isSavingDraftLesson } = props;

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const { rulesForStartDate, rulesForEndDate } = useValidateRulesForLessonDate();

    return (
        <PaperSectionWrapper data-testid="FormLessonUpsertV2__root">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TypographyHeader>{tLessonManagement("generalInfo")}</TypographyHeader>
                </Grid>

                <FormSectionLessonDate
                    render={({ dayOfWeek }) => {
                        return (
                            <>
                                <Grid item xs={6}>
                                    <DatePickerHF
                                        name="date"
                                        label={getTranslationKey("columns.lessonDate")}
                                        InputProps={{
                                            required: true,
                                            "data-testid": "FormLessonUpsertV2__lessonDate",
                                        }}
                                        rules={rulesForStartDate()}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TypographyTextSecondary variant="caption">
                                        {tLessonManagement("dayOfTheWeek")}
                                    </TypographyTextSecondary>
                                    <TypographyPrimary variant="body2">
                                        {dayOfWeek}
                                    </TypographyPrimary>
                                </Grid>
                            </>
                        );
                    }}
                />

                <FormSectionLessonTime
                    render={({ validateRules, totalTimeByMinutes }) => {
                        return (
                            <>
                                <Grid item xs={6}>
                                    <AutocompleteTimeOfDayHF
                                        name="startTimeAutocomplete"
                                        getOptionSelectedField="value"
                                        label={getTranslationKey("startTime")}
                                        required
                                        disableClearable
                                        rules={validateRules.startTime}
                                        data-testid="FormLessonUpsertV2__lessonStartTime"
                                        baseDate={lessonData?.startTimeAutocomplete?.value}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <AutocompleteTimeOfDayHF
                                        name="endTimeAutocomplete"
                                        getOptionSelectedField="value"
                                        label={getTranslationKey("endTime")}
                                        required
                                        disableClearable
                                        rules={validateRules.endTime}
                                        data-testid="FormLessonUpsertV2__lessonEndTime"
                                        baseDate={lessonData?.endTimeAutocomplete?.value}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TypographyTextSecondary variant="caption">
                                        {tLessonManagement("totalTime")} <br />
                                        <TotalTime totalTimeByMinutes={totalTimeByMinutes} />
                                    </TypographyTextSecondary>
                                </Grid>
                            </>
                        );
                    }}
                />

                <Grid item xs={6}>
                    <TypographyTextSecondary variant="caption">
                        {tLessonManagement("columns.teachingMedium")}
                    </TypographyTextSecondary>

                    <RadioGroupHF
                        name="teachingMedium"
                        data-testid="FormLessonUpsertV2__radioTeachingMedium"
                        options={[
                            {
                                id: LessonTeachingMediumKeys.LESSON_TEACHING_MEDIUM_OFFLINE,
                                value: tLessonManagement("LESSON_TEACHING_MEDIUM_OFFLINE"),
                            },
                            {
                                id: LessonTeachingMediumKeys.LESSON_TEACHING_MEDIUM_ONLINE,
                                value: tLessonManagement("LESSON_TEACHING_MEDIUM_ONLINE"),
                            },
                        ]}
                    />
                </Grid>

                <FormSectionLessonTeachingMethod
                    render={({
                        teachingMethod,
                        location,
                        course,
                        classData,
                        onChangeTeachingMethod,
                        onChangeLocation,
                        onChangeCourse,
                    }) => {
                        const isTeachingGroupMethod =
                            teachingMethod === "LESSON_TEACHING_METHOD_GROUP";

                        const disableStyle: SxProps<Theme> = (theme) => {
                            if (!isTeachingGroupMethod)
                                return { backgroundColor: theme.palette.grey[50] };

                            return {};
                        };

                        return (
                            <>
                                <Grid item xs={6}>
                                    <TypographyTextSecondary variant="caption">
                                        {tLessonManagement("columns.teachingMethod")}
                                    </TypographyTextSecondary>

                                    <RadioGroupHF
                                        name="teachingMethod"
                                        data-testid="FormLessonUpsertV2__radioTeachingMethod"
                                        options={[
                                            {
                                                id: LessonTeachingMethodKeys.LESSON_TEACHING_METHOD_INDIVIDUAL,
                                                value: tLessonManagement(
                                                    "LESSON_TEACHING_METHOD_INDIVIDUAL"
                                                ),
                                            },
                                            {
                                                id: LessonTeachingMethodKeys.LESSON_TEACHING_METHOD_GROUP,
                                                value: tLessonManagement(
                                                    "LESSON_TEACHING_METHOD_GROUP"
                                                ),
                                            },
                                        ]}
                                        onChange={(_, value) =>
                                            onChangeTeachingMethod(LessonTeachingMethodKeys[value])
                                        }
                                        disabled={mode === "EDIT"}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <AutocompleteLowestLevelLocationsHF
                                        required
                                        label={getTranslationKey("columns.location")}
                                        name="location"
                                        limitChipText="Ellipsis"
                                        multiple={false}
                                        rules={{ required: t(inputRequiredTranslationPath) }}
                                        getOptionSelectedField="locationId"
                                        onChange={onChangeLocation}
                                        firstOptions={
                                            location ? [{ ...location, value: location.name }] : []
                                        }
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <AutocompleteTeachersHF
                                        required
                                        label={getTranslationKey("columns.teacher")}
                                        name="teachers"
                                        optionLabelKey="id"
                                        disableCloseOnSelect
                                        limitChipText="Ellipsis"
                                        multiple
                                        rules={{
                                            required: {
                                                value: !isSavingDraftLesson,
                                                message: t(inputRequiredTranslationPath),
                                            },
                                        }}
                                        getOptionSelectedField="user_id"
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <AutocompleteCoursesOfLocationHF
                                        name="course"
                                        label={getTranslationKey("columns.course")}
                                        limitChipText="Ellipsis"
                                        location={location}
                                        course={course}
                                        onChange={onChangeCourse}
                                        disabled={!isTeachingGroupMethod}
                                        multiple={false}
                                        rules={{
                                            required: {
                                                value:
                                                    isTeachingGroupMethod && !isSavingDraftLesson,
                                                message: t(inputRequiredTranslationPath),
                                            },
                                        }}
                                        required={isTeachingGroupMethod}
                                        data-testid="FormLessonUpsertV2__course"
                                        sx={disableStyle}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <AutocompleteClassesInCourseOfLocationHF
                                        name="classData"
                                        label={getTranslationKey("columns.class")}
                                        limitChipText="Ellipsis"
                                        location={location}
                                        course={course}
                                        classData={classData}
                                        disabled={!isTeachingGroupMethod}
                                        data-testid="FormLessonUpsertV2__class"
                                        sx={disableStyle}
                                    />
                                </Grid>
                            </>
                        );
                    }}
                />

                <Grid item xs={12}>
                    <WrapperDividerSection>
                        <DividerDashed />
                    </WrapperDividerSection>
                </Grid>

                {isEnabledRecurringLesson ? (
                    <>
                        <FormSectionRecurringLesson
                            render={({ method, onChangeRecurringLesson }) => {
                                const isShowEndDate =
                                    method === "CREATE_LESSON_SAVING_METHOD_RECURRENCE";
                                return (
                                    <>
                                        <Grid item xs={12}>
                                            <TypographyHeader>
                                                {tLessonManagement(
                                                    "recurringLesson.recurringSettings"
                                                )}
                                            </TypographyHeader>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Grid item xs={12}>
                                                <Box>
                                                    <TypographyTextSecondary variant="caption">
                                                        {tLessonManagement(
                                                            "recurringLesson.pleaseSelectAnOptionToSave"
                                                        )}
                                                    </TypographyTextSecondary>
                                                    <Box display="flex">
                                                        <RadioGroupHF
                                                            name="method"
                                                            data-testid="FormLessonUpsertV2__radioRecurringLesson"
                                                            options={[
                                                                {
                                                                    id: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
                                                                    value: tLessonManagement(
                                                                        "recurringLesson.oneTime"
                                                                    ),
                                                                },
                                                                {
                                                                    id: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE,
                                                                    value: tLessonManagement(
                                                                        "recurringLesson.weeklyRecurring"
                                                                    ),
                                                                },
                                                            ]}
                                                            onChange={(_, value) =>
                                                                onChangeRecurringLesson(
                                                                    CreateLessonSavingMethod[value]
                                                                )
                                                            }
                                                            disabled={mode === "EDIT"}
                                                        />

                                                        {isShowEndDate ? (
                                                            <Grid item xs={11}>
                                                                <DatePickerHF
                                                                    name="endDate"
                                                                    label={getTranslationKey(
                                                                        "endDate"
                                                                    )}
                                                                    InputProps={{
                                                                        "data-testid":
                                                                            "FormLessonUpsertV2__lessonEndDate",
                                                                    }}
                                                                    rules={rulesForEndDate(
                                                                        isShowEndDate
                                                                    )}
                                                                />
                                                            </Grid>
                                                        ) : null}
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </>
                                );
                            }}
                        />

                        <Grid item xs={12}>
                            <WrapperDividerSection>
                                <DividerDashed />
                            </WrapperDividerSection>
                        </Grid>
                    </>
                ) : null}

                <Grid item xs={12}>
                    <FormSectionLessonStudentV2 isSavingDraftLesson={isSavingDraftLesson} />
                </Grid>

                <Grid item xs={12}>
                    <WrapperDividerSection>
                        <DividerDashed />
                    </WrapperDividerSection>
                </Grid>

                <Grid item xs={12}>
                    <TypographyHeader>{tLessonManagement("materialInfo")}</TypographyHeader>

                    <FormSectionLessonMaterial defaultMaterialsList={lessonData?.materialsList} />
                </Grid>
            </Grid>
        </PaperSectionWrapper>
    );
};

const TotalTime = ({ totalTimeByMinutes }: { totalTimeByMinutes: number }) => {
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    if (!totalTimeByMinutes) return <>--</>;

    return (
        <TypographyPrimary variant="body2">
            {`${totalTimeByMinutes} ${tLessonManagement("minutes")}`}
        </TypographyPrimary>
    );
};

export default FormLessonUpsertV2;
