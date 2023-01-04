import { useCallback } from "react";

import { useParams } from "react-router";
import { Entities, MutationMenus } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";

import { BookDetailProvider } from "../../providers/BookDetailProvider";
import ActionPanelBookDetail from "./components/ActionPanelBookDetail";
import BookDialog from "./components/BookDialog";
import ChapterList from "./components/ChapterList";
import Loading from "src/components/Loading";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";

import useDialog from "../../hooks/useDialog";
import useShowSnackbar from "../../hooks/useShowSnackbar";
import useTranslate from "../../hooks/useTranslate";
import logger from "../../internals/logger";
import { inferQuery } from "../../services/infer-query";
import { BookFormData } from "./common/types";
import useBookMutation from "./hooks/useBookMutation";

import useNavigation from "src/squads/syllabus/hooks/useNavigation";

const Show = () => {
    const { id: bookId } = useParams<{ id: string }>();
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const { isLoadingUpdate, onDuplicate, onUpdate } = useBookMutation();
    const navigation = useNavigation();
    const {
        open: bookDialogOpen,
        onOpen: onBookDialogOpen,
        onClose: onBookDialogClose,
    } = useDialog();

    const {
        data: book,
        isLoading: isLoadingBook,
        refetch: refetchBook,
    } = inferQuery({
        action: "syllabusBookGetOne",
        entity: "book",
    })(
        {
            book_id: bookId,
        },
        {
            enabled: true,
            onError: (error) => {
                logger.warn("[Book details]", error);

                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    const onSave = useCallback(
        ({ name }: BookFormData) => {
            const { book_id, book_chapters, school_id } = book!;

            onUpdate(
                {
                    bookId: book_id,
                    name,
                    chapterIdsList: book_chapters.map(({ chapter_id }) => chapter_id),
                    schoolId: school_id,
                },
                {
                    onSuccess: () => {
                        void refetchBook();
                        onBookDialogClose();
                    },
                }
            );
        },
        [book, onBookDialogClose, onUpdate, refetchBook]
    );

    const onMutation = useCallback(
        (action: MutationMenus) => {
            switch (action) {
                case MutationMenus.DUPLICATE: {
                    return onDuplicate(
                        {
                            bookId,
                            bookName: book!.name,
                        },
                        {
                            onSuccess: () =>
                                navigation.push(
                                    `/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}`
                                ),
                        }
                    );
                }
                case MutationMenus.EDIT: {
                    return onBookDialogOpen();
                }
                default: {
                    return;
                }
            }
        },
        [onDuplicate, bookId, book, onBookDialogOpen, navigation]
    );

    if (isLoadingBook) return <Loading />;

    if (!book) return null;

    return (
        <BookDetailProvider book={book}>
            <WrapperPageContent>
                <WrapperPageHeader
                    title={book.name}
                    action={
                        <ActionPanelBookDetail
                            recordName={book.name}
                            actions={[MutationMenus.EDIT, MutationMenus.DUPLICATE]}
                            onAction={onMutation}
                        />
                    }
                />

                <div data-testid="BookShow__list__chapter">
                    <ChapterList bookId={bookId} />
                </div>
            </WrapperPageContent>

            <BookDialog
                defaultValues={{ name: book.name }}
                open={bookDialogOpen}
                loading={isLoadingUpdate}
                title={t(`resources.${Entities.BOOKS}.dialog.editTitle`)}
                onClose={onBookDialogClose}
                onSave={onSave}
            />
        </BookDetailProvider>
    );
};

export default Show;
