import { useMemo, useCallback } from "react";

import get from "lodash/get";
import { useFormContext, Controller, useWatch } from "react-hook-form";
import { useToggle } from "react-use";
import { LocationInformation, LocationInformationHasura } from "src/squads/user/common/types";
import { UseFormRules } from "src/typings/react-hook-form";

import { Box, Theme } from "@mui/material";
import AutocompleteBase, {
    AutocompleteBaseProps,
} from "src/components/Autocompletes/AutocompleteBase";
import ChipBase from "src/components/Chips/ChipBase";
import DialogTreeLocations, {
    DialogTreeLocationsProps,
} from "src/squads/user/components/DialogTreeLocations";

const reMapLocations = (
    locations: LocationInformationHasura[] | LocationInformation[]
): LocationInformation[] => {
    return locations?.map((location) => {
        if ("location_id" in location) {
            return {
                locationId: location.location_id,
                name: location.name,
                locationType: location.location_type || "",
                parentLocationId: location.parent_location_id || "",
                accessPath: location.access_path || "",
                isArchived: location.is_archived || false,
            };
        }
        return location;
    });
};

export interface LocationSelectInputHFProps
    extends Omit<
            AutocompleteBaseProps<LocationInformation>,
            "onChange" | "options" | "optionLabelKey"
        >,
        UseFormRules {
    name: string;
    titleDialog?: DialogTreeLocationsProps["title"];
    checkable?: boolean;
    showRootOrg?: boolean;
    shouldShowHelperText?: boolean;
    onChange?: (location: LocationInformation[]) => void;
}

const sx = {
    tagBox: (theme: Theme) => ({
        padding: theme.spacing(0.25),
    }),
    tag: (theme: Theme) => ({
        backgroundColor: "transparent",
        border: `1px solid ${theme.palette.grey[300]}`,
    }),
};

const LocationSelectInputHF = ({
    name,
    limitTags = 10,
    titleDialog,
    disableClearable = false,
    checkable = true,
    showRootOrg,
    rules,
    shouldShowHelperText = true,
    onChange,
    ...rest
}: LocationSelectInputHFProps) => {
    const {
        setValue,
        control,
        formState: { isSubmitted },
    } = useFormContext();
    const inputValue = useWatch({ control, name });

    const initialCheckedList = useMemo(() => reMapLocations(inputValue), [inputValue]);

    const [openDialogSelectLocation, setOpenDialogSelectLocation] = useToggle(false);

    const handleLocationChange = useCallback(
        (locations: LocationInformation[]) => {
            if (onChange) onChange(locations);
            else setValue(name, locations, { shouldValidate: isSubmitted });
            setOpenDialogSelectLocation(false);
        },
        [onChange, setValue, name, isSubmitted, setOpenDialogSelectLocation]
    );

    const _renderTags = useCallback((tagValue: LocationInformation[]) => {
        return tagValue.map((tag, index) => (
            <Box
                key={index}
                sx={sx.tagBox}
                maxWidth="100%"
                data-testid="LocationSelectInputHF__tagBox"
            >
                <ChipBase
                    data-testid="LocationSelectInputHF__ChipTag"
                    size="small"
                    sx={sx.tag}
                    label={tag.name}
                />
            </Box>
        ));
    }, []);

    const _renderLimitTags = (more: number) => {
        return (
            <ChipBase
                data-testid="LocationSelectInputHF__ChipLimitTags"
                size="small"
                sx={sx.tag}
                label={`+ ${more}`}
            />
        );
    };

    const handleCloseSelectLocationDialog = useCallback(
        () => setOpenDialogSelectLocation(false),
        [setOpenDialogSelectLocation]
    );

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ formState: { errors } }) => {
                return (
                    <>
                        <AutocompleteBase
                            {...rest}
                            freeSolo
                            multiple
                            id="LocationSelectInputHF"
                            data-testid="LocationSelectInputHF"
                            optionLabelKey="name"
                            limitTags={limitTags}
                            options={[]}
                            value={inputValue || []}
                            disableClearable={disableClearable}
                            onOpen={() => {
                                setOpenDialogSelectLocation(true);
                            }}
                            onKeyDown={(_event) => {
                                _event.preventDefault();
                                return;
                            }}
                            renderTags={_renderTags}
                            getLimitTagsText={_renderLimitTags}
                            PopperComponent={() => null}
                            error={typeof get(errors, name)?.message === "string"}
                            helperText={shouldShowHelperText ? get(errors, name)?.message : null}
                            onChange={(_event, _, reason) => {
                                if (reason === "clear") {
                                    handleLocationChange([]);
                                }
                            }}
                        />
                        {openDialogSelectLocation ? (
                            <DialogTreeLocations
                                initialCheckedList={initialCheckedList}
                                open={openDialogSelectLocation}
                                onClose={handleCloseSelectLocationDialog}
                                onAdd={handleLocationChange}
                                title={titleDialog}
                                checkable={checkable}
                                showRootOrg={showRootOrg}
                            />
                        ) : null}
                    </>
                );
            }}
        />
    );
};

export default LocationSelectInputHF;
