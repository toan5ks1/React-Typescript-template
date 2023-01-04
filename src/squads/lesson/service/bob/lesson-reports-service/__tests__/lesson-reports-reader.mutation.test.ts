import { GetPartnerDomainRequestQuery } from "src/squads/lesson/common/types";

import { LessonReportReaderServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";
import { DomainType } from "manabuf/bob/v1/lessons_pb";

import lessonReportsReaderServiceBob, {
    newRetrievePartnerDomainReq,
} from "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-reader.mutation";

jest.mock("manabuf/bob/v1/lessons_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/lessons_grpc_web_pb");

    actual.LessonReportReaderServicePromiseClient.prototype.retrievePartnerDomain = jest.fn();

    return actual;
});

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

describe("lesson-reports-reader.mutation", () => {
    it("should retrieve partner domain with correct parameters", async () => {
        const retrievePartnerDomainParams: GetPartnerDomainRequestQuery = {
            type: DomainType.DOMAIN_TYPE_TEACHER,
        };

        (
            LessonReportReaderServicePromiseClient.prototype.retrievePartnerDomain as jest.Mock
        ).mockReturnValue(fakeReturn);

        const _callSpy = jest.spyOn(lessonReportsReaderServiceBob, "_call");
        await lessonReportsReaderServiceBob.retrievePartnerDomain(retrievePartnerDomainParams);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            LessonReportReaderServicePromiseClient.prototype.retrievePartnerDomain
        ).toBeCalledWith(newRetrievePartnerDomainReq(retrievePartnerDomainParams));
    });
});
