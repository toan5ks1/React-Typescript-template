import {
    AttachmentInfo,
    filterUploadFiles,
    groupBy,
    matchingUpsertMedia,
} from "src/common/utils/file";
import { axiosUpload } from "src/internals/axios-client";
import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";

import { ClassPromiseClient } from "manabie-bob/class_grpc_web_pb";
import { CourseServicePromiseClient } from "manabie-yasuo/course_grpc_web_pb";
import {
    CreateBrightCoveUploadUrlRequest,
    CreateBrightCoveUploadUrlResponse,
    FinishUploadBrightCoveRequest,
} from "manabie-yasuo/course_pb";
import { UploadServicePromiseClient } from "manabuf/bob/v1/uploads_grpc_web_pb";
import { ResumableUploadURLResponse } from "manabuf/bob/v1/uploads_pb";

import { InheritedGrpcServiceClient } from "../../service-types";
import { maxFileSize } from "./helpers";
import { NsBobUploadReaderService } from "./types";
import {
    newGenerateResumableUploadURLReq,
    createUpsertMediaRequest,
} from "./upload-reader-service-bob.request";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";

// TODO: Explore and refactor this file
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

    async generateResumableUploadURL(
        data: Required<NsBobUploadReaderService.ResumableUploadURLRequest>
    ): Promise<
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
    async upsertMedias(data: NsBobUploadReaderService.UpsertMedia[]) {
        const request = createUpsertMediaRequest(data!);

        const response = await this._call("upsertMedia", request);

        return response.toObject();
    }
}

export class CourseServiceClientYasuo extends InheritedGrpcServiceClient<CourseServicePromiseClient> {
    async finishUploadBrightcove({
        apiRequestUrl,
        videoId,
    }: FinishUploadBrightCoveRequest.AsObject) {
        const req = new FinishUploadBrightCoveRequest();

        req.setApiRequestUrl(apiRequestUrl);
        req.setVideoId(videoId);

        const link = await this._call("finishUploadBrightCove", req);
        return link.toObject();
    }

    async createBrightCoveUploadUrl(name: CreateBrightCoveUploadUrlRequest.AsObject["name"]) {
        const req = new CreateBrightCoveUploadUrlRequest();

        req.setName(name);

        const resp = await this._call("createBrightCoveUploadUrl", req);
        return resp.toObject();
    }
}

export class UploadReaderServiceBob {
    protected uploadServiceClientBob: UploadServiceClientBob;
    protected classServiceClientBob: ClassServiceClientBob;
    protected courseServiceClientYasuo: CourseServiceClientYasuo;

    constructor(
        uploadServiceClientBob: UploadServiceClientBob,
        classServiceClientBob: ClassServiceClientBob,
        courseServiceClientYasuo: CourseServiceClientYasuo
    ) {
        this.uploadServiceClientBob = uploadServiceClientBob;
        this.classServiceClientBob = classServiceClientBob;
        this.courseServiceClientYasuo = courseServiceClientYasuo;
    }

    protected async putResumableUrl({
        resumableUploadUrl,
        file,
    }: {
        resumableUploadUrl: string;
        file: File;
    }) {
        await axiosUpload.put(resumableUploadUrl, file, {});
    }

    async uploadBrightcove(videos: File[]): Promise<CreateBrightCoveUploadUrlResponse.AsObject[]> {
        return Promise.all(
            videos.map(async (video) => {
                const resp = await this.courseServiceClientYasuo.createBrightCoveUploadUrl(
                    video.name
                );
                await axiosUpload.put(resp.signedUrl, video, { headers: { "Content-Type": "" } });
                await this.courseServiceClientYasuo.finishUploadBrightcove(resp); //after success upload we need to mark file is ready for brightcove worker
                return resp;
            })
        );
    }

    async uploadFiles(files: File[]) {
        const { others: noVideoFiles, videos } = groupBy({ files });

        const uploadResponses = await this.uploadServiceClientBob.generateResumableUploadURL({
            files: noVideoFiles,
        });

        const restAttachments = uploadResponses.map((uploadResponse) =>
            matchingUpsertMedia({
                url: uploadResponse.gRPC.downloadUrl,
                name: uploadResponse.file.name,
                type: uploadResponse.file.type,
            })
        );

        const brightcoveVideos = await this.uploadBrightcove(videos);

        const videoAttachments = videos.map((file: File, index: number) => {
            const { name, type } = file;
            const url = brightcoveVideos[index].videoId;
            return matchingUpsertMedia({ name, type, url });
        });

        const attachments: AttachmentInfo[] = [...restAttachments, ...videoAttachments];
        const resp = await this.classServiceClientBob.upsertMedias(attachments);

        return {
            mediaIds: resp.mediaIdsList,
            attachments,
        };
    }
    //TODO: move filter outside
    //TODO: refactor this type to only replace Media type with Pick<Media, "only what this function really needs">
    async filterAndUploadFiles(
        files: (Media | File)[]
    ): Promise<{ attachments: AttachmentInfo[]; mediaIds: string[] }> {
        const { alreadyUploadedMediaIds, filesNeedToBeUploaded } = filterUploadFiles(files || []);

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

const courseServiceClientYasuo = new CourseServiceClientYasuo(
    CourseServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);
const uploadReaderServiceBob = new UploadReaderServiceBob(
    uploadServiceClientBob,
    classServiceClientBob,
    courseServiceClientYasuo
);

export default uploadReaderServiceBob;
