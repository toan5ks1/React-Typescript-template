import { useCallback, useState } from "react";

import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem, handleOpenNewTab } from "src/common/utils/other";
import { inferQueryEntryExitMgmt } from "src/squads/adobo/domains/entry-exit/services/infer-service";
import { PdfStudentQrCodesTypes } from "src/squads/user/common/constants/enum";
import {
    StudentWithoutGradeFrgFragment,
    EntryExit_StudentQrCodeByStudentIdsV2Query,
} from "src/squads/user/service/bob/bob-types";
import { inferQuery, inferMutation } from "src/squads/user/service/infer-service";

import PdfStudentQrCodes from "src/squads/user/components/PdfStudentQrCodes";

import ReactPDF from "@react-pdf/renderer";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

export interface IStudentQr
    extends ArrayElement<EntryExit_StudentQrCodeByStudentIdsV2Query["student_qr"]> {}
export interface UseGenerateStudentQrPdfReturn {
    generatePdf: (pdfType: PdfStudentQrCodesTypes) => void;
    isLoading: boolean;
}

const useGenerateStudentQrPdf = (
    selectedStudents: StudentWithoutGradeFrgFragment[],
    onGenerate: () => void
): UseGenerateStudentQrPdfReturn => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();
    const shouldUpdateStudentQrUrls = useUserFeatureToggle("ENTRY_EXIT_UPDATE_QRS_TO_V2");
    const shouldUseEntryExitMgmtQueries = useUserFeatureToggle(
        "ENTRY_EXIT_MANAGEMENT_USE_ENTRYEXITMGMT_QUERIES"
    );

    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingQr, setIsGeneratingQr] = useState(false);
    const [generatingQrPdfType, setGeneratingQrPdfType] = useState<PdfStudentQrCodesTypes>(
        PdfStudentQrCodesTypes.STUDENT_CARD
    );

    const selectedStudentsIds = selectedStudents.map((student) => student.user_id);

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
                    await generatePdf(generatingQrPdfType);
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
        onSuccess: async (res) => {
            if (res.qrCodesList.length) {
                await refetchStudentQRCodes();
            }
        },
        onError: (error) => {
            window.warner?.warn(`useGenerateStudentQrPdf generate students qr codes`, error);
            showSnackbar(t("ra.manabie-error.unableToGenerateStudentQRs"), "error");
        },
    });

    const generatePdf = useCallback(
        async (pdfType: PdfStudentQrCodesTypes) => {
            setIsLoading(true);
            const studentsIdsWithoutQRs = selectedStudents
                .filter(
                    (selected) => !studentQrCodes.some((qr) => qr.student_id === selected.user_id)
                )
                .map((student) => student.user_id);

            // TODO: Get v2 from enum
            const studentsIdsLegacyVersion = studentQrCodes
                .filter((qr) => qr.version !== "v2")
                .map((student) => student.student_id);

            const studentsIdsForUpdating = [...studentsIdsWithoutQRs, ...studentsIdsLegacyVersion];

            const studentIdsList = shouldUpdateStudentQrUrls
                ? studentsIdsForUpdating
                : studentsIdsWithoutQRs;

            if (studentIdsList.length) {
                setIsGeneratingQr(true);
                setGeneratingQrPdfType(pdfType);
                generateStudentsQRCodes({
                    studentIdsList,
                });
            } else {
                setIsGeneratingQr(false);
                const studentQrMap = new Map();
                studentQrCodes?.map((sqr) => {
                    studentQrMap.set(sqr.student_id, sqr.qr_url);
                });

                // TODO: Sort descending based on created_at
                const selectedStudentsQrInfo = selectedStudents.map((student) => {
                    return {
                        student_id: student.user_id,
                        name: student.name,
                        qr_url: studentQrMap?.get(student.user_id),
                    };
                });

                const pdfUrl = ReactPDF.pdf(
                    <PdfStudentQrCodes
                        selectedStudentsQrInfo={selectedStudentsQrInfo}
                        pdfType={pdfType}
                    />
                );

                const blobPdfUrl = await pdfUrl.toBlob();
                const blobUrl = window.URL.createObjectURL(blobPdfUrl);

                handleOpenNewTab(blobUrl);
                setIsLoading(false);
                onGenerate();

                return;
            }
        },
        [
            generateStudentsQRCodes,
            onGenerate,
            selectedStudents,
            shouldUpdateStudentQrUrls,
            studentQrCodes,
        ]
    );

    return { generatePdf, isLoading };
};

export default useGenerateStudentQrPdf;
