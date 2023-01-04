import { useMemo } from "react";

import { Entities, MutationMenus } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { PaginationWithTotal } from "src/squads/syllabus/services/service-creator";

import { styled } from "@mui/material/styles";
import ActionPanel from "src/components/Menus/ActionPanel";
import { TableBase, TableColumn } from "src/components/Table";
import TypographyPrimary from "src/components/Typographys/TypographyPrimary";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import { ClassData } from "src/squads/syllabus/pages/Course/common/types";

export interface ClassTableProps {
    data: ClassData[];
    isLoading: boolean;
    pagination: PaginationWithTotal;
    onMutationClass: (action: MutationMenus, classData: ClassData) => void;
}

const StyledActionPanel = styled(ActionPanel)(() => ({
    justifyContent: "center",
}));

StyledActionPanel.displayName = "StyledActionPanel";

const ClassTable = (props: ClassTableProps) => {
    const { data, isLoading, pagination, onMutationClass } = props;

    const tClass = useResourceTranslate(Entities.CLASS);

    const columns = useMemo((): TableColumn<ClassData>[] => {
        return [
            {
                key: "colClassName",
                title: tClass("columns.className"),
                render: (record) => {
                    return (
                        <TypographyPrimary
                            variant="body2"
                            data-testid="ClassTable__typographyClassName"
                        >
                            {record.name}
                        </TypographyPrimary>
                    );
                },
            },
            {
                key: "colLocation",
                title: tClass("columns.location"),
                cellProps: { width: "20%" },
                render: (record) => {
                    return (
                        <TypographyPrimary
                            variant="body2"
                            data-testid="ClassTable__typographyLocation"
                        >
                            {record.location.name}
                        </TypographyPrimary>
                    );
                },
            },
            {
                key: "colAction",
                title: tClass("columns.action"),
                cellProps: { align: "center", width: "20%", padding: "none" },
                render: (record) => {
                    return (
                        <StyledActionPanel
                            recordName=""
                            actions={[
                                { action: MutationMenus.EDIT },
                                { action: MutationMenus.DELETE, withConfirm: false },
                            ]}
                            onAction={(action: MutationMenus) => onMutationClass(action, record)}
                        />
                    );
                },
            },
        ];
    }, [onMutationClass, tClass]);

    const rowKey: keyof ClassData = "class_id";

    return (
        <TableBase<ClassData>
            body={{ loading: isLoading, rowKey, pagination, skeCount: 3 }}
            withIndex
            data={data}
            columns={columns}
            footer={arrayHasItem(data) ? { pagination } : undefined}
            tableProps={{
                "data-testid": "ClassTable__table",
            }}
        />
    );
};

export default ClassTable;
