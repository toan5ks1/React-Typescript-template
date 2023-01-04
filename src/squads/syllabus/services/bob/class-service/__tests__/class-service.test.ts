import { Lesson_ClassAssociationByClassIdQuery } from "src/squads/syllabus/services/bob/bob-types";
import { classService } from "src/squads/syllabus/services/bob/class-service/class-service";
import { generateMockClassList } from "src/squads/syllabus/test-utils/class";

import classQueriesBob from "src/squads/syllabus/services/bob/class-service/class-bob.query";

jest.mock("src/squads/syllabus/services/bob/class-service/class-bob.query");

describe(classService.query.classGetListByCourseId.name, () => {
    it("should receive data from hasura response", async () => {
        const fakeResponseData = { data: generateMockClassList() };

        (classQueriesBob.getListByCourseId as jest.Mock).mockResolvedValue(fakeResponseData);

        const response = await classService.query.classGetListByCourseId({
            course_id: "course_id",
            limit: 5,
            offset: 0,
        });

        expect(classQueriesBob.getListByCourseId).toBeCalled();
        expect(response).toEqual(fakeResponseData);
    });

    it("should NOT query with invalid parameter", async () => {
        (classQueriesBob.getListByCourseId as jest.Mock).mockResolvedValue({});

        await expect(async () => {
            await classService.query.classGetListByCourseId({
                course_id: "",
                limit: 5,
                offset: 0,
            });
        }).rejects.toMatchObject({
            action: "classGetListByCourseId",
            name: "InvalidParamError",
            errors: [{ field: "course_id" }],
            serviceName: "bobGraphQL",
        });

        expect(classQueriesBob.getListByCourseId).not.toBeCalled();
    });
});

describe(classService.query.classGetClassAssociationByCourseId.name, () => {
    it("should receive data from hasura response", async () => {
        const fakeResponseData: { data: Lesson_ClassAssociationByClassIdQuery } = {
            data: {
                class_member_aggregate: { aggregate: { count: 1 } },
                lessons_aggregate: { aggregate: { count: 1 } },
            },
        };

        (classQueriesBob.getClassAssociationByCourseId as jest.Mock).mockResolvedValue(
            fakeResponseData
        );

        const response = await classService.query.classGetClassAssociationByCourseId({
            class_id: "class_id",
        });

        expect(classQueriesBob.getClassAssociationByCourseId).toBeCalled();
        expect(response).toEqual(fakeResponseData);
    });

    it("should NOT query with invalid parameter", async () => {
        (classQueriesBob.getClassAssociationByCourseId as jest.Mock).mockResolvedValue({});

        await expect(async () => {
            await classService.query.classGetClassAssociationByCourseId({
                class_id: "",
            });
        }).rejects.toMatchObject({
            action: "classGetClassAssociationByCourseId",
            name: "InvalidParamError",
            errors: [{ field: "class_id" }],
            serviceName: "bobGraphQL",
        });

        expect(classQueriesBob.getListByCourseId).not.toBeCalled();
    });
});
