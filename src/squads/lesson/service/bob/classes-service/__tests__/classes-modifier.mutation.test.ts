import { ClassModifierServicePromiseClient } from "manabuf/bob/v1/classes_grpc_web_pb";

import classModifierServiceBob, {
    newConvertMediaReq,
} from "src/squads/lesson/service/bob/classes-service/classes-modifier.mutation";

jest.mock("manabuf/bob/v1/classes_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/classes_grpc_web_pb");

    actual.ClassModifierServicePromiseClient.prototype.convertMedia = jest.fn();
    return actual;
});

describe("classes-modifier.mutation", () => {
    it("should convertMedia with correct payload", async () => {
        (ClassModifierServicePromiseClient.prototype.convertMedia as jest.Mock).mockReturnValue({});

        const _callSpy = jest.spyOn(classModifierServiceBob, "_call");

        const payload: Parameters<typeof classModifierServiceBob["convertMedia"]>[0] = {
            data: { mediaList: [{ resource: "src/path", type: "MEDIA_TYPE_IMAGE" }] },
        };

        await classModifierServiceBob.convertMedia(payload);

        expect(_callSpy).toBeCalled();

        if (!payload.data) throw Error("convertMedia error: Invalid payload");

        expect(ClassModifierServicePromiseClient.prototype.convertMedia).toBeCalledWith(
            newConvertMediaReq(payload.data)
        );
    });
});
