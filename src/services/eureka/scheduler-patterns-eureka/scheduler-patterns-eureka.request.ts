import { CreateOpeningTimeFormProps } from "src/common/constants/types";
import { setEndOfDate } from "src/common/utils/time";
import { toTimestamp } from "src/common/utils/timezone";

import {
    CreateOpenTimeSchedulerRequest,
    OpenTimeSchedulerMetaData,
    OpeningStatus,
    RepeatOptionData,
    RepeatType,
} from "manabuf/eureka/v1/scheduler_pb";

import { NsEurekaSchedulerPatternService, CreateOpeningTimeGrpcProps } from "./types";

const formInvalidErr = new Error();

// Rule: The owner of open time is only brand or center
export function haveOneOfOwnerID(data?: NsEurekaSchedulerPatternService.OpenTimeScheduler) {
    return (data?.brandId && !data?.centerId) || (data?.centerId && !data?.centerId);
}

export function validateOpenTimeScheduler(
    data?: NsEurekaSchedulerPatternService.OpenTimeScheduler
) {
    if (!data || !data.openTime || !data.metaData || !haveOneOfOwnerID) {
        throw formInvalidErr;
    }
}

// Rule: Duration of the repeat option data has only Count or Until value
export function haveOneOfDuration(data?: NsEurekaSchedulerPatternService.RepeatOptionData) {
    return (data?.count && !data?.until) || (data?.until && !data?.count);
}

export function validateRepeatOptionData(data?: NsEurekaSchedulerPatternService.RepeatOptionData) {
    if (!data || typeof data.repeatType === "undefined" || !haveOneOfDuration) {
        throw formInvalidErr;
    }
}

////////////////////////////////////

export async function newCreateOpenTimeScheduler(
    data: NsEurekaSchedulerPatternService.OpenTimeScheduler
): Promise<CreateOpenTimeSchedulerRequest> {
    const req = new CreateOpenTimeSchedulerRequest();
    const repeatOptionData = new RepeatOptionData();
    const metaData = new OpenTimeSchedulerMetaData();

    data.brandId ? req.setBrandId(data.brandId) : req.setCenterId(data.centerId);

    metaData.setOpeningStatus(data.metaData?.openingStatus || OpeningStatus.OPENING_STATUS_REGULAR);
    req.setMetaData(metaData);

    if (data.repeatOptionData) {
        validateRepeatOptionData(data.repeatOptionData);

        repeatOptionData.setRepeatType(data.repeatOptionData?.repeatType);

        if (data.repeatOptionData.repeatType != RepeatType.REPEAT_TYPE_NONE) {
            repeatOptionData.setUntil(
                toTimestamp({
                    originDate: data.repeatOptionData?.until,
                    origin: true,
                    start: false,
                    type: "day",
                })
            );
        }

        req.setRepeatOptionData(repeatOptionData);
    }

    req.setOpenTime(
        toTimestamp({
            originDate: data.openTime,
            origin: true,
            start: false,
            type: "day",
        })
    );

    return req;
}

////////////////////////////////////

export const convertFormPropsToCreateOpenTimeRequest = (data: CreateOpeningTimeFormProps) => {
    const openTime = data.opening_date || new Date();
    data.opening_hour && openTime.setHours(data.opening_hour);
    data.opening_minutes && openTime.setMinutes(data.opening_minutes);

    const req: CreateOpeningTimeGrpcProps = {
        brandId: data.brand_id,
        centerId: data.center_id,
        openTime: openTime,
        metaData: {
            openingStatus: data.opening_status,
        },
        repeatOptionData: {
            repeatType: data.repeat_option,
            until: undefined,
        },
    };

    if (req.repeatOptionData?.repeatType !== RepeatType.REPEAT_TYPE_NONE) {
        req.repeatOptionData.until = setEndOfDate(data.date_until);
    }

    return req;
};
