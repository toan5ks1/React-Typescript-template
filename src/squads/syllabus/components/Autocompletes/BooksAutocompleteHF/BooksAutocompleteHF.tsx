import AutocompleteReferenceHF, { AutocompleteReferenceHFProps } from "../AutocompleteReferenceHF";

const BooksAutocompleteHF = (
    props: Omit<
        AutocompleteReferenceHFProps<"book", "syllabusBookGetManyReference">,
        "action" | "entity" | "params"
    >
) => {
    return (
        <AutocompleteReferenceHF
            entity="book"
            action="syllabusBookGetManyReference"
            data-testid="BooksAutocompleteHF__autocomplete"
            params={(keyword) => ({
                limit: 10,
                offset: 0,
                name: keyword,
            })}
            selector={(books) => {
                if (!books) return [];
                return books.map((i) => ({
                    value: i.name,
                    ...i,
                }));
            }}
            {...props}
        />
    );
};

export default BooksAutocompleteHF;
