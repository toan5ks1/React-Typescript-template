import { useMemo, useState } from "react";

import { useHistory } from "react-router";
import { ERPModules, ModeOpenDialog, MutationMenus } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { MicroFrontendTypes } from "src/routing/type";
import { choicesAddStudentType } from "src/squads/user/common/constants/choices";
import { AddStudentType, PdfStudentQrCodesTypes } from "src/squads/user/common/constants/enum";
import { hasDisabledCreateBulkOrder } from "src/squads/user/common/helpers/payment";
import { StudentWithoutGradeFrgV2Fragment } from "src/squads/user/service/bob/bob-types";

import Box from "@mui/material/Box";
import Loading from "src/components/Loading";
import ActionPanel, { Action } from "src/components/Menus/ActionPanel";
import FormFilterAdvancedStudent from "src/squads/user/modules/student-list/components/FormFilterAdvancedStudent";
import FormFilterStudent from "src/squads/user/modules/student-list/components/FormFilterStudent";

import ButtonAddStudentDropdown, {
    ButtonAddStudentDropdownProps,
} from "./ButtonAddStudentDropdown";

import useDialog from "src/squads/user/hooks/useDialog";
import useDownloadStudentQrUrls from "src/squads/user/hooks/useDownloadStudentQrUrls";
import useGenerateStudentQrPdf from "src/squads/user/hooks/useGenerateStudentQrPdf";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import { UseStudentFilterByCourseGradeReturn } from "src/squads/user/hooks/useStudentFilterByCourseGrade";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import ImportUserDialog, {
    ImportUsersDialogProps,
} from "src/squads/user/modules/import-user-csv/ImportUserDialog";
import { UseFilterStudentsReturn } from "src/squads/user/modules/student-list/hooks/useFilterStudents";
import useNormalizeGrades from "src/squads/user/modules/student-list/hooks/useNormalizeGrades";
import StudentUpsertDialog from "src/squads/user/modules/student-upsert/StudentUpsertDialog";

export interface StudentListNavbarProps extends UseFilterStudentsReturn {
    refetch: UseStudentFilterByCourseGradeReturn["refetchStudents"];
    selectedStudents: StudentWithoutGradeFrgV2Fragment[];
    onGenerate: () => void;
}

export const StudentListNavbar = ({
    filter,
    onFilter,
    onSearch,
    refetch,
    selectedStudents,
    onGenerate,
}: StudentListNavbarProps) => {
    const {
        open: openCreateStudent,
        onOpen: onOpenCreateStudent,
        onClose: onCloseCreateStudent,
    } = useDialog();
    const {
        open: openImportDialog,
        onOpen: onOpenImportDialog,
        onClose: onCloseImportDialog,
    } = useDialog();

    const [importMode, setImportMode] =
        useState<ImportUsersDialogProps["mode"]>("IMPORT_STUDENT_CSV");

    const tStudent = useResourceTranslate(ERPModules.STUDENTS);

    const shouldShowPrintPanel = useUserFeatureToggle("ENTRY_EXIT_MANAGEMENT");
    const shouldShowDownloadStudentQrUrls = useUserFeatureToggle(
        "ENTRY_EXIT_DOWNLOAD_STUDENT_QR_URLS"
    );

    const shouldDisplaySchoolFormFilter = useUserFeatureToggle("STUDENT_MANAGEMENT_SCHOOL_HISTORY");
    const { generatePdf, isLoading: isGeneratePdfLoading } = useGenerateStudentQrPdf(
        selectedStudents,
        onGenerate
    );
    const { downloadQrCsv, isLoading: isDownloadQrCsvLoading } = useDownloadStudentQrUrls(
        selectedStudents,
        onGenerate
    );

    // PAYMENT BULK ORDER FEATURE
    const shouldShowBulkOrderAction = useUserFeatureToggle("PAYMENT_ORDER_MANAGEMENT_BULK_ORDER");
    const history = useHistory();
    const onCreateBulkOrder = () => {
        const queryWithStudentIds = selectedStudents.reduce((query, student) => {
            return `${query}&studentId=${student.user_id}`;
        }, "");
        history.push({
            pathname: `/${MicroFrontendTypes.PAYMENT}/orders/create_bulk`,
            search: `redirectUrl=${location.pathname}${location.search}&${queryWithStudentIds}`,
        });
    };
    const studentArrayIds: string[] = selectedStudents.map((student) => student.user_id);
    const { mapGrades: mapGradeOfStudents } = useNormalizeGrades(studentArrayIds);

    const actions: Action[] = useMemo(() => {
        return [
            ...(shouldShowPrintPanel
                ? [
                      MutationMenus.PRINT_AS_STUDENT_CARD,
                      MutationMenus.PRINT_AS_QR_CODE_SHEET,
                      ...(shouldShowDownloadStudentQrUrls
                          ? [MutationMenus.DOWNLOAD_STUDENT_QR_URLS]
                          : []),
                  ]
                : []),
            MutationMenus.IMPORT_PARENTS,
            ...(shouldShowBulkOrderAction ? [MutationMenus.PAYMENT_CREATE_BULK_ORDER] : []),
        ];
    }, [shouldShowPrintPanel, shouldShowDownloadStudentQrUrls, shouldShowBulkOrderAction]);

    const onMutation = async (action: MutationMenus) => {
        switch (action) {
            case MutationMenus.PRINT_AS_STUDENT_CARD: {
                await generatePdf(PdfStudentQrCodesTypes.STUDENT_CARD);
                break;
            }

            case MutationMenus.PRINT_AS_QR_CODE_SHEET: {
                await generatePdf(PdfStudentQrCodesTypes.QR_CODE_SHEET);
                break;
            }

            case MutationMenus.DOWNLOAD_STUDENT_QR_URLS: {
                await downloadQrCsv();
                break;
            }

            case MutationMenus.PAYMENT_CREATE_BULK_ORDER: {
                onCreateBulkOrder();
                break;
            }

            case MutationMenus.IMPORT_PARENTS: {
                setImportMode("IMPORT_PARENT_CSV");
                onOpenImportDialog();
                break;
            }
        }
    };

    const handleAddStudent = (type: ArrayElement<ButtonAddStudentDropdownProps["options"]>) => {
        switch (type.id) {
            case AddStudentType.NORMAL_ADD:
                onOpenCreateStudent();
                break;
            case AddStudentType.IMPORT_STUDENT_CSV:
                {
                    setImportMode("IMPORT_STUDENT_CSV");
                    onOpenImportDialog();
                }

                break;
            default:
                throw new Error("Can't find option add student");
        }
    };

    return (
        <>
            {isGeneratePdfLoading || isDownloadQrCsvLoading ? (
                <Box
                    sx={(theme) => ({
                        position: "fixed",
                        top: 0,
                        left: 0,
                        background: theme.palette.common.white,
                        opacity: 0.8,
                        zIndex: 2,
                    })}
                >
                    <Loading fullscreen />
                </Box>
            ) : null}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="start"
                data-testid="StudentListNavbar__root"
            >
                {shouldDisplaySchoolFormFilter ? (
                    <FormFilterStudent
                        valueFilters={filter}
                        onApplySubmit={onFilter}
                        onEnterSearchBar={onSearch}
                    />
                ) : (
                    <FormFilterAdvancedStudent
                        defaultFilters={filter}
                        onApplySubmit={onFilter}
                        onEnterSearchBar={onSearch}
                    />
                )}

                <Box display="flex" alignItems="center">
                    <ButtonAddStudentDropdown
                        label={tStudent("labels.addStudentByImport")}
                        options={choicesAddStudentType}
                        onClick={handleAddStudent}
                    />

                    {shouldShowPrintPanel ? (
                        <Box ml={2}>
                            <ActionPanel
                                record={[]}
                                recordName="name"
                                buttonStyle="square"
                                actions={actions}
                                disables={{
                                    printAsStudentCard: !selectedStudents.length,
                                    printAsQrCodeSheet: !selectedStudents.length,
                                    downloadStudentQrUrls: !selectedStudents.length,
                                    createBulkOrder: hasDisabledCreateBulkOrder({
                                        selectedStudents,
                                        mapGradeOfStudents,
                                    }),
                                }}
                                onAction={onMutation}
                            />
                        </Box>
                    ) : null}
                </Box>
            </Box>
            {openCreateStudent ? (
                <StudentUpsertDialog
                    open={openCreateStudent}
                    mode={ModeOpenDialog.ADD}
                    onClose={onCloseCreateStudent}
                    onSuccess={refetch}
                />
            ) : null}
            {openImportDialog ? (
                <ImportUserDialog
                    open={openImportDialog}
                    onClose={onCloseImportDialog}
                    mode={importMode}
                />
            ) : null}
        </>
    );
};
export default StudentListNavbar;
