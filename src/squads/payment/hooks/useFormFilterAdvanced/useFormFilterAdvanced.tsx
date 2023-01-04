import { useCallback, useState } from "react";

import { DateTime } from "luxon";
import { UnpackNestedValue, DeepPartial } from "react-hook-form";
import {
    FilterAppliedObjectsMap,
    FilterAppliedObjectValuesMap,
    FilterDateType,
} from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { UseFormType } from "src/squads/payment/typings/react-hook-form";

export interface UseFormFilterAdvancedReturn<T> {
    onReset: () => void;
    onApply: (data: UnpackNestedValue<DeepPartial<T>>) => void;
    onClosePopover: () => void;
    onDelete: (fieldDeleted: string) => void;
    filterApplied: FilterAppliedObjectValuesMap<T>;
}

interface UseFormFilterAdvancedProps<T> extends UseFormType<T> {
    isNoData: boolean;
    defaultValue: UnpackNestedValue<DeepPartial<T>>;
    filterFieldObjects: FilterAppliedObjectsMap<T>;
    onApplySubmit: (value: T) => void;
    defaultFilterAppliedObjects?: FilterAppliedObjectValuesMap<T>;
    onSetFilterAppliedObjects?: (value: FilterAppliedObjectValuesMap<T>) => void;
}

const useFormFilterAdvanced = <T extends Record<string, any>>(
    props: UseFormFilterAdvancedProps<T>
): UseFormFilterAdvancedReturn<T> => {
    const {
        isNoData,
        defaultValue,
        filterFieldObjects,
        onApplySubmit,
        reset,
        watch,
        getValues,
        defaultFilterAppliedObjects = [],
        onSetFilterAppliedObjects,
    } = props;

    const [filterApplied, setFilterApplied] = useState<FilterAppliedObjectValuesMap<T>>(
        defaultFilterAppliedObjects
    );

    // Get latest data
    const latestData = watch() as UnpackNestedValue<DeepPartial<T>>;

    // Handle reset and clear all filter
    const handleResetFilter = useCallback(() => {
        // Remove all chip
        setFilterApplied([]);
        onSetFilterAppliedObjects && onSetFilterAppliedObjects([]);

        // Reset and set default value for all field
        reset(defaultValue);

        // Return new data
        // We as T because we are sure the data will return type T.
        // And to minimize the handling of type DeepPartial
        onApplySubmit(defaultValue as T);
    }, [defaultValue, onApplySubmit, onSetFilterAppliedObjects, reset]);

    // Handle close popover still save data chosen
    const handleClosePopover = useCallback(() => reset(latestData), [latestData, reset]);

    // Handle create objects show chip filter
    const handleFilterApplied = useCallback(
        (isHandleApply: boolean): FilterAppliedObjectValuesMap<T> => {
            // Get all field name and form values
            const fieldNames = Object.keys(filterFieldObjects);
            const formValues = getValues();

            const result: FilterAppliedObjectValuesMap<T> = fieldNames.map((name) => {
                // Get field value by name
                const fieldValue = formValues[name];

                // Check field is not default data
                const isValid = Array.isArray(fieldValue) ? arrayHasItem(fieldValue) : !!fieldValue;

                // Handle remove chip
                if (!isHandleApply) {
                    const isFieldApplied = filterApplied.some(
                        (field) => field.name === name && field.isApplied
                    );

                    return { ...filterFieldObjects[name], isApplied: isValid && isFieldApplied };
                }

                // Handle apply filter
                return { ...filterFieldObjects[name], isApplied: isValid };
            });
            return result.filter((field) => field.isApplied);
        },
        [filterApplied, filterFieldObjects, getValues]
    );

    // Handle delete chip filter
    const handleDeleteChipFilter = useCallback(
        (fieldDeleted: string) => {
            // When user delete chip but data of field deleted not clear in form
            // So we will get default value of field deleted
            const defaultValue = filterFieldObjects[fieldDeleted].defaultValue;

            // Then we set it for new object value in form
            const newDataObjects = { ...latestData, [fieldDeleted]: defaultValue };

            // And clear and set new data for form in popover
            reset(newDataObjects);

            // And remove chip of field deleted
            const newFilterAppliedObjects = handleFilterApplied(false);
            setFilterApplied(newFilterAppliedObjects);
            onSetFilterAppliedObjects && onSetFilterAppliedObjects?.(newFilterAppliedObjects);

            // Return new data
            // We as T because we are sure the data will return type T.
            // And to minimize the handling of type DeepPartial
            onApplySubmit(newDataObjects as T);
        },
        [
            filterFieldObjects,
            handleFilterApplied,
            latestData,
            onApplySubmit,
            onSetFilterAppliedObjects,
            reset,
        ]
    );

    // Handle apply filter
    const handleApplyFilter = useCallback(
        (data: UnpackNestedValue<DeepPartial<T>>) => {
            // If not choose data to filter
            if (isNoData) {
                // Check if it's filtered
                const isApplied = filterApplied.some((field) => field.isApplied);

                // If filtered we will reset filter
                isApplied && handleResetFilter();

                return;
            }

            // And remove or add new chip filter
            const newFilterAppliedObjects = handleFilterApplied(true);
            setFilterApplied(newFilterAppliedObjects);
            onSetFilterAppliedObjects && onSetFilterAppliedObjects?.(newFilterAppliedObjects);

            // Return new data
            // We as T because we are sure the data will return type T.
            // And to minimize the handling of type DeepPartial
            onApplySubmit(data as T);
        },
        [
            filterApplied,
            handleFilterApplied,
            handleResetFilter,
            isNoData,
            onApplySubmit,
            onSetFilterAppliedObjects,
        ]
    );

    return {
        filterApplied: filterApplied,
        onReset: handleResetFilter,
        onApply: handleApplyFilter,
        onDelete: handleDeleteChipFilter,
        onClosePopover: handleClosePopover,
    };
};

export default useFormFilterAdvanced;

/**
 *
 * @param value This is the value of date data in form filter with react hook form.
 * @returns
 * We allow the filter field to be empty. So we return string or null.
 */
export const convertToFilterDateValue = (value: FilterDateType): string | null => {
    if (!value) return null;

    const date = new Date(value);
    if (DateTime.fromJSDate(date).isValid) {
        return value.toString();
    }

    return null;
};
