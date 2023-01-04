import { useContext } from "react";

import { BookDetailContext } from "src/squads/syllabus/providers/BookDetailProvider";

export interface BookDetailTypesReturn {
    isDisableAction: boolean;
}

const useBookDetail = (): BookDetailTypesReturn => {
    const { isDisableAction } = useContext(BookDetailContext);

    return { isDisableAction };
};

export default useBookDetail;
