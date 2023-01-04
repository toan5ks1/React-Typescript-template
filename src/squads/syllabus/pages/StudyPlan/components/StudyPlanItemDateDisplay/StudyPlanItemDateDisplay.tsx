import { useTimezoneCtx } from "src/squads/syllabus/contexts/timezone";

import DoubleDash from "src/components/DoubleDash";
import TypographyBase, { TypographyBaseProps } from "src/components/Typographys/TypographyBase";

import { formatDate } from "../../common/utils";

interface StudyPlanItemDateDisplayProps {
    value: string;
}

const StudyPlanItemDateDisplay = (props: StudyPlanItemDateDisplayProps) => {
    const { value } = props;
    const { timezone } = useTimezoneCtx();
    const typographyProps = {
        variant: "body2" as TypographyBaseProps["variant"],
        "data-testid": "StudyPlanItem__dateDisplay",
    };

    if (isNaN(Date.parse(value))) {
        return (
            <TypographyBase {...typographyProps}>
                <DoubleDash />
            </TypographyBase>
        );
    }

    return (
        <TypographyBase {...typographyProps}>
            {formatDate({ isoDate: value, timezone })}
        </TypographyBase>
    );
};

export default StudyPlanItemDateDisplay;
