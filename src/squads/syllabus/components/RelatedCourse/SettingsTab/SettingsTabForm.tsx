import { ChangeEvent, useCallback } from "react";

import { Entities, NotifyTypes, Features } from "src/common/constants/enum";
import { ArrayElement, LocationManyType } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { Lesson_CoursesOneQuery } from "src/squads/syllabus/services/bob/bob-types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import { Box } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyWithValue from "src/components/Typographys/TypographyWithValue";
import AvatarInput from "src/squads/syllabus/components/InputFiles/AvatarInput";

import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface SettingsTabProps {
    course: ArrayElement<Lesson_CoursesOneQuery["courses"]>;
    locations: LocationManyType[];
    isLoadingLocation: boolean;
    refetch: () => void;
}

export interface SettingsTabFormProps extends SettingsTabProps {}

export const getLocationsList = (locations: LocationManyType[]): string => {
    if (!arrayHasItem(locations)) return "";
    return locations.map((location) => location.name).join(", ");
};

const SettingsTabForm = (props: SettingsTabFormProps) => {
    const { course, locations, isLoadingLocation, refetch } = props;

    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const tCourse = useResourceTranslate(Entities.COURSES);

    const { mutate: submitForm, isLoading } = inferMutation({
        entity: "coursesYasuo",
        action: "courseCreate",
    })({
        onSuccess: () => {
            showSnackbar(tCourse("updateCourseIconSuccess"));
            refetch();
        },
        onError: () => {
            showSnackbar(t("ra.common.updatedFail"), NotifyTypes.ERROR);
        },
    });

    const { isEnabled: enabledTeachingMethod } = useFeatureToggle(
        Features.LESSON_COURSE_BACK_OFFICE_TEACHING_METHOD
    );

    const { isEnabled: enabledLocationField } = useFeatureToggle(
        Features.LESSON_COURSE_DETAIL_BACK_OFFICE_LOCATION_FIELD
    );
    const onSubmitAvatarInput = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (Boolean(e.target.files?.length)) {
                const listFile = Array.from(e.target.files || []);
                return submitForm({
                    name: course.name,
                    course_id: course.course_id,
                    school_id: course.school_id,
                    display_order: course.display_order,
                    icon: course.icon,
                    chapter_ids: [],
                    files: listFile,
                });
            }
        },
        [submitForm, course]
    );

    const onRemove = useCallback(() => {
        return submitForm({
            name: course.name,
            course_id: course.course_id,
            school_id: course.school_id,
            display_order: course.display_order,
            chapter_ids: [],
            icon: undefined,
        });
    }, [submitForm, course]);

    const locationNames = getLocationsList(locations);

    return (
        <Box>
            <Box display="flex" justifyContent="center" pb={3}>
                <AvatarInput
                    name="icon"
                    shouldDelete
                    src={course.icon || undefined}
                    readOnly={isLoading}
                    onChange={onSubmitAvatarInput}
                    onRemove={onRemove}
                />
            </Box>
            <DividerDashed />

            <Box pt={3}>
                <TypographyWithValue
                    label={tCourse("courseName")}
                    value={course.name}
                    variant="horizontal"
                    xsLabel={2}
                    xsValue={10}
                    dataTestidValue="SettingsTabForm__courseName"
                />
                {enabledLocationField && (
                    <Box pt={1.5}>
                        <TypographyWithValue
                            label={tCourse("location")}
                            value={locationNames}
                            variant="horizontal"
                            xsLabel={2}
                            xsValue={10}
                            dataTestidValue="SettingsTabForm__locationsName"
                            isLoading={isLoadingLocation}
                        />
                    </Box>
                )}
                {enabledTeachingMethod && (
                    <Box pt={1.5}>
                        <TypographyWithValue
                            label={tCourse("teachingMethod")}
                            value={course.teaching_method ? tCourse(course.teaching_method) : ""}
                            variant="horizontal"
                            xsLabel={2}
                            xsValue={10}
                            dataTestidValue="SettingsTabForm__teachingMethod"
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default SettingsTabForm;
