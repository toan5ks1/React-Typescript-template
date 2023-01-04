import { KeyMediaTypesV1 } from "src/common/constants/const";
import appConfigs from "src/internals/configuration";

import { ClassModifierServicePromiseClient } from "manabuf/bob/v1/classes_grpc_web_pb";

import classModifierServiceBob from "../class-modifier-bob";
import { newConvertMediaReq } from "../class-modifier-bob.request";
import { NsBobModifierClassService } from "../types";

jest.mock("manabuf/bob/v1/classes_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/classes_grpc_web_pb");

    actual.ClassModifierServicePromiseClient.prototype.convertMedia = jest.fn();

    return actual;
});

jest.mock("src/internals/configuration/configuration", () =>
    jest.requireActual("src/internals/configuration/__mocks__/configuration")
);

describe("classModifierServiceBob", () => {
    const sampleData: NsBobModifierClassService.ConvertMedia = {
        mediaList: [
            {
                media_id: "mediaId",
                name: "name",
                resource: "resource",
                type: KeyMediaTypesV1.MEDIA_TYPE_PDF,
            },
        ],
    };

    beforeEach(() => {
        (appConfigs.getEndpoints as jest.Mock).mockReturnValue(() => ({ gRPC: "gRPC" }));
    });

    it("should return correct result", async () => {
        const result = await classModifierServiceBob.convertMedia({ data: sampleData });

        expect(result).toEqual({
            data: {
                id: null,
            },
        });

        expect(ClassModifierServicePromiseClient.prototype.convertMedia).toHaveBeenCalledWith(
            newConvertMediaReq(sampleData)
        );
    });
});
