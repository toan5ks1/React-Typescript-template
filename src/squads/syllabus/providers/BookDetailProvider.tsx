import { createContext, PropsWithChildren, useMemo } from "react";

import { Features } from "src/common/constants/enum";

import useFeatureToggle from "../hooks/useFeatureToggle";
import { BookTypeKeys } from "../pages/Book/common/constants";
import { Syllabus_BookOneQuery } from "../services/eureka/eureka-types";

export interface BookDetailContextValue {
    isDisableAction: boolean;
}

export const BookDetailContext = createContext<BookDetailContextValue>({
    isDisableAction: false,
});

const { Provider } = BookDetailContext;

export const BookDetailProvider = ({
    children,
    book,
}: PropsWithChildren<{ book: Syllabus_BookOneQuery["books"][0] }>) => {
    const { isEnabled: isUseFlagAdHoc } = useFeatureToggle(Features.SYLLABUS_BOOK_BOOKTYPE_ADHOC);

    const contextValue: BookDetailContextValue = useMemo(() => {
        const isDisableAction = book.book_type === BookTypeKeys.BOOK_TYPE_ADHOC && isUseFlagAdHoc;

        return {
            isDisableAction,
        };
    }, [isUseFlagAdHoc, book.book_type]);

    return <Provider value={contextValue}>{children}</Provider>;
};
