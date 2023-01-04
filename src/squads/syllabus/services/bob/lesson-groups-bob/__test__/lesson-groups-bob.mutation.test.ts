import { NsBobModifierClassService } from "src/squads/syllabus/services/bob/lesson-groups-bob/types";

import { ClassModifierServicePromiseClient } from "manabuf/bob/v1/classes_grpc_web_pb";

import lessonGroupsServiceBob, {
    newConvertMediaReq,
} from "src/squads/syllabus/services/bob/lesson-groups-bob/lesson-groups-bob.mutation";

jest.mock("manabuf/bob/v1/classes_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/classes_grpc_web_pb");

    actual.ClassModifierServicePromiseClient.prototype.convertMedia = jest.fn();
    return actual;
});

describe("lesson-groups-bob.mutation", () => {
    it("should convertMedia with correct payload", async () => {
        (ClassModifierServicePromiseClient.prototype.convertMedia as jest.Mock).mockReturnValue({});

        const _callSpy = jest.spyOn(lessonGroupsServiceBob, "_call");

        const payload: NsBobModifierClassService.ConvertMedia = {
            mediaList: [
                {
                    id: "1",
                    media_id: "mediaId",
                    name: "mediaName",
                    resource: "src/path",
                    type: "MEDIA_TYPE_IMAGE",
                },
            ],
        };

        await lessonGroupsServiceBob.convertMedia(payload);

        expect(_callSpy).toBeCalled();

        if (!payload) throw Error("convertMedia error: Invalid payload");

        expect(ClassModifierServicePromiseClient.prototype.convertMedia).toBeCalledWith(
            newConvertMediaReq(payload)
        );
    });
});
