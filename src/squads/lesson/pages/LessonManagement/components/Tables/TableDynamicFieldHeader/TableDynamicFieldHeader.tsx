import { useMemo } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import IconButtonBase, { IconButtonBaseProps } from "src/components/IconButton/IconButtonBase";
import TooltipWithIcon from "src/squads/lesson/pages/LessonManagement/components/Tooltips/TooltipWithIcon";

import { DynamicFieldInTable } from "src/squads/lesson/pages/LessonManagement/common/types";
import useGetDynamicFieldProps from "src/squads/lesson/pages/LessonManagement/hooks/useGetDynamicFieldProps";

export interface TableDynamicFieldHeaderProps {
    dynamicField: DynamicFieldInTable;
    onAction?: NonNullable<IconButtonBaseProps["onClick"]>;
}

const TableDynamicFieldHeader = (props: TableDynamicFieldHeaderProps) => {
    const { dynamicField, onAction } = props;

    const { getLabel } = useGetDynamicFieldProps({});

    const {
        label,
        is_internal,
        component_config: { question_mark, has_bulk_action },
    } = dynamicField;

    const tableTitle = getLabel(label, is_internal);

    const questionMarkIcon = useMemo(() => {
        if (!question_mark) return null;

        return (
            <TooltipWithIcon
                tooltipTitle={getLabel(question_mark.message)}
                icon={<HelpOutlineIcon />}
                position="typography"
            />
        );
    }, [getLabel, question_mark]);

    const tableAction = useMemo(() => {
        if (!has_bulk_action) return null;

        return (
            <IconButtonBase disableRipple sx={{ padding: 0 }} onClick={onAction}>
                <MoreHorizIcon />
            </IconButtonBase>
        );
    }, [has_bulk_action, onAction]);

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
                {tableTitle}
                {questionMarkIcon}
            </Box>

            <Box>{tableAction}</Box>
        </Box>
    );
};

export default TableDynamicFieldHeader;
