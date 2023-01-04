### Hook usages

```ts
const { mutate, mutateAsync, isLoading, error } = useMutationV2({
    entity: Entities.BOOKS, // entity name
    action: ProviderTypes.DELETE, // service action
});
```

In mose of cases, you will use the `mutate` and `mutateAsync` return from useMutationV2.

-   `mutate`: Synchronous function with callback style, automatically catch error
-   `mutateAsync`: Asynchronous function, can be `async/await` and need to manually catch error by `try {} catch{}`

```ts
// mutate usage
const onDeleteTodo = () => {
    mutate(
        { todoId },
        {
            onSuccess: () => {},
            onError: () => {},
        }
    );
};
```

Remember to **try catch** mutateAsync

```ts
// mutateAsync usage
const onDeleteTodo = async () => {
    try {
        // remember to await in try catch, else the error will propagate outside and make our app crash
        await mutateAsync(
            { todoId },
            {
                // can still have onSuccess, ..., but it is not recommend
                onSuccess: () => {},
                onError: () => {},
            }
        );
    } catch (e) {}
};
```

### Options explanation:

```ts
const { mutate, mutateAsync } = useMutationV2(request, {
    // key for the mutation, help us identify the request in react-query devtools
    mutationKey: "key",
    // this function run BEFORE the mutation, example usage: insert media before create assignment
    onBeforeMutate: (variables: TVariables): Promise<TContext | void> | TContext | void => {},
    // Run when the mutation SUCCEED
    onSuccess: (data: Response): void => {},
    // Run when the mutation FAILED
    onError: (error: Error): void => {},
    // number | boolean |  (failureCount: number, error: TError) => boolean)=> number | boolean
    // if retry is false, no retry
    // if retry is true, retry forever
    // if retry is a number of X, retry for a X times
    // if retry is function => boolean, you decide if we should retry or not
    retry: 3,
    // Retry in X miliseconds
    // number | (retryAttempt: number, error: TError) => number
    retryDelay: 5,
});
```

### Other return values

```ts
const {
    mutate,
    mutateAsync,
    status, // <string> "idle" | "loading" | "error" | "success"
    isIdle, // boolean of "idle" take from `status`
    isLoading, // boolean of "loading" take from `status`
    isError, // boolean of "error" take from `status`
    isSuccess, // boolean of "success" take from `status`
    error, // Throw error throw from service when we use `mutate`
} = useMutationV2();
```
