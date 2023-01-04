import { LoggingInterceptor, MetadataInterceptor } from "./interceptors";

export type GrpcOptions = { [x: string]: any };

export const commonGrpcOptions: GrpcOptions = {
    unaryInterceptors: [new MetadataInterceptor(), new LoggingInterceptor()],
};
