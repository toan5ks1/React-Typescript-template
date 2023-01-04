import { InvalidParamError } from "src/squads/syllabus/services/service-types";

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
export interface TestCaseValidateRequest<T, P = true, O = any> {
    title: string;
    input: P extends true ? T : DeepPartial<T>;
    output?: O;
}

export const getInvalidParamErrorObject = (error: unknown) => {
    return error instanceof InvalidParamError ? JSON.parse(error.toString()) : undefined;
};
