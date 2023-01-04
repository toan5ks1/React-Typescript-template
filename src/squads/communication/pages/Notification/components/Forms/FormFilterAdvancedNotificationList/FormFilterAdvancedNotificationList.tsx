import { useMemo } from "react";

import { DateTime } from "luxon";
import { useFormContext, useWatch } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { getMinDateToDisablePrevDates, handleDisablePrevDates } from "src/common/utils/time";
import { FormFilterNotificationListValues } from "src/squads/communication/common/constants/types";
import { convertFilterFieldsObjects } from "src/squads/communication/common/utils/utils";

import { Box, Grid } from "@mui/material";
import FormFilterAdvanced, {
    FormFilterAdvancedProps,
} from "src/components/Forms/FormFilterAdvanced";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TagsAutocompleteHF from "src/squads/communication/pages/Notification/components/Autocompletes/TagsAutocompleteHF";
import DeliveryDateInputs from "src/squads/communication/pages/Notification/components/DeliveryDateInputs";

import isEqual from "lodash/isEqual";
import useFormFilterAdvanced, { UseFormFilterAdvancedProps } from "src/hooks/useFormFilterAdvanced";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useNotificationListFilterValidation from "src/squads/communication/pages/Notification/hooks/useNotificationListFilterValidation/useNotificationListFilterValidation";

export const formFilterDefaultValues: FormFilterNotificationListValues = {
    fromDate: null,
    toDate: null,
    fromTime: null,
    toTime: null,
    tags: [],
};

export interface FormFilterNotificationListProps
    extends Pick<
        FormFilterAdvancedProps<FormFilterNotificationListValues>,
        "onEnterSearchBar" | "defaultSearchKeyword"
    > {
    onApplySubmit: UseFormFilterAdvancedProps<FormFilterNotificationListValues>["onApplySubmit"];
}

const FormFilterAdvancedNotificationList = ({
    onEnterSearchBar,
    onApplySubmit,
    defaultSearchKeyword,
}: FormFilterNotificationListProps) => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
    const formContext = useFormContext<FormFilterNotificationListValues>();
    const currentValues = formContext.getValues();

    const minDate = useMemo(
        () => getMinDateToDisablePrevDates(currentValues.fromDate),
        [currentValues.fromDate]
    );
    const isNoData = useMemo(
        () => isEqual(formFilterDefaultValues, currentValues),
        [currentValues]
    );
    const filterFieldObjects = convertFilterFieldsObjects(tNotification, formFilterDefaultValues);

    const { filterApplied, onDelete, onApply, onReset, onClosePopover } =
        useFormFilterAdvanced<FormFilterNotificationListValues>({
            defaultValue: formFilterDefaultValues,
            isNoData,
            filterFieldObjects,
            onApplySubmit,
            ...formContext,
        });

    const [fromDate, toDate, fromTime, toTime] = useWatch({
        name: [
            filterFieldObjects.fromDate.name,
            filterFieldObjects.toDate.name,
            filterFieldObjects.fromTime.name,
            filterFieldObjects.toTime.name,
        ],
    });
    const validationRules = useNotificationListFilterValidation();

    return (
        <FormFilterAdvanced<FormFilterNotificationListValues>
            isDisableReset={isNoData}
            filterNameApplied={filterApplied}
            onEnterSearchBar={onEnterSearchBar}
            onDelete={onDelete}
            onReset={onReset}
            onApply={formContext.handleSubmit(onApply)}
            onClosePopover={onClosePopover}
            inputSearchPlaceholder={tNotification("label.placeholder.searchByNotificationTitles")}
            defaultSearchKeyword={defaultSearchKeyword}
        >
            {/* TODO: @communication update the Width of FormFilterAdvanced for all squads when mana-ui completed*/}
            <Box width={512} data-testid="FormFilterAdvancedNotificationList__root">
                <Grid container justifyContent="space-between" direction="column">
                    <Grid item container direction="row" spacing={2}>
                        <Grid item xs={12}>
                            <TypographyBase variant="subtitle2">
                                {tNotification("label.filters")}
                            </TypographyBase>
                        </Grid>
                        <Grid item xs={12}>
                            <DeliveryDateInputs
                                dateFieldProps={{
                                    name: filterFieldObjects.fromDate.name,
                                    label: filterFieldObjects.fromDate.inputLabel,
                                    InputProps: {
                                        "data-testid":
                                            "FormFilterAdvancedNotificationList__datePickerFromDate",
                                    },
                                    rules: validationRules.fromDate(toDate),
                                }}
                                timeFieldProps={{
                                    name: filterFieldObjects.fromTime.name,
                                    label: filterFieldObjects.fromTime.inputLabel,
                                    disabled: !fromDate,
                                    getOptionSelectedField: "value",
                                    "data-testid":
                                        "FormFilterAdvancedNotificationList__timePickerFromTime",
                                    rules: validationRules.fromTime({ fromDate, toDate, toTime }),
                                }}
                                rateOfLayout={{ datePicker: 6, timePicker: 6 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <DeliveryDateInputs
                                dateFieldProps={{
                                    name: filterFieldObjects.toDate.name,
                                    label: filterFieldObjects.toDate.inputLabel,
                                    InputProps: {
                                        "data-testid":
                                            "FormFilterAdvancedNotificationList__datePickerToDate",
                                    },
                                    rules: validationRules.toDate(fromDate),
                                    shouldDisableDate: (date) =>
                                        handleDisablePrevDates(
                                            date,
                                            currentValues.fromDate,
                                            minDate
                                        ),
                                    minDate: currentValues.fromDate
                                        ? DateTime.fromJSDate(minDate)
                                        : undefined,
                                }}
                                timeFieldProps={{
                                    name: filterFieldObjects.toTime.name,
                                    label: filterFieldObjects.toTime.inputLabel,
                                    disabled: !toDate,
                                    getOptionSelectedField: "value",
                                    "data-testid":
                                        "FormFilterAdvancedNotificationList__timePickerToTime",
                                    rules: validationRules.toTime({ fromDate, toDate, fromTime }),
                                }}
                                rateOfLayout={{ datePicker: 6, timePicker: 6 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TagsAutocompleteHF
                                data-testid="FormFilterAdvancedNotificationList__autocompleteTags"
                                name="tags"
                                label={tNotification("label.placeholder.tags")}
                                limitChipText="Ellipsis"
                                getOptionSelectedField="tag_id"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </FormFilterAdvanced>
    );
};
export default FormFilterAdvancedNotificationList;
