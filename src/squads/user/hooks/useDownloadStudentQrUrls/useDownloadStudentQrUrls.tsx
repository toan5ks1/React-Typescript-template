import { useCallback, useState } from "react";

import { unparse as convertToCSV } from "papaparse";
import { Entities, NotifyTypes } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { inferQueryEntryExitMgmt } from "src/squads/adobo/domains/entry-exit/services/infer-service";
import {
    StudentWithoutGradeFrgFragment,
    EntryExit_StudentQrCodeByStudentIdsV2Query,
} from "src/squads/user/service/bob/bob-types";
import { inferQuery, inferMutation } from "src/squads/user/service/infer-service";

import useUserFeatureToggle from "../useUserFeatureFlag";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface IStudentQr
    extends ArrayElement<EntryExit_StudentQrCodeByStudentIdsV2Query["student_qr"]> {}

const useDownloadStudentQrUrls = (
    selectedStudents: StudentWithoutGradeFrgFragment[],
    onGenerate: () => void
) => {
    const t = useTranslate();
    const tEntryExit = useResourceTranslate(Entities.ENTRY_EXIT);
    const showSnackbar = useShowSnackbar();

    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingQr, setIsGeneratingQr] = useState(false);

    const selectedStudentsIds = selectedStudents.map((student) => student.user_id);
    const shouldUseEntryExitMgmtQueries = useUserFeatureToggle(
        "ENTRY_EXIT_MANAGEMENT_USE_ENTRYEXITMGMT_QUERIES"
    );

    const inferQueryV2 = shouldUseEntryExitMgmtQueries
        ? inferQueryEntryExitMgmt({
              entity: "studentEntryExit",
              action: "entryExitGetManyStudentQrByStudentIds",
          })
        : inferQuery({
              entity: "studentEntryExit",
              action: "entryExitGetManyStudentQrByStudentIds",
          });

    const { data: studentQrCodes = [], refetch: refetchStudentQRCodes } = inferQueryV2(
        {
            filter: {
                student_ids: selectedStudentsIds,
            },
        },
        {
            enabled: arrayHasItem(selectedStudents),
            onSuccess: async () => {
                if (isGeneratingQr) {
                    await downloadQrCsv();
                }
            },
            onError: (error) => {
                window.warner?.warn(`useGenerateStudentQrPdf get student-qr-codes`, error);
                showSnackbar(t("ra.manabie-error.unableToRetrieveQRCodes"), "error");
            },
        }
    );

    const { mutate: generateStudentsQRCodes } = inferMutation({
        entity: "studentEntryExit",
        action: "GENERATE_STUDENT_QR_CODES",
    })({
        onSuccess: () => {
            void refetchStudentQRCodes();
        },
        onError: (error) => {
            window.warner?.warn(`useGenerateStudentQrPdf generate students qr codes`, error);
            showSnackbar(t("ra.manabie-error.unableToGenerateStudentQRs"), "error");
        },
    });

    const downloadQrCsv = useCallback(async () => {
        setIsLoading(true);
        const studentsIdsWithoutQRs = selectedStudents
            .filter((selected) => !studentQrCodes.some((qr) => qr.student_id === selected.user_id))
            .map((student) => student.user_id);

        // TODO: Get v2 from enum
        const studentsIdsLegacyVersion = studentQrCodes
            .filter((qr) => qr.version !== "v2")
            .map((student) => student.student_id);

        const studentsIdsForUpdating = [...studentsIdsWithoutQRs, ...studentsIdsLegacyVersion];

        if (studentsIdsForUpdating.length) {
            setIsGeneratingQr(true);
            generateStudentsQRCodes({ studentIdsList: studentsIdsForUpdating });
        } else {
            setIsGeneratingQr(false);
            const studentQrMap = new Map();
            studentQrCodes?.map((sqr) => {
                studentQrMap.set(sqr.student_id, sqr.qr_url);
            });

            const selectedStudentsQrInfo = selectedStudents.map((student) => {
                return {
                    name: student.name,
                    qr_url: studentQrMap?.get(student.user_id),
                };
            });

            try {
                const studentQrsCsv = convertToCSV(selectedStudentsQrInfo);

                const csvData = new Blob([studentQrsCsv], { type: "text/csv;charset=utf-8;" });
                const csvUrl = window.URL.createObjectURL(csvData);

                const tempLink = document.createElement("a");
                tempLink.href = csvUrl;
                tempLink.setAttribute("download", "students-qr-urls.csv");
                tempLink.click();
                setIsLoading(false);
                onGenerate();
                showSnackbar(tEntryExit("downloadQrUrls.message.success"), NotifyTypes.SUCCESS);
            } catch (err) {
                showSnackbar(tEntryExit("downloadQrUrls.message.failed"), NotifyTypes.ERROR);
            }

            return;
        }
    }, [
        generateStudentsQRCodes,
        onGenerate,
        selectedStudents,
        showSnackbar,
        studentQrCodes,
        tEntryExit,
    ]);

    return { downloadQrCsv, isLoading };
};

export default useDownloadStudentQrUrls;
