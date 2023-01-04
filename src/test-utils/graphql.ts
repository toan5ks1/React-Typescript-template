import {
    DocumentNode,
    OperationDefinitionNode,
    FragmentDefinitionNode,
    SelectionNode,
    SelectionSetNode,
    FieldNode,
    FragmentSpreadNode,
} from "graphql";

export function getDefinitionsQuery(query: DocumentNode): {
    operation?: OperationDefinitionNode;
    fragment?: FragmentDefinitionNode;
} {
    const definitions = query.definitions;

    const operation = definitions.find(
        (e) => e.kind === "OperationDefinition"
    ) as OperationDefinitionNode;
    const fragment = definitions.find(
        (e) => e.kind === "FragmentDefinition"
    ) as FragmentDefinitionNode;

    return {
        operation,
        fragment,
    };
}

export function getNameDefinition(
    definition?: FragmentDefinitionNode | OperationDefinitionNode
): string {
    if (!definition) return "";

    return definition!.name?.value || "";
}

export function filterSelections(selections: SelectionNode[]): (FieldNode | FragmentSpreadNode)[] {
    let result: (FieldNode | FragmentSpreadNode)[] = [];

    selections.map((e) => {
        if (e.kind === "FragmentSpread") {
            result.push(e as FragmentSpreadNode);
        }
        if (e.kind === "Field") {
            result.push(e as FieldNode);
        }
    });

    return result;
}

export function getSelections(selectionSet?: SelectionSetNode): (FieldNode | FragmentSpreadNode)[] {
    if (!selectionSet) return [];

    //to remove read only
    let selections = filterSelections([...selectionSet.selections]);

    // selections.map((selection: SelectionNode) => {
    //     const childSelectionSet: SelectionSetNode = (selection as any).selectionSet;
    //     if (childSelectionSet) {
    //         selections = [...selections, ...getSelections(childSelectionSet)];
    //     }
    // });
    return selections;
}
export function getValueSelections(
    selections?: (FieldNode | FragmentSpreadNode)[]
): (string | object)[] {
    if (!selections || !selections.length) return [];
    return selections.map((selection) => {
        const childSelectionSet: SelectionSetNode = (selection as any).selectionSet;
        const value = selection.name.value;
        if (!childSelectionSet) {
            return value;
        }
        return {
            [value]: getValueSelections(getSelections(childSelectionSet)),
        };
    });
}

export interface DefinitionTypeReturn<T = OperationDefinitionNode> {
    definitionNode: T;
    values: (string | object)[];
}
export function getQueryFields(query: DocumentNode): {
    operation?: DefinitionTypeReturn;
    fragment?: DefinitionTypeReturn<FragmentDefinitionNode>;
} {
    const { operation, fragment } = getDefinitionsQuery(query);

    const operationSelections = getSelections(operation?.selectionSet);
    const fragmentSelections = getSelections(fragment?.selectionSet);

    const operationValueSelections = getValueSelections(operationSelections);
    const fragmentValueSelections = getValueSelections(fragmentSelections);

    return {
        operation: {
            definitionNode: operation!,
            values: operationValueSelections,
        },
        fragment: {
            definitionNode: fragment!,
            values: fragmentValueSelections,
        },
    };
}
