import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { NsUsermgmtStudentService } from "src/squads/user/service/usermgmt/student-service-usermgmt/types";

import { Grid } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import AccountInfo from "./AccountInfo";
import DialogAccountInfoFooter from "./DialogAccountInfoFooter";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";

type StudentDialogAccountInfo = {
    email?: NsUsermgmtStudentService.UserProfileResp["email"];
    password?: NsUsermgmtStudentService.CreateStudentResp["studentPassword"];
    userId?: NsUsermgmtStudentService.UserProfileResp["userId"];
};
export interface DialogAccountInfoProps {
    student?: StudentDialogAccountInfo;
    parents?: Pick<NsUsermgmtStudentService.CreateParentProfile, "email" | "password">[];
    title: DialogWithHeaderFooterProps["title"];
    description?: string;
    showDividerDashed?: boolean;
    open: boolean;
    onClose: () => void;
}

const DialogAccountInfo = ({
    student,
    parents,
    title,
    description,
    showDividerDashed = true,
    open,
    onClose,
}: DialogAccountInfoProps) => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);

    return (
        <DialogWithHeaderFooter
            onClose={onClose}
            open={open}
            data-testid="DialogStudentAccountInfo"
            title={title}
            footer={<DialogAccountInfoFooter onClose={onClose} />}
        >
            <Grid container spacing={2}>
                {description ? (
                    <Grid item xs={12}>
                        <TypographyTextSecondary variant="body1">
                            {description}
                        </TypographyTextSecondary>
                    </Grid>
                ) : null}
                {student ? (
                    <Grid container item xs={12}>
                        <Grid item xs={12}>
                            <TypographyBase
                                variant="subtitle2"
                                data-testid="DialogAccountInfo__typoStudent"
                            >
                                {tStudents("titles.student")}
                            </TypographyBase>
                        </Grid>
                        <Grid item xs={12}>
                            <AccountInfo
                                email={{
                                    label: tStudents("labels.email"),
                                    value: student?.email,
                                }}
                                password={{
                                    label: tStudents("labels.password"),
                                    value: student?.password,
                                }}
                            />
                        </Grid>
                    </Grid>
                ) : null}
                {showDividerDashed ? (
                    <Grid item xs={12}>
                        <DividerDashed />
                    </Grid>
                ) : null}
                {arrayHasItem(parents) ? (
                    <Grid container item xs={12} alignItems="center" justifyContent="space-between">
                        <Grid item xs={12}>
                            <TypographyBase
                                variant="subtitle2"
                                data-testid="DialogAccountInfo__typoParent"
                            >
                                {tStudents("titles.parent")}
                            </TypographyBase>
                        </Grid>
                        {(parents || []).map((parent) => (
                            <Grid item xs={12} key={parent.email}>
                                <AccountInfo
                                    email={{
                                        label: tStudents("labels.email"),
                                        value: parent?.email,
                                    }}
                                    password={{
                                        label: tStudents("labels.password"),
                                        value: parent?.password,
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : null}
            </Grid>
        </DialogWithHeaderFooter>
    );
};

export default DialogAccountInfo;
