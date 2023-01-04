import {
    AttachmentInfo,
    filterUploadFiles,
    groupBy,
    matchingUpsertMedia,
} from "src/common/utils/file";
import { axiosUpload } from "src/internals/axios-client";
import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { maxFileSize } from "src/squads/communication/service/bob/upload-reader-service/constants";
import { InheritedGrpcServiceClient } from "src/squads/communication/service/service-types";

import { ClassPromiseClient } from "manabie-bob/class_grpc_web_pb";
import { UploadServicePromiseClient } from "manabuf/bob/v1/uploads_grpc_web_pb";
import { ResumableUploadURLResponse } from "manabuf/bob/v1/uploads_pb";

import {
    InputFile,
    ResumableUploadURLRequest,
    UploadFilesReturn,
    UpsertMedia,
} from "src/squads/communication/hooks/useUploadFiles/types";
import {
    newGenerateResumableUploadURLReq,
    newUpsertMediaReq,
} from "src/squads/communication/service/bob/upload-reader-service/upload-reader-service.request";

export class UploadServiceClientBob extends InheritedGrpcServiceClient<UploadServicePromiseClient> {
    protected async putResumableUrl({
        resumableUploadUrl,
        file,
    }: {
        resumableUploadUrl: string;
        file: File;
    }) {
        await axiosUpload.put(resumableUploadUrl, file, {});
    }

    async generateResumableUploadURL(data: Required<ResumableUploadURLRequest>): Promise<
        {
            gRPC: ResumableUploadURLResponse.AsObject;
            file: File;
        }[]
    > {
        try {
            const resp = await Promise.all(
                [...data.files].map(async (file) => {
                    if (file.size > maxFileSize) {
                        throw new Error("resources.input.pleaseUploadFileSizeSmaller");
                    }

                    const req = newGenerateResumableUploadURLReq(file);

                    const gRPCResponse = await this._call("generateResumableUploadURL", req);
                    const resumableUploadUrl = gRPCResponse.getResumableUploadUrl();

                    await this.putResumableUrl({ resumableUploadUrl, file });

                    return {
                        gRPC: gRPCResponse.toObject(),
                        file,
                    };
                })
            );

            return resp;
        } catch (err) {
            throw err;
        }
    }
}

export class ClassServiceClientBob extends InheritedGrpcServiceClient<ClassPromiseClient> {
    async upsertMedia(data: UpsertMedia[]) {
        const req = newUpsertMediaReq(data!);

        const resp = await this._call("upsertMedia", req);

        return resp.toObject();
    }
}

export class UploadReaderServiceBob {
    protected uploadServiceClientBob: UploadServiceClientBob;
    protected classServiceClientBob: ClassServiceClientBob;

    constructor(
        uploadServiceClientBob: UploadServiceClientBob,
        classServiceClientBob: ClassServiceClientBob
    ) {
        this.uploadServiceClientBob = uploadServiceClientBob;
        this.classServiceClientBob = classServiceClientBob;
    }

    async uploadFiles(files: File[]): Promise<UploadFilesReturn> {
        const { others: noVideoFiles } = groupBy({ files });

        const uploadResponses = await this.uploadServiceClientBob.generateResumableUploadURL({
            files: noVideoFiles,
        });

        const uploadAttachments = uploadResponses.map((uploadResponse) =>
            matchingUpsertMedia({
                url: uploadResponse.gRPC.downloadUrl,
                name: uploadResponse.file.name,
                type: uploadResponse.file.type,
            })
        );

        const resp = await this.classServiceClientBob.upsertMedia(uploadAttachments);

        return {
            mediaIds: resp.mediaIdsList,
            attachments: uploadAttachments,
        };
    }

    async filterAndUploadFiles(files: InputFile[]): Promise<UploadFilesReturn> {
        const { alreadyUploadedMediaIds, filesNeedToBeUploaded } = filterUploadFiles(files);

        let resultedFiles = alreadyUploadedMediaIds;
        let attachments: AttachmentInfo[] = [];

        if (filesNeedToBeUploaded && filesNeedToBeUploaded.length) {
            const resp = await this.uploadFiles(filesNeedToBeUploaded);
            resultedFiles = [...resultedFiles, ...resp.mediaIds];
            attachments = resp.attachments;
        }

        return { attachments, mediaIds: resultedFiles };
    }
}

export const uploadServiceClientBob = new UploadServiceClientBob(
    UploadServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export const classServiceClientBob = new ClassServiceClientBob(
    ClassPromiseClient,
    appConfigs,
    commonGrpcOptions
);

export const uploadReaderServiceBob = new UploadReaderServiceBob(
    uploadServiceClientBob,
    classServiceClientBob
);

export default uploadReaderServiceBob;
