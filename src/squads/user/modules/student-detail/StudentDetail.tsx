import { useMemo, useState } from "react";

import { Redirect, useHistory, useLocation } from "react-router";
import { useToggle } from "react-use";
import { ERPModules, ModeOpenDialog, MutationMenus } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { MicroFrontendTypes } from "src/routing/type";
import StudentEntryExit from "src/squads/adobo/domains/entry-exit/modules/student-entryexit";
import { StudentCourse } from "src/squads/user/modules/student-course";
import { HeaderStudentDetail } from "src/squads/user/modules/student-detail/components";
import StudentFamily from "src/squads/user/modules/student-family";
import { mockStudentContact } from "src/squads/user/test-utils/mocks/contact-phone-number";

import { Tab, Box } from "@mui/material";
import BackdropLoading from "src/components/Backdrops/BackdropLoading";
import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";
import TabLayout from "src/components/Tabs/TabLayout";
import StudentBilling from "src/squads/payment/domains/OrderManagement/components/StudentBillingTab";
import DialogAccountInfo from "src/squads/user/components/DialogAccountInfo";

import StudentUpsertDialog from "../student-upsert/StudentUpsertDialog";
import { StudentDetailInfoContainer } from "./StudentDetailInfoContainer";
import useStudentDetailHomeAddress from "./hooks/useStudentDetailHomeAddress";

import StudentInvoice from "src/squads/adobo/domains/invoice/pages/student-invoice/StudentInvoice";
import { useStudentDetailContext } from "src/squads/user/contexts/StudentDetailContext";
import useReissueUserPassword from "src/squads/user/hooks/useReissueUserPassword";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import { MapTabReturns } from "src/squads/user/hooks/useTabs";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

export const StudentDetail = () => {
    const history = useHistory();
    const location = useLocation();
    const { studentId, student, isLoading: isLoadingStudent, refetch } = useStudentDetailContext();
    const { homeAddress } = useStudentDetailHomeAddress(studentId);

    const { reissueUserPassword } = useReissueUserPassword();

    const tStudent = useResourceTranslate(ERPModules.STUDENTS);
    const showSnackbar = useShowSnackbar();

    const [openDialogEdit, setOpenDialogEdit] = useToggle(false);
    const [openDialogReIssuePassword, setOpenDialogReIssuePassword] = useToggle(false);
    const [openDialogConfirm, setOpenDialogConfirm] = useToggle(false);

    const [loadingOverride, setLoadingOverride] = useState<boolean>(false);
    const [userPassword, setUserPassword] = useState<string>("");

    const shouldShowEntryExitTab = useUserFeatureToggle("ENTRY_EXIT_MANAGEMENT");
    const shouldShowBillingTab = useUserFeatureToggle("PAYMENT_ORDER_MANAGEMENT_STUDENT_BILLING");
    const shouldShowInvoiceTab = useUserFeatureToggle("MANUAL_INVOICE");

    // ReIssue password
    const handleReIssue = async () => {
        setLoadingOverride(true);
        setOpenDialogConfirm(false);

        const resp = await reissueUserPassword({ userId: student?.student_id || "" });

        if (resp?.successful) {
            setUserPassword(resp.newPassword);
            setOpenDialogReIssuePassword(true);

            showSnackbar(tStudent("messages.success.overrideUserPassword"));
        } else {
            showSnackbar(tStudent("messages.error.overrideUserPassword"), "error");
        }
        setLoadingOverride(false);
    };

    // Actions header
    const onAction = (action: MutationMenus) => {
        switch (action) {
            case MutationMenus.RE_ISSUE_PASSWORD:
                return setOpenDialogConfirm(true);
            case MutationMenus.PAYMENT_CREATE_NEW_ORDER: {
                // TODO: refactor by payment squad if needed
                history.push({
                    pathname: `/${MicroFrontendTypes.PAYMENT}/orders/create`,
                    search: `?studentId=${student?.student_id}&redirectUrl=${location.pathname}${location.search}`,
                });
                break;
            }
            case MutationMenus.PAYMENT_CREATE_ENROLLMENT_ORDER: {
                // TODO: [LT-12919] check if all required information of student are filled
                // If not, show warning and not push to create enrollment route
                history.push({
                    pathname: `/${MicroFrontendTypes.PAYMENT}/orders/create_enrollment`,
                    search: `?studentId=${student?.student_id}&redirectUrl=${location.pathname}${location.search}`,
                });
                break;
            }
            case MutationMenus.PAYMENT_CREATE_CUSTOM_BILLING_ORDER: {
                history.push({
                    pathname: `/${MicroFrontendTypes.PAYMENT}/orders/create_custom_billing`,
                    search: `?studentId=${student?.student_id}&redirectUrl=${location.pathname}${location.search}`,
                });
                break;
            }
            default: {
                return;
            }
        }
    };

    const mapTabs = useMemo((): MapTabReturns[] => {
        return [
            {
                tabName: <Tab label={tStudent("titles.detail")} />,
                tabPanel: (
                    <StudentDetailInfoContainer
                        student={student}
                        homeAddress={homeAddress}
                        contactInfo={mockStudentContact}
                        onClickEdit={() => setOpenDialogEdit(true)}
                    />
                ),
            },
            {
                tabName: <Tab label={tStudent("titles.family")} />,
                tabPanel: <StudentFamily studentId={studentId} />,
            },
            {
                tabName: <Tab label={tStudent("titles.course")} />,
                tabPanel: <StudentCourse id={studentId} />,
            },
            ...(shouldShowEntryExitTab
                ? [
                      {
                          tabName: <Tab label={tStudent("titles.entryExit")} />,
                          tabPanel: (
                              <StudentEntryExit
                                  studentId={studentId}
                                  enrollmentStatus={student?.enrollment_status}
                              />
                          ),
                      },
                  ]
                : []),
            ...(shouldShowBillingTab
                ? [
                      {
                          tabName: <Tab label={tStudent("titles.billing")} />,
                          tabPanel: <StudentBilling />,
                      },
                  ]
                : []),
            ...(shouldShowInvoiceTab
                ? [
                      {
                          tabName: <Tab label={tStudent("titles.invoice")} />,
                          tabPanel: <StudentInvoice studentId={studentId} />,
                      },
                  ]
                : []),
        ];
    }, [
        tStudent,
        student,
        homeAddress,
        studentId,
        shouldShowEntryExitTab,
        shouldShowBillingTab,
        shouldShowInvoiceTab,
        setOpenDialogEdit,
    ]);

    if (!studentId) return <Redirect to={`/${MicroFrontendTypes.USER}/${ERPModules.STUDENTS}`} />;

    if (isLoadingStudent) return <Loading />;

    if (!student) return <NotFound data-testid="NotFound__root" />;

    return (
        <Box data-testid="StudentDetail">
            <HeaderStudentDetail
                student={student}
                isLoading={isLoadingStudent}
                onAction={onAction}
            />

            <TabLayout mapTabs={mapTabs} hasDivider />

            {loadingOverride ? <BackdropLoading open /> : null}
            {openDialogEdit ? (
                <StudentUpsertDialog
                    open={openDialogEdit}
                    mode={ModeOpenDialog.EDIT}
                    onClose={() => setOpenDialogEdit(false)}
                    onSuccess={() => refetch()}
                    student={student}
                />
            ) : null}

            <DialogCancelConfirm
                open={openDialogConfirm}
                onClose={() => setOpenDialogConfirm(false)}
                onSave={handleReIssue}
                title={tStudent("titles.dialogConfirmReIssuePassword")}
                textCancelDialog={`${tStudent("descriptions.dialogConfirmReIssuePassword", {
                    user: "student",
                })}? ${tStudent("messages.warning.warningCurrentPasswordNoLongerBeValid")}`}
            />

            {openDialogReIssuePassword ? (
                <DialogAccountInfo
                    student={{
                        email: convertString(student?.user?.email),
                        password: userPassword,
                    }}
                    showDividerDashed={false}
                    title={tStudent("titles.dialogStudentAccountInfo")}
                    description={tStudent("descriptions.dialogStudentAccountInfo")}
                    open={openDialogReIssuePassword}
                    onClose={() => setOpenDialogReIssuePassword(false)}
                />
            ) : null}
        </Box>
    );
};
