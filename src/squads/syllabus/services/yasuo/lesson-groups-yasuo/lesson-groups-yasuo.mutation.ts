import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { uploadReaderServiceBob } from "src/squads/syllabus/services/bob/upload-reader-service-bob";
import { InheritedGrpcServiceClient } from "src/squads/syllabus/services/service-types";

import { CourseModifierServicePromiseClient } from "manabuf/yasuo/v1/courses_grpc_web_pb";
import { AttachMaterialsToCourseRequest } from "manabuf/yasuo/v1/courses_pb";

import { NsYasuoCourseService } from "./types";

export type AttachMaterialsToCourseReturn = {
    newMediaIds: string[];
    mediaIds: string[];
};

export function attachMaterialsToCourseReq(data: NsYasuoCourseService.AttachMaterialsToCourseReq) {
    const { courseId, lessonGroupId, mediaIds, newMediaIds } = data;

    const req = new AttachMaterialsToCourseRequest();

    req.setCourseId(courseId);
    req.setLessonGroupId(lessonGroupId);
    req.setMaterialIdsList([...mediaIds, ...newMediaIds]);

    return req;
}

class CoursesModifierServiceYasuo extends InheritedGrpcServiceClient<CourseModifierServicePromiseClient> {
    async attachMaterialsToCourse({
        courseId,
        lessonGroupId,
        mediaIds,
        files,
    }: NsYasuoCourseService.AttachMaterialsToCourse): Promise<{
        data: AttachMaterialsToCourseReturn;
    }> {
        const { mediaIds: newMediaIds } = await uploadReaderServiceBob.filterAndUploadFiles(files);

        const req = attachMaterialsToCourseReq({ courseId, lessonGroupId, mediaIds, newMediaIds });
        await this._call("attachMaterialsToCourse", req);

        return { data: { newMediaIds, mediaIds } };
    }
}

const lessonGroupsServiceYasuo = new CoursesModifierServiceYasuo(
    CourseModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default lessonGroupsServiceYasuo;
