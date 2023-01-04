import { InvalidParamError, ToStringFormat } from "src/squads/calendar/service/service-types";

export const getInvalidParamErrorObject = (error: unknown): ToStringFormat => {
    return error instanceof InvalidParamError ? JSON.parse(error.toString()) : undefined;
};
