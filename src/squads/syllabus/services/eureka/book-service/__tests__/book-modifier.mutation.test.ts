import {
    createFakeProtoResponse,
    createMockClass,
} from "src/squads/syllabus/test-utils/service/mutation";

import { BookModifierServicePromiseClient } from "manabuf/eureka/v1/book_modifier_grpc_web_pb";

import bookModifierService, { createUpsertBookRequest } from "../book-modifier.mutation";
import { createMockDataUpsertBook } from "./data";

jest.mock("src/internals/feature-controller", () => ({
    // FIXME: DDD LT-12785
    __esModule: true,
    featureControllerUnleash: { isFeatureEnabled: jest.fn() },
}));

describe(bookModifierService.upsertBook, () => {
    const payload = createMockDataUpsertBook();
    const response = "response_upsertBooks";

    beforeEach(() => {
        createMockClass<BookModifierServicePromiseClient>(BookModifierServicePromiseClient, {
            upsertBooks: () => createFakeProtoResponse(response),
        });
    });

    it("should return correct data after success (object of response)", async () => {
        const resp = await bookModifierService.upsertBook(payload);

        expect(resp).toEqual(response);
    });

    it("should call endpoint with correct payload", async () => {
        await bookModifierService.upsertBook(payload);

        expect(BookModifierServicePromiseClient.prototype.upsertBooks).toBeCalledWith(
            createUpsertBookRequest(payload)
        );
    });
});
