import { useMemo, ReactNode, useCallback } from "react";

import { compact } from "lodash";
import { useFormContext } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { LocationInformation } from "src/squads/user/common/types";
import type { GrantedPermission, Role } from "src/squads/user/common/types/user-group";
import { inferQuery } from "src/squads/user/service/infer-service";

import { FilterOptionsState } from "@mui/material";
import { autocompleteClasses } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { checkboxClasses } from "@mui/material/Checkbox";
import { inputBaseClasses } from "@mui/material/InputBase";
import { svgIconClasses } from "@mui/material/SvgIcon";
import AutocompleteHF from "src/components/Autocompletes/AutocompleteHF";
import TableWithCheckbox from "src/components/Table/TableWithCheckbox";
import LocationSelectInputHF from "src/squads/user/components/LocationSelectInputHF";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import useFetchLocations from "src/squads/user/modules/user-group-upsert/hooks/useFetchLocations";
import { UseGrantedPermissionFieldArrayReturn } from "src/squads/user/modules/user-group-upsert/hooks/useGrantedPermissionFieldArray";
import useValidateGrantedPermissions from "src/squads/user/modules/user-group-upsert/hooks/useValidateGrantedPermissions";

interface GrantedPermissionTableProps {
    grantedPermissions: GrantedPermission[];
    errorMessage?: string | ReactNode;
    onSelect?: (data: GrantedPermission[]) => void;
    listSelectedItems?: GrantedPermission[];
    updateRow: UseGrantedPermissionFieldArrayReturn["update"];
}
const sx = {
    locations: {
        [`& .${autocompleteClasses.clearIndicator}`]: {
            visibility: "visible",
        },
        [`&.${autocompleteClasses.hasClearIcon} .${inputBaseClasses.root}`]: {
            paddingRight: 5,
        },
    },
    tableCheckbox: {
        [`& .${checkboxClasses.root} .${svgIconClasses.root}`]: {
            fontSize: "1.25rem",
        },
    },
};
export const GrantedPermissionUpsertTable = (props: GrantedPermissionTableProps) => {
    const { grantedPermissions, onSelect, updateRow, listSelectedItems } = props;
    const tUserGroup = useResourceTranslate(ERPModules.USER_GROUP);
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const isAllowShowAllRole = useUserFeatureToggle("USER_GROUP_SHOW_ALL_ROLE");

    const {
        trigger,
        formState: { errors, isSubmitted },
    } = useFormContext();
    const { data: roles = [], isLoading } = inferQuery({
        entity: "role",
        action: isAllowShowAllRole
            ? "userGetManyRoleByIsSystem"
            : "userGetTeacherAndSchoolAdminRoleByIsSystem",
    })(
        {},
        {
            onError(error) {
                window.warner?.warn(`Fetch roles data`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    const { treeLocations, isLoading: isLoadingLocations } = useFetchLocations();

    const roleOptions = useMemo(
        () =>
            isLoading || isLoadingLocations
                ? []
                : roles.concat({
                      role_id: "",
                      role_name: "",
                  }),
        [isLoading, isLoadingLocations, roles]
    );

    const getOptionEqualToValue = (option: Role, value: Role) => option.role_id === value.role_id;

    const getOptionDisabled = useCallback(
        (option: Role) =>
            grantedPermissions.findIndex(({ role }) => role?.role_id === option.role_id) >= 0,
        [grantedPermissions]
    );

    const filterOptions = (options: Role[], _: FilterOptionsState<Role>) => {
        const newOptions = options.filter((option) => !!option.role_id);
        return newOptions;
    };

    const handleChangeRole = useCallback(
        async (record: GrantedPermission, value: Role, index: number) => {
            if (value.role_name === "School Admin") {
                updateRow(index, {
                    ...record,
                    role: value,
                    locations: [treeLocations],
                });
            } else {
                const schoolAdminIndex = grantedPermissions.findIndex(
                    (grantedPermission) => grantedPermission.role.role_name === "School Admin"
                );
                updateRow(index, {
                    ...record,
                    role: value,
                    locations: schoolAdminIndex === index ? [] : record.locations,
                });
            }
            if (isSubmitted) await trigger(`grantedPermissionPackage.${index}.locations`);
        },
        [grantedPermissions, isSubmitted, treeLocations, trigger, updateRow]
    );

    const handleChangeLocations = useCallback(
        (record: GrantedPermission, index?: number) => {
            if (typeof index === "undefined") return;
            return async (locations: LocationInformation[]) => {
                updateRow(index, {
                    ...record,
                    locations,
                });
                if (isSubmitted) await trigger(`grantedPermissionPackage.${index}.locations`);
            };
        },
        [isSubmitted, trigger, updateRow]
    );

    const { validate } = useValidateGrantedPermissions();

    const errorMessage = useMemo(() => {
        return errors.grantedPermissionPackage?.length ? t("ra.validation.requiredAll") : "";
    }, [errors.grantedPermissionPackage, t]);

    const columns = useMemo(() => {
        return compact([
            {
                key: "grantedRole",
                title: tUserGroup("labels.grantedRole"),
                render: (record: GrantedPermission, index?: number) => {
                    return (
                        <AutocompleteHF
                            name={`grantedPermissionPackage.${index}.role`}
                            placeholder={tUserGroup("labels.selectRole")}
                            size="small"
                            data-testid="UserGroupUpsertTable__grantedRole"
                            multiple={false}
                            rules={{ validate: validate.role }}
                            optionLabelKey="role_name"
                            disableClearable
                            limitChipText="Ellipsis"
                            key={record.role.role_id}
                            options={roleOptions}
                            id="GrantedRoleAutocompleteHF__autocomplete"
                            getOptionSelectedField="role_id"
                            loading={isLoading || isLoadingLocations}
                            isOptionEqualToValue={getOptionEqualToValue}
                            getOptionDisabled={getOptionDisabled}
                            onChange={async (_e, value) => {
                                if (typeof index === "undefined") return;
                                await handleChangeRole(record, value as Role, index);
                            }}
                            shouldShowHelperText={false}
                            filterOptions={filterOptions}
                        />
                    );
                },
                cellProps: {
                    headerStyle: {
                        padding: "16px",
                    },
                    style: {
                        width: "21%",
                        padding: "6px 16px",
                    },
                },
            },
            {
                key: "grantedLocation",
                title: tUserGroup("labels.grantedLocation"),
                render: (record: GrantedPermission, index?: number) => {
                    return (
                        <LocationSelectInputHF
                            name={`grantedPermissionPackage.${index}.locations`}
                            placeholder={
                                !record.locations.length ? tUserGroup("labels.selectLocation") : ""
                            }
                            getOptionSelectedField="locationId"
                            titleDialog={tUserGroup("titles.dialogSelectLocation")}
                            checkable={!(record.role.role_name === "School Admin")}
                            rules={{ validate: validate.locations }}
                            disableClearable={record.role.role_name === "School Admin"}
                            shouldShowHelperText={false}
                            showRootOrg={true}
                            onChange={handleChangeLocations(record, index)}
                            sx={sx.locations}
                        />
                    );
                },
                cellProps: {
                    headerStyle: {
                        padding: "16px",
                    },
                    style: {
                        padding: "6px 16px",
                    },
                },
            },
        ]);
    }, [
        getOptionDisabled,
        handleChangeLocations,
        handleChangeRole,
        isLoading,
        isLoadingLocations,
        roleOptions,
        tUserGroup,
        validate,
    ]);

    return (
        <Box width="100%" mt={2.5} sx={sx.tableCheckbox}>
            <TableWithCheckbox
                tableProps={{
                    "data-testid": "GrantedPermissionUpsertTable",
                }}
                data={grantedPermissions}
                columns={columns}
                withIndex
                body={{
                    loading: false,
                    rowKey: "id",
                }}
                errorMessage={errorMessage}
                onSelect={onSelect}
                listSelectedItems={listSelectedItems}
                hasDraftProperty={false}
            />
        </Box>
    );
};
