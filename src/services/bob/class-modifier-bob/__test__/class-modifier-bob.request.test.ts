import { formInvalidErr } from "src/internals/errors";

import { MediaType } from "manabuf/bob/v1/enums_pb";

import { KeyMediaTypes } from "../../../../common/constants/const";
import { validateConvertMedia, newConvertMediaReq } from "../class-modifier-bob.request";

describe("validateConvertMedia", () => {
    it("should throw error on missing mediaList", () => {
        expect(() => validateConvertMedia({})).toThrowError(formInvalidErr);
        expect(() => validateConvertMedia({ data: { mediaList: [] } })).toThrowError(
            formInvalidErr
        );

        //success case
        expect(() =>
            validateConvertMedia({
                data: {
                    mediaList: [
                        {
                            media_id: "",
                            name: "string",
                            resource: "resource",
                            type: "MEDIA_TYPE_IMAGE",
                        },
                    ],
                },
            })
        ).not.toThrow(formInvalidErr);
    });
});

describe("newConvertMediaReq", () => {
    const mediaId = "mediaId";
    const name = "name";
    const resource = "resource";

    it("should only add KeyMediaTypes.MEDIA_TYPE_PDF to request", () => {
        const result = newConvertMediaReq({
            mediaList: [
                {
                    media_id: mediaId,
                    name: name,
                    resource: resource,
                    type: "MEDIA_TYPE_VIDEO",
                },
            ],
        }).toObject();

        expect(result).toEqual({ mediaList: [] });
    });

    it("should return correct Request", () => {
        const type = KeyMediaTypes.MEDIA_TYPE_PDF;

        const result = newConvertMediaReq({
            mediaList: [
                {
                    media_id: mediaId,
                    name: name,
                    resource: resource,
                    type: "MEDIA_TYPE_PDF",
                },
            ],
        }).toObject();

        expect(result).toMatchObject({
            mediaList: [
                {
                    mediaId: mediaId,
                    name: name,
                    resource: resource,
                    type: MediaType[type],
                },
            ],
        });
    });

    it("should not set name & media_id when not passed as params", () => {
        const result = newConvertMediaReq({
            mediaList: [
                {
                    resource: resource,
                    type: "MEDIA_TYPE_PDF",
                },
            ],
        }).toObject();

        expect(result).toMatchObject({
            mediaList: [
                {
                    mediaId: "",
                    name: "",
                    resource: resource,
                    type: MediaType["MEDIA_TYPE_PDF"],
                },
            ],
        });
    });
});
