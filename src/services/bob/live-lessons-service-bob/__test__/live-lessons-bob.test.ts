import { LessonReaderServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";
import { RetrieveLessonsRequest, RetrieveLessonsResponse } from "manabuf/bob/v1/lessons_pb";

import lessonServiceBob from "../live-lessons-bob.mutation";
import { newRetrieveLessonReq } from "../live-lessons-bob.request";

jest.mock("manabuf/bob/v1/lessons_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/lessons_grpc_web_pb");

    actual.LessonReaderServicePromiseClient.prototype.retrieveLessons = jest.fn();
    return actual;
});

describe("live-lessons-service-bob unit test", () => {
    const retrieveLessonParams: RetrieveLessonsRequest.AsObject = {
        keyword: "test_keyword",
        filter: {
            courseIdsList: [],
            lessonStatusList: [],
        },
        paging: {
            limit: 10,
            offsetInteger: 0,
            offsetString: "0",
        },
    };

    const fakeLessonReturn = {
        toObject: () => {
            const returnValue: RetrieveLessonsResponse.AsObject = {
                itemsList: [],
                totalLesson: 0,
            };
            return returnValue;
        },
    };

    beforeEach(() => {
        (
            LessonReaderServicePromiseClient.prototype.retrieveLessons as jest.Mock
        ).mockImplementation(() => {
            return fakeLessonReturn;
        });
    });

    it("retrieve lesson", async () => {
        await lessonServiceBob.retrieveLesson(retrieveLessonParams);

        expect(LessonReaderServicePromiseClient.prototype.retrieveLessons).toBeCalledWith(
            newRetrieveLessonReq(retrieveLessonParams)
        );
    });

    it("retrieve lesson with time filter", async () => {
        const startTime = "2021-07-07T09:00:00.000Z";
        const endTime = "2021-08-08T09:00:00.000Z";
        const retrieveLessonParamsWithTime: RetrieveLessonsRequest.AsObject = {
            ...retrieveLessonParams,
            filter: {
                courseIdsList: [],
                lessonStatusList: [],
                startTime,
                endTime,
            },
        };
        await lessonServiceBob.retrieveLesson(retrieveLessonParamsWithTime);

        expect(LessonReaderServicePromiseClient.prototype.retrieveLessons).toBeCalledWith(
            newRetrieveLessonReq(retrieveLessonParamsWithTime)
        );
    });
});
