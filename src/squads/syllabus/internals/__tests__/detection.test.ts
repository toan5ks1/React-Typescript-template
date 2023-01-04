import { Features } from "src/common/constants/enum";
import featureControllerUnleash from "src/internals/feature-controller";

import { DetectTextFromImageResponse } from "manabuf/eureka/v1/vision_reader_pb";

import { getDetection } from "../detection";

import { createMockDataDetectTextFromImage } from "src/squads/syllabus/services/eureka/vision-service/__tests__/data";
import visionReaderMutation from "src/squads/syllabus/services/eureka/vision-service/vision-reader.mutation";

jest.mock("src/squads/syllabus/services/eureka/vision-service/vision-reader.mutation", () => ({
    __esModule: true,
    default: {
        detectTextFromImage: jest.fn(),
    },
}));

jest.mock("src/internals/feature-controller", () => ({
    __esModule: true,
    default: { isFeatureEnabled: jest.fn() },
}));

describe(getDetection.name, () => {
    const { src, lang } = createMockDataDetectTextFromImage();
    it(`should call OCR endpoints when ${Features.SYLLABUS_QUIZ_USE_OCR_ENDPOINTS} is enabled`, async () => {
        const mockResponse: DetectTextFromImageResponse.AsObject = {
            text: "DetectTextFromImageResponse",
        };

        (featureControllerUnleash.isFeatureEnabled as jest.Mock).mockReturnValue(true);
        (visionReaderMutation.detectTextFromImage as jest.Mock).mockResolvedValue(mockResponse);

        const detection = getDetection();
        const detectText: DetectTextFromImageResponse.AsObject = await detection.detectText(
            src,
            lang
        );

        expect(detectText).toEqual(mockResponse.text);
        expect(visionReaderMutation.detectTextFromImage).toBeCalledWith({
            lang,
            src,
        });
    });
});
