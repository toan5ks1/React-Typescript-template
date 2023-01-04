import { Entities, MIMETypes } from "src/common/constants/enum";
import { isMaterialConverting } from "src/store/lesson-convert";
import { Material } from "src/store/lesson-convert/lesson-convert-types";

import { styled } from "@mui/material/styles";
import FileIcon from "src/components/FileIcon";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useResourceTranslate from "src/hooks/useResourceTranslate";

const StyledFileIcon = styled(FileIcon)(({ theme }) => ({ width: theme.spacing(2) }));

export function MaterialItem(props: Material) {
    const t = useResourceTranslate(Entities.COURSES);
    const { name, status } = props;

    if (!isMaterialConverting(status)) return null;

    return (
        <>
            <StyledFileIcon type={MIMETypes.PDF} />
            <TypographyBase
                data-testid="NotificationTaskbarModal__name"
                sx={(theme) => ({
                    margin: theme.spacing(0, 0, 0, 1),
                    color: theme.palette.other?.body,
                    fontSize: theme.typography.body1.fontSize,
                })}
            >
                {t("lessonConvert.converting", { fileName: name })}
            </TypographyBase>
        </>
    );
}
export default MaterialItem;
