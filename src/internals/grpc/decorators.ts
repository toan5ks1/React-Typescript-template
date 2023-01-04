// get all public methods of a class
type AllMethodsOf<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];

// the generic is here for fully a type-safe validator
export function validator<T, K extends AllMethodsOf<T>>(
    ...fns: ((...args: Parameters<T[K] | any>) => void)[]
) {
    return function (_target: T, _property: K, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;

        //wrapping the original method
        descriptor.value = function (...args: Parameters<T[K] | any>) {
            if (Array.isArray(fns)) {
                fns.forEach((fn) => fn(...args));
            }

            // bind the target to prevent losing the this context
            return originalMethod.bind(_target);
        };
    };
}
