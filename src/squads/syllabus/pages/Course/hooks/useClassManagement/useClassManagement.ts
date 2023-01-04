import { useCallback } from "react";

import { Entities } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import logger from "src/squads/syllabus/internals/logger";
import { Lesson_ClassListByCourseIdV3Query } from "src/squads/syllabus/services/bob/bob-types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { inferQueryPagination } from "src/squads/syllabus/services/infer-query";
import { DataWithTotal, PaginationWithTotal } from "src/squads/syllabus/services/service-creator";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { ClassData } from "src/squads/syllabus/pages/Course/common/types";

export interface UseClassManagementProps {
    courseId: string;
}

export interface UseClassManagementMutateProps {
    classData: ClassData;
    onSuccess?: () => void;
    onError?: () => void;
}

export interface UseClassManagementReturn {
    classesList: ClassData[];
    isLoading: boolean;
    pagination: PaginationWithTotal;
    handleEditClass: (props: UseClassManagementMutateProps) => void;
    isEditing: boolean;
    handleDeleteClass: (props: UseClassManagementMutateProps) => void;
    isDeleting: boolean;
}

const defaultClassListData: DataWithTotal<ClassData[]> = {
    data: [],
    total: 0,
};

const useClassManagement = ({ courseId }: UseClassManagementProps): UseClassManagementReturn => {
    const t = useTranslate();
    const tClass = useResourceTranslate(Entities.CLASS);

    const showSnackbar = useShowSnackbar();

    const {
        result: { isLoading, refetch, isFetching },
        data = defaultClassListData,
        pagination,
        resetPaginationOffset,
    } = inferQueryPagination({
        entity: "class",
        action: "classGetListByCourseId",
    })<
        DataWithTotal<Lesson_ClassListByCourseIdV3Query["class"] | undefined>,
        DataWithTotal<ClassData[]>
    >(
        { course_id: courseId },
        {
            enabled: Boolean(courseId),
            defaultLimit: 5,
            defaultOffset: 0,
            selector: ({ data, total }) => ({ data: data || [], total }),
            onSuccess: ({ data, total }) => {
                if (!arrayHasItem(data) && total > 0) resetPaginationOffset();
            },
        }
    );

    const { mutate: mutateEditClass, isLoading: isEditing } = inferMutation({
        entity: "classMaster",
        action: "classUpdate",
    })({
        onSuccess: async () => {
            showSnackbar(tClass("messages.editSuccessfully"));
            await refetch();
        },
        onError: (error) => {
            logger.error("[useClassManagement] classUpdate:", error);
            showSnackbar(t("ra.manabie-error.unknown"), "error");
        },
    });

    const handleEditClass: UseClassManagementReturn["handleEditClass"] = useCallback(
        (props) => {
            const { classData, onError, onSuccess } = props;
            mutateEditClass(
                { classId: classData.class_id, name: classData.name },
                { onSuccess, onError }
            );
        },
        [mutateEditClass]
    );

    const { mutate: mutateDeleteClass, isLoading: isDeleting } = inferMutation({
        entity: "classMaster",
        action: "classDelete",
    })({
        onSuccess: async () => {
            showSnackbar(tClass("messages.deleteSuccessfully"));
            await refetch();
        },
        onError: (error) => {
            logger.error("[useClassManagement] classDelete:", error);
            showSnackbar(t("ra.manabie-error.unknown"), "error");
        },
    });

    const handleDeleteClass: UseClassManagementReturn["handleDeleteClass"] = useCallback(
        (props) => {
            const { classData, onSuccess, onError } = props;
            mutateDeleteClass({ classId: classData.class_id }, { onSuccess, onError });
        },
        [mutateDeleteClass]
    );

    return {
        classesList: data.data,
        isLoading: isLoading || isFetching,
        pagination,
        handleEditClass,
        isEditing,
        handleDeleteClass,
        isDeleting,
    };
};

export default useClassManagement;
