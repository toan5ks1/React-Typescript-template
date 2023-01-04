import { AxiosInstance } from "axios";
import Configuration from "src/packages/configuration";
import { visionReaderService } from "src/squads/syllabus/services/eureka/vision-service";

interface DetectionOptions {
    httpClient: AxiosInstance;
    configs: Configuration;
}

export interface TexReturn {
    type: string;
    value: string;
}

//TODO: BE prevents to request Vietnamese language, will fix later
const checkLanguage = (lang: string): string => {
    // Can detect Vietnamese by English
    if (lang === "vi") {
        return "en";
    }
    return lang;
};

// Call directly to google cloud functions
export class DetectionV1 {
    private readonly httpClient: AxiosInstance;
    private readonly configs: Configuration;

    constructor({ httpClient, configs }: DetectionOptions) {
        const baseURL = configs.getEndpoints().OCR;

        this.httpClient = httpClient;
        this.configs = configs;

        if (!baseURL) {
            throw new Error("baseURL not provided");
        }

        this.detectTeX = this.detectTeX.bind(this);
        this.detectText = this.detectText.bind(this);
    }

    async detectTeX(image: string) {
        const baseURL = this.configs.getEndpoints().OCR;

        const response = await this.httpClient.post<TexReturn[]>(`${baseURL}/tex-detection`, {
            src: image,
        });
        const latexList = response.data.filter((tex) => tex.type === "latex");

        return latexList.length > 0 ? latexList[0].value : "";
    }

    async detectText(image: string, lang: string | null) {
        const baseURL = this.configs.getEndpoints().OCR;

        const response = await this.httpClient.post(`${baseURL}/text_detection`, {
            src: image,
            lang: lang,
        });
        return response.data.text;
    }
}

// Using OCR endpoints support by BE
export class DetectionV2 {
    private readonly httpClient: AxiosInstance;
    private readonly configs: Configuration;

    constructor({ httpClient, configs }: DetectionOptions) {
        const baseURL = configs.getEndpoints().OCR;

        this.httpClient = httpClient;
        this.configs = configs;

        if (!baseURL) {
            throw new Error("baseURL not provided");
        }

        this.detectTeX = this.detectTeX.bind(this);
        this.detectText = this.detectText.bind(this);
    }

    // TODO: Update later when having endpoint for Mathpix
    async detectTeX(image: string) {
        const baseURL = this.configs.getEndpoints().OCR;

        const response = await this.httpClient.post<TexReturn[]>(`${baseURL}/tex-detection`, {
            src: image,
        });
        const latexList = response.data.filter((tex) => tex.type === "latex");

        return latexList.length > 0 ? latexList[0].value : "";
    }

    async detectText(image: string, lang: string) {
        const language = checkLanguage(lang);

        const response = await visionReaderService.detectTextFromImage({
            src: image,
            lang: language,
        });

        return response.text;
    }
}
