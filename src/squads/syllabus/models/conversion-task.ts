import { ConversionTaskStatus as ConversionTaskStatusEnum } from "manabuf/bob/v1/media_pb";

export { ConversionTaskStatusEnum };

export type ConversionTaskStatus = keyof typeof ConversionTaskStatusEnum;

export interface ConversionTaskHasura {
    conversion_tasks?: {
        status: ConversionTaskStatus | string;
    }[];
}

export const getStatusConversionTask = (input: ConversionTaskHasura) => {
    return input.conversion_tasks?.[0]?.status;
};
