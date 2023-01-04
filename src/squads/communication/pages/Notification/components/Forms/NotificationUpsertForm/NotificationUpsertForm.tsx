import { MutableRefObject, useCallback } from "react";

import { useFormContext } from "react-hook-form";
import { KeyNotificationStatus, UserRoles } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { firstOptionsChoice } from "src/common/helpers/helpers";
import { arrayHasItem } from "src/common/utils/other";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import { NotificationFormData } from "src/squads/communication/common/constants/types";
import { Grade } from "src/squads/communication/models/grade";
import { NotificationSelectors } from "src/squads/communication/models/notification";
import { CoursesManyReferenceQuery } from "src/squads/communication/service/bob/bob-types";

import { Grid, Theme } from "@mui/material";
import GradesAutocompleteHF from "src/components/Autocompletes/GradesAutocompleteHF";
import DividerDashed from "src/components/Divider/DividerDashed";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import RadioGroupHF from "src/components/RadioGroups/RadioGroupHF";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import CoursesAutocompleteHF from "src/squads/communication/pages/Notification/components/Autocompletes/CoursesAutocompleteHF";
import StudentsAutocompleteHF from "src/squads/communication/pages/Notification/components/Autocompletes/StudentsAutocompleteHF";
import DeliveryDateInputs from "src/squads/communication/pages/Notification/components/DeliveryDateInputs";
import DynamicQuestionSection from "src/squads/communication/pages/Notification/components/DynamicQuestionSection";
import EditorHF from "src/squads/communication/pages/Notification/components/EditorHF";
import FormTagSection from "src/squads/communication/pages/Notification/components/Forms/FormTagSection";
import FormUploadNotificationFile from "src/squads/communication/pages/Notification/components/Forms/FormUploadNotificationFile";
import SwitchLabelHF from "src/squads/communication/pages/Notification/components/Switch/SwitchLabelHF";

import uniqBy from "lodash/uniqBy";
import { ChoiceType } from "src/squads/communication/hooks/useAutocompleteReference";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useUpsertNotificationValidationRules from "src/squads/communication/pages/Notification/hooks/useUpsertNotificationValidation";

export interface NotificationUpsertFormProps {
    isSubmittingForm?: boolean;
    shouldValidateFullForm: MutableRefObject<boolean>;
    shouldEnableScheduleMode: boolean;
    setEnableScheduleMode: (shouldEnableScheduleMode: boolean) => void;
}

const sx = {
    scheduleRow: (theme: Theme) => ({
        marginBottom: theme.spacing(1),
    }),
    dividerSpacing: (theme: Theme) => ({
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }),
};

const NotificationUpsertForm = (props: NotificationUpsertFormProps) => {
    const { isEnabled: isShowNotificationQuestionnaire } = useFeatureToggle(
        Features.NOTIFICATION_QUESTIONNAIRE
    );

    const { isEnabled: isShowScheduleManagement } = useFeatureToggle(
        Features.NOTIFICATION_SCHEDULE_MANAGEMENT
    );

    const { isEnabled: isShowTagFeature } = useFeatureToggle(Features.NOTIFICATION_TAGS);

    const { getValues } = useFormContext<NotificationFormData>();

    const {
        isSubmittingForm,
        shouldValidateFullForm,
        shouldEnableScheduleMode,
        setEnableScheduleMode,
    } = props;

    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const validationRules = useUpsertNotificationValidationRules(shouldValidateFullForm);

    const handleChangeDeliveryDateType = (
        _: React.ChangeEvent<HTMLInputElement>,
        value: string
    ) => {
        setEnableScheduleMode(value === KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED);
    };

    const getCourseFirstOption = useCallback((): ChoiceType<
        ArrayElement<CoursesManyReferenceQuery["courses"]>
    >[] => {
        const coursesValue = getValues("courses");

        const mappedCourseChoices = coursesValue.map((course) => ({
            ...course,
            value: course.course_id,
        }));

        const allCourseChoice = firstOptionsChoice<
            ChoiceType<ArrayElement<CoursesManyReferenceQuery["courses"]>>
        >({
            firstChoiceLabel: tNotification("label.allCourses"),
            key: "course_id",
            keyValue: "name",
        });

        if (!arrayHasItem(coursesValue)) {
            return [allCourseChoice];
        }

        return uniqBy([allCourseChoice, ...mappedCourseChoices], "course_id");
    }, [getValues, tNotification]);

    return (
        <PaperSectionWrapper>
            <Grid
                container
                direction="column"
                spacing={2}
                mb={1}
                data-testid="NotificationUpsertForm__root"
            >
                <Grid item>
                    <TypographyHeader>{tNotification("label.target")}</TypographyHeader>
                </Grid>

                <Grid item>
                    <CoursesAutocompleteHF
                        rules={validationRules?.courses}
                        name="courses"
                        disableClearable={false}
                        disableCloseOnSelect={true}
                        firstOptions={getCourseFirstOption()}
                        label={tNotification("label.placeholder.selectCourse")}
                        limitChipText="Ellipsis"
                        getOptionSelectedField="course_id"
                    />
                </Grid>

                <Grid item>
                    <GradesAutocompleteHF
                        rules={validationRules?.grades}
                        size="small"
                        data-testid="NotificationUpsertForm__grades"
                        name="grades"
                        multiple
                        firstOptions={firstOptionsChoice<Grade>({
                            firstChoiceLabel: tNotification("label.allGrades"),
                            keyValue: "name",
                        })}
                        label={tNotification("label.placeholder.selectGrade")}
                        limitChipText="Ellipsis"
                        getOptionSelectedField="id"
                    />
                </Grid>

                <Grid item>
                    <StudentsAutocompleteHF
                        rules={validationRules?.students}
                        freeSolo
                        name="students"
                        disableClearable={false}
                        label={tNotification("label.placeholder.selectIndividualRecipient")}
                        limitChipText="Ellipsis"
                        getOptionSelectedField="user_id"
                    />
                </Grid>

                <Grid item>
                    <RadioGroupHF
                        size="small"
                        data-testid="NotificationUpsertForm__targetGroup"
                        name="targetGroup"
                        options={[
                            { id: "", value: tNotification("label.all") },
                            {
                                id: UserRoles.USER_GROUP_PARENT,
                                value: tNotification("label.parent"),
                            },
                            {
                                id: UserRoles.USER_GROUP_STUDENT,
                                value: tNotification("label.student"),
                            },
                        ]}
                    />
                </Grid>

                {isShowScheduleManagement && (
                    <>
                        <Grid item sx={sx.dividerSpacing}>
                            <DividerDashed />
                        </Grid>

                        <Grid item>
                            <TypographyHeader>
                                {tNotification("label.deliveryOption")}
                            </TypographyHeader>
                        </Grid>

                        <Grid item container>
                            <Grid item>
                                <RadioGroupHF
                                    size="small"
                                    data-testid="NotificationUpsertForm__radioGroupDeliveryDateType"
                                    name="status"
                                    onChange={handleChangeDeliveryDateType}
                                    options={[
                                        {
                                            id: KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT,
                                            value: tNotification("label.now"),
                                        },
                                        {
                                            id: KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED,
                                            value: tNotification("label.schedule"),
                                        },
                                    ]}
                                />
                            </Grid>
                            <Grid item sx={sx.scheduleRow}>
                                {shouldEnableScheduleMode && (
                                    <DeliveryDateInputs
                                        dateFieldProps={{
                                            disablePast: true,
                                            name: "scheduleDate",
                                            toolbarTitle: tNotification("label.notificationDate"),
                                            InputProps: {
                                                "data-testid":
                                                    "NotificationUpsertForm__scheduledDate",
                                            },
                                        }}
                                        timeFieldProps={{
                                            name: "scheduleTime",
                                            placeholder: tNotification(
                                                "label.placeholder.selectTime"
                                            ),
                                            rules: validationRules?.scheduleTime,
                                            getOptionSelectedField: "value",
                                        }}
                                    />
                                )}
                            </Grid>
                        </Grid>

                        {isShowNotificationQuestionnaire && (
                            <Grid item>
                                <SwitchLabelHF
                                    data-testid="NotificationUpsertForm__switchImportantNotification"
                                    label={tNotification("label.importantNotification")}
                                    name="isImportantNotification"
                                />
                            </Grid>
                        )}
                    </>
                )}

                <Grid item sx={sx.dividerSpacing}>
                    <DividerDashed />
                </Grid>

                {isShowTagFeature && (
                    <>
                        <Grid item>
                            <TypographyHeader>{tNotification("label.tags")}</TypographyHeader>
                        </Grid>

                        <Grid item container>
                            <FormTagSection />
                        </Grid>

                        <Grid item sx={sx.dividerSpacing}>
                            <DividerDashed />
                        </Grid>
                    </>
                )}

                <Grid item>
                    <TypographyHeader>{`${tNotification("label.content")} *`}</TypographyHeader>
                </Grid>

                <Grid item>
                    <TextFieldHF
                        inputProps={{ "data-testid": "NotificationUpsertForm__inputTitle" }}
                        name="title"
                        rules={validationRules?.title}
                        placeholder={`${tNotification("label.placeholder.notificationTitle")} *`}
                        onBlur={(event) => (event.target.value = event.target.value.trim())}
                    />
                </Grid>

                <Grid item>
                    <EditorHF
                        name="content"
                        rules={validationRules?.content}
                        selector={NotificationSelectors.content}
                        placeholder={`${tNotification("label.placeholder.selectContent")}`}
                    />
                </Grid>

                <FormUploadNotificationFile isSubmittingForm={isSubmittingForm} />

                {isShowNotificationQuestionnaire && (
                    <>
                        <Grid item sx={sx.dividerSpacing}>
                            <DividerDashed />
                        </Grid>
                        <Grid item>
                            <TypographyHeader>
                                {tNotification("label.questionnaire")}
                            </TypographyHeader>
                        </Grid>
                        <Grid item>
                            <DynamicQuestionSection />
                        </Grid>
                    </>
                )}
            </Grid>
        </PaperSectionWrapper>
    );
};

export default NotificationUpsertForm;
