import appConfigs from "src/internals/configuration";
import { AppError } from "src/internals/errors";
import { commonGrpcOptions } from "src/internals/grpc";
import { uploadService } from "src/squads/lesson/service/bob/upload-service/upload-service";
import { InheritedGrpcServiceClient } from "src/squads/lesson/service/service-types";
import NsLesson_Yasuo_CourseService from "src/squads/lesson/service/yasuo/courses-yasuo-service/types";

import { CourseModifierServicePromiseClient } from "manabuf/yasuo/v1/courses_grpc_web_pb";
import { AttachMaterialsToCourseRequest } from "manabuf/yasuo/v1/courses_pb";

export function attachMaterialsToCourseReq(
    data: NsLesson_Yasuo_CourseService.AttachMaterialsToCourseReq
) {
    const { courseId, lessonGroupId, mediaIds, newMediaIds } = data;

    const req = new AttachMaterialsToCourseRequest();

    req.setCourseId(courseId);
    req.setLessonGroupId(lessonGroupId);
    req.setMaterialIdsList([...mediaIds, ...newMediaIds]);

    return req;
}

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
    }: NsLesson_Yasuo_CourseService.AttachMaterialsToCourse): Promise<{
        data: AttachMaterialsToCourseReturn;
    }> {
        if (!courseId || !lessonGroupId) throw new AppError("Invalid request");

        const {
            data: { mediaIds: newMediaIds },
        } = await uploadService.mutation.uploadFilterAndUploadFiles(files);

        const req = attachMaterialsToCourseReq({
            courseId,
            lessonGroupId,
            mediaIds,
            newMediaIds,
        });

        await this._call("attachMaterialsToCourse", req);

        return { data: { newMediaIds, mediaIds } };
    }
}

const coursesModifierServiceYasuo = new CoursesModifierServiceYasuo(
    CourseModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default coursesModifierServiceYasuo;
