import appConfigs from "src/internals/configuration";
import { AppError } from "src/internals/errors";
import { commonGrpcOptions } from "src/internals/grpc";
import uploadReaderServiceBob from "src/services/bob/upload-reader-service-bob";

import { CourseModifierServicePromiseClient } from "manabuf/yasuo/v1/courses_grpc_web_pb";
import { AttachMaterialsToCourseRequest } from "manabuf/yasuo/v1/courses_pb";

import { InheritedGrpcServiceClient } from "../../service-types";
import { NsYasuoCourseService } from "./types";

export type AttachMaterialsToCourseReturn = {
    newMediaIds: string[];
    mediaIds: string[];
};

class CoursesModifierServiceYasuo extends InheritedGrpcServiceClient<CourseModifierServicePromiseClient> {
    async attachMaterialsToCourse({
        courseId,
        lessonGroupId,
        mediaIds,
        files,
    }: NsYasuoCourseService.AttachMaterialsToCourse): Promise<{
        data: AttachMaterialsToCourseReturn;
    }> {
        if (!courseId || !lessonGroupId) throw new AppError("Invalid request");

        const {
            data: { mediaIds: newMediaIds },
        } = await uploadReaderServiceBob.filterAndUploadFiles(files);

        const req = new AttachMaterialsToCourseRequest();

        req.setCourseId(courseId);
        req.setLessonGroupId(lessonGroupId);
        req.setMaterialIdsList([...mediaIds, ...newMediaIds]);

        await this._call("attachMaterialsToCourse", req);

        return { data: { newMediaIds, mediaIds } };
    }
}

export const coursesModifierServiceYasuo = new CoursesModifierServiceYasuo(
    CourseModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);
