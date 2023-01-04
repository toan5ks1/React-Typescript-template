import { useWatch } from "react-hook-form";
import { GlobalLocationTreeNode } from "src/typings/locations-provider";

import CheckboxBase from "src/components/Checkboxes/CheckboxBase";
import FormControlLabelBase from "src/components/Forms/FormControlLabelBase";

import { Locations } from "src/__generated__/root-types";
import useTranslate from "src/hooks/useTranslate";

export interface DialogLocationSelectOnNavFormValues {
    [locationId: Locations["location_id"]]: GlobalLocationTreeNode;
}

export interface CheckBoxLocationProps {
    location: GlobalLocationTreeNode;
    onLocationToggled: (location: GlobalLocationTreeNode, isSelected: boolean) => void;
}

const CheckBoxLocation = ({ location, onLocationToggled }: CheckBoxLocationProps) => {
    //@ts-expect-error  https://github.com/react-hook-form/react-hook-form/discussions/7764
    const valueInFormState = useWatch<DialogLocationSelectOnNavFormValues>({
        name: location.locationId,
    });
    const t = useTranslate();

    const { isChecked, indeterminate } = valueInFormState || {
        isChecked: false,
        indeterminate: false,
    };

    return (
        <FormControlLabelBase
            control={
                <CheckboxBase
                    checked={isChecked}
                    disabled={location.isUnauthorized}
                    onChange={(_, selected) => {
                        onLocationToggled(location, selected);
                    }}
                    value={isChecked}
                    name={location.locationId}
                    color={indeterminate ? "default" : "primary"}
                    indeterminate={indeterminate}
                    data-testid={`CheckBoxLocation__${location.locationId}`}
                />
            }
            label={
                location.isUnauthorized
                    ? t("ra.auth.locationSetting.unauthorizedLocation")
                    : location.name
            }
        />
    );
};

export default CheckBoxLocation;
