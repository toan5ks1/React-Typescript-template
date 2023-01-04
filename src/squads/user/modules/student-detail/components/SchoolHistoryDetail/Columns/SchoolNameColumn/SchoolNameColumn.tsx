import { memo } from "react";

import Box from "@mui/material/Box";
import TypographyBase from "src/components/Typographys/TypographyBase";

export interface SchoolNameColumnProps {
    content: string;
    isCurrentSchool: boolean;
}

function SchoolNameColumn({ content, isCurrentSchool }: SchoolNameColumnProps) {
    return (
        <Box display="flex" alignItems="center">
            {isCurrentSchool && (
                <TypographyBase
                    sx={(theme) => ({
                        color: theme.palette.success.main,
                        pr: theme.spacing(0.5),
                    })}
                    variant="body2"
                >
                    [Current]
                </TypographyBase>
            )}

            <TypographyBase variant="body2">{content}</TypographyBase>
        </Box>
    );
}

export default memo(SchoolNameColumn);
