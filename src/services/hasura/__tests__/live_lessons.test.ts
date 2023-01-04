import { ProviderTypes } from "src/common/constants/enum";
import { getQueryFields } from "src/test-utils/graphql";

import liveLessonService from "../live-lessons";

const isTextIncludeMultipleValue = (text: string, arrayString: string[]): boolean => {
    let isIncluded = true;

    arrayString.forEach((str) => {
        if (!text.includes(str)) {
            isIncluded = false;
            return;
        }
    });

    return isIncluded;
};

describe("live lesson GET_ONE", () => {
    it("handle lesson query", async () => {
        const gqlQuery = await liveLessonService({
            type: ProviderTypes.ONE,
            payload: {
                filter: {
                    lesson_id: "test_id",
                },
            },
        })["query"];

        const { operation } = getQueryFields(gqlQuery);

        expect(operation?.definitionNode.name?.value).toEqual("LessonByLessonId");

        const queryString = JSON.stringify(operation?.values[0]);
        const queryFields = [
            "lesson_id",
            "lessons_courses",
            "status",
            "end_time",
            "start_time",
            "name",
            "lessons_teachers",
            "lesson_members",
            "lesson_group_id",
        ];

        expect(isTextIncludeMultipleValue(queryString, queryFields)).toBe(true);
    });
});
