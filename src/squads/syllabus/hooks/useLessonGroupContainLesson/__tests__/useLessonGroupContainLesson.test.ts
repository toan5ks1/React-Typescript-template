import { UseQueryBaseOptions } from "src/squads/syllabus/hooks/data/data-types";
import {
    LessonsByCourseIdQuery,
    LessonsByCourseIdQueryVariables,
    Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery,
} from "src/squads/syllabus/services/bob/bob-types";
import { inferQuery, inferQueryPagination } from "src/squads/syllabus/services/infer-query";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";

import useLessonGroupContainLesson from "../useLessonGroupContainLesson";

import { renderHook } from "@testing-library/react-hooks";

const lessonMockData: LessonsByCourseIdQuery["lessons"] = [
    {
        lesson_group_id: "lesson_group_id_1",
        name: "lesson_name_1",
    },
];

const lessonGroupMockData: Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery["lesson_groups"] =
    [{ lesson_group_id: "lesson_group_id_1", media_ids: ["media_id_1", "media_id_2"] }];

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
    inferQueryPagination: jest.fn(),
}));

describe("useLessonGroupContainLesson", () => {
    it("should return correct value", () => {
        let runSelector = false;
        (inferQuery as jest.Mock).mockImplementation(
            (__: { entity: "lessonsSyllabus"; action: "lessonSyllabusGetMany" }) =>
                (
                    _params: LessonsByCourseIdQueryVariables,
                    options: UseQueryBaseOptions<
                        LessonsByCourseIdQuery["lessons"] | null | undefined
                    >
                ) => {
                    if (!runSelector) {
                        runSelector = true;
                        options?.selector?.(lessonMockData);
                    }

                    return lessonMockData.map((lesson) => lesson.lesson_group_id);
                }
        );

        (inferQueryPagination as jest.Mock).mockImplementation(
            (__: { entity: "lessonGroups"; action: "lessonGroupGetListWithFilter" }) => () => ({
                result: {
                    data: lessonGroupMockData,
                    loading: false,
                },
                pagination: createFakePagination(),
            })
        );

        const { result } = renderHook(() => useLessonGroupContainLesson("course_id"));

        const expectLessonGroupReturn = lessonGroupMockData;
        expect(inferQuery).toBeCalled();
        expect(inferQueryPagination).toBeCalled();
        expect(result.current.lessonGroupListQuery).toEqual(expectLessonGroupReturn);
    });
});
