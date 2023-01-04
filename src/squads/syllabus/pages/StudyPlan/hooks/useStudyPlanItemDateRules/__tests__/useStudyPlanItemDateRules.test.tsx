import { PropsWithChildren } from "react";

import { useForm } from "react-hook-form";

import useStudyPlanItemDateRules from "..";
import { StudyPlanItemFormValues } from "../../../common/types";

import { renderHook } from "@testing-library/react-hooks";
import TestHookFormProvider from "src/squads/syllabus/test-utils/TestHookFormProvider";

type Rules = {
    format: (value: string) => string | true;
    valid: (value: string) => string | true;
    laterThanAvailableUntil?: (value: string) => string | true;
    earlierThanAvailableFrom?: (value: string) => string | true;
    earlierThanStartDate?: (value: string) => string | true;
};

const HookFormComponent = ({ children }: PropsWithChildren<{}>) => {
    const methods = useForm<StudyPlanItemFormValues>();
    const { setValue } = methods;

    setValue("studyPlanItem.id.availableFrom", "2021/10/25, 00:00");
    setValue("studyPlanItem.id.availableTo", "2021/10/25, 23:59");
    setValue("studyPlanItem.id.startDate", "2021/10/25, 00:00");
    setValue("studyPlanItem.id.endDate", "2021/10/25, 23:59");

    return <TestHookFormProvider methodsOverride={methods}>{children}</TestHookFormProvider>;
};

describe(useStudyPlanItemDateRules.name, () => {
    it("should return correct rules based on field name", () => {
        const { result: availableFromResult } = renderHook(
            () => useStudyPlanItemDateRules({ fieldName: "availableFrom", studyPlanItemId: "id" }),
            { wrapper: TestHookFormProvider }
        );
        const { result: availableUntilResult } = renderHook(
            () => useStudyPlanItemDateRules({ fieldName: "availableTo", studyPlanItemId: "id" }),
            { wrapper: TestHookFormProvider }
        );
        const { result: startDateResult } = renderHook(
            () => useStudyPlanItemDateRules({ fieldName: "startDate", studyPlanItemId: "id" }),
            { wrapper: TestHookFormProvider }
        );
        const { result: endDateResult } = renderHook(
            () => useStudyPlanItemDateRules({ fieldName: "endDate", studyPlanItemId: "id" }),
            { wrapper: TestHookFormProvider }
        );

        expect(Object.keys(availableFromResult.current!.validate!)).toEqual(
            Object.keys({ format: () => {}, valid: () => {}, laterThanAvailableUntil: () => {} })
        );
        expect(Object.keys(availableUntilResult.current!.validate!)).toEqual(
            Object.keys({ format: () => {}, valid: () => {}, earlierThanAvailableFrom: () => {} })
        );
        expect(Object.keys(startDateResult.current!.validate!)).toEqual(
            Object.keys({
                format: () => {},
                valid: () => {},
                earlierThanAvailableFrom: () => {},
                laterThanAvailableUntil: () => {},
                laterThanDueDate: () => {},
            })
        );
        expect(Object.keys(endDateResult.current!.validate!)).toEqual(
            Object.keys({
                format: () => {},
                valid: () => {},
                earlierThanAvailableFrom: () => {},
                laterThanAvailableUntil: () => {},
                earlierThanStartDate: () => {},
            })
        );
    });

    it("should execute availableFrom rules correctly", () => {
        const {
            result: { current },
        } = renderHook(
            () => useStudyPlanItemDateRules({ fieldName: "availableFrom", studyPlanItemId: "id" }),
            { wrapper: HookFormComponent }
        );
        const rules = current!.validate as Rules;

        expect(rules.format("")).toBe(true);
        expect(rules.format("2021/10/25")).toBe(true);
        expect(rules.format("test")).toBe("resources.courses.studyPlan.error.dateFormatInvalid");
        expect(rules.valid("")).toBe(true);
        expect(rules.valid("2021/10/25")).toBe(true);
        expect(rules.valid("2021/13/25")).toBe(
            "resources.courses.studyPlan.error.dateFormatInvalid"
        );
        expect(rules.laterThanAvailableUntil!("")).toBe(true);
        expect(rules.laterThanAvailableUntil!("2021/10/25, 00:00")).toBe(true);
        expect(rules.laterThanAvailableUntil!("2021/10/26, 00:00")).toBe(
            "resources.courses.studyPlan.error.availableFromLaterAvailableUntil"
        );
    });

    it("should execute endDate rules correctly", () => {
        const {
            result: { current },
        } = renderHook(
            () => useStudyPlanItemDateRules({ fieldName: "endDate", studyPlanItemId: "id" }),
            { wrapper: HookFormComponent }
        );
        const rules = current!.validate as Rules;

        expect(rules.earlierThanAvailableFrom!("2021/10/25, 00:00")).toBe(true);
        expect(rules.earlierThanAvailableFrom!("2021/10/24, 00:00")).toBe(
            "resources.courses.studyPlan.error.dueDateEarlierAvailableFrom"
        );
        expect(rules.laterThanAvailableUntil!("2021/10/25, 00:00")).toBe(true);
        expect(rules.laterThanAvailableUntil!("2021/10/26, 00:00")).toBe(
            "resources.courses.studyPlan.error.dueDateLaterAvailableUntil"
        );
        expect(rules.earlierThanStartDate!("2021/10/26, 00:00")).toBe(true);
        expect(rules.earlierThanStartDate!("2021/10/24, 00:00")).toBe(
            "resources.courses.studyPlan.error.dueDateEarlierStartDate"
        );
    });
});
