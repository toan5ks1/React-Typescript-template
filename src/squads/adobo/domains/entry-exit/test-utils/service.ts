import {
    InvalidParamError,
    ToStringFormat,
} from "src/squads/adobo/domains/entry-exit/services/service-types";

export const getInvalidParamErrorObject = (error: unknown): ToStringFormat => {
    return error instanceof InvalidParamError ? JSON.parse(error.toString()) : undefined;
};
