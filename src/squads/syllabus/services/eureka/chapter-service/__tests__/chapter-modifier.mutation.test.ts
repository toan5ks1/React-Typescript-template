import {
    createFakeProtoResponse,
    createMockClass,
} from "src/squads/syllabus/test-utils/service/mutation";

import { ChapterModifierServicePromiseClient } from "manabuf/eureka/v1/chapter_modifier_grpc_web_pb";

import chapterModifierService from "../chapter-modifier.mutation";
import {
    createUpsertChaptersRequest,
    createDeleteChaptersRequest,
} from "../chapter-modifier.request";
import { createMockDataChapterUpsert, createMockDataDeleteChapters } from "./data";

jest.mock("src/internals/feature-controller", () => ({
    // FIXME: DDD LT-12785
    __esModule: true,
    featureControllerUnleash: { isFeatureEnabled: jest.fn() },
}));

describe(chapterModifierService.upsertChapters, () => {
    const payload = createMockDataChapterUpsert();
    const response = "UpsertChaptersResponse";

    beforeEach(() => {
        createMockClass<ChapterModifierServicePromiseClient>(ChapterModifierServicePromiseClient, {
            upsertChapters: () => createFakeProtoResponse(response),
        });
    });

    it("should return correct data after successfully (object of response)", async () => {
        const resp = await chapterModifierService.upsertChapters(payload);

        expect(resp).toEqual(response);
    });

    it("should call endpoint with correct payload", async () => {
        await chapterModifierService.upsertChapters(payload);

        expect(ChapterModifierServicePromiseClient.prototype.upsertChapters).toBeCalledWith(
            createUpsertChaptersRequest(payload)
        );
    });
});

describe(chapterModifierService.deleteChapters, () => {
    const payload = createMockDataDeleteChapters();
    const response = "response_deleteChapter";

    beforeEach(() => {
        createMockClass<ChapterModifierServicePromiseClient>(ChapterModifierServicePromiseClient, {
            deleteChapters: () => createFakeProtoResponse(response),
        });
    });

    it("should return correct data after successfully (object of response)", async () => {
        const resp = await chapterModifierService.deleteChapters(payload);

        expect(resp).toEqual(response);
    });

    it("should call endpoint with correct payload", async () => {
        await chapterModifierService.deleteChapters(payload);

        expect(ChapterModifierServicePromiseClient.prototype.deleteChapters).toBeCalledWith(
            createDeleteChaptersRequest(payload)
        );
    });
});
