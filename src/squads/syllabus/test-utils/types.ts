import { UseMutationOptions } from "src/squads/syllabus/services/service-creator";

export interface CreateMockDataTest<T, P = never> {
    (data?: Partial<T>, options?: P): T;
}

export type MockInferMutationFn<TData, TReturn = unknown> = (
    options: UseMutationOptions<{ data: TData }, TReturn, Error>
) => void;
