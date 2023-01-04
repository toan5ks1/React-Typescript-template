import { FieldPath, UseFormClearErrors, UseFormReturn } from "react-hook-form";

import { useFormContext } from "src/components/Forms/HookForm";

import { renderHook } from "@testing-library/react-hooks";
import useValidateRulesForLessonManagementListFormFilterAdvancedV2, {
    FormFilterLessonManagementValuesV2,
} from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForLessonManagementListFormFilterAdvancedV2/useValidateRulesForLessonManagementListFormFilterAdvancedV2";

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

const mockHookValidate = (filterFormData: FormFilterLessonManagementValuesV2) => {
    (useFormContext as jest.Mock).mockImplementation(() => {
        return {
            getValues: (fields: FieldPath<FormFilterLessonManagementValuesV2>) => {
                return filterFormData[fields];
            },
            clearErrors: jest.fn() as UseFormClearErrors<FormFilterLessonManagementValuesV2>,
        } as UseFormReturn<FormFilterLessonManagementValuesV2>;
    });

    const { result } = renderHook(() =>
        useValidateRulesForLessonManagementListFormFilterAdvancedV2(mockResourceTranslate)
    );
    return result;
};

describe("useValidateRulesForLessonManagementListFormFilterAdvancedV2", () => {
    it("should validate correctly empty form filter data", () => {
        const filterFormData: FormFilterLessonManagementValuesV2 = {
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

        expect(current.startTime.validate(filterFormData.startTime)).toBeUndefined();
        expect(current.endTime.validate(filterFormData.endTime)).toBeUndefined();
    });

    it("should validate correctly valid form filter data", () => {
        const filterFormData: FormFilterLessonManagementValuesV2 = {
            lessonStatus: [],
            fromDate: null,
            toDate: null,
            dayOfWeek: [],
            startTime: {
                label: "",
                value: pastTime,
            },
            endTime: {
                label: "",
                value: futureTime,
            },
            teachers: [],
            centers: [],
            students: [],
            grades: [],
            courses: [],
            classOfCourses: [],
        };

        const { current } = mockHookValidate(filterFormData);

        expect(current.startTime.validate(filterFormData.startTime)).toBeUndefined();
        expect(current.endTime.validate(filterFormData.endTime)).toBeUndefined();
    });

    it("should validate correctly invalid form filter data", () => {
        const filterFormData: FormFilterLessonManagementValuesV2 = {
            lessonStatus: [],
            fromDate: null,
            toDate: null,
            dayOfWeek: [],
            startTime: {
                label: "",
                value: futureTime,
            },
            endTime: {
                label: "",
                value: pastTime,
            },
            teachers: [],
            centers: [],
            students: [],
            grades: [],
            courses: [],
            classOfCourses: [],
        };

        const { current } = mockHookValidate(filterFormData);

        expect(current.startTime.validate(filterFormData.startTime)).toEqual(
            "resources.input.error.timeMustComeBefore"
        );
        expect(current.endTime.validate(filterFormData.endTime)).toEqual(
            "resources.input.error.timeMustComeBefore"
        );
    });
});
