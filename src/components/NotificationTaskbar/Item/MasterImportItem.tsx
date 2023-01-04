import { Entities } from "src/common/constants/enum";

import TypographyBase from "src/components/Typographys/TypographyBase";

import useResourceTranslate from "src/hooks/useResourceTranslate";

interface MasterImportItemProps {
    fileName: string;
}

export const MasterImportItem = ({ fileName }: MasterImportItemProps) => {
    const tMaster = useResourceTranslate(Entities.MASTERS);

    return (
        <TypographyBase
            data-testid="MasterImportItem__text"
            sx={(theme) => ({
                margin: theme.spacing(0, 0, 0, 1),
                color: theme.palette.other?.body,
                fontSize: theme.typography.body1.fontSize,
            })}
        >
            {tMaster("status.fileConverting", { fileName })}
        </TypographyBase>
    );
};
