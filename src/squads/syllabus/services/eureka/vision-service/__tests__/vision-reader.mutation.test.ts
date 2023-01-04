import {
    createFakeProtoResponse,
    createMockClass,
} from "src/squads/syllabus/test-utils/service/mutation";

import { VisionReaderServicePromiseClient } from "manabuf/eureka/v1/vision_reader_grpc_web_pb";
import { DetectTextFromImageResponse } from "manabuf/eureka/v1/vision_reader_pb";

import visionReaderService from "../vision-reader.mutation";
import { createDetectTextFromImageRequest } from "../vision-reader.mutation.request";
import { createMockDataDetectTextFromImage } from "./data";

describe(visionReaderService.detectTextFromImage, () => {
    const payload = createMockDataDetectTextFromImage();
    const response: DetectTextFromImageResponse.AsObject = {
        text: "DetectTextFromImageResponse",
    };

    beforeEach(() => {
        createMockClass<VisionReaderServicePromiseClient>(VisionReaderServicePromiseClient, {
            detectTextFromImage: () => createFakeProtoResponse(response),
        });
    });

    it("should return correct data after success (object of response)", async () => {
        const expectedResult = await visionReaderService.detectTextFromImage(payload);

        expect(VisionReaderServicePromiseClient.prototype.detectTextFromImage).toBeCalledWith(
            createDetectTextFromImageRequest(payload)
        );
        expect(expectedResult).toEqual(response);
    });
});
