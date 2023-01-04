import { CallOptions, MethodDescriptor, Request, StatusCode } from "grpc-web";
import { handleUnknownError } from "src/common/utils/error";

import authManager from "../../auth-manager";
import { GrpcError } from "../errors";
import { MetadataInterceptor } from "../interceptors";

jest.mock("../../auth-manager", () => {
    const isAuthFn = jest.fn();

    return {
        __esModule: true,
        default: {
            async getAccessToken() {
                return "USER_TOKEN";
            },
            getCustomToken() {
                return "USER_CUSTOM_TOKEN";
            },
            getBlocking() {
                return null;
            },
            isAuthenticated: isAuthFn,
        },
    };
});

jest.mock("../interceptors", () => {
    const actual = jest.requireActual("../interceptors");

    return {
        ...actual,
        getMetadata: {
            b: "5",
            c: "3",
            d: "4",
        },
    };
});

jest.mock("../../../common/utils/error", () => ({
    __esModule: true, // this property makes it work
    handleErrorGrpc: jest.fn((err) => {
        throw new Error(err.message);
    }),
}));

describe("MetadataInterceptor", () => {
    const initialMetadata = {
        a: "1",
        b: "2",
    };

    const request: Request<any, any> = {
        getMetadata() {
            return initialMetadata;
        },
        getCallOptions(): CallOptions {
            return new CallOptions({});
        },
        getMethodDescriptor(): MethodDescriptor<any, any> {
            return new MethodDescriptor("", "", "", "", "", "");
        },
        getRequestMessage(): any {},
    };

    it("it should run as happy case", (done) => {
        //interceptor will merge the initialMetadata with get from getMetadata fn but prior the initialMetadata
        const resp = { a: "response" };
        let invoker = jest.fn(async function () {
            return resp;
        });
        const ins = new MetadataInterceptor();

        ins.intercept(request, invoker as any)
            .then((e) => {
                expect(invoker).toHaveBeenCalledWith(request);
                expect(e).toEqual(resp);
            })
            .catch((e) => {
                // eslint-disable-next-line no-console
                expect(e).toEqual("Should not have error");
            })
            .finally(() => {
                done();
            });
    });

    it("should run correct when error is returned", (done) => {
        const err = new Error("HELLO");

        try {
            let invoker = jest.fn(async function () {
                throw err;
            });
            const ins = new MetadataInterceptor();

            ins.intercept(request, invoker)
                .catch((e) => {
                    expect(e.originMessage).toEqual(err.message);
                    expect(e.message).toEqual("ra.manabie-error.unknown");
                })
                .finally(() => {
                    done();
                });
        } catch (e) {
            const error = handleUnknownError(e);
            expect(error.originMessage).toEqual(err.message);
        }
    });

    it("should retry when err is unauthenticated", async () => {
        (authManager.isAuthenticated as jest.Mock).mockReturnValue(true);

        const err = new GrpcError({ message: "Hello", code: StatusCode.UNAUTHENTICATED });
        const fakeData = [{ a: 1 }];

        // should not retry 2 times
        let invoker = jest
            .fn()
            .mockImplementationOnce(async function () {
                throw err;
            })
            .mockImplementationOnce(async () => {
                return fakeData;
            });
        const ins = new MetadataInterceptor();

        const result = await ins.intercept(request, invoker);

        expect(authManager.isAuthenticated).toHaveBeenCalledWith(true);
        expect(invoker).toHaveBeenCalledTimes(2);
        expect(result).toEqual(fakeData);
    });
});
