import { HasuraErrorCode } from "src/common/constants/enum";
import { errorCodesMap } from "src/common/utils/error";
import { safeStringify } from "src/common/utils/other";
import { AppError } from "src/squads/communication/internals/errors/errors";

export interface HasuraErrorOptions {
    code: HasuraErrorCode | number | string;
    message: string;
}

export function getHasuraErrorMsg(errCode: HasuraErrorOptions["code"] = "") {
    switch (errCode) {
        case HasuraErrorCode.INVALID_JWT:
        case HasuraErrorCode.INVALID_HEADERS:
            return errorCodesMap.INVALID_JWT;
        case HasuraErrorCode.TOKEN_EXPIRED:
            return errorCodesMap.TOKEN_EXPIRED;
        case HasuraErrorCode.ACCESS_DENIED:
            return errorCodesMap.PERMISSION_DENIED;
        case HasuraErrorCode.VALIDATION_FAILED:
            return errorCodesMap.ALLOW_LIST_DENIED;
        case HasuraErrorCode.DATA_EXCEPTION:
        case HasuraErrorCode.CONSTRAINT_VIOLATION:
        case HasuraErrorCode.PARSE_FAILED:
            return errorCodesMap.INVALID_PARAMS;
        case HasuraErrorCode.POSTGRES_ERROR:
            return errorCodesMap.CONNECTION;

        default:
            return errorCodesMap.UNKNOWN;
    }
}

export class HasuraError extends AppError {
    originMessage: string;
    code: number | string;
    name = "HasuraError";

    toString() {
        const errorObj = {
            originMessage: this.originMessage,
            code: this.code,
            name: this.name,
        };

        return safeStringify(errorObj);
    }

    constructor({ message, code }: HasuraErrorOptions) {
        super(getHasuraErrorMsg(code));
        this.originMessage = message;
        this.code = code;
    }
}
