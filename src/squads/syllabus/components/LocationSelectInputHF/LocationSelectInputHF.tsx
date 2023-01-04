import { useState, useCallback } from "react";

import { useFormContext, Controller } from "react-hook-form";
import { useToggle } from "react-use";
import { Features } from "src/common/constants/enum";
import { LocationInformation } from "src/squads/syllabus/common/types/common";
import { UseFormRules } from "src/typings/react-hook-form";

import { Box, Theme } from "@mui/material";
import AutocompleteBase, {
    AutocompleteBaseProps,
} from "src/components/Autocompletes/AutocompleteBase";
import ChipBase from "src/components/Chips/ChipBase";
import DialogTreeLocations, {
    DialogTreeLocationsProps,
} from "src/squads/syllabus/components/Dialogs/DialogTreeLocations";

import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";

export type LocationFieldValue =
    | string
    | LocationInformation
    | (string | LocationInformation)[] // Autocomplete Type
    | null;

export interface LocationSelectInputHFProps
    extends Omit<
            AutocompleteBaseProps<LocationInformation>,
            "onChange" | "options" | "optionLabelKey"
        >,
        UseFormRules {
    name: string;
    titleDialog?: DialogTreeLocationsProps["title"];
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

const LocationSelectInputHF = (props: LocationSelectInputHFProps) => {
    const { name, limitTags = 10, titleDialog, rules, ...rest } = props;

    const { control, setValue, getValues } = useFormContext();
    const [inputValue, setInputValue] = useState(getValues(name));

    const [openDialogSelectLocation, setOpenDialogSelectLocation] = useToggle(false);

    const handleLocationChange = (locations: LocationInformation[]) => {
        setInputValue(locations);
        setValue(name, locations);
        setOpenDialogSelectLocation(false);
    };

    const { isEnabled: allowRemoveCourseLocation } = useFeatureToggle(
        Features.LESSON_COURSE_MANAGEMENT_REMOVE_COURSE_LOCATION
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

    const _renderLimitTags = useCallback((more: number) => {
        return (
            <ChipBase
                data-testid="LocationSelectInputHF__chipLimitTags"
                size="small"
                sx={sx.tag}
                label={`+ ${more}`}
            />
        );
    }, []);
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ formState: { errors } }) => {
                return (
                    <>
                        <AutocompleteBase<LocationInformation>
                            {...rest}
                            freeSolo
                            multiple
                            id="LocationSelectInputHF__root"
                            data-testid="LocationSelectInputHF__root"
                            optionLabelKey="name"
                            disableClearable={!allowRemoveCourseLocation}
                            limitTags={limitTags}
                            options={[]}
                            value={inputValue || []}
                            onOpen={() => {
                                setOpenDialogSelectLocation(true);
                            }}
                            onChange={(_event, _, reason) => {
                                if (reason === "clear") {
                                    handleLocationChange([]);
                                }
                            }}
                            onKeyDown={(_event) => {
                                _event.preventDefault();
                                return;
                            }}
                            renderTags={_renderTags}
                            getLimitTagsText={_renderLimitTags}
                            PopperComponent={() => null}
                            error={Boolean(errors[name]?.message)}
                            helperText={errors[name]?.message}
                        />
                        {openDialogSelectLocation && (
                            <DialogTreeLocations
                                initialCheckedList={inputValue}
                                open={openDialogSelectLocation}
                                onClose={() => setOpenDialogSelectLocation(false)}
                                onAdd={handleLocationChange}
                                title={titleDialog}
                            />
                        )}
                    </>
                );
            }}
        />
    );
};
export default LocationSelectInputHF;
