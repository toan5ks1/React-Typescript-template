import { rootService } from "src/squads/architecture/service/infer-query";
import { Callable } from "src/squads/architecture/service/service-types";

export type QueryEntity = keyof typeof rootService;

export type QueryAction<T extends QueryEntity> = keyof typeof rootService[T]["query"];

export type CallableQueryHandler<E extends QueryEntity, A extends QueryAction<E>> = Callable<
    typeof rootService[E]["query"][A]
>;
