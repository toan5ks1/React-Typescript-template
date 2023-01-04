import { Box } from "@mui/material";
import Loading from "src/components/Loading";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import WrapperNoData from "src/components/Wrappers/WrapperNoData";

import ParentItem from "../ParentItem";

import { StudentParentDataType } from "src/squads/user/hooks/useParentMapStudent";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface ParentListProps {
    studentId: string;
    parents: StudentParentDataType[];
    isLoading?: boolean;
    refetchParents: () => void;
}

const ParentList = ({ studentId, parents, isLoading, refetchParents }: ParentListProps) => {
    const t = useTranslate();

    if (isLoading) return <Loading />;

    return (
        <Box data-testid="ParentList__root">
            {parents && parents.length ? (
                parents.map((parent, index) => (
                    <ParentItem
                        key={parent.parent_id}
                        studentId={studentId}
                        parents={parents}
                        parent={parent}
                        index={index}
                        refetchParents={refetchParents}
                    />
                ))
            ) : (
                <PaperRoundedBorders>
                    <WrapperNoData noDataMessage={t("ra.message.noDataInformation")} />
                </PaperRoundedBorders>
            )}
        </Box>
    );
};

export default ParentList;
