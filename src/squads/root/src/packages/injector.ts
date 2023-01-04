export interface InjectionKey<_T> extends String {}

export type InjectProvideFn = <T>(key: InjectionKey<T>, value: T) => void;

export interface RootInjector {
    inject: InjectProvideFn;
}

// Inject your team instance into the root `window.__MANA__`
// Restriction: always in object style

export function createInjector(root: Record<string, unknown>): RootInjector {
    return {
        inject<T extends Record<string, any>>(key: InjectionKey<T>, value: T) {
            const keyAsString = key as string;
            if (root[keyAsString]) {
                throw new Error(
                    `key: ${key} is existed, please inject another key or your script is loaded 2 times?`
                );
            }
            root[keyAsString] = value;
        },
    };
}
