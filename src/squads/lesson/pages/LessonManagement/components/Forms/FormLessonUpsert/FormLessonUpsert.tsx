import { useCallback } from "react";

import { useWatch } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { getDayOfWeekName } from "src/squads/lesson/common/utils";

import { Box, Grid } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import AutocompleteLowestLevelLocationsHF from "src/squads/lesson/components/Autocompletes/AutocompleteLowestLevelLocationsHF";
import AutocompleteTeachersHF from "src/squads/lesson/components/Autocompletes/AutocompleteTeachersHF";
import DatePickerHF from "src/squads/lesson/components/DatePickers/DatePickerHF";
import TimePickerHF from "src/squads/lesson/components/DatePickers/TimePickerHF";
import RadioGroupHF from "src/squads/lesson/components/RadioGroups/RadioGroupHF";
import WrapperDividerSection from "src/squads/lesson/components/Wrappers/WrapperDividerSection";
import FormSectionLessonMaterial from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionLessonMaterial";
import FormSectionLessonStudent from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionLessonStudent";
import FormSectionRecurringLesson from "src/squads/lesson/pages/LessonManagement/components/FormSections/FormSectionRecurringLesson";
import WrapperLessonTimePicker from "src/squads/lesson/pages/LessonManagement/components/Wrappers/WrapperLessonTimePicker";

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

const FormLessonUpsert = (props: FormLessonUpsertProps) => {
    const { lessonData, isEnabledRecurringLesson, mode, isSavingDraftLesson } = props;

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const getKeyTranslate = useCallback((key: string) => `resources.lesson_management.${key}`, []);

    const { rulesForStartDate, rulesForEndDate } = useValidateRulesForLessonDate();
    return (
        <PaperSectionWrapper data-testid="FormLessonUpsert__root">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TypographyHeader>{tLessonManagement("generalInfo")}</TypographyHeader>
                </Grid>

                <Grid item xs={6}>
                    <DatePickerHF
                        name="date"
                        label={getKeyTranslate("columns.lessonDate")}
                        InputProps={{
                            required: true,
                            "data-testid": "FormLessonUpsert__lessonDate",
                        }}
                        rules={rulesForStartDate()}
                    />
                </Grid>

                <Grid item xs={6}>
                    <DayOfTheWeek />
                </Grid>

                <WrapperLessonTimePicker
                    render={({ validateRules }) => {
                        return (
                            <>
                                <Grid item xs={6}>
                                    <TimePickerHF
                                        name="startTime"
                                        label={getKeyTranslate("startTime")}
                                        InputProps={{
                                            required: true,
                                            "data-testid": "FormLessonUpsert__lessonStartTime",
                                        }}
                                        rules={validateRules.startTime}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TimePickerHF
                                        name="endTime"
                                        label={getKeyTranslate("endTime")}
                                        InputProps={{
                                            required: true,
                                            "data-testid": "FormLessonUpsert__lessonEndTime",
                                        }}
                                        rules={validateRules.endTime}
                                    />
                                </Grid>
                            </>
                        );
                    }}
                />

                <Grid item xs={12}>
                    <Box>
                        <TypographyTextSecondary variant="caption">
                            {tLessonManagement("columns.teachingMedium")}
                        </TypographyTextSecondary>
                        <RadioGroupHF
                            name="teachingMedium"
                            data-testid="FormLessonUpsert__radioTeachingMedium"
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
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Box>
                        <TypographyTextSecondary variant="caption">
                            {tLessonManagement("columns.teachingMethod")}
                        </TypographyTextSecondary>
                        <RadioGroupHF
                            name="teachingMethod"
                            data-testid="FormLessonUpsert__radioTeachingMethod"
                            options={[
                                {
                                    id: LessonTeachingMethodKeys.LESSON_TEACHING_METHOD_INDIVIDUAL,
                                    value: tLessonManagement("LESSON_TEACHING_METHOD_INDIVIDUAL"),
                                },
                                // { //Disabled in phase 1
                                //     id: "group",
                                //     value: tLessonManagement("columns.group"),
                                // },
                            ]}
                        />
                    </Box>
                </Grid>

                <Grid item xs={6}>
                    <AutocompleteTeachersHF
                        required
                        label={getKeyTranslate("columns.teacher")}
                        name="teachers"
                        optionLabelKey="id"
                        disableCloseOnSelect
                        limitChipText="Ellipsis"
                        multiple
                        rules={{
                            required: {
                                value: !isSavingDraftLesson,
                                message: t("resources.input.error.required"),
                            },
                        }}
                        getOptionSelectedField="user_id"
                    />
                </Grid>

                <Grid item xs={6}>
                    <AutocompleteLowestLevelLocationsHF
                        required
                        label={getKeyTranslate("columns.center")}
                        name="center"
                        limitChipText="Ellipsis"
                        multiple={false}
                        rules={{ required: t("resources.input.error.required") }}
                        getOptionSelectedField="locationId"
                    />
                </Grid>

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
                                    method ===
                                    LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE;
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
                                                            data-testid="FormLessonUpsertV4__radioRecurringLesson"
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
                                                                    label={getKeyTranslate(
                                                                        "endDate"
                                                                    )}
                                                                    InputProps={{
                                                                        "data-testid":
                                                                            "FormLessonUpsert__lessonEndDate",
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
                    <FormSectionLessonStudent isSavingDraftLesson={isSavingDraftLesson} />
                </Grid>

                <Grid item xs={12}>
                    <WrapperDividerSection>
                        <DividerDashed />
                    </WrapperDividerSection>
                </Grid>

                <Grid item xs={12}>
                    <Box>
                        <TypographyHeader>{tLessonManagement("materialInfo")}</TypographyHeader>

                        <FormSectionLessonMaterial
                            defaultMaterialsList={lessonData?.materialsList}
                        />
                    </Box>
                </Grid>
            </Grid>
        </PaperSectionWrapper>
    );
};

const DayOfTheWeek = () => {
    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const date = useWatch<LessonManagementUpsertFormType, "date">({
        name: "date",
        defaultValue: new Date(),
    });

    const dayOfWeekName = getDayOfWeekName(date, t);

    return (
        <>
            <TypographyTextSecondary variant="caption">
                {tLessonManagement("dayOfTheWeek")}
            </TypographyTextSecondary>
            <TypographyPrimary variant="body2">{dayOfWeekName}</TypographyPrimary>
        </>
    );
};

export default FormLessonUpsert;
