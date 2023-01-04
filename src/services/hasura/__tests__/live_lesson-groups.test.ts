import { ProviderTypes } from "src/common/constants/enum";
import { lessonGroupQueriesBob } from "src/services/bob/live-lesson-groups-service-bob";
import { AppPagination, ListQuery } from "src/services/service-types";
import { getQueryFields } from "src/test-utils/graphql";
import { RaSort } from "src/typings/react-admin";

import lessonGroups from "../lesson-groups";

describe("lesson-groups-query", () => {
    it("should get list return same query string", async () => {
        const payload: ListQuery<
            Parameters<typeof lessonGroupQueriesBob.getList>[0],
            RaSort | RaSort[],
            AppPagination
        > = {
            filter: {
                course_id: "course_id_1",
                limit: 10,
                offset: 0,
            },
            pagination: {
                page: 0,
                perPage: 10,
            },
        };
        const gqlQuery = await lessonGroups({
            type: ProviderTypes.LIST,
            payload,
        })["query"];

        const { operation } = getQueryFields(gqlQuery);

        expect(operation?.definitionNode.name?.value).toEqual("LessonGroupsList");

        const queryStringFormat = [
            { lesson_groups: ["LessonGroupAttrs"] },
            { lesson_groups_aggregate: [{}] },
        ];

        expect(operation?.values).toMatchObject(queryStringFormat);
    });
});
