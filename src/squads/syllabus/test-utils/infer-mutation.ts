import inferMutation from "../services/infer-mutation";

export type InitMutationParams = Parameters<typeof inferMutation>[0];

type DefineMutationType = `${InitMutationParams["entity"]}`;

export const createMockMutationByEntityFn = (
    params: InitMutationParams,
    mapper: { [key in DefineMutationType]?: jest.Mock } = {}
) => {
    const currentEntity = params.entity;

    if (mapper[currentEntity]) return mapper[currentEntity];

    throw new Error(`Please catch the mutation of entity ${currentEntity}`);
};
