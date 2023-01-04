import { memo } from "react";

import TypographyBase from "src/components/Typographys/TypographyBase";

interface CommonColumnProps {
    content: string;
}

function CommonColumn({ content }: CommonColumnProps) {
    return <TypographyBase variant="body2">{content}</TypographyBase>;
}

export default memo(CommonColumn);
