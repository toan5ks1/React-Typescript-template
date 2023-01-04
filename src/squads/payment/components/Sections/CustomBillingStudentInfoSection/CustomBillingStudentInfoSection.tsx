import { useFormContext } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { getStudentName } from "src/squads/payment/helpers/student";
import { CustomBillingOrderFormValue } from "src/squads/payment/types/form/custom-billing-types";

import { Box, Grid } from "@mui/material";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import LocationsLowestLevelAutocompleteHF from "src/squads/payment/components/Autocompletes/LocationsLowestLevelAutocompleteHF";

import useOrderValidationRules from "src/squads/payment/hooks/useOrderValidationRules";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface CustomBillingStudentInfoSectionProps {
    onLocationChange?: () => void;
}

const CustomBillingStudentInfoSection = ({
    onLocationChange,
}: CustomBillingStudentInfoSectionProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const { getValues, setValue } = useFormContext<CustomBillingOrderFormValue>();
    const { validationRules } = useOrderValidationRules();

    return (
        <>
            <Box mb={2}>
                <TypographyHeader>{tOrder("title.studentInfo")}</TypographyHeader>
            </Box>
            <Grid container justifyContent="space-between" spacing={2}>
                <Grid item container xs={6}>
                    <Grid item xs={12}>
                        <TypographyTextSecondary
                            variant="body2"
                            data-testid="CustomBillingStudentInfoSection__studentNameTitle"
                        >
                            {tOrder("label.name")}
                        </TypographyTextSecondary>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{ wordBreak: "break-word" }}
                        data-testid="CustomBillingStudentInfoSection__studentNameContainer"
                    >
                        {getStudentName(getValues("student")?.user)}
                    </Grid>
                </Grid>
                <Grid item container xs={6}>
                    <LocationsLowestLevelAutocompleteHF<CustomBillingOrderFormValue>
                        controllerProps={{
                            name: "location",
                            rules: validationRules.location,
                        }}
                        onSuccess={(locations) => {
                            if (getValues("location")) return;
                            setValue("location", locations[0]);
                        }}
                        onChange={onLocationChange}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default CustomBillingStudentInfoSection;
