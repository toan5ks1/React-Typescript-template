import { useState } from "react";

import { Path, FieldValues, useFormContext, useWatch } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";

import Grid from "@mui/material/Grid";
import ButtonBase from "src/components/Buttons/ButtonBase";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import CheckboxBase from "src/components/Checkboxes/CheckboxBase";
import PopoverRightBottom, {
    PopoverRightBottomProps,
} from "src/components/Popovers/PopoverRightBottom";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";
import DynamicFieldBaseV2 from "src/squads/lesson/pages/LessonManagement/components/DynamicFields/DynamicFieldBaseV2";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import {
    BulkActionForTable,
    DynamicFieldInTable,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import { isDynamicFieldComponent } from "src/squads/lesson/pages/LessonManagement/common/utils";

export interface TableDynamicBulkActionProps<T> extends Omit<PopoverRightBottomProps, "anchorEl"> {
    nameHF: Path<T>;
    dynamicField: DynamicFieldInTable;
    anchorEl: NonNullable<PopoverRightBottomProps["anchorEl"]>;
    onApply: (props: BulkActionForTable) => void;
}

const TableDynamicFieldBulkAction = <T extends FieldValues>(
    props: TableDynamicBulkActionProps<T>
) => {
    const { nameHF, dynamicField, onApply, onClose, ...rest } = props;

    const [isApplyToBlankFieldOnly, setIsApplyToBlankFieldOnly] = useState<boolean>(true);

    const t = useTranslate();
    const tLessonReports = useResourceTranslate(ERPModules.LESSON_REPORTS);

    const { resetField } = useFormContext<T>();
    const fieldValue = useWatch<T>({ name: nameHF });

    const handleApply = () => {
        resetField(nameHF);
        onApply({ isApplyToBlankFieldOnly, dynamicField, value: fieldValue });
    };

    const handleClose = () => {
        resetField(nameHF);
        onClose();
    };

    return (
        <PopoverRightBottom onClose={handleClose} {...rest}>
            <Grid container spacing={2} width={444} p={3}>
                <Grid item xs={12}>
                    {isDynamicFieldComponent(dynamicField.component_config.type) ? (
                        <DynamicFieldBaseV2
                            componentType={dynamicField.component_config.type}
                            dynamicField={dynamicField}
                            nameHF={nameHF}
                        />
                    ) : null}
                </Grid>

                <Grid container spacing={1} item xs={12} alignItems="center">
                    <Grid item>
                        <CheckboxBase
                            disableRipple
                            size="medium"
                            sx={{ padding: 0 }}
                            checked={isApplyToBlankFieldOnly}
                            onChange={(_, checked) => {
                                setIsApplyToBlankFieldOnly(checked);
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <TypographyPrimary variant="body2">
                            {tLessonReports("applyToBlankOnly")}
                        </TypographyPrimary>
                    </Grid>
                </Grid>

                <Grid container item spacing={2} xs={12} justifyContent="flex-end">
                    <Grid item>
                        <ButtonBase onClick={handleClose}>
                            {t("ra.common.action.cancel")}
                        </ButtonBase>
                    </Grid>

                    <Grid item>
                        <ButtonPrimaryContained onClick={handleApply}>
                            {t("ra.action.apply")}
                        </ButtonPrimaryContained>
                    </Grid>
                </Grid>
            </Grid>
        </PopoverRightBottom>
    );
};

export default TableDynamicFieldBulkAction;
