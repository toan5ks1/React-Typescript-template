import { useCallback } from "react";

import { NotifyTypes, ProviderTypes } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { arrayHasItem, toArr } from "src/common/utils/other";
import { StudyPlanOneV2Query } from "src/squads/syllabus/services/eureka/eureka-types";
import { NsEurekaStudyPlanModifierService } from "src/squads/syllabus/services/eureka/study-plan-modifier-eureka/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { UseMutationOptions } from "src/squads/syllabus/services/service-creator";
import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import { StudyPlanStatus } from "manabuf/eureka/v1/enums_pb";

import logger from "../../internals/logger";
import { StudyPlanStatusKey } from "../../pages/StudyPlan/common/constants";
import useBasicContent from "../useBasicContent";
import useShowSnackbar from "../useShowSnackbar";

import useConvertGrade from "src/squads/syllabus/hooks/useConvertGrade";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { StudyPlanFormData } from "src/squads/syllabus/pages/StudyPlan/common/types";

export interface UseStudyPlanMutationProps {
    action: ProviderTypes.CREATE | ProviderTypes.UPDATE;
    courseId: string;
    studyPlanId: string | undefined;
}

export interface UseStudyPlanMutationReturn {
    createStudyPlan: (
        formData: StudyPlanFormData,
        options: UseMutationOptions<
            NsEurekaStudyPlanModifierService.UpsertStudyPlan,
            Promise<{ studyPlanId: string }>
        >
    ) => void;
    updateStudyPlan: (
        formData: StudyPlanFormData,
        options: UseMutationOptions<
            NsEurekaStudyPlanModifierService.UpsertStudyPlan,
            Promise<{ studyPlanId: string }>
        >
    ) => void;
    updateStudyPlanStatus: (
        data: ArrayElement<StudyPlanOneV2Query["study_plans"]>,
        options: UseMutationOptions<NsEurekaStudyPlanModifierService.UpsertStudyPlan, {}>
    ) => void;
    isLoadingBookMutation: boolean;
    isLoadingStudyPlanMutation: boolean;
    isLoadingStudyPlanArchive: boolean;
    isLoadingStudyPlanActivation: boolean;
}

const useStudyPlanMutation = (props: UseStudyPlanMutationProps) => {
    const { action, courseId, studyPlanId = "" } = props;
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const { school_id } = useBasicContent();
    const { convertGradeObjectsToArrayNumber } = useConvertGrade();

    const { mutate: mutateBook, isLoading: isLoadingBookMutation } = inferMutation({
        entity: "book",
        action: "syllabusBookAddToCourse",
    })({
        onError: (error) => {
            logger.error("add book to course failed", error);

            showSnackbar(
                t("resources.courses.studyPlan.messages.error.addBook"),
                NotifyTypes.ERROR
            );
        },
    });

    const { mutate: mutateStudyPlan, isLoading: isLoadingStudyPlanMutation } = inferMutation({
        entity: "studyPlan",
        action: "STUDY_PLAN_UPSERT",
    })({
        onSuccess: () => {
            const message =
                action === ProviderTypes.CREATE
                    ? "resources.courses.studyPlan.messages.success.addedStudyPlan"
                    : "resources.courses.studyPlan.messages.success.editedStudyPlan";

            showSnackbar(t(message), NotifyTypes.SUCCESS);
        },
        onError: (error) => {
            logger.error(`${action} study plan failed`, error);

            const message =
                action === ProviderTypes.CREATE
                    ? "resources.courses.studyPlan.messages.error.addStudyPlan"
                    : "resources.courses.studyPlan.messages.error.editStudyPlan";

            showSnackbar(t(message), NotifyTypes.ERROR);
        },
    });

    const { mutate: mutateArchiveStudyPlan, isLoading: isLoadingStudyPlanArchive } = inferMutation({
        entity: "studyPlan",
        action: "STUDY_PLAN_UPSERT",
    })({
        onSuccess: () => {
            showSnackbar(
                t("resources.courses.studyPlan.messages.success.archivedStudyPlan"),
                NotifyTypes.SUCCESS
            );
        },
        onError: (error) => {
            logger.error("archive study plan failed", error);

            showSnackbar(
                t("resources.courses.studyPlan.messages.error.archiveStudyPlan"),
                NotifyTypes.ERROR
            );
        },
    });

    const { mutate: mutateActivateStudyPlan, isLoading: isLoadingStudyPlanActivation } =
        inferMutation({
            entity: "studyPlan",
            action: "STUDY_PLAN_UPSERT",
        })({
            onSuccess: () => {
                showSnackbar(
                    t("resources.courses.studyPlan.messages.success.unarchivedStudyPlan"),
                    NotifyTypes.SUCCESS
                );
            },
            onError: (error) => {
                logger.error("unarchive study plan failed", error);

                showSnackbar(
                    t("resources.courses.studyPlan.messages.error.unarchiveStudyPlan"),
                    NotifyTypes.ERROR
                );
            },
        });

    const makePayloadByFormData = useCallback(
        (
            formData: StudyPlanFormData
        ): {
            payloadBook: NsSyllabus_Yasuo_CoursesService.AddBooksToCourse;
            payloadStudyPlan: NsEurekaStudyPlanModifierService.UpsertStudyPlan;
        } => {
            const { name, book, grades, trackSchoolProgress } = formData;

            const payloadBook: NsSyllabus_Yasuo_CoursesService.AddBooksToCourse = {
                courseId,
                bookIdsList: toArr(book!.book_id),
            };

            const statusActive = StudyPlanStatus[StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE];
            const payloadCreateStudyPlan: NsEurekaStudyPlanModifierService.UpsertStudyPlan = {
                name: name.trim(),
                bookId: book!.book_id,
                gradesList: convertGradeObjectsToArrayNumber(grades),
                schoolId: school_id,
                courseId,
                trackSchoolProgress,
                status: statusActive,
            };

            const payloadUpdateStudyPlan: NsEurekaStudyPlanModifierService.UpsertStudyPlan = {
                studyPlanId: { value: studyPlanId },
                ...payloadCreateStudyPlan,
            };

            const payloadStudyPlan: NsEurekaStudyPlanModifierService.UpsertStudyPlan =
                action === ProviderTypes.CREATE ? payloadCreateStudyPlan : payloadUpdateStudyPlan;

            return { payloadBook, payloadStudyPlan };
        },
        [action, convertGradeObjectsToArrayNumber, courseId, school_id, studyPlanId]
    );

    const makePayloadByData = useCallback(
        (
            data: ArrayElement<StudyPlanOneV2Query["study_plans"]>,
            statusKey: keyof typeof StudyPlanStatus
        ) => {
            const { name, book_id, grades, track_school_progress, course_id } = data;

            const payload: NsEurekaStudyPlanModifierService.UpsertStudyPlan = {
                studyPlanId: { value: studyPlanId },
                name: convertString(name),
                bookId: convertString(book_id),
                gradesList: arrayHasItem(grades) ? grades : [],
                schoolId: school_id,
                courseId: convertString(course_id),
                trackSchoolProgress: !!track_school_progress,
                status: StudyPlanStatus[statusKey],
            };

            return payload;
        },
        [school_id, studyPlanId]
    );

    const createStudyPlan = useCallback(
        (formData: StudyPlanFormData, options: Parameters<typeof mutateStudyPlan>[1]) => {
            if (isLoadingBookMutation || isLoadingStudyPlanMutation) return;

            const { payloadBook, payloadStudyPlan } = makePayloadByFormData(formData);

            mutateBook(payloadBook, {
                onSuccess: () => {
                    mutateStudyPlan(payloadStudyPlan, options);
                },
            });
        },
        [
            isLoadingBookMutation,
            isLoadingStudyPlanMutation,
            makePayloadByFormData,
            mutateBook,
            mutateStudyPlan,
        ]
    );

    const updateStudyPlan = useCallback(
        (formData: StudyPlanFormData, options: Parameters<typeof mutateStudyPlan>[1]) => {
            if (isLoadingStudyPlanMutation) return;

            const { payloadStudyPlan } = makePayloadByFormData(formData);

            mutateStudyPlan(payloadStudyPlan, options);
        },
        [isLoadingStudyPlanMutation, makePayloadByFormData, mutateStudyPlan]
    );

    const archiveStudyPlan: UseStudyPlanMutationReturn["updateStudyPlanStatus"] = useCallback(
        (data, options) => {
            if (isLoadingStudyPlanArchive) return;

            const payload = makePayloadByData(data, StudyPlanStatusKey.STUDY_PLAN_STATUS_ARCHIVED);

            mutateArchiveStudyPlan(payload, options);
        },
        [isLoadingStudyPlanArchive, makePayloadByData, mutateArchiveStudyPlan]
    );

    const activateStudyPlan: UseStudyPlanMutationReturn["updateStudyPlanStatus"] = useCallback(
        (data, options) => {
            if (isLoadingStudyPlanActivation) return;

            const payload = makePayloadByData(data, StudyPlanStatusKey.STUDY_PLAN_STATUS_ACTIVE);

            mutateActivateStudyPlan(payload, options);
        },
        [isLoadingStudyPlanActivation, makePayloadByData, mutateActivateStudyPlan]
    );

    return {
        createStudyPlan,
        updateStudyPlan,
        archiveStudyPlan,
        activateStudyPlan,
        isLoadingBookMutation,
        isLoadingStudyPlanMutation,
        isLoadingStudyPlanArchive,
        isLoadingStudyPlanActivation,
    };
};

export default useStudyPlanMutation;
