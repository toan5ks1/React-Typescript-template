import { paramsInvalidError } from "src/squads/syllabus/internals/errors";

import { DetectTextFromImageRequest } from "manabuf/eureka/v1/vision_reader_pb";

import { NsSyllabus_VisionService } from "./types";

export const validateDetectTextFromImage = (data: NsSyllabus_VisionService.DetectTextFromImage) => {
    const shouldThrowErr = !data.src || !data.lang;

    if (shouldThrowErr) throw paramsInvalidError;
};

export const createDetectTextFromImageRequest = (
    data: NsSyllabus_VisionService.DetectTextFromImage
): DetectTextFromImageRequest => {
    const request = new DetectTextFromImageRequest();

    request.setSrc(data.src);
    request.setLang(data.lang);

    return request;
};
