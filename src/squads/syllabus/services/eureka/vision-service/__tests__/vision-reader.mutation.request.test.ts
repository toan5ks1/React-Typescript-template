import { paramsInvalidError } from "src/squads/syllabus/internals/errors";
import { TestCaseValidateRequest } from "src/squads/syllabus/test-utils/service/validate";

import { NsSyllabus_VisionService } from "../types";
import {
    createDetectTextFromImageRequest,
    validateDetectTextFromImage,
} from "../vision-reader.mutation.request";
import { createMockDataDetectTextFromImage } from "./data";

describe(createDetectTextFromImageRequest.name, () => {
    it("should create request with src and lang", () => {
        const payload = createMockDataDetectTextFromImage();

        const request = createDetectTextFromImageRequest(payload);
        expect(request.toObject()).toEqual(payload);
    });
});

describe(validateDetectTextFromImage.name, () => {
    const invalidTestCases: TestCaseValidateRequest<
        NsSyllabus_VisionService.DetectTextFromImage,
        false
    >[] = [
        {
            title: "src and lang are empty string",
            input: { src: "", lang: "" },
        },
        {
            title: "src is empty string",
            input: { src: "", lang: "en" },
        },
        {
            title: "lang is empty string",
            input: { src: "base64", lang: "" },
        },
    ];

    test.each(invalidTestCases)("should throw invalid params error when %o", ({ input }) => {
        expect(() =>
            validateDetectTextFromImage(input as NsSyllabus_VisionService.DetectTextFromImage)
        ).toThrowError(paramsInvalidError);
    });
});
