import { ArrayElement } from "src/common/constants/types";
import {
    LessonGroupByIdQuery,
    LessonGroupByIdQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { lessonGroupsService } from "src/squads/lesson/service/bob/lesson-groups-service/lesson-groups-service";

import lessonGroupsQueriesBob from "src/squads/lesson/service/bob/lesson-groups-service/lesson-groups-bob.query";

jest.mock("src/squads/lesson/service/bob/lesson-groups-service/lesson-groups-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getOne: jest.fn(),
        },
    };
});

describe("lesson-groups-service", () => {
    const lessonGroupOneQueryReturn: ArrayElement<LessonGroupByIdQuery["lesson_groups"]> = {
        lesson_group_id: "Lesson_Group_Id",
        media_ids: ["Media_Id"],
    };

    beforeEach(() => {
        (lessonGroupsQueriesBob.getOne as jest.Mock).mockResolvedValue(lessonGroupOneQueryReturn);
    });

    it("should call getOne with correct parameters", async () => {
        const queryVariable: LessonGroupByIdQueryVariables = {
            lesson_group_id: "Lesson_Group_Id",
        };

        const response = await lessonGroupsService.query.lessonGroupsGetOne(queryVariable);

        expect(lessonGroupsQueriesBob.getOne).toBeCalledWith(queryVariable);
        expect(response).toEqual(lessonGroupOneQueryReturn);
    });

    it("should not call getOne with invalid parameters", async () => {
        const invalidQueryVariable: LessonGroupByIdQueryVariables = {
            lesson_group_id: "",
        };

        await expect(async () => {
            await lessonGroupsService.query.lessonGroupsGetOne(invalidQueryVariable);
        }).rejects.toMatchObject({
            name: "InvalidParamError",
            action: "lessonGroupsGetOne",
            serviceName: "bobGraphQL",
            errors: [{ field: "lesson_group_id" }],
        });

        expect(lessonGroupsQueriesBob.getOne).not.toBeCalled();
    });
});
