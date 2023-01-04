import { AxiosInstance } from "axios";
import Configuration, { ConfigsContainer } from "src/packages/configuration";
import { AppConfigTypes, EnvKeys } from "src/typings/configuration";

import { DetectTextFromImageResponse } from "manabuf/eureka/v1/vision_reader_pb";

import { DetectionV1, DetectionV2, TexReturn } from "../Detection";

import { createMockDataDetectTextFromImage } from "src/squads/syllabus/services/eureka/vision-service/__tests__/data";
import visionReaderMutation from "src/squads/syllabus/services/eureka/vision-service/vision-reader.mutation";

jest.mock("src/squads/syllabus/services/eureka/vision-service/vision-reader.mutation", () => ({
    __esModule: true,
    default: {
        detectTextFromImage: jest.fn(),
    },
}));

export const mockAxiosReturn = (returnData: TexReturn[] | [] | { text: string }) =>
    ({
        post: jest.fn(async () => ({
            data: returnData,
        })),
    } as unknown as AxiosInstance);

export const mockAppConfigsOCR = () => {
    const config = {
        [EnvKeys.DEVELOPMENT]: {
            [AppConfigTypes.ENDPOINT]: {
                OCR: "OCR",
            },
        },
    } as ConfigsContainer;

    const env = Configuration.getDefaultEnv();

    return new Configuration(config, env);
};

const mockDataDetectTextFromImage = createMockDataDetectTextFromImage();

describe("DetectionV1 module", () => {
    const { src, lang } = mockDataDetectTextFromImage;
    const mockAppConfigs = mockAppConfigsOCR();

    it("should call detectTeX returns correct string value with latex type", async () => {
        const mockTexReturn: TexReturn[] = [{ type: "latex", value: "OCR Tex" }];
        const mockHttpClient = mockAxiosReturn(mockTexReturn);
        const detection = new DetectionV1({
            httpClient: mockHttpClient,
            configs: mockAppConfigs,
        });
        const baseURL = mockAppConfigs.getEndpoints().OCR;

        const result = await detection.detectTeX(src);

        expect(mockHttpClient.post).toHaveBeenCalledWith(`${baseURL}/tex-detection`, {
            src,
        });

        expect(result).toEqual(mockTexReturn[0].value);
    });

    it("should call detectTeX returns empty string value without type", async () => {
        const mockHttpClient = mockAxiosReturn([]);
        const detection = new DetectionV1({
            httpClient: mockHttpClient,
            configs: mockAppConfigs,
        });

        const result = await detection.detectTeX(src);

        expect(result).toEqual("");
    });

    it("should call detectTeX returns empty string value with not-latex type", async () => {
        const mockTexReturn: TexReturn[] = [{ type: "not-latex", value: "OCR Tex" }];
        const mockHttpClient = mockAxiosReturn(mockTexReturn);
        const detection = new DetectionV1({
            httpClient: mockHttpClient,
            configs: mockAppConfigs,
        });

        const result = await detection.detectTeX(src);

        expect(result).toEqual("");
    });

    it("should call detectText returns correct string value", async () => {
        const mockTexReturn = { text: "OCR Text" };
        const mockHttpClient = mockAxiosReturn(mockTexReturn);
        const detection = new DetectionV1({
            httpClient: mockHttpClient,
            configs: mockAppConfigs,
        });
        const baseURL = mockAppConfigs.getEndpoints().OCR;

        const result = await detection.detectText(src, lang);

        expect(mockHttpClient.post).toHaveBeenCalledWith(`${baseURL}/text_detection`, {
            src,
            lang,
        });

        expect(result).toEqual(mockTexReturn.text);
    });
});

describe("DetectionV2 module", () => {
    const mockAppConfigs = mockAppConfigsOCR();

    it("should call detectText returns correct string value", async () => {
        const { lang, src } = createMockDataDetectTextFromImage();
        const mockResponse: DetectTextFromImageResponse.AsObject = {
            text: "DetectTextFromImageResponse",
        };

        const mockHttpClient = mockAxiosReturn([]);
        const detection = new DetectionV2({
            httpClient: mockHttpClient,
            configs: mockAppConfigs,
        });

        (visionReaderMutation.detectTextFromImage as jest.Mock).mockResolvedValue(mockResponse);

        const actualResult = await detection.detectText(src, lang);

        expect(actualResult).toEqual(mockResponse.text);

        expect(visionReaderMutation.detectTextFromImage).toBeCalledWith({
            lang,
            src,
        });
    });

    it("should detect Vietnamese by English language", async () => {
        const { lang, src } = createMockDataDetectTextFromImage({ lang: "en" });
        const mockResponse: DetectTextFromImageResponse.AsObject = {
            text: "Tiếng Việt",
        };

        const mockHttpClient = mockAxiosReturn([]);
        const detection = new DetectionV2({
            httpClient: mockHttpClient,
            configs: mockAppConfigs,
        });

        (visionReaderMutation.detectTextFromImage as jest.Mock).mockResolvedValue(mockResponse);

        const actualResult = await detection.detectText(src, "vi");

        expect(actualResult).toEqual(mockResponse.text);

        expect(visionReaderMutation.detectTextFromImage).toBeCalledWith({
            lang,
            src,
        });
    });
});
