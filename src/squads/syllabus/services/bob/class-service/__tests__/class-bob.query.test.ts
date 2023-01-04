import { HasuraAndDefaultResponse } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    Lesson_ClassAssociationByClassIdQuery,
    Lesson_ClassAssociationByClassIdQueryVariables,
    Lesson_ClassListByCourseIdV3Query,
    Lesson_ClassListByCourseIdV3QueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { DataWithTotal } from "src/squads/syllabus/services/service-creator";
import { generateMockClassList } from "src/squads/syllabus/test-utils/class";

import classQueriesBob from "src/squads/syllabus/services/bob/class-service/class-bob.query";

describe("classQueriesBob", () => {
    it(classQueriesBob.getListByCourseId.name, async () => {
        const fakeClassListData = generateMockClassList(5);
        const fakeTotalClass = 10;

        const mockQueryClassList: HasuraAndDefaultResponse<Lesson_ClassListByCourseIdV3Query> = {
            data: {
                class: fakeClassListData,
                class_aggregate: {
                    aggregate: {
                        count: fakeTotalClass,
                    },
                },
            },
        };

        const variables: Lesson_ClassListByCourseIdV3QueryVariables = {
            course_id: "course_id",
            limit: 5,
            offset: 0,
        };
        const _callSpy = jest.spyOn(classQueriesBob, "_call");

        _callSpy.mockResolvedValue(mockQueryClassList);

        const result = await classQueriesBob.getListByCourseId(variables);

        expect(result).toEqual<DataWithTotal<Lesson_ClassListByCourseIdV3Query["class"]>>({
            data: fakeClassListData,
            total: fakeTotalClass,
        });
    });

    it(classQueriesBob.getClassAssociationByCourseId.name, async () => {
        const mockData: Lesson_ClassAssociationByClassIdQuery = {
            class_member_aggregate: { aggregate: { count: 1 } },
            lessons_aggregate: { aggregate: { count: 1 } },
        };

        const mockClassAssociation: HasuraAndDefaultResponse<Lesson_ClassAssociationByClassIdQuery> =
            {
                data: mockData,
            };

        const variables: Lesson_ClassAssociationByClassIdQueryVariables = {
            class_id: "class_id",
        };
        const _callSpy = jest.spyOn(classQueriesBob, "_call");

        _callSpy.mockResolvedValue(mockClassAssociation);

        const result = await classQueriesBob.getClassAssociationByCourseId(variables);

        expect(result).toEqual<Lesson_ClassAssociationByClassIdQuery>(mockData);
    });
});
