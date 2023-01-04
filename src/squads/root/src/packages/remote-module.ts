// // required: Throw error on module failed to fetch
// // optional: Do not care about it failed or not
// // retry-on-use: Retry a few time at first, if failed, retry again when the property is used.
// // because frontend scripts rarely needs to communicate to a busy service,
// // so we don't support exponential retry
// export type RemoteModuleType = "required" | "optional" | "requiredOnUse";
//
//
// export class RemoteModuleError extends Error {
//     name = "RemoteModuleError"
//     isModuleError = true;
//
//     constructor(msg: string) {
//         super(msg);
//
//         Error.captureStackTrace(this, this.constructor);
//     }
// }
//
//
// function createRemoteModule<ReturnedModule>(
//     loader: () => Promise<ReturnedModule>,
//     {
//         remoteModuleType,
//         maxRetryTimes,
//         interval,
//         abortSignal,
//     }: {
//         remoteModuleType: RemoteModuleType;
//         maxRetryTimes: number;
//         interval: number;
//         abortSignal: AbortSignal;
//     }
// ) {
//     const remoteModuleType: RemoteModuleType = remoteModuleType;
//     let isFetching = false;
//     let timeout: number | undefined = undefined;
//     let isSucceed = false;
//
//     function moduleRetry(
//         fn: () => Promise<ReturnedModule>,
//         { retryTimes = 5, interval = 1000 } = {}
//     ): Promise<ReturnedModule> {
//         return new Promise((resolve, reject) => {
//             const wrappedResolve = (module: ReturnedModule) => {
//                 isFetching = false;
//                 isSucceed = true;
//                 resolve(module);
//             };
//             const wrappedReject = (err: Error) => {
//                 isFetching = false;
//                 reject(err);
//             };
//
//             abortSignal?.addEventListener("abort", () => {
//                 if (timeout) {
//                     clearTimeout(timeout);
//                 }
//
//                 wrappedReject(new Error("Retry aborted"));
//             });
//
//             isFetching = true;
//             fn()
//                 .then(wrappedResolve)
//                 .catch((error) => {
//                     // if we'd like to do some server side stuffs, convert to globalThis. instead of window
//                     timeout = window.setTimeout(() => {
//                         if (retryTimes <= 0) {
//                             reject(error);
//                             return;
//                         }
//                         moduleRetry(fn, { retryTimes: retryTimes - 1, interval }).then(
//                             wrappedResolve,
//                             wrappedReject
//                         );
//                     }, interval);
//                 });
//         });
//     }
//
//     return {
//         async start(): Promise<ReturnedModule> {
//             if (isFetching) {
//
//             }
//
//             try {
//                 return await moduleRetry(loader, {
//                     interval,
//                     retryTimes: maxRetryTimes
//                 });
//             } catch (e) {
//                 if (remoteModuleType === "required") {
//                     throw e;
//                 }
//                 if (remoteModuleType === "optional") {
//                     throw e;
//                 }
//                 if (remoteModuleType === "requiredOnUse") {
//                     return this.wrap()
//                 }
//
//                 throw new Error(`unknown module type ${remoteModuleType}` )
//             }
//
//         },
//         wrap(): ReturnedModule {
//             // fake proxy for ReturnedModule
//             const proxied = new Proxy(Object.create(null), {
//                 async get(_: object, key: string): Promise<ReturnedModule> {
//                     if (isSucceed) {
//                     }
//                 },
//             });
//             return proxied;
//         },
//     };
// }

export {};
