import { useEffect, useState } from "react";

import { useFormContext } from "react-hook-form";

import ButtonShowHide from "src/squads/syllabus/components/ButtonShowHide";

import { StudyPlanItemStatus } from "manabuf/eureka/v1/assignments_pb";

import { StudyPlanItemStatusKey } from "../../common/constants";
import { StudyPlanItemFormValues } from "../../common/types";

export interface VisibilityToggleProps {
    studyPlanItemId: string;
    status: keyof typeof StudyPlanItemStatus;
}

const VisibilityToggle = (props: VisibilityToggleProps) => {
    const { studyPlanItemId, status } = props;
    const name = `studyPlanItem.${studyPlanItemId}.status` as const;

    const { setValue, register } = useFormContext<StudyPlanItemFormValues>();
    const [visible, setVisible] = useState(
        status === StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE
    );

    useEffect(() => {
        setVisible(status === StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE);
    }, [status]);

    const onActive = () => {
        setValue(name, StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED, {
            shouldDirty: true,
        });
    };

    const onInactive = () => {
        setValue(name, StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ACTIVE, {
            shouldDirty: true,
        });
    };

    const onClick = () => {
        visible ? onActive() : onInactive();
    };

    return (
        <>
            <ButtonShowHide
                visible={visible}
                onClick={onClick}
                iconButtonProps={{ tabIndex: -1, sx: { width: 40, height: 40 } }}
            />
            <input type="hidden" {...register(name)} />
        </>
    );
};

export default VisibilityToggle;
