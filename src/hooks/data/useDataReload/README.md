### Hook usages

This hook is use for trigger all request that related to `useQuery`.
Use this hook with care because it _**MAY**_ trigger all fetches and rerender an entire app.

Example usage:

```ts
// version will increase each reload and cause all the `useQuery` to be refetch
const { version, reload } = useDataReload();
const { data } = useQueryWithPagination();

const deleteSomeThingSesrious = async () => {
    await deleteNe();

    reload();
    // useQueryWithPagination will refetch after this
};
```

### Hook return

-   `version`: Current API version of our app, it is a global value, can be change by trigger the `reload` function.
-   `reload`: trigger this will increase version by 1 and refetch all `useQuery` related queries.
