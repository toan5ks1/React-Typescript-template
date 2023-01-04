import { useFormContext } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { getStudentName } from "src/squads/payment/helpers/student";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import { Box, Grid } from "@mui/material";
import MAutocompleteCustom from "src/components/Autocompletes/MAutocompleteCustom";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import LocationsLowestLevelAutocompleteHF from "src/squads/payment/components/Autocompletes/LocationsLowestLevelAutocompleteHF";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useOrderValidationRules from "src/squads/payment/hooks/useOrderValidationRules";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface StudentInfoSectionProps {
    onLocationChange?: () => void;
    studentIndex: number;
}

type Multiple = false;
type DisableClearable = true;
type FreeSolo = false;

const StudentInfoSection = ({ onLocationChange, studentIndex }: StudentInfoSectionProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const { getValues, setValue } = useFormContext<OrderFormValues>();
    const { validationRules } = useOrderValidationRules();

    const { orderType } = useProductPluginsContext();

    const isUpdateOrder = orderType === OrderType.ORDER_TYPE_UPDATE;

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
                            data-testid="StudentInfoSection__studentNameTitle"
                        >
                            {tOrder("label.name")}
                        </TypographyTextSecondary>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{ wordBreak: "break-word" }}
                        data-testid="StudentInfoSection__studentNameContainer"
                    >
                        {getStudentName(getValues(`students.${studentIndex}.studentInfo`)?.user)}
                    </Grid>
                </Grid>
                <Grid item container xs={6}>
                    {isUpdateOrder ? (
                        <MAutocompleteCustom<
                            OrderFormValues["location"],
                            Multiple,
                            DisableClearable,
                            FreeSolo
                        >
                            value={getValues("location")}
                            options={[getValues("location")]}
                            readOnly={true}
                            fullWidth={true}
                            optionId="locationId"
                            optionLabelKey="name"
                            data-testid="LocationsLowestLevelAutocompleteHF__autocomplete"
                        />
                    ) : (
                        <LocationsLowestLevelAutocompleteHF<OrderFormValues>
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
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default StudentInfoSection;
