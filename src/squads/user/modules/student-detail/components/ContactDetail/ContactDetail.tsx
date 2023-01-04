import { ERPModules } from "src/common/constants/enum";
import { StudentContactPhoneNumberFormProps } from "src/squads/user/common/types";

import { Box, Grid } from "@mui/material";
import { typographyClasses } from "@mui/material/Typography";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import TypographyWithValue from "src/components/Typographys/TypographyWithValue";
import DoubleDash from "src/squads/user/components/DoubleDash";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useStudentDetailClasses from "src/squads/user/modules/student-detail/hooks/useStudentDetailClasses";

export interface ContactDetailProps {
    contactInfo?: StudentContactPhoneNumberFormProps;
}

const sx = {
    label: {
        [`& .${typographyClasses.root}`]: {
            maxWidth: "130px",
            display: "inline-block",
        },
    },
};

const ContactDetail = ({ contactInfo }: ContactDetailProps) => {
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const { classes } = useStudentDetailClasses();

    const groupBoxStudentContact = [
        {
            childElements: [
                {
                    value: contactInfo?.studentPhoneNumber,
                    label: tStudents(`labels.studentPhoneNumber`),
                    dataTestidValue: "TabStudentDetail__studentPhoneNumber",
                },
                {
                    value: contactInfo?.homePhoneNumber,
                    label: tStudents(`labels.homePhoneNumber`),
                    dataTestidValue: "TabStudentDetail__homePhoneNumber",
                },
            ],
        },
        {
            childElements: [
                {
                    value: contactInfo?.parentPrimaryPhoneNumber,
                    label: tStudents(`labels.parentPrimaryPhoneNumber`),
                    dataTestidValue: "TabStudentDetail__parentPrimaryPhoneNumber",
                },
                {
                    value: contactInfo?.parentSecondaryPhoneNumber,
                    label: tStudents(`labels.parentSecondaryPhoneNumber`),
                    dataTestidValue: "TabStudentDetail__parentSecondaryPhoneNumber",
                },
            ],
        },
        {
            childElements: [
                {
                    value: contactInfo?.preferredContactNumber,
                    label: tStudents(`labels.preferredContactNumber`),
                    dataTestidValue: "TabStudentDetail__preferredContactNumber",
                    classNameLabel: classes.labelOneColumn,
                    classNameValue: classes.valueOneColumn,
                },
            ],
        },
    ];

    return (
        <Box data-testid="ContactDetail__root">
            <Box my={3}>
                <DividerDashed variant="fullWidth" />
            </Box>
            <Box mb={1}>
                <TypographyPrimary data-testid="ContactDetail__title">
                    {tStudents("labels.phoneNumber")}
                </TypographyPrimary>
            </Box>
            {groupBoxStudentContact.map((group, index) => {
                return (
                    <Box key={index} display="flex" flexDirection="row" py={0.75}>
                        {group.childElements.map(({ value, label, ...rest }, indexChild) => (
                            <Grid key={indexChild} container data-testid="ContactDetail__item">
                                <TypographyWithValue
                                    variant="horizontal"
                                    value={value || <DoubleDash />}
                                    label={label}
                                    xsLabel={3}
                                    xsValue={8}
                                    sxLabel={sx.label}
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

export default ContactDetail;
