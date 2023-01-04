import { MouseEvent } from "react";

import { FilterAppliedObjectValuesMap } from "src/common/constants/types";

import { Box } from "@mui/material";
import ButtonPrimaryText from "src/components/Buttons/ButtonPrimaryText";
import ChipAutocomplete from "src/components/Chips/ChipAutocomplete";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface FormFilterAdvancedChipListProps<T> {
    filterNameApplied: FilterAppliedObjectValuesMap<T>;
    onDelete: (fieldDeleted: string) => void;
    onClearAll: (event: MouseEvent<HTMLButtonElement>) => void;
}

const FormFilterAdvancedChipList = <T extends Record<string, T[keyof T]>>(
    props: FormFilterAdvancedChipListProps<T>
) => {
    const { filterNameApplied, onDelete, onClearAll } = props;
    const t = useTranslate();

    return (
        <Box display="flex" alignItems="center">
            <TypographyBase variant="body2">{`${t(
                "resources.common.youFilterBy"
            )} :`}</TypographyBase>

            <Box mx={1} display="flex">
                {filterNameApplied.map((filter) => {
                    const labelChip = filter.chipLabel ? filter.chipLabel : t(filter.inputLabel);
                    return (
                        <Box key={filter.name} mx={0.5}>
                            <ChipAutocomplete
                                data-testid="FormFilterAdvancedChipList__chipItem"
                                label={labelChip}
                                onDelete={() => onDelete(filter.name)}
                            />
                        </Box>
                    );
                })}
            </Box>

            <ButtonPrimaryText
                data-testid="FormFilterAdvancedChipList__buttonClearAll"
                onClick={onClearAll}
            >
                {t("resources.button.clearAll")}
            </ButtonPrimaryText>
        </Box>
    );
};

export default FormFilterAdvancedChipList;
