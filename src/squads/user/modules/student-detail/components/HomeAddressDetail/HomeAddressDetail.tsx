import { ERPModules } from "src/common/constants/enum";
import { UserAddress } from "src/squads/user/common/types";

import { Box, Grid } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyWithValue from "src/components/Typographys/TypographyWithValue";
import DoubleDash from "src/squads/user/components/DoubleDash";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useStudentDetailClasses from "src/squads/user/modules/student-detail/hooks/useStudentDetailClasses";

export interface HomeAddressDetailProps {
    homeAddress?: UserAddress;
}
const HomeAddressDetail = ({ homeAddress }: HomeAddressDetailProps) => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const { classes } = useStudentDetailClasses();
    const groupBoxStudentHomeAddress = [
        {
            childElements: [
                {
                    value: homeAddress?.postal_code,
                    label: tStudents(`labels.postalCode`),
                    dataTestidValue: "TabStudentDetail__postalCodeValue",
                    classNameLabel: classes.labelOneColumn,
                    classNameValue: classes.valueOneColumn,
                },
            ],
        },
        {
            childElements: [
                {
                    value: homeAddress?.prefecture?.name,
                    label: tStudents(`labels.prefecture`),
                    dataTestidValue: "TabStudentDetail__prefectureValue",
                },
                {
                    value: homeAddress?.city,
                    label: tStudents(`labels.city`),
                    dataTestidValue: "TabStudentDetail__cityValue",
                },
            ],
        },
        {
            childElements: [
                {
                    value: homeAddress?.first_street,
                    label: tStudents(`labels.firstStreet`),
                    dataTestidValue: "TabStudentDetail__firstStreetValue",
                },
                {
                    value: homeAddress?.second_street,
                    label: tStudents(`labels.secondStreet`),
                    dataTestidValue: "TabStudentDetail__secondStreetValue",
                },
            ],
        },
    ];
    return (
        <Box data-testid="HomeAddressDetail__root">
            <Box my={3}>
                <DividerDashed variant="fullWidth" />
            </Box>
            <Box mb={1}>
                <TypographyPrimary data-testid="HomeAddressDetail__title">
                    {tStudents("labels.homeAddress")}
                </TypographyPrimary>
            </Box>
            {groupBoxStudentHomeAddress.map((group, index) => {
                return (
                    <Box key={index} display="flex" flexDirection="row" py={0.75}>
                        {group.childElements.map(({ value, label, ...rest }, indexChild) => (
                            <Grid key={indexChild} container data-testid="HomeAddressDetail__item">
                                <TypographyWithValue
                                    variant="horizontal"
                                    value={value || <DoubleDash />}
                                    label={label}
                                    xsLabel={3}
                                    xsValue={8}
                                    {...rest}
                                />
                            </Grid>
                        ))}
                    </Box>
                );
            })}
        </Box>
    );
};

export default HomeAddressDetail;
