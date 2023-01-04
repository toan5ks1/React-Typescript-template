import { FieldPath, UseFormClearErrors, UseFormReturn } from "react-hook-form";

import { useFormContext } from "src/components/Forms/HookForm";

import { renderHook } from "@testing-library/react-hooks";
import useValidateRulesForFormFilterAdvancedLessonManagement, {
    FormFilterLessonManagementValues,
} from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForFormFilterAdvancedLessonManagement";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: jest.fn(),
    };
});

const now = new Date("2022-01-01T15:00:00.000");
const futureTime = new Date(now.setHours(now.getHours() + 1));
const pastTime = new Date(now.setHours(now.getHours() - 1));
const mockResourceTranslate = (translateKey: string) => translateKey;

const mockHookValidate = (filterFormData: FormFilterLessonManagementValues) => {
    (useFormContext as jest.Mock).mockImplementation(() => {
        return {
            getValues: (fields: FieldPath<FormFilterLessonManagementValues>) => {
                return filterFormData[fields];
            },
            clearErrors: jest.fn() as UseFormClearErrors<FormFilterLessonManagementValues>,
        } as UseFormReturn<FormFilterLessonManagementValues>;
    });

    const { result } = renderHook(() =>
        useValidateRulesForFormFilterAdvancedLessonManagement(mockResourceTranslate)
    );
    return result;
};

describe("useValidateRulesForLessonManagementListFormFilterAdvanced", () => {
    it("should validate correctly empty form filter data", () => {
        const filterFormData: FormFilterLessonManagementValues = {
            lessonStatus: [],
            fromDate: null,
            toDate: null,
            dayOfWeek: [],
            startTime: null,
            endTime: null,
            teachers: [],
            centers: [],
            students: [],
            grades: [],
            courses: [],
            classOfCourses: [],
        };

        const { current } = mockHookValidate(filterFormData);

        expect(current.startTime.validate(filterFormData.startTime as Date)).toBeUndefined();
        expect(current.endTime.validate(filterFormData.endTime as Date)).toBeUndefined();
    });

    it("should validate correctly valid form filter data", () => {
        const filterFormData: FormFilterLessonManagementValues = {
            lessonStatus: [],
            fromDate: null,
            toDate: null,
            dayOfWeek: [],
            startTime: pastTime,
            endTime: futureTime,
            teachers: [],
            centers: [],
            students: [],
            grades: [],
            courses: [],
            classOfCourses: [],
        };

        const { current } = mockHookValidate(filterFormData);

        expect(current.startTime.validate(filterFormData.startTime as Date)).toBeUndefined();
        expect(current.endTime.validate(filterFormData.endTime as Date)).toBeUndefined();
    });

    it("should validate correctly invalid form filter data", () => {
        const filterFormData: FormFilterLessonManagementValues = {
            lessonStatus: [],
            fromDate: null,
            toDate: null,
            dayOfWeek: [],
            startTime: futureTime,
            endTime: pastTime,
            teachers: [],
            centers: [],
            students: [],
            grades: [],
            courses: [],
            classOfCourses: [],
        };

        const { current } = mockHookValidate(filterFormData);

        expect(current.startTime.validate(filterFormData.startTime as Date)).toEqual(
            "resources.input.error.timeMustComeBefore"
        );
        expect(current.endTime.validate(filterFormData.endTime as Date)).toEqual(
            "resources.input.error.timeMustComeBefore"
        );
    });
});
