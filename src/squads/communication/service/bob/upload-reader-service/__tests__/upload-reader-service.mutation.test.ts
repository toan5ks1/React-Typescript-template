import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { maxFileSize } from "src/squads/communication/service/bob/upload-reader-service/constants";

import { ClassPromiseClient } from "manabie-bob/class_grpc_web_pb";
import { UpsertMediaResponse } from "manabie-bob/class_pb";
import { MediaType } from "manabie-bob/enum_pb";
import { UploadServicePromiseClient } from "manabuf/bob/v1/uploads_grpc_web_pb";
import { ResumableUploadURLResponse } from "manabuf/bob/v1/uploads_pb";

import {
    ResumableUploadURLRequest,
    UpsertMedia,
} from "src/squads/communication/hooks/useUploadFiles/types";
import {
    classServiceClientBob,
    ClassServiceClientBob,
    UploadReaderServiceBob,
    uploadServiceClientBob,
    UploadServiceClientBob,
} from "src/squads/communication/service/bob/upload-reader-service/upload-reader-service.mutation";

jest.mock("manabuf/bob/v1/uploads_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/uploads_grpc_web_pb");
    actual.UploadServicePromiseClient.prototype.generateResumableUploadURL = jest.fn();

    return actual;
});

jest.mock("manabie-bob/class_grpc_web_pb", () => {
    const actual = jest.requireActual("manabie-bob/class_grpc_web_pb");
    actual.ClassPromiseClient.prototype.upsertMedia = jest.fn();

    return actual;
});

jest.mock("src/internals/axios-client", () => {
    return {
        __esModule: true,
        axiosUpload: {
            put: jest.fn(),
        },
    };
});

export const mockGenerateResumableUploadURL = (mockFile: File) => {
    const mockResumableUploadURLResponse: ResumableUploadURLResponse.AsObject = {
        downloadUrl: "",
        fileName: mockFile.name,
        resumableUploadUrl: "",
    };

    (UploadServicePromiseClient.prototype.generateResumableUploadURL as jest.Mock).mockReturnValue({
        toObject: () => mockResumableUploadURLResponse,
        getResumableUploadUrl: () => "string",
    });

    return mockResumableUploadURLResponse;
};

const mockUpsertMedia = () => {
    const mockUpsertMediaReturn: UpsertMediaResponse.AsObject = {
        mediaIdsList: ["mediaId"],
    };

    (ClassPromiseClient.prototype.upsertMedia as jest.Mock).mockReturnValue({
        toObject: () => mockUpsertMediaReturn,
    });

    return mockUpsertMediaReturn;
};

describe("UploadServiceClientBob", () => {
    it("UploadServiceClientBob should not throw error when equal maxFileSize", async () => {
        const mockFile = new File([], "fileName.pdf");
        Object.defineProperty(mockFile, "size", { value: maxFileSize });

        const params: Required<ResumableUploadURLRequest> = { files: [mockFile] };

        mockGenerateResumableUploadURL(mockFile);

        const callSpy = jest.spyOn(uploadServiceClientBob, "generateResumableUploadURL");

        await uploadServiceClientBob.generateResumableUploadURL(params);

        expect(callSpy).toHaveBeenCalledTimes(1);
    });

    it("UploadServiceClientBob should throw error when over maxFileSize", async () => {
        const mockFile = new File([], "fileName.pdf");
        Object.defineProperty(mockFile, "size", { value: maxFileSize + 1 });

        const params: Required<ResumableUploadURLRequest> = { files: [mockFile] };

        mockGenerateResumableUploadURL(mockFile);

        const callSpy = jest.spyOn(uploadServiceClientBob, "generateResumableUploadURL");

        await expect(async () => {
            await uploadServiceClientBob.generateResumableUploadURL(params);
        }).rejects.toThrowError(new Error("resources.input.pleaseUploadFileSizeSmaller"));

        expect(callSpy).toHaveBeenCalledTimes(1);
    });
});

describe("ClassServiceClientBob", () => {
    it("ClassServiceClientBob should return correct data with upsertMedia", async () => {
        const params: UpsertMedia[] = [
            { name: "name", resource: "resource", type: MediaType.MEDIA_TYPE_PDF },
        ];

        const mockUpsertMediaReturn = mockUpsertMedia();

        const callSpy = jest.spyOn(classServiceClientBob, "upsertMedia");

        const response = await classServiceClientBob.upsertMedia(params);

        expect(callSpy).toHaveBeenCalledTimes(1);

        expect(response).toEqual(mockUpsertMediaReturn);
    });
});

describe("UploadReaderServiceBob", () => {
    const uploadServiceClientBobMock = new UploadServiceClientBob(
        UploadServicePromiseClient,
        appConfigs,
        commonGrpcOptions
    );

    const classServiceClientBobMock = new ClassServiceClientBob(
        ClassPromiseClient,
        appConfigs,
        commonGrpcOptions
    );

    const uploadReaderServiceBob = new UploadReaderServiceBob(
        uploadServiceClientBobMock,
        classServiceClientBobMock
    );

    it("should return correct data with filterAndUploadFiles", async () => {
        const mockFile = new File([], "fileName.pdf");

        mockGenerateResumableUploadURL(mockFile);

        const mockUpsertMediaReturn = mockUpsertMedia();

        const response = await uploadReaderServiceBob.filterAndUploadFiles([mockFile]);

        expect(response).toEqual({
            attachments: [
                {
                    name: mockFile.name,
                    resource: "",
                    type: MediaType.MEDIA_TYPE_NONE,
                },
            ],
            mediaIds: mockUpsertMediaReturn.mediaIdsList,
        });
    });

    it("should return correct data with filterAndUploadFiles and input file is empty", async () => {
        const response = await uploadReaderServiceBob.filterAndUploadFiles([]);

        expect(response).toEqual({
            attachments: [],
            mediaIds: [],
        });
    });
});
