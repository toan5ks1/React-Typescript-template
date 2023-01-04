import { commonGrpcOptions } from "../base";
import { MetadataInterceptor, LoggingInterceptor } from "../interceptors";

describe("base grpc", function () {
    test("commonGrpcOptions should contains 2 interceptors", () => {
        expect(commonGrpcOptions.unaryInterceptors).toHaveLength(2);

        expect(commonGrpcOptions.unaryInterceptors[0]).toBeInstanceOf(MetadataInterceptor);
        expect(commonGrpcOptions.unaryInterceptors[1]).toBeInstanceOf(LoggingInterceptor);
    });
});
