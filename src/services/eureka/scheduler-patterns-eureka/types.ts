import {
    OpeningStatus,
    RepeatType,
    CreateOpenTimeSchedulerRequest,
    RepeatOptionData,
} from "manabuf/eureka/v1/scheduler_pb";

export declare namespace NsEurekaSchedulerPatternService {
    export interface OpenTimeScheduler extends CreateOpenTimeSchedulerRequest.AsObject {}
    export interface RepeatOptionData extends RepeatOptionData.AsObject {}
}

export type CreateOpeningTimeGrpcProps = {
    brandId?: string;
    centerId?: string;
    openTime: Date;
    metaData: {
        openingStatus: OpeningStatus;
    };
    repeatOptionData: {
        repeatType: RepeatType;
        until?: Date;
    };
};
