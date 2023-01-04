import { getQueryFields } from "src/squads/lesson/test-utils/graphql";

import coursesQueriesBob from "src/squads/lesson/service/bob/courses-service/courses-bob.query";

describe("courses-bob.query", () => {
    it("getMany query should return the correct properties", async () => {
        const _callSpy = jest.spyOn(coursesQueriesBob, "_call");
        await coursesQueriesBob.getMany({ course_id: "course_id" });

        const [payload] = _callSpy.mock.calls[0];

        const { operation } = getQueryFields(payload.query);
        expect(operation?.definitionNode.name?.value).toEqual("CoursesMany");

        const queryString = operation?.values;
        expect(queryString).toMatchObject([{ courses: ["CourseAttrs"] }]);
    });

    it("getManyReference query should return the correct properties", async () => {
        const _callSpy = jest.spyOn(coursesQueriesBob, "_call");
        await coursesQueriesBob.getManyReference({ limit: 5, name: "course_name", offset: 1 });

        const [payload] = _callSpy.mock.calls[0];

        const { operation } = getQueryFields(payload.query);
        expect(operation?.definitionNode.name?.value).toEqual("CoursesManyReference");

        const queryString = operation?.values;
        expect(queryString).toMatchObject([
            { courses: ["CourseAttrs"] },
            { courses_aggregate: [{ aggregate: ["count"] }] },
        ]);
    });
});
