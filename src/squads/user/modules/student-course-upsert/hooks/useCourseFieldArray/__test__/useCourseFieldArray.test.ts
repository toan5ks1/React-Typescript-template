import { createMockStudentCourseUpsert } from "src/squads/user/test-utils/mocks/student";

import useCourseFieldArray from "../useCourseFieldArray";

import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { initializeCourse } from "src/squads/user/common/helpers/initializeFieldArray";

const mockCourse = createMockStudentCourseUpsert();

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: () => ({
            watch: () => [mockCourse],
            control: {},
        }),
        useFieldArray: () => ({
            fields: [mockCourse],
            append: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
        }),
    };
});

describe("useCourseFieldArray", () => {
    it("should work correctly", () => {
        const { result } = renderHook(() => useCourseFieldArray());

        expect(result.current.courses).toEqual([mockCourse]);

        act(() => result.current.onAdd());
        expect(result.current.append).toBeCalledTimes(1);
        expect(result.current.append).toBeCalledWith(initializeCourse());

        act(() => result.current.onDelete([mockCourse]));
        expect(result.current.remove).toBeCalledTimes(1);

        act(() => result.current.update(1, {}));
        expect(result.current.remove).toBeCalledTimes(1);
    });
});
