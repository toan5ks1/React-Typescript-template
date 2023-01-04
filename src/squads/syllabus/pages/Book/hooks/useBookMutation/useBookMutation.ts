import { useCallback } from "react";

import { Entities, NotifyTypes } from "src/common/constants/enum";
import logger from "src/squads/syllabus/internals/logger";
import { NsEurekaCourseModifierService } from "src/squads/syllabus/services/eureka/course-modifier-eureka";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const useBookMutation = () => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const { mutate: mutateCreate, isLoading: isLoadingCreate } = inferMutation({
        entity: "book",
        action: "syllabusBookUpsert",
    })({
        onSuccess: () => {
            showSnackbar(
                t(
                    "ra.common.createdSuccess",
                    { smart_count: t(`resources.${Entities.BOOKS}.name`) },
                    { lowercase: true }
                )
            );
        },
        onError: (error) => {
            logger.error("onBookCreate", error);

            showSnackbar(t("ra.common.createdFail"), NotifyTypes.ERROR);
        },
    });

    const { mutate: mutateUpdate, isLoading: isLoadingUpdate } = inferMutation({
        entity: "book",
        action: "syllabusBookUpsert",
    })({
        onSuccess: () => {
            showSnackbar(
                t(
                    "ra.common.updatedSuccess",
                    { smart_count: t(`resources.${Entities.BOOKS}.name`) },
                    { lowercase: true }
                )
            );
        },
        onError: (error) => {
            logger.error("onBookUpdate", error);

            showSnackbar(t("ra.common.updatedFail"), NotifyTypes.ERROR);
        },
    });

    const { mutate: mutateDuplicate, isLoading: isLoadingDuplicate } = inferMutation({
        entity: "book",
        action: "BOOK_DUPLICATE",
    })({
        onSuccess: () => {
            showSnackbar(t("ra.message.duplicateBookSuccess"));
        },
        onError: (error) => {
            logger.error("onBookDuplicate", error);

            showSnackbar(t("ra.message.duplicateBookFail"), NotifyTypes.ERROR);
        },
    });

    const onCreate = useCallback(
        (
            record: NsSyllabus_Yasuo_CoursesService.CreateBook,
            options: Parameters<typeof mutateCreate>[1]
        ) => mutateCreate(record, options),
        [mutateCreate]
    );

    const onUpdate = useCallback(
        (
            record: NsSyllabus_Yasuo_CoursesService.UpdateBook,
            options: Parameters<typeof mutateUpdate>[1]
        ) => mutateUpdate(record, options),
        [mutateUpdate]
    );

    const onDuplicate = useCallback(
        (
            { bookId, bookName }: NsEurekaCourseModifierService.DuplicateBook,
            options: Parameters<typeof mutateDuplicate>[1]
        ) => {
            mutateDuplicate({ bookId, bookName: `Duplicate - ${bookName}` }, options);
        },

        [mutateDuplicate]
    );

    return {
        isLoadingCreate,
        isLoadingUpdate,
        isLoadingDuplicate,
        onCreate,
        onUpdate,
        onDuplicate,
    };
};

export default useBookMutation;
