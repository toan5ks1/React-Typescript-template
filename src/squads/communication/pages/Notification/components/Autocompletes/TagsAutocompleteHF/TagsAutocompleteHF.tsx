import CreatableAutocompleteReferenceHF, {
    CreatableAutocompleteReferenceHFProps,
} from "src/squads/communication/pages/Notification/components/Autocompletes/CreatableAutocompleteReferenceHF";

const TagsAutocompleteHF = (
    props: Omit<
        CreatableAutocompleteReferenceHFProps<"tags", "communicationGetManyReferenceTags">,
        "action" | "entity" | "params"
    >
) => {
    return (
        <CreatableAutocompleteReferenceHF
            id="TagsAutocompleteHF__autocomplete"
            data-testid="TagsAutocompleteHF__autocomplete"
            action="communicationGetManyReferenceTags"
            params={(keyword) => ({
                name: keyword,
            })}
            entity="tags"
            optionLabelKey="tag_name"
            {...props}
        />
    );
};

export default TagsAutocompleteHF;
