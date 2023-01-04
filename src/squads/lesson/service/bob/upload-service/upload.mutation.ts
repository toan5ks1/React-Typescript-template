import { MAX_FILE_SIZE } from "src/common/constants/file-size";
import { groupBy, matchingUpsertMedia } from "src/common/utils/file";
import { arrayHasItem } from "src/common/utils/other";
import { axiosUpload } from "src/internals/axios-client";
import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { NsLesson_Bob_ClassesService } from "src/squads/lesson/service/bob/classes-service/types";
import { InheritedGrpcServiceClient } from "src/squads/lesson/service/service-types";
import {
    filterUploadFiles,
    getFileExtension,
    getFileNameWithoutExtension,
} from "src/squads/lesson/service/utils/utils";

import { CourseServicePromiseClient } from "manabie-yasuo/course_grpc_web_pb";
import {
    CreateBrightCoveUploadUrlRequest,
    FinishUploadBrightCoveRequest,
} from "manabie-yasuo/course_pb";
import { UploadServicePromiseClient } from "manabuf/bob/v1/uploads_grpc_web_pb";
import { ResumableUploadURLRequest, ResumableUploadURLResponse } from "manabuf/bob/v1/uploads_pb";
import { Duration } from "manabuf/google/protobuf/duration_pb";

import { NsLesson_Bob_UploadService } from "./types";

import classMutationServiceBob from "src/squads/lesson/service/bob/classes-service/classes.mutation";

export function newGenerateResumableUploadURLReq(file: File): ResumableUploadURLRequest {
    const { name, type } = file;
    const req = new ResumableUploadURLRequest();
    const duration = new Duration();

    duration.setSeconds(30 * 60);
    req.setExpiry(duration);
    req.setPrefixName(getFileNameWithoutExtension(name).replace(/\s/g, ""));
    req.setFileExtension(getFileExtension(name));
    req.setAllowOrigin(window.location.origin);

    req.setContentType(type);

    return req;
}

export const newFinishUploadBrightcoveReq = ({
    apiRequestUrl,
    videoId,
}: NsLesson_Bob_UploadService.FinishUploadBrightCoveRequest): FinishUploadBrightCoveRequest => {
    const req = new FinishUploadBrightCoveRequest();

    req.setApiRequestUrl(apiRequestUrl);
    req.setVideoId(videoId);

    return req;
};

export const newCreateBrightCoveUploadUrlReq = (
    name: NsLesson_Bob_UploadService.CreateBrightCoveUploadUrlRequest["name"]
): CreateBrightCoveUploadUrlRequest => {
    const req = new CreateBrightCoveUploadUrlRequest();

    req.setName(name);
    return req;
};

// Put in bob to avoid dependencies cycle
class CourseServiceYasuo extends InheritedGrpcServiceClient<CourseServicePromiseClient> {
    private async finishUploadBrightcove(
        data: NsLesson_Bob_UploadService.FinishUploadBrightCoveRequest
    ) {
        const req = newFinishUploadBrightcoveReq(data);

        await this._call("finishUploadBrightCove", req);
    }

    private async createBrightCoveUploadUrl(
        name: NsLesson_Bob_UploadService.CreateBrightCoveUploadUrlRequest["name"]
    ) {
        const req = newCreateBrightCoveUploadUrlReq(name);

        const resp = await this._call("createBrightCoveUploadUrl", req);
        return resp.toObject();
    }

    async uploadBrightcove(videos: File[]): Promise<string[]> {
        return Promise.all(
            videos.map(async (video) => {
                const resp = await this.createBrightCoveUploadUrl(video.name);
                await axiosUpload.put(resp.signedUrl, video, { headers: { "Content-Type": "" } });
                await this.finishUploadBrightcove(resp);
                return resp.videoId;
            })
        );
    }
}

export const coursesMutationServiceYasuo = new CourseServiceYasuo(
    CourseServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export class UploadServiceBob extends InheritedGrpcServiceClient<UploadServicePromiseClient> {
    private async putResumableUrl({
        resumableUploadUrl,
        file,
    }: {
        resumableUploadUrl: string;
        file: File;
    }) {
        await axiosUpload.put(resumableUploadUrl, file, {});
    }

    private async generateResumableUploadURL(
        data: Required<NsLesson_Bob_UploadService.ResumableUploadURLRequest>
    ): Promise<{ gRPC: ResumableUploadURLResponse.AsObject; file: File }[]> {
        try {
            const resp = await Promise.all(
                data.files.map(async (file) => {
                    if (file.size > MAX_FILE_SIZE) {
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

    private async uploadFiles(files: File[]) {
        const { others: noVideoFiles, videos } = groupBy({ files });

        const uploadResponses = await this.generateResumableUploadURL({
            files: noVideoFiles,
        });

        const restAttachments = uploadResponses.map((uploadResponse) =>
            matchingUpsertMedia({
                url: uploadResponse.gRPC.downloadUrl,
                name: uploadResponse.file.name,
                type: uploadResponse.file.type,
            })
        );

        const brightcoveVideos: string[] = await coursesMutationServiceYasuo.uploadBrightcove(
            videos
        );
        const videoAttachments = videos.map((file: File, index: number) => {
            const { name, type } = file;
            const url = brightcoveVideos[index];
            return matchingUpsertMedia({ name, type, url });
        });

        const attachments: NsLesson_Bob_ClassesService.UpsertMedia[] = [
            ...restAttachments,
            ...videoAttachments,
        ];
        const resp = await classMutationServiceBob.upsertMedia(attachments);

        return {
            mediaIds: resp.data.mediaIdsList,
            attachments,
        };
    }

    async filterAndUploadFiles(files: NsLesson_Bob_UploadService.FilterUploadFiles[]): Promise<{
        data: { attachments: NsLesson_Bob_ClassesService.UpsertMedia[]; mediaIds: string[] };
    }> {
        const { alreadyUploadedMediaIds, filesNeedToBeUploaded } = filterUploadFiles(files || []);

        let resultedFiles = alreadyUploadedMediaIds;
        let attachments: NsLesson_Bob_ClassesService.UpsertMedia[] = [];
        if (filesNeedToBeUploaded && arrayHasItem(filesNeedToBeUploaded)) {
            const resp = await this.uploadFiles(filesNeedToBeUploaded);
            resultedFiles = [...resultedFiles, ...resp.mediaIds];
            attachments = resp.attachments;
        }

        return { data: { attachments, mediaIds: resultedFiles } };
    }
}

const uploadMutationServiceBob = new UploadServiceBob(
    UploadServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default uploadMutationServiceBob;
