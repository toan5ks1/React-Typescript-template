import { useCallback } from "react";

import {
    DeleteLessonReportRequestType,
    WriteLessonReportRequestType,
} from "src/squads/lesson/service/bob/lesson-reports-service/types";
import inferMutation from "src/squads/lesson/service/infer-mutation";

import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export type WriteLessonReportProps = {
    data: WriteLessonReportRequestType;
    onSuccess?: () => void;
    onError?: () => void;
};

export type DeleteLessonReportProps = {
    data: DeleteLessonReportRequestType;
    onSuccess?: () => void;
    onError?: () => void;
};

export type UseMutationLessonIndividualReportReturn = {
    upsertLessonReport: (props: WriteLessonReportProps) => void;
    isSubmittingLessonReport: boolean;
    saveDraftLessonReport: (props: WriteLessonReportProps) => void;
    isSavingDraftLessonReport: boolean;
    deleteLessonReport: (props: DeleteLessonReportProps) => Promise<void>;
};

const useMutationLessonIndividualReport = (): UseMutationLessonIndividualReportReturn => {
    const t = useTranslate();
    const showSnackBar = useShowSnackbar();

    const { mutate: mutateWriteLessonReport, isLoading: isSubmittingLessonReport } = inferMutation({
        entity: "lessonReports",
        action: "lessonReportsSubmit",
    })();

    const { mutate: mutateSaveDraftLessonReport, isLoading: isSavingDraftLessonReport } =
        inferMutation({
            entity: "lessonReports",
            action: "lessonReportsSaveDraft",
        })();

    // Currently all our customers don't need Delete Report feature
    // https://manabie.atlassian.net/browse/LT-8942
    const { mutateAsync: mutateDeleteLessonReport } = inferMutation({
        entity: "lessonReports",
        action: "lessonReportsDelete",
    })();

    const upsertLessonReport = useCallback(
        (props: WriteLessonReportProps) => {
            const { data, onSuccess, onError } = props;
            mutateWriteLessonReport(
                { data },
                {
                    onSuccess,
                    onError: (error) => {
                        showSnackBar(t("ra.manabie-error.unknown"), "error");
                        window.warner?.warn(
                            "[useMutationLessonIndividualReport] [upsertLessonReport]: ",
                            error
                        );

                        onError?.();
                    },
                }
            );
        },
        [mutateWriteLessonReport, showSnackBar, t]
    );

    const saveDraftLessonReport = useCallback(
        (props: WriteLessonReportProps) => {
            const { data, onSuccess, onError } = props;

            mutateSaveDraftLessonReport(
                { data },
                {
                    onSuccess,
                    onError: (error) => {
                        showSnackBar(t("ra.manabie-error.unknown"), "error");
                        window.warner?.warn(
                            "[useMutationLessonIndividualReport] [saveDraftLessonReport]: ",
                            error
                        );

                        onError?.();
                    },
                }
            );
        },
        [mutateSaveDraftLessonReport, showSnackBar, t]
    );

    const deleteLessonReport = useCallback(
        async (props: DeleteLessonReportProps) => {
            const { data, onSuccess, onError } = props;

            await mutateDeleteLessonReport(
                { data },
                {
                    onSuccess,
                    onError: (error) => {
                        showSnackBar(t("ra.manabie-error.unknown"), "error");
                        window.warner?.warn(
                            "[useMutationLessonIndividualReport] [deleteLessonReport]: ",
                            error
                        );

                        onError?.();
                    },
                }
            );
        },
        [mutateDeleteLessonReport, showSnackBar, t]
    );

    return {
        upsertLessonReport,
        isSubmittingLessonReport,
        saveDraftLessonReport,
        isSavingDraftLessonReport,
        deleteLessonReport,
    };
};

export default useMutationLessonIndividualReport;
