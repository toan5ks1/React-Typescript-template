import { useCallback, useState } from "react";

import { Entities } from "src/common/constants/enum";
import { getResource } from "src/squads/syllabus/common/utils/utils";

import { List, ListItem } from "@mui/material";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import DialogLOs from "src/squads/syllabus/components/RelatedLO/DialogLOs";

import useReOrderLOAndAssignment from "../../hooks/useReOrderLOAndAssignment";
import LOAndAssignmentItem from "./LOAndAssignmentItem";
import { getIdOfLearningObjectiveOrAssignment, isLO, LOAndAssignmentType } from "./models";

import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";
import useGetLOAndAssignmentTable from "src/squads/syllabus/hooks/useGetLOAndAssignmentTable";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useSwapOrder, { Action } from "src/squads/syllabus/hooks/useSwapOrder";

interface LOAndAssignmentProps {
    topicId: string;
    chapterId: string;
    bookId: string;
}

const LOAndAssignment = (props: LOAndAssignmentProps) => {
    const { topicId, chapterId, bookId } = props;

    const { isDisableAction } = useBookDetail();

    const [visible, setVisible] = useState<boolean>(false);
    const { data, refetch, isFetching } = useGetLOAndAssignmentTable({ topicId });
    const tLos = useResourceTranslate(Entities.LOS);
    const searchUrl = `?bookId=${bookId}&chapterId=${chapterId}&parentId=${topicId}`;

    const { getSwap } = useSwapOrder({ data, key: "created_at" });
    const { updateOrder, isLoading: isLoadingUpdateOrder } = useReOrderLOAndAssignment(topicId);

    const onReOrder = useCallback(
        (action: Action, identity: string) => {
            const index = data.findIndex(
                (e: LOAndAssignmentType) => getIdOfLearningObjectiveOrAssignment(e) === identity
            );

            const swapped = getSwap(action, index);

            if (swapped)
                updateOrder([swapped[0], swapped[1]], {
                    onSuccess: () => {
                        refetch();
                    },
                });
        },
        [data, getSwap, updateOrder, refetch]
    );

    return (
        <>
            <List
                disablePadding
                component="nav"
                data-testid="LOAndAssignment__root"
                sx={(theme) => ({
                    width: "100%",
                    backgroundColor: theme.palette.background.paper,
                })}
            >
                {data.map((item, index) => {
                    const isLOTemp = isLO(item);
                    const itemId = getIdOfLearningObjectiveOrAssignment(item);
                    const resource = getResource(item);

                    return (
                        <LOAndAssignmentItem
                            key={itemId}
                            data={item}
                            disabledDown={
                                index === data.length - 1 || isLoadingUpdateOrder || isFetching
                            }
                            disabledUp={index === 0 || isLoadingUpdateOrder || isFetching}
                            topicId={topicId}
                            onSuccess={refetch}
                            onReOrder={onReOrder}
                            itemId={itemId}
                            isLO={isLOTemp}
                            resource={resource}
                            searchUrl={`?bookId=${bookId}&chapterId=${chapterId}&parentId=${topicId}`}
                        />
                    );
                })}
                <ListItem>
                    <ButtonCreate
                        variant="text"
                        size="medium"
                        onClick={() => setVisible(true)}
                        data-testid="LOAndAssignment__addLOs"
                        disabled={isDisableAction}
                    >
                        {tLos("addLO")}
                    </ButtonCreate>
                </ListItem>
            </List>

            <DialogLOs
                topicId={topicId}
                onClose={() => setVisible(false)}
                open={visible}
                searchURL={searchUrl}
            />
        </>
    );
};

export default LOAndAssignment;
