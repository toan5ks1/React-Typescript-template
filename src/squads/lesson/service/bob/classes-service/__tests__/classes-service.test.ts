import { classesService } from "src/squads/lesson/service/bob/classes-service/classes-service";
import { NsLesson_Bob_ClassesService } from "src/squads/lesson/service/bob/classes-service/types";
import { MutationParams } from "src/squads/lesson/service/service-types";

import classModifierServiceBob from "src/squads/lesson/service/bob/classes-service/classes-modifier.mutation";

jest.mock("src/squads/lesson/service/bob/classes-service/classes-modifier.mutation", () => {
    return {
        __esModule: true,
        default: {
            convertMedia: jest.fn(),
        },
    };
});

describe("class-service mutation", () => {
    const fakeConvertMediaReturn = { data: { id: null } };

    beforeEach(() => {
        (classModifierServiceBob.convertMedia as jest.Mock).mockResolvedValue(
            fakeConvertMediaReturn
        );
    });
    it("should call convert media successfully", async () => {
        const mutationVariable: MutationParams<NsLesson_Bob_ClassesService.ConvertMedia> = {
            data: { mediaList: [{ resource: "src/link", type: "MEDIA_TYPE_PDF" }] },
        };

        const response = await classesService.mutation.classesConvertMedia(mutationVariable);

        expect(classModifierServiceBob.convertMedia).toBeCalledWith(mutationVariable);
        expect(response).toEqual(fakeConvertMediaReturn);
    });

    it("should not convertMedia with invalid payload", async () => {
        const mutationVariable: MutationParams<NsLesson_Bob_ClassesService.ConvertMedia> = {
            data: { mediaList: [] },
        };

        await expect(async () => {
            await classesService.mutation.classesConvertMedia(mutationVariable);
        }).rejects.toMatchObject({
            action: "classesConvertMedia",
            name: "InvalidParamError",
            errors: [{ field: "mediaList" }],
            serviceName: "bobGraphQL",
        });

        expect(classModifierServiceBob.convertMedia).not.toBeCalled();
    });
});
