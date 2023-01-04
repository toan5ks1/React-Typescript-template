import { InvalidParamError, ToStringFormat } from "src/squads/lesson/service/service-types";

export const getInvalidParamErrorObject = (error: unknown): ToStringFormat => {
    return error instanceof InvalidParamError ? JSON.parse(error.toString()) : undefined;
};
