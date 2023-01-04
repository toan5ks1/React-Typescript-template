import { useFormContext, UseFormReturn } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { isValidDateString } from "src/common/utils/time";
import { HookFormControllerOptionProps } from "src/squads/syllabus/typings/react-hook-form";

import { datePattern, dateTimePattern } from "../../common/constants";
import { StudyPlanItemDateField, StudyPlanItemFormValues } from "../../common/types";

import useResourceTranslate, {
    UseResourceTranslateReturn,
} from "src/squads/syllabus/hooks/useResourceTranslate";

const isValidDate = (value: string) => (value ? isValidDateString(value) : true);

const getRulesByField = (props: {
    fieldName: StudyPlanItemDateField;
    studyPlanItemId: string;
    getValues: UseFormReturn<StudyPlanItemFormValues>["getValues"];
    tCourse: UseResourceTranslateReturn;
}): Required<HookFormControllerOptionProps>["rules"]["validate"] => {
    const { fieldName, studyPlanItemId, getValues, tCourse } = props;
    const dateComparator = {
        "<": (a: string, b: string) => new Date(a) < new Date(b),
        "<=": (a: string, b: string) => new Date(a) <= new Date(b),
        ">": (a: string, b: string) => new Date(a) > new Date(b),
        ">=": (a: string, b: string) => new Date(a) >= new Date(b),
    };
    const generateRule =
        (
            dependentField: StudyPlanItemDateField,
            operator: keyof typeof dateComparator,
            errorMessage: string
        ) =>
        (value: string) => {
            const dependentFieldValue = getValues(
                `studyPlanItem.${studyPlanItemId}.${dependentField}` as const
            );

            if (!value || !dependentFieldValue) return true;

            const shouldCompare =
                (datePattern.test(dependentFieldValue) ||
                    dateTimePattern.test(dependentFieldValue)) &&
                isValidDate(dependentFieldValue);

            if (!shouldCompare) return true;

            return dateComparator[operator](value, dependentFieldValue) || tCourse(errorMessage);
        };

    switch (fieldName) {
        case "availableFrom":
            return {
                laterThanAvailableUntil: generateRule(
                    "availableTo",
                    "<",
                    "studyPlan.error.availableFromLaterAvailableUntil"
                ),
            };
        case "availableTo":
            return {
                earlierThanAvailableFrom: generateRule(
                    "availableFrom",
                    ">",
                    "studyPlan.error.availableUntilEarlierAvailableFrom"
                ),
            };
        case "startDate":
            return {
                earlierThanAvailableFrom: generateRule(
                    "availableFrom",
                    ">=",
                    "studyPlan.error.startDateEarlierAvailableFrom"
                ),
                laterThanAvailableUntil: generateRule(
                    "availableTo",
                    "<",
                    "studyPlan.error.startDateLaterAvailableUntil"
                ),
                laterThanDueDate: generateRule(
                    "endDate",
                    "<",
                    "studyPlan.error.startDateLaterDueDate"
                ),
            };
        case "endDate":
            return {
                earlierThanAvailableFrom: generateRule(
                    "availableFrom",
                    ">=",
                    "studyPlan.error.dueDateEarlierAvailableFrom"
                ),
                laterThanAvailableUntil: generateRule(
                    "availableTo",
                    "<=",
                    "studyPlan.error.dueDateLaterAvailableUntil"
                ),
                earlierThanStartDate: generateRule(
                    "startDate",
                    ">",
                    "studyPlan.error.dueDateEarlierStartDate"
                ),
            };
    }
};

interface UseStudyPlanItemDateRulesProps {
    studyPlanItemId: string;
    fieldName: StudyPlanItemDateField;
}

const useStudyPlanItemDateRules = (
    props: UseStudyPlanItemDateRulesProps
): HookFormControllerOptionProps["rules"] => {
    const { fieldName, studyPlanItemId } = props;
    const { getValues } = useFormContext<StudyPlanItemFormValues>();
    const tCourse = useResourceTranslate(Entities.COURSES);

    return {
        validate: {
            format: (value: string) =>
                (value ? datePattern.test(value) || dateTimePattern.test(value) : true) ||
                tCourse("studyPlan.error.dateFormatInvalid"),
            valid: (value: string) =>
                isValidDate(value) || tCourse("studyPlan.error.dateFormatInvalid"),
            ...getRulesByField({ fieldName, studyPlanItemId, getValues, tCourse }),
        },
    };
};

export default useStudyPlanItemDateRules;
