import { useCallback } from "react";

import { Entities, MutationMenus, NotifyActions } from "src/common/constants/enum";
import { pick1stElement } from "src/common/utils/other";
import { grpcErrorsMap } from "src/internals/grpc/errors";
import logger from "src/squads/syllabus/internals/logger";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { NsSyllabus_Master_CoursesService } from "src/squads/syllabus/services/master/courses-master-service/types";
import { UseMutationOptions } from "src/squads/syllabus/services/service-creator";

import useBasicContent from "src/squads/syllabus/hooks/useBasicContent";
import useNotifyForm from "src/squads/syllabus/hooks/useNotifyForm";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

interface UseUpsertCourseProps {
    isEdit?: boolean;
}

// TODO: BE check chapter_ids and display_order field
const useUpsertCourse = ({ isEdit }: UseUpsertCourseProps = {}) => {
    const t = useResourceTranslate(Entities.COURSES);
    const { school_id } = useBasicContent();
    const onNotify = useNotifyForm({
        action: isEdit ? MutationMenus.EDIT : MutationMenus.CREATE,
        entityName: t("name"),
    });

    const { mutate: upsertCourse, isLoading } = inferMutation({
        entity: "coursesMaster",
        action: "courseCreate",
    })({
        onSuccess: () => {
            onNotify(NotifyActions.SUCCESS, {});
        },
        onError: (e) => {
            logger.warn("useUpsertCourse", e);

            if (e.message != grpcErrorsMap.ALREADY_EXISTS) {
                onNotify(NotifyActions.FAILURE, {});
            }
        },
    });

    const { mutateAsync: uploadMedias, isLoading: isUploadingMedia } = inferMutation({
        entity: "media",
        action: "UPLOAD_MEDIA",
    })({
        onError: (e) => {
            logger.warn("useUpsertCourse upload Files", e);
        },
    });

    const getCourseIcon = useCallback(
        async (files: File[]) => {
            const urlResponse = await uploadMedias({
                files,
            });
            return pick1stElement(urlResponse)?.gRPC.downloadUrl;
        },
        [uploadMedias]
    );

    const onCreate = useCallback(
        async (
            data: Pick<
                NsSyllabus_Master_CoursesService.UpsertCourses,
                "files" | "name" | "locationIdsList" | "teachingMethod"
            >,
            options: UseMutationOptions<NsSyllabus_Master_CoursesService.UpsertCourses, {}>
        ) => {
            const courseIcon = data.files ? await getCourseIcon(data.files) : undefined;
            upsertCourse(
                {
                    ...data,
                    chapter_ids: [],
                    icon: courseIcon,
                    display_order: 1,
                    school_id,
                },
                options
            );
        },
        [getCourseIcon, upsertCourse, school_id]
    );

    const onEdit = useCallback(
        async (
            data: Omit<
                NsSyllabus_Master_CoursesService.UpsertCourses,
                "school_id" | "display_order" | "chapter_ids"
            >,
            options: UseMutationOptions<NsSyllabus_Master_CoursesService.UpsertCourses, {}>
        ) => {
            if (data.files) data.icon = await getCourseIcon(data.files);

            upsertCourse(
                {
                    ...data,
                    school_id,
                    chapter_ids: [],
                    display_order: 1,
                },
                options
            );
        },
        [getCourseIcon, upsertCourse, school_id]
    );

    return {
        onCreate,
        onEdit,
        isSubmiting: isLoading || isUploadingMedia,
    };
};

export default useUpsertCourse;
