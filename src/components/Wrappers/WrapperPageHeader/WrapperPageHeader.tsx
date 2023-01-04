import { ReactNode } from "react";

import { ERPModules } from "src/common/constants/enum";

import { Box, BoxProps } from "@mui/material";
import ChipAutocomplete from "src/components/Chips/ChipAutocomplete";

import TypographyPageTitle from "../../Typographys/TypographyPageTitle";

import useResourceTranslate from "src/hooks/useResourceTranslate";

export interface WrapperPageHeaderProps extends BoxProps {
    title: string;
    action?: ReactNode;
    status?: ReactNode;
    isNeverLoggedIn?: boolean;
}

const WrapperPageHeader = (props: WrapperPageHeaderProps) => {
    const { title = "", action, status, isNeverLoggedIn, ...rest } = props;
    const tStudent = useResourceTranslate(ERPModules.STUDENTS);

    return (
        <Box
            mb={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            data-testid="WrapperPageHeader__root"
            {...rest}
        >
            <Box display="flex" justifyContent="flex-start" alignItems="center">
                {status && <Box mr={2}>{status}</Box>}
                <TypographyPageTitle title={title} disablePadding />

                {isNeverLoggedIn && (
                    <Box ml={2}>
                        <ChipAutocomplete size="small" label={tStudent("titles.neverLoggedIn")} />
                    </Box>
                )}
            </Box>
            <Box>{action}</Box>
        </Box>
    );
};

export default WrapperPageHeader;
