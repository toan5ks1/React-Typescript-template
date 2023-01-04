import { ReactNode, useMemo } from "react";

import { useWatch } from "react-hook-form";
import { getDayOfWeekName } from "src/squads/lesson/common/utils";

import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { LessonManagementUpsertFormType } from "src/squads/lesson/pages/LessonManagement/common/types";

interface FormSectionLessonDateRenderProps {
    dayOfWeek: string;
}

export interface FormSectionLessonTimeProps {
    render: (props: FormSectionLessonDateRenderProps) => ReactNode;
}

const FormSectionLessonDate = ({ render }: FormSectionLessonTimeProps) => {
    const tCommon = useTranslate();

    const date = useWatch<LessonManagementUpsertFormType, "date">({
        name: "date",
        defaultValue: new Date(),
    });

    const dayOfWeek = getDayOfWeekName(date, tCommon);

    const renderFormSection: ReactNode = useMemo(() => {
        return render({ dayOfWeek });
    }, [dayOfWeek, render]);

    return <>{renderFormSection}</>;
};

export default FormSectionLessonDate;
