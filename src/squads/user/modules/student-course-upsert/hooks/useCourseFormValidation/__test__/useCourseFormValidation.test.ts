import { inferStandaloneQuery } from "src/squads/user/service/infer-service";
import { createMockStudentCourseUpsert } from "src/squads/user/test-utils/mocks/student";
import { mockDefaultStudentCourse } from "src/squads/user/test-utils/mocks/student-course-package";

import useCourseFormValidation from "../useCourseFormValidation";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferStandaloneQuery: jest.fn(),
}));

const mockCourse = createMockStudentCourseUpsert();

describe("useCourseFormValidation", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    it("should return correct data", () => {
        const { result } = renderHook(() => useCourseFormValidation());

        expect(result.current.validate.required.message).toBe("0");
        expect(result.current.validate.required.value).toBe(true);
        expect(typeof result.current.validate.course).toBe("function");
        expect(typeof result.current.validate.validateStudentCourseLocationEndDate).toBe(
            "function"
        );
        expect(typeof result.current.validateCourse).toBe("function");
    });

    it("validateCourse should work correct", () => {
        const { result } = renderHook(() => useCourseFormValidation());

        expect(result.current.validateCourse(mockCourse.course)).toBeUndefined();
        expect(result.current.validateCourse({ ...mockCourse.course, course_id: "" })).toEqual("0");
    });

    it(`validateStudentCourseLocationEndDate should return "1,2"`, async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            ({ entity }: { entity: "courseAccessPath" | "userAccessPath" }) => {
                return () => {
                    switch (entity) {
                        case "courseAccessPath":
                            return [];
                        case "userAccessPath":
                            return [];
                    }
                };
            }
        );
        const { result } = renderHook(() => useCourseFormValidation());

        const validate = await result.current.validate.validateStudentCourseLocationEndDate(
            tomorrow,
            mockDefaultStudentCourse[0]
        );

        expect(validate).toBe("1,2");
    });

    it(`validateStudentCourseLocationEndDate should return "2"`, async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            ({ entity }: { entity: "courseAccessPath" | "userAccessPath" }) =>
                () => {
                    switch (entity) {
                        case "courseAccessPath":
                            return [];
                        case "userAccessPath":
                            return [
                                {
                                    user_id: "user_id",
                                    location_id: "location_id",
                                },
                            ];
                    }
                }
        );
        const { result } = renderHook(() => useCourseFormValidation());

        const validate = await result.current.validate.validateStudentCourseLocationEndDate(
            tomorrow,
            mockDefaultStudentCourse[0]
        );

        expect(validate).toBe("2");
    });

    it(`validateStudentCourseLocationEndDate should return "1"`, async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            ({ entity }: { entity: "courseAccessPath" | "userAccessPath" }) => {
                return () => {
                    switch (entity) {
                        case "courseAccessPath":
                            return [{ course_id: "course_id", location_id: "course_id" }];
                        case "userAccessPath":
                            return [];
                    }
                };
            }
        );
        const { result } = renderHook(() => useCourseFormValidation());

        const validate = await result.current.validate.validateStudentCourseLocationEndDate(
            tomorrow,
            mockDefaultStudentCourse[0]
        );

        expect(validate).toBe("1");
    });

    it(`validateStudentCourseLocationEndDate should return "undefined"`, async () => {
        (inferStandaloneQuery as jest.Mock).mockImplementation(
            ({ entity }: { entity: "courseAccessPath" | "userAccessPath" }) => {
                return () => {
                    switch (entity) {
                        case "courseAccessPath":
                            return [{ course_id: "course_id", location_id: "course_id" }];
                        case "userAccessPath":
                            return [{ user_id: "user_id", location_id: "location_id" }];
                    }
                };
            }
        );
        const { result } = renderHook(() => useCourseFormValidation());

        const validate = await result.current.validate.validateStudentCourseLocationEndDate(
            tomorrow,
            mockDefaultStudentCourse[0]
        );

        expect(validate).toBeUndefined();
    });

    it(`validateStudentCourseLocationEndDate should return "undefined" when end date < today`, async () => {
        const { result } = renderHook(() => useCourseFormValidation());

        const validate = await result.current.validate.validateStudentCourseLocationEndDate(
            new Date(mockDefaultStudentCourse[0].end),
            mockDefaultStudentCourse[0]
        );

        expect(validate).toBeUndefined();
    });
});
