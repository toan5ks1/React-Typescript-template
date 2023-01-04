import { useMemo, useCallback, useState } from "react";

import { useToggle } from "react-use";
import { ERPModules, MutationMenus, ModeOpenDialog } from "src/common/constants/enum";
import { convertString, getEnumString } from "src/common/constants/helper";
import { ParentUpdateInfo, StudentParentDataType } from "src/squads/user/common/types";
import { phoneNumberFormat } from "src/squads/user/common/utils/display";

import { Grid, Box } from "@mui/material";
import BackdropLoading from "src/components/Backdrops/BackdropLoading";
import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import ActionPanel, { Action } from "src/components/Menus/ActionPanel";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyWithValue, {
    TypographyWithValueProps,
} from "src/components/Typographys/TypographyWithValue";
import DialogAccountInfo from "src/squads/user/components/DialogAccountInfo";
import DialogUpsertParent from "src/squads/user/modules/student-family/components/DialogUpsertParent";

import { Country } from "manabuf/common/v1/enums_pb";
import { FamilyRelationship } from "manabuf/usermgmt/v2/enums_pb";

import useReissueUserPassword from "src/squads/user/hooks/useReissueUserPassword";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useRemoveParent from "src/squads/user/modules/student-family/hooks/useRemoveParent";

interface ParentInfoSchema
    extends Pick<
        TypographyWithValueProps,
        "label" | "value" | "xsLabel" | "xsValue" | "styleValue"
    > {}

interface GroupBoxParentInfo {
    childElements: ParentInfoSchema[];
}

export interface ParentItemProps {
    studentId: string;
    parents: StudentParentDataType[];
    parent: StudentParentDataType;
    index: number;
    refetchParents: () => void;
}

const ParentItem = ({ studentId, parents, parent, index, refetchParents }: ParentItemProps) => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const { reissueUserPassword } = useReissueUserPassword();
    const { removeParent } = useRemoveParent();
    const showSnackbar = useShowSnackbar();

    const [openDialogConfirmReIssuePassword, setOpenDialogConfirmReIssuePassword] =
        useToggle(false);
    const [openDialogConfirmRemoveParent, setOpenDialogConfirmRemoveParent] = useToggle(false);
    const [openDialogUpsertParent, setOpenDialogUpsertParent] = useToggle(false);
    const [openDialogAccountInfo, setOpenDialogAccountInfo] = useToggle(false);
    const [parentUpdate, setParentUpdate] = useState<ParentUpdateInfo>();
    const [newParentPassword, setNewParentPassword] = useState<string>("");
    const [isOverrideLoading, setOverrideLoading] = useState<boolean>(false);

    const actions: Action[] = useMemo(() => {
        return [
            { action: MutationMenus.EDIT },
            { action: MutationMenus.RE_ISSUE_PASSWORD },
            { action: MutationMenus.REMOVE, withConfirm: false },
        ];
    }, []);

    const defaultCountryCode: Country =
        Country[parent?.parent_user?.country || getEnumString(Country, Country.COUNTRY_JP)];

    const defaultRelationship: FamilyRelationship = (FamilyRelationship[parent.relationship] ||
        FamilyRelationship.FAMILY_RELATIONSHIP_FATHER) as FamilyRelationship;

    const handleReIssue = async () => {
        setOverrideLoading(true);
        setOpenDialogConfirmReIssuePassword(false);

        const resp = await reissueUserPassword({ userId: convertString(parent.parent_id) });

        if (resp?.successful) {
            setNewParentPassword(resp.newPassword);
            setOpenDialogAccountInfo(true);

            showSnackbar(tStudents("messages.success.reIssuePassword"));
        } else {
            showSnackbar(tStudents("messages.error.overrideUserPassword"), "error");
        }

        setOverrideLoading(false);
    };

    const handleRemoveParent = async () => {
        setOverrideLoading(true);
        setOpenDialogConfirmRemoveParent(false);

        await removeParent(
            { studentId, parentId: convertString(parent.parent_id) },
            {
                onSuccess: () => {
                    refetchParents();
                },
            }
        );

        setOverrideLoading(false);
    };

    const handleOpenDialogUpdateParent = () => {
        setParentUpdate({
            parent: {
                name: convertString(parent.parent_user?.name),
                email: convertString(parent?.parent_user?.email),
                phoneNumber: convertString(parent?.parent_user?.phone_number),
                userId: parent.parent_id,
                countryCode: defaultCountryCode,
                relationship: defaultRelationship,
            },
            index: index,
        });
        setOpenDialogUpsertParent(true);
    };

    const onMutation = (action: MutationMenus) => {
        switch (action) {
            case MutationMenus.RE_ISSUE_PASSWORD:
                return setOpenDialogConfirmReIssuePassword(true);
            case MutationMenus.EDIT:
                return handleOpenDialogUpdateParent();
            case MutationMenus.REMOVE:
                return setOpenDialogConfirmRemoveParent(true);
            default:
                return;
        }
    };

    const renderPhoneNumber = useCallback((parentUser?: StudentParentDataType["parent_user"]) => {
        if (!parentUser?.phone_number) return "";

        return phoneNumberFormat(parentUser.country, parentUser.phone_number);
    }, []);

    const renderRelationship = useCallback(
        (relationship: StudentParentDataType["relationship"]) => {
            if (!relationship) return "";

            return `${tStudents(`choices.relationship.${FamilyRelationship[relationship]}`)}`;
        },
        [tStudents]
    );

    const groupBoxParentInfo = useMemo<GroupBoxParentInfo[]>(
        () => [
            {
                childElements: [
                    {
                        value: convertString(parent.parent_user?.name),
                        label: tStudents(`labels.name`),
                        dataTestidValue: "ParentItem__Name",
                    },
                    {
                        value: renderRelationship(parent.relationship),
                        label: tStudents(`labels.relationship`),
                        dataTestidValue: "ParentItem__Relationship",
                    },
                ],
            },
            {
                childElements: [
                    {
                        value: renderPhoneNumber(parent.parent_user),
                        label: tStudents(`labels.phoneNumber`),
                        dataTestidValue: "ParentItem__PhoneNumber",
                    },
                    {
                        value: convertString(parent.parent_user?.email),
                        label: tStudents(`labels.email`),
                        dataTestidValue: "ParentItem__Email",
                    },
                ],
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSON.stringify(parent), renderRelationship, renderPhoneNumber]
    );

    const handleUpdateParentSuccess = () => {
        setOpenDialogUpsertParent(false);
        refetchParents();
    };

    return (
        <>
            <Box mb={3} data-testid="ParentItem__root" data-value={parent.parent_id}>
                <Box pb={2} display="flex" alignItems="center" justifyContent="space-between">
                    <TypographyBase data-testid="ParentItem__title" variant="subtitle1">
                        {tStudents("titles.parent")} #{index + 1}
                    </TypographyBase>
                    <ActionPanel
                        record={parent.parent_user}
                        recordName={parent.parent_user?.name}
                        actions={actions}
                        buttonStyle="circular"
                        onAction={onMutation}
                    />
                </Box>
                <Box data-testid="ParentItem__info">
                    {groupBoxParentInfo.map((group, index) => {
                        return (
                            <Box key={index} display="flex" flexDirection="row" pt={1} pb={1}>
                                {group.childElements.map(
                                    ({ value, label, ...rest }, indexChild) => (
                                        <Grid
                                            key={indexChild}
                                            container
                                            data-testid="ParentItem__infoItem"
                                        >
                                            <TypographyWithValue
                                                variant="horizontal"
                                                value={value}
                                                label={label}
                                                xsLabel={3}
                                                xsValue={8}
                                                dataTestidValue="ParentItem__columnValue"
                                                {...rest}
                                            />
                                        </Grid>
                                    )
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>
            {openDialogConfirmReIssuePassword ? (
                <DialogCancelConfirm
                    open={openDialogConfirmReIssuePassword}
                    onClose={() => setOpenDialogConfirmReIssuePassword(false)}
                    onSave={handleReIssue}
                    title={tStudents("titles.dialogConfirmReIssuePassword")}
                    textCancelDialog={`${tStudents("descriptions.dialogConfirmReIssuePassword", {
                        user: `${tStudents("titles.parent")}#${index + 1}`,
                    })}? ${tStudents("messages.warning.warningCurrentPasswordNoLongerBeValid")}`}
                />
            ) : null}
            {openDialogConfirmRemoveParent ? (
                <DialogCancelConfirm
                    open={openDialogConfirmRemoveParent}
                    onClose={() => setOpenDialogConfirmRemoveParent(false)}
                    onSave={handleRemoveParent}
                    title={tStudents("titles.dialogParentConfirmRemove")}
                    textCancelDialog={`${tStudents("descriptions.dialogParentConfirmRemove", {
                        parent: `${tStudents("titles.parent")}#${index + 1}`,
                    })}`}
                />
            ) : null}
            {openDialogUpsertParent ? (
                <DialogUpsertParent
                    mode={ModeOpenDialog.EDIT}
                    studentId={studentId}
                    parents={parents}
                    parentUpdate={parentUpdate}
                    open={openDialogUpsertParent}
                    onClose={() => setOpenDialogUpsertParent(false)}
                    onSuccess={handleUpdateParentSuccess}
                />
            ) : null}
            {openDialogAccountInfo ? (
                <DialogAccountInfo
                    parents={[
                        {
                            email: convertString(parent.parent_user?.email),
                            password: newParentPassword,
                        },
                    ]}
                    showDividerDashed={false}
                    title={tStudents("titles.dialogAccountInfo")}
                    open={openDialogAccountInfo}
                    onClose={() => setOpenDialogAccountInfo(false)}
                />
            ) : null}
            {isOverrideLoading ? <BackdropLoading open /> : null}
        </>
    );
};

export default ParentItem;
