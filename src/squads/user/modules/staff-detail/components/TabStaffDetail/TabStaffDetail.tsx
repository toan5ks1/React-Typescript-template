import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { Teacher, Staff } from "src/squads/user/service/bob/user-service-bob/types";

import { EditOutlined } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyWithValue, {
    TypographyWithValueProps,
} from "src/components/Typographys/TypographyWithValue";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

export interface TabTStaffDetailProps {
    staff?: Teacher | Staff;
    onClickEdit?: () => void;
}
interface StaffInfoSchema
    extends Pick<
        TypographyWithValueProps,
        | "label"
        | "value"
        | "xsLabel"
        | "xsValue"
        | "styleValue"
        | "classNameLabel"
        | "classNameValue"
        | "dataTestidLabel"
        | "dataTestidValue"
    > {}

interface GroupsBoxStaffInfo {
    childElements: StaffInfoSchema[];
}

export const TabStaffDetail = ({ staff, onClickEdit }: TabTStaffDetailProps) => {
    const t = useResourceTranslate(Entities.STAFF);
    const isEnabledStaffTableQuery = useUserFeatureToggle("STAFF_MANAGEMENT_USE_STAFF_QUERY");

    const groupsBoxStaffInfo = useMemo<GroupsBoxStaffInfo[]>(() => {
        let staffName, staffEmail, userGroupMembers: string | null | undefined;

        if (staff && "users" in staff) {
            staffName = staff?.users?.name;
            staffEmail = staff?.users?.email;
        } else if (staff && "user" in staff) {
            staffName = staff?.user?.name;
            staffEmail = staff?.user?.email;
            userGroupMembers = staff?.user?.user_group_members
                .map((userGroup) => userGroup?.user_group?.user_group_name)
                .join(", ");
        }

        return [
            {
                childElements: [
                    {
                        value: convertString(staffName),
                        label: t(`labels.name`),
                        dataTestidValue: "TabStaffDetail__generalNameValue",
                    },

                    {
                        value: convertString(staffEmail),
                        label: t(`labels.email`),
                        dataTestidValue: "TabStaffDetail__generalEmailValue",
                    },

                    ...(isEnabledStaffTableQuery
                        ? [
                              {
                                  value: userGroupMembers,
                                  label: t("labels.userGroup"),
                                  dataTestidValue: "TabStaffDetail__generalUserGroupMembersValue",
                              },
                          ]
                        : []),
                ],
            },
        ];
    }, [staff, t, isEnabledStaffTableQuery]);
    return (
        <Box data-testid="TabStaffDetail__root" mt={3}>
            <Grid container direction="row" justifyContent="space-between" spacing={4}>
                <Grid item>
                    <Box mb={3}>
                        <TypographyHeader data-testid="TabStaffDetail__title">
                            {t("titles.detailInfo")}
                        </TypographyHeader>
                    </Box>
                    <Box mb={1}>
                        <TypographyPrimary data-testid="TabStaffDetail__subTitle">
                            {t("titles.generalInfo")}
                        </TypographyPrimary>
                    </Box>
                </Grid>
                <Grid item>
                    <ButtonPrimaryOutlined
                        data-testid="TabStaffDetail__buttonEdit"
                        aria-label={t("labels.edit")}
                        startIcon={<EditOutlined data-testid="TabStaffDetail__svgEdit" />}
                        onClick={onClickEdit}
                    >
                        {t("labels.edit")}
                    </ButtonPrimaryOutlined>
                </Grid>
            </Grid>
            {groupsBoxStaffInfo.map((group, index) => {
                return (
                    <Grid
                        key={index}
                        container
                        direction="row"
                        justifyContent="space-between"
                        rowSpacing={3}
                        py={0.75}
                    >
                        {group.childElements.map(({ value, label, ...rest }, indexChild) => (
                            <Grid item xs={12} md={6} key={indexChild}>
                                <TypographyWithValue
                                    key={indexChild}
                                    variant="horizontal"
                                    value={value}
                                    label={label}
                                    xsLabel={3}
                                    xsValue={8}
                                    sxLabel={{ alignSelf: "center" }}
                                    {...rest}
                                />
                            </Grid>
                        ))}
                    </Grid>
                );
            })}
        </Box>
    );
};
