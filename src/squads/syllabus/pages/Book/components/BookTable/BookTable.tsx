import { useCallback, useMemo, useState } from "react";

import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { getPrimaryKey } from "src/squads/syllabus/common/helpers/legacy";
import logger from "src/squads/syllabus/internals/logger";
import { Syllabus_BooksListV2Query } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQueryPagination } from "src/squads/syllabus/services/infer-query";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import { Box } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import FormFilterAdvanced from "src/components/Forms/FormFilterAdvanced";
import StyledLink from "src/components/StyledLink";
import { TableBase, TableColumn } from "src/components/Table";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";

import { BookFormData } from "../../common/types";
import useBookMutation from "../../hooks/useBookMutation";
import BookDialog from "../BookDialog";

import useBasicContent from "src/squads/syllabus/hooks/useBasicContent";
import useDialog from "src/squads/syllabus/hooks/useDialog";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

//TODO: Refactor the name of BookTable component
const BookList = () => {
    const t = useTranslate();
    const tBook = useResourceTranslate(Entities.BOOKS);

    const rowKey = getPrimaryKey(Entities.BOOKS);
    const [search, setSearch] = useState("");
    const {
        open: bookDialogOpen,
        onOpen: onBookDialogOpen,
        onClose: onBookDialogClose,
    } = useDialog();
    const { school_id } = useBasicContent();
    const { isLoadingCreate, onCreate } = useBookMutation();
    const showSnackbar = useShowSnackbar();

    const {
        result: { isLoading: bookLoading, isFetching: bookFetching, refetch: refetchBooks },
        data: bookData,
        pagination,
        resetPaginationOffset,
    } = inferQueryPagination({
        entity: "book",
        action: "BOOK_GET_LIST",
    })(
        { name: search },
        {
            enabled: true,
            onError: (error) => {
                logger.warn("[BOOK_GET_LIST]", error);

                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    const onSave = useCallback(
        ({ name }: BookFormData) => {
            onCreate(
                { name, chapterIdsList: [], schoolId: school_id },
                {
                    onSuccess: () => {
                        void refetchBooks();
                        onBookDialogClose();
                    },
                }
            );
        },
        [onBookDialogClose, onCreate, refetchBooks, school_id]
    );

    const columns: TableColumn<ArrayElement<Syllabus_BooksListV2Query["books"]>>[] = useMemo(() => {
        return [
            {
                key: "colName",
                title: tBook("bookName"),
                render: (record) => (
                    <StyledLink
                        data-testid="BookList__bookNameLink"
                        to={`/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}/${record.book_id}/show`}
                        title={record.name}
                    >
                        <TypographyShortenStr
                            variant="body2"
                            display="inline"
                            data-testid="BookList__bookName"
                            maxLength={60}
                        >
                            {record.name}
                        </TypographyShortenStr>
                    </StyledLink>
                ),
            },
        ];
    }, [tBook]);

    const onEnter = useCallback(
        (value: string) => {
            setSearch(value);
            resetPaginationOffset();
        },
        [resetPaginationOffset]
    );

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <FormFilterAdvanced onEnterSearchBar={onEnter} />
                <ButtonCreate onClick={onBookDialogOpen} data-testid="AddBook__addButton">
                    {t("ra.common.action.add")}
                </ButtonCreate>
            </Box>

            <TableBase
                body={{
                    rowKey,
                    loading: bookLoading || bookFetching,
                    pagination,
                }}
                data={bookData?.data || []}
                columns={columns}
                tableProps={{
                    "data-testid": "BookList__table",
                }}
                footer={{
                    pagination,
                    labelRowsPerPage: t("ra.navigation.page_rows_per_page"),
                }}
                withIndex
            />
            <BookDialog
                open={bookDialogOpen}
                loading={isLoadingCreate}
                title={t(`resources.${Entities.BOOKS}.dialog.addTitle`)}
                onClose={onBookDialogClose}
                onSave={onSave}
            />
        </>
    );
};
export default BookList;
