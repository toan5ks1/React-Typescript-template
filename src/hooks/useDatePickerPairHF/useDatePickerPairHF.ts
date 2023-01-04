import { useEffect } from "react";

import { dateIsAfter } from "src/common/utils/time";

import { useFormContext } from "src/components/Forms/HookForm";

/**
 * @param {string} startDateName name of field start date in form
 * @param {string} endDateName name of field end date in form
 * @param {number=0} dayOffSet rules date distance of start date and end date
 */

const useDatePickerPairHF = (startDateName: string, endDateName: string, dayOffSet: number = 0) => {
    const { watch, setValue } = useFormContext();
    const [startDate, endDate] = watch([startDateName, endDateName]);

    useEffect(() => {
        if (typeof startDate == "undefined" || typeof endDate == "undefined") return;

        const dateAfterOffset = new Date(startDate);
        dateAfterOffset.setDate(dateAfterOffset.getDate() + dayOffSet);

        if (dateIsAfter(dateAfterOffset, endDate)) setValue(endDateName, dateAfterOffset);
    }, [endDate, endDateName, setValue, startDate, dayOffSet]);
};

export default useDatePickerPairHF;
