import { formInvalidErr } from "src/internals/errors";

import { NotificationReaderServicePromiseClient } from "manabuf/bob/v1/notifications_grpc_web_pb";
import { GetAnswersByFilterRequest } from "manabuf/bob/v1/notifications_pb";

import questionnaireUserAnswersReaderMutationService, {
    getAnswersByFilterRequest,
} from "../questionnaire-user-answers-reader.mutation";

jest.mock("manabuf/bob/v1/notifications_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/notifications_grpc_web_pb");

    actual.NotificationReaderServicePromiseClient.prototype.getAnswersByFilter = jest.fn();

    return actual;
});

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

describe("getAnswersByFilter get answers by filter", () => {
    it("should get answer by filter successful", async () => {
        (
            NotificationReaderServicePromiseClient.prototype.getAnswersByFilter as jest.Mock
        ).mockImplementation(() => fakeReturn);

        const getAnswersByFilterParams: GetAnswersByFilterRequest.AsObject = {
            keyword: "keyword",
            questionnaireId: "questionnaire_id_1",
            paging: {
                limit: 10,
                offsetInteger: 0,
                offsetString: "0",
            },
        };

        await questionnaireUserAnswersReaderMutationService.getAnswersByFilter(
            getAnswersByFilterParams
        );

        expect(NotificationReaderServicePromiseClient.prototype.getAnswersByFilter).toBeCalledWith(
            getAnswersByFilterRequest(getAnswersByFilterParams)
        );
    });

    it("should throw error when don't have paging params", async () => {
        (
            NotificationReaderServicePromiseClient.prototype.getAnswersByFilter as jest.Mock
        ).mockImplementation(() => fakeReturn);

        const getAnswersByFilterParams: GetAnswersByFilterRequest.AsObject = {
            keyword: "keyword",
            questionnaireId: "questionnaire_id_1",
        };

        await expect(
            questionnaireUserAnswersReaderMutationService.getAnswersByFilter(
                getAnswersByFilterParams
            )
        ).rejects.toThrow(formInvalidErr);
    });
});
