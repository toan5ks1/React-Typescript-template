import { useCallback, useMemo, useState } from "react";

interface CollectionValue {
    children?: string;
    checked?: boolean;
}

export interface Collection {
    [x: string]: CollectionValue;
}

export interface SelectedPairChildReturn {
    parent: string;
    child: string;
}

export interface UseStudyPlanReturn {
    disabledAdd: boolean;
    disabledUpdate: boolean;
    firstSelectedChild: string;
    selectCollection: Collection;

    reset: () => void;
    onSelectParent: (parentKey: string, checked: boolean) => void;
    onSelectChild: (parentKey: string, childKey: string, checked: boolean) => void;
    getSelectedPairChild: () => SelectedPairChildReturn[];
    getSelectedParents: () => string[];
    getInitOpen: (parentKey: string) => string | undefined;
    getInitSelected: (parentKey: string) => boolean | undefined;
}

const useStudyPlan = (): UseStudyPlanReturn => {
    const [selectCollection, setSelectCollection] = useState<Collection>({});
    const reset = useCallback(() => setSelectCollection({}), []);

    const disabledUpdate = useMemo(() => {
        let result: boolean = true;
        for (let key in selectCollection) {
            const condition =
                selectCollection.hasOwnProperty(key) && selectCollection[key].children;
            if (condition) {
                result = false;
                break;
            }
        }
        return result;
    }, [selectCollection]);

    const disabledAdd = useMemo(() => {
        let result: boolean = true;
        for (let key in selectCollection) {
            const condition = selectCollection.hasOwnProperty(key) && selectCollection[key].checked;
            if (condition) {
                result = false;
                break;
            }
        }
        return result;
    }, [selectCollection]);

    const onSelectParent = useCallback((parentKey: string, checked: boolean) => {
        setSelectCollection((prev) => {
            const temp = prev[parentKey] || {};
            return { ...prev, [parentKey]: { ...temp, checked } };
        });
    }, []);

    const onSelectChild = useCallback((parentKey: string, childKey: string, checked: boolean) => {
        setSelectCollection((prev) => {
            const temp = prev[parentKey] || {};
            return { ...prev, [parentKey]: { ...temp, children: checked ? childKey : undefined } };
        });
    }, []);

    const getSelectedParents = useCallback((): string[] => {
        const ids: string[] = [];
        Object.keys(selectCollection).forEach((key) => {
            if (selectCollection[key].checked) {
                ids.push(key);
            }
        });
        return ids;
    }, [selectCollection]);

    const getSelectedPairChild = useCallback((): SelectedPairChildReturn[] => {
        const ids: SelectedPairChildReturn[] = [];
        Object.keys(selectCollection).forEach((key) => {
            const { children } = selectCollection[key];
            if (children) {
                ids.push({ parent: key, child: children });
            }
        });
        return ids;
    }, [selectCollection]);

    const firstSelectedChild = useMemo(() => {
        let result: string = "";

        for (let key in selectCollection) {
            const condition =
                selectCollection.hasOwnProperty(key) &&
                typeof selectCollection[key].children === "string";
            if (condition) {
                result = selectCollection[key].children as string;
                break;
            }
        }

        return result;
    }, [selectCollection]);

    const getInitOpen = useCallback(
        (parentKey: string) => selectCollection[parentKey] && selectCollection[parentKey].children,
        [selectCollection]
    );

    const getInitSelected = useCallback(
        (parentKey: string) => selectCollection[parentKey].checked,
        [selectCollection]
    );

    return {
        disabledAdd,
        disabledUpdate,
        selectCollection,
        firstSelectedChild,
        reset,
        onSelectParent,
        onSelectChild,
        getInitOpen,
        getInitSelected,
        getSelectedParents,
        getSelectedPairChild,
    };
};

export default useStudyPlan;
