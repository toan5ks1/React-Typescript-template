import { NsSyllabus_VisionService } from "src/squads/syllabus/services/eureka/vision-service";
import { CreateMockDataTest } from "src/squads/syllabus/test-utils/types";

export const createMockDataDetectTextFromImage: CreateMockDataTest<NsSyllabus_VisionService.DetectTextFromImage> =
    (override = {}) => {
        return {
            src: "base64",
            lang: "en",
            ...override,
        };
    };
