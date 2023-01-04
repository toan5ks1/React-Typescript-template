import { ERPModules } from "src/common/constants/enum";
import {
    NormalizeStudentInformation,
    StudentContactPhoneNumberFormProps,
    UserAddress,
} from "src/squads/user/common/types";

import GeneralInfoDetail from "./components/GeneralInfoDetail/GeneralInfoDetail";
import HomeAddressDetail from "./components/HomeAddressDetail/HomeAddressDetail";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import ContactDetail from "src/squads/user/modules/student-detail/components/ContactDetail";
import SchoolHistoryDetail from "src/squads/user/modules/student-detail/components/SchoolHistoryDetail";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";
import useStudentDetailClasses from "src/squads/user/modules/student-detail/hooks/useStudentDetailClasses";

export interface StudentDetailContainerProps {
    student?: NormalizeStudentInformation;
    homeAddress?: UserAddress;
    contactInfo?: StudentContactPhoneNumberFormProps;
    onClickEdit?: () => void;
}

const StyledBox = styled(Box)(() => {
    const { classes } = useStudentDetailClasses();
    return {
        [`& .${classes.labelOneColumn}`]: {
            maxWidth: "12.5%",
        },
        [`& .${classes.valueOneColumn}`]: {
            maxWidth: "37.2%",
            whiteSpace: "pre-wrap",
        },
        [`& .${classes.breakWord}`]: {
            wordBreak: "break-word",
        },
    };
});

export const StudentDetailInfoContainer = (props: StudentDetailContainerProps) => {
    const { student, homeAddress, contactInfo, onClickEdit } = props;
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const isShowHomeAddress = useUserFeatureToggle("STUDENT_MANAGEMENT_STUDENT_HOME_ADDRESS");
    const isShowContactDetail = useUserFeatureToggle(
        "STUDENT_MANAGEMENT_STUDENT_CONTACT_PHONE_NUMBER"
    );
    const shouldDisplaySchoolHistory = useUserFeatureToggle("STUDENT_MANAGEMENT_SCHOOL_HISTORY");

    return (
        <StyledBox data-testid="TabStudentDetail__root" mt={3} pb={3}>
            <Grid container direction="row" justifyContent="space-between" spacing={4}>
                <Grid item>
                    <Box mb={3}>
                        <TypographyHeader data-testid="TabStudentDetail__title">
                            {tStudents("titles.detailInfo")}
                        </TypographyHeader>
                    </Box>
                </Grid>
                <Grid item>
                    <ButtonPrimaryOutlined
                        data-testid="TabStudentDetail__buttonEdit"
                        aria-label={tStudents("labels.edit")}
                        startIcon={<EditOutlined data-testid="TabStudentDetail__svgEdit" />}
                        onClick={onClickEdit}
                    >
                        {tStudents("labels.edit")}
                    </ButtonPrimaryOutlined>
                </Grid>
            </Grid>
            <GeneralInfoDetail student={student} />
            {isShowContactDetail ? <ContactDetail contactInfo={contactInfo} /> : null}
            {isShowHomeAddress ? <HomeAddressDetail homeAddress={homeAddress} /> : null}
            {shouldDisplaySchoolHistory ? <SchoolHistoryDetail /> : null}
        </StyledBox>
    );
};
