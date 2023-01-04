import { useMemo } from "react";

import { ERPModules } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { LessonForLessonReportQueried } from "src/squads/lesson/common/types";

import TableBase, { TableColumn } from "src/components/Table/TableBase";
import TypographyMaxLines from "src/squads/lesson/components/Typographys/TypographyMaxLines";
import DynamicFieldBaseV2 from "src/squads/lesson/pages/LessonManagement/components/DynamicFields/DynamicFieldBaseV2";
import TableDynamicFieldBulkAction from "src/squads/lesson/pages/LessonManagement/components/Tables/TableDynamicFieldBulkAction";
import TableDynamicFieldHeader from "src/squads/lesson/pages/LessonManagement/components/Tables/TableDynamicFieldHeader";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import {
    DynamicFieldInTable,
    DynamicFieldLabel,
    LessonReportGroupData,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import { isDynamicFieldComponent } from "src/squads/lesson/pages/LessonManagement/common/utils";
import useBulkActionReportGrp from "src/squads/lesson/pages/LessonManagement/hooks/useBulkActionReportGrp";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

export interface TableStudentWithDynamicFieldProps {
    studentsList: LessonForLessonReportQueried["lesson_members"];
    dynamicFields: DynamicFieldInTable[];
}

interface Student extends ArrayElement<TableStudentWithDynamicFieldProps["studentsList"]> {}

const emptyDynamicFieldLabel: DynamicFieldLabel = {
    i18n: {
        fallback_language: LanguageEnums.JA,
        translations: {
            en: "",
            ja: "",
            vi: "",
        },
    },
};

const BULK_ACTION_FIELD_NAME = "dynamicFieldBulkActionValue";

const TableStudentWithDynamicField = (props: TableStudentWithDynamicFieldProps) => {
    const { studentsList, dynamicFields } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const { bulkActionRef, setBulkActionRef, onApplyBulkAction, onCloseBulkAction } =
        useBulkActionReportGrp<LessonReportGroupData>({
            studentsList,
            dynamicFieldsPath: "dynamicFieldDetails",
        });

    const tableColumns: TableColumn<Student>[] = useMemo(() => {
        const staticColumns: TableColumn<Student>[] = [
            {
                key: "colStudentName",
                title: tLessonManagement("columns.studentName"),
                render: (record) => (
                    <TypographyMaxLines
                        variant="body2"
                        maxLines={2}
                        data-testid="TableStudentWithDynamicField__studentName"
                    >
                        {record.user.name}
                    </TypographyMaxLines>
                ),
                cellProps: { style: { width: "auto" } },
            },
        ];

        const dynamicColumns: TableColumn<Student>[] = dynamicFields.map((dynamicField) => {
            const {
                field_id,
                component_config: { type },
                display_config: { table_size = {} },
            } = dynamicField;

            return {
                key: field_id,
                title: (
                    <TableDynamicFieldHeader
                        dynamicField={dynamicField}
                        onAction={(event) => {
                            setBulkActionRef({ ref: event.currentTarget, dynamicField });
                        }}
                    />
                ),
                render: (record) => {
                    if (isDynamicFieldComponent(type)) {
                        const overrodeLabelProps: typeof dynamicField = {
                            ...dynamicField,
                            label: emptyDynamicFieldLabel,
                        };

                        return (
                            <DynamicFieldBaseV2
                                componentType={type}
                                dynamicField={overrodeLabelProps}
                                nameHF={`dynamicFieldDetails.${field_id}.${record.user.user_id}`}
                            />
                        );
                    }

                    return null;
                },
                cellProps: { style: { ...table_size } },
            };
        });

        return [...staticColumns, ...dynamicColumns];
    }, [dynamicFields, setBulkActionRef, tLessonManagement]);

    return (
        <>
            <TableBase<Student>
                withIndex
                columns={tableColumns}
                data={studentsList}
                body={{ loading: false, rowKey: "user.user_id" }}
            />

            {bulkActionRef ? (
                <TableDynamicFieldBulkAction
                    nameHF={BULK_ACTION_FIELD_NAME}
                    open={Boolean(bulkActionRef.ref)}
                    dynamicField={bulkActionRef.dynamicField}
                    anchorEl={bulkActionRef.ref}
                    onApply={onApplyBulkAction}
                    onClose={onCloseBulkAction}
                />
            ) : null}
        </>
    );
};

export default TableStudentWithDynamicField;
