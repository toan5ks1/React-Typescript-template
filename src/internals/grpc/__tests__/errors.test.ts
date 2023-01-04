import { getErrorFromMsg } from "src/packages/stackdriver/utils";

import { GrpcError, getGrpcErrorMsg, grpcErrorsMap } from "../errors";

describe("getGrpcErrorMsg", () => {
    it("should return correct err msg", () => {
        expect(getGrpcErrorMsg(3)).toEqual(grpcErrorsMap.INVALID_PARAMS);
        expect(getGrpcErrorMsg(4)).toEqual(grpcErrorsMap.DEADLINE_EXCEEDED);
        expect(getGrpcErrorMsg(5)).toEqual(grpcErrorsMap.NOT_FOUND);
        expect(getGrpcErrorMsg(6)).toEqual(grpcErrorsMap.ALREADY_EXISTS);
        expect(getGrpcErrorMsg(7)).toEqual(grpcErrorsMap.PERMISSION_DENIED);
        expect(getGrpcErrorMsg(8)).toEqual(grpcErrorsMap.RESOURCE_EXHAUSTED);
        expect(getGrpcErrorMsg(13)).toEqual(grpcErrorsMap.INTERNAL);
        expect(getGrpcErrorMsg(14)).toEqual(grpcErrorsMap.NO_INTERNET);
        expect(getGrpcErrorMsg(16)).toEqual(grpcErrorsMap.NOT_AUTHENTICATED);

        expect(getGrpcErrorMsg(999)).toEqual(grpcErrorsMap.UNKNOWN);
        expect(getGrpcErrorMsg(9)).toEqual(grpcErrorsMap.UNKNOWN);
    });
});

describe("GrpcError", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should return code 13 when network disconnected", () => {
        const originalError = {
            message: "Http response at 400 or 500 level",
            code: 2,
        };

        const error = new GrpcError(originalError);

        expect(error.originMessage).toEqual(originalError.message);
        expect(error.message).toEqual(`${getGrpcErrorMsg(originalError.code)}`);
    });

    it("should call logout when meet critical error", () => {
        const originalError = {
            message: "NOT_AUTHENTICATED",
            code: 7,
        };
        const fn = jest.fn();
        const e = new GrpcError(originalError, { onCritical: fn });

        expect(e.originMessage).toEqual(originalError.message);
        expect(e.message).toEqual(`${getGrpcErrorMsg(originalError.code)}`);
        expect(fn.mock.calls.length).toEqual(1);
    });
    it("should combine the message getErrorFromMsg with GRPCError", () => {
        const grpcErr = new GrpcError({ code: 13, message: "gRPC error" });

        const errorMessages = [grpcErr];

        const expectErr = new Error(grpcErr.toString());
        expectErr.name = grpcErr.name;

        expect(getErrorFromMsg(errorMessages)).toEqual(expectErr);
    });
});
