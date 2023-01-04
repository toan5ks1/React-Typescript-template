import { ReactNode, useMemo } from "react";

import get from "lodash/get";
import { UseControllerProps, useFormState, useWatch, useFormContext } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { timeIsAfter } from "src/common/utils/time";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import { LessonManagementUpsertFormType } from "src/squads/lesson/pages/LessonManagement/common/types";

interface WrapperLessonTimePickerRenderProps {
    validateRules: {
        startTime: UseControllerProps["rules"];
        endTime: UseControllerProps["rules"];
    };
}

export interface WrapperLessonTimePickerProps {
    render: (props: WrapperLessonTimePickerRenderProps) => ReactNode;
}

const WrapperLessonTimePicker = (props: WrapperLessonTimePickerProps) => {
    const { render } = props;

    const tCommon = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const { errors } = useFormState<LessonManagementUpsertFormType>();
    const { clearErrors } = useFormContext<LessonManagementUpsertFormType>();

    const [startTime, endTime] = useWatch<LessonManagementUpsertFormType, ["startTime", "endTime"]>(
        { name: ["startTime", "endTime"] }
    );

    const rulesForStartTime: UseControllerProps["rules"] = useMemo(() => {
        return {
            validate: (startTime: Date) => {
                if (!timeIsAfter(endTime, startTime)) {
                    return tCommon("resources.input.error.timeMustComeBefore", {
                        startTime: tLessonManagement("startTime"),
                        endTime: tLessonManagement("endTime"),
                    });
                }

                get(errors, "endTime") && clearErrors("endTime");
                return undefined;
            },
        };
    }, [clearErrors, endTime, errors, tCommon, tLessonManagement]);

    const rulesForEndTime: UseControllerProps["rules"] = useMemo(() => {
        return {
            validate: (endTime: Date) => {
                if (!timeIsAfter(endTime, startTime)) {
                    return tCommon("resources.input.error.timeMustComeBefore", {
                        startTime: tLessonManagement("startTime"),
                        endTime: tLessonManagement("endTime"),
                    });
                }

                get(errors, "startTime") && clearErrors("startTime");
                return undefined;
            },
        };
    }, [clearErrors, errors, startTime, tCommon, tLessonManagement]);

    const renderReactNode: ReactNode = useMemo(() => {
        return render({
            validateRules: { startTime: rulesForStartTime, endTime: rulesForEndTime },
        });
    }, [render, rulesForEndTime, rulesForStartTime]);

    return <>{renderReactNode}</>;
};

export default WrapperLessonTimePicker;
