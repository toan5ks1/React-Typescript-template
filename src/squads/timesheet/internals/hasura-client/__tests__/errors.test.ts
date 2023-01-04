import { HasuraErrorCode } from "src/common/constants/enum";
import { errorCodesMap } from "src/common/utils/error";
import { getErrorFromMsg } from "src/packages/stackdriver/utils";

import { getHasuraErrorMsg, HasuraError } from "../errors";

describe("getHasuraErrorMsg", () => {
    it("should return correct error message accords with error code", () => {
        expect(getHasuraErrorMsg(HasuraErrorCode.INVALID_JWT)).toEqual(errorCodesMap.INVALID_JWT);
        expect(getHasuraErrorMsg(HasuraErrorCode.INVALID_HEADERS)).toEqual(
            errorCodesMap.INVALID_JWT
        );
        expect(getHasuraErrorMsg(HasuraErrorCode.TOKEN_EXPIRED)).toEqual(
            errorCodesMap.TOKEN_EXPIRED
        );
        expect(getHasuraErrorMsg(HasuraErrorCode.ACCESS_DENIED)).toEqual(
            errorCodesMap.PERMISSION_DENIED
        );
        expect(getHasuraErrorMsg(HasuraErrorCode.VALIDATION_FAILED)).toEqual(
            errorCodesMap.ALLOW_LIST_DENIED
        );
        expect(getHasuraErrorMsg(HasuraErrorCode.DATA_EXCEPTION)).toEqual(
            errorCodesMap.INVALID_PARAMS
        );
        expect(getHasuraErrorMsg(HasuraErrorCode.CONSTRAINT_VIOLATION)).toEqual(
            errorCodesMap.INVALID_PARAMS
        );
        expect(getHasuraErrorMsg(HasuraErrorCode.PARSE_FAILED)).toEqual(
            errorCodesMap.INVALID_PARAMS
        );
        expect(getHasuraErrorMsg(HasuraErrorCode.POSTGRES_ERROR)).toEqual(errorCodesMap.CONNECTION);
        expect(getHasuraErrorMsg()).toEqual(errorCodesMap.UNKNOWN);
    });
});

describe("HasuraError", () => {
    it("should return correct err msg", () => {
        expect(
            new HasuraError({
                code: HasuraErrorCode.INVALID_JWT,
                message: HasuraErrorCode.INVALID_JWT,
            }).message
        ).toEqual(errorCodesMap.INVALID_JWT);

        expect(
            new HasuraError({
                code: HasuraErrorCode.INVALID_HEADERS,
                message: HasuraErrorCode.INVALID_HEADERS,
            }).message
        ).toEqual(errorCodesMap.INVALID_JWT);

        expect(
            new HasuraError({
                code: HasuraErrorCode.TOKEN_EXPIRED,
                message: HasuraErrorCode.TOKEN_EXPIRED,
            }).message
        ).toEqual(errorCodesMap.TOKEN_EXPIRED);

        expect(
            new HasuraError({
                code: HasuraErrorCode.ACCESS_DENIED,
                message: HasuraErrorCode.ACCESS_DENIED,
            }).message
        ).toEqual(errorCodesMap.PERMISSION_DENIED);

        expect(
            new HasuraError({
                code: HasuraErrorCode.VALIDATION_FAILED,
                message: HasuraErrorCode.VALIDATION_FAILED,
            }).message
        ).toEqual(errorCodesMap.ALLOW_LIST_DENIED);

        expect(
            new HasuraError({
                code: HasuraErrorCode.DATA_EXCEPTION,
                message: HasuraErrorCode.DATA_EXCEPTION,
            }).message
        ).toEqual(errorCodesMap.INVALID_PARAMS);

        expect(
            new HasuraError({
                code: HasuraErrorCode.CONSTRAINT_VIOLATION,
                message: HasuraErrorCode.CONSTRAINT_VIOLATION,
            }).message
        ).toEqual(errorCodesMap.INVALID_PARAMS);

        expect(
            new HasuraError({
                code: HasuraErrorCode.PARSE_FAILED,
                message: HasuraErrorCode.PARSE_FAILED,
            }).message
        ).toEqual(errorCodesMap.INVALID_PARAMS);

        expect(
            new HasuraError({
                code: HasuraErrorCode.POSTGRES_ERROR,
                message: HasuraErrorCode.POSTGRES_ERROR,
            }).message
        ).toEqual(errorCodesMap.CONNECTION);

        expect(new HasuraError({ code: "", message: "" }).message).toEqual(errorCodesMap.UNKNOWN);
    });
    it("should combine the message getErrorFromMsg with HasuraError", () => {
        const hasuraErr = new HasuraError({ code: 13, message: "Hasura error" });

        const errorMessages = [hasuraErr];

        const expectErr = new Error(hasuraErr.toString());
        expectErr.name = hasuraErr.name;

        expect(getErrorFromMsg(errorMessages)).toEqual(expectErr);
    });
});
