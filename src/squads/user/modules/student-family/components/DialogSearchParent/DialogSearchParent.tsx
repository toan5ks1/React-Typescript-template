import { ChangeEvent, useState } from "react";

import { useForm } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { availableFamilyRelationships } from "src/squads/user/common/constants/choices";
import {
    CreateParentFormProps,
    ParentSearch,
    StudentParentDataType,
} from "src/squads/user/common/types";

import { Grid, Box, Skeleton } from "@mui/material";
import BackdropLoading from "src/components/Backdrops/BackdropLoading";
import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";
import WrapperGrid from "src/components/Wrappers/WrapperGrid";
import FormSearchParent from "src/squads/user/modules/student-family/components/FormSearchParent";
import ParentsAutocomplete from "src/squads/user/modules/student-family/components/ParentsAutocomplete";

import { Country } from "manabie-bob/enum_pb";
import { FamilyRelationship } from "manabuf/usermgmt/v2/enums_pb";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useAddExistingParent from "src/squads/user/modules/student-family/hooks/useAddExistingParent";
import useParentRelationships from "src/squads/user/modules/student-family/hooks/useParentRelationships";

export interface DialogSearchParentProps {
    studentId: string;
    parents: StudentParentDataType[];
    open: boolean;
    onClose: () => void;
    onSuccess: (...args: any[]) => void;
}

const parseFamilyRelationship = (relationship: string) => {
    const familyRelationship = FamilyRelationship[relationship];
    const isAvailable = availableFamilyRelationships.includes(familyRelationship);

    return isAvailable ? familyRelationship : undefined;
};

const DialogSearchParent = (props: DialogSearchParentProps) => {
    const { open, studentId, parents, onClose, onSuccess } = props;

    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const { addExistingParent } = useAddExistingParent();

    const [parent, setParent] = useState<ParentSearch>();
    const methods = useForm<CreateParentFormProps>();
    const {
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = methods;

    const { isFetchingRelationship } = useParentRelationships(parent?.user_id, (relationship) => {
        if (!parent) return;

        reset({
            name: parent.name,
            userId: parent.user_id,
            email: parent.email,
            countryCode: Country.COUNTRY_JP,
            phoneNumber: parent.phone_number,
            relationship: parseFamilyRelationship(relationship),
        });
    });

    const onChangeParent = (
        _event: ChangeEvent<{}>,
        parent: ParentSearch | (string | ParentSearch)[] | null | string
    ) => {
        if (!parent) return;
        const parentSelected = parent as ParentSearch;
        setParent(parentSelected);
    };

    const onSubmit = async (formData: CreateParentFormProps) => {
        await addExistingParent(
            { formData, studentId },
            {
                onSuccess,
            }
        );
    };

    return (
        <DialogWithHeaderFooterHF
            onClose={onClose}
            open={open}
            title={tStudents("titles.dialogAddExistingParent")}
            onSave={handleSubmit(onSubmit)}
            methods={methods}
            data-testid="DialogSearchParent__root"
            footerConfirmButtonProps={{
                disabled: !parent || !parent.email,
            }}
        >
            {isSubmitting ? (
                <BackdropLoading open data-testid="DialogSearchParent__BackdropLoading" />
            ) : null}
            <WrapperGrid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box mt={1}>
                            <ParentsAutocomplete
                                onChange={onChangeParent}
                                parentProfilesList={parents}
                                getOptionSelectedField="user_id"
                            />
                        </Box>
                    </Grid>
                    {parent?.user_id ? (
                        <Grid item xs={12}>
                            {isFetchingRelationship ? (
                                <Skeleton height={100} />
                            ) : (
                                <Box mt={1}>
                                    <FormSearchParent />
                                </Box>
                            )}
                        </Grid>
                    ) : null}
                </Grid>
            </WrapperGrid>
        </DialogWithHeaderFooterHF>
    );
};

export default DialogSearchParent;
