export type TypeObject = Record<string | number, any>;

export type Mutable<T> = {
    -readonly [k in keyof T]: T[k];
};

export type MutableOptional<T> = {
    -readonly [k in keyof T]?: T[k];
};

export type MutableOtherType<T, K> = {
    -readonly [k in keyof T]?: K;
};

export type OptionalKeys<T> = {
    [K in keyof T]?: T[K];
};

export type OptionalToRequired<O, K extends keyof O> = O &
    {
        [P in K]-?: O[P];
    };

export type RequiredToOptional<O, K extends keyof O> = Partial<Pick<O, K>> & Omit<O, K>;

export type PartialPick<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type Fn = (...args: any[]) => any;

export type OptionalPick<T, K extends keyof T> = Pick<Partial<T>, K>;

export type TypeOfObjectValues<T extends Record<any, any>> = {
    [X in keyof T]: T[X];
}[keyof T];

export type ExtractFnWithGeneric<T> = {
    (e: T): T;
};

export type UnPromisify<T> = T extends Promise<infer U> ? U : T; //extract promise

export type ExtractQueryParamTypes<V extends Fn, T> = Extract<Parameters<V>[0], { type: T }>; // get specific param type in union types of a services
