### Hook usages

```ts
import { Book } from "./book";
import useQueryBaseV2 from "./useQueryBaseV2";

const {
    data,
    result: { isLoading, isFetching },
    pagination,
} = useQueryBaseV2<Book>({
    entity: Entities.BOOKS, / entity name
    params: {
        filter: {
            schoolId: 12,
        },
        sort: {
            school_id: Order_by.desc,
        },
    },
});
```

This hook will return raw value from provider, most of the time you will need to extract `data` field from the response.

```ts
import useQueryBaseV2 from "./useQueryBaseV2";

const {
    data: { data },
} = useQueryBaseV2(/**/);
```

### Options explanation:

-   `retry`: Number of retry for the query, default to 1.
-   `enabled`: If `false`, don't do any network request.
-   `fetchManually`: If `true`, don't do any network request. (`enabled` and `fetchManually` is opposite to each other, I split it for easier usage)
-   `cacheFor`: [Ms] should the result is cached.
-   `markDataAsStaleAfter`: After [ms], the result will be refetch (on window focus, background focus, ...)
-   `rerenderOnChangeProps`: Should value that we need to trigger component rerender. Example: you only need to rerender whenever `data` changed, ignore `isLoading`, `isFetching`, ..., then it should be `rerenderOnChangeProps: ["data"]`.
-   `selector`: A function used to transform your response.  
    Example: You want array of student names instead of array of students.
    ```ts
    import useQueryBaseV2 from "./useQueryBaseV2";
    const { data } = useQueryBaseV2<Student[], string[]>(
        {},
        {
            selector: (response) => {
                return response.data.map((student) => student.name);
            },
        }
    );
    console.log(data); // data will be array of student na
    ```
-   onError: Called when query has error. Useful for showing notification to user.
-   onSuccess: Called when query is successful. Useful for updating some states relied on the query result or showing notification.
