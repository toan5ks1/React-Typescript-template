import { useMemo } from "react";

import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { Entities, EurekaEntities } from "src/common/constants/enum";

import StudyPlanItemDateDisplay from "../../components/StudyPlanItemDateDisplay";
import StudyPlanItemDateEditor from "../../components/StudyPlanItemDateEditor";
import VisibilityToggle from "../../components/VisibilityToggle";
import { Box, ClassNameMap, SxProps, Theme } from "@mui/material";
import { TableColumn } from "src/components/Table";
import TypographyMaxLines from "src/components/Typographys/TypographyMaxLines";
import LearningObjectiveIcon from "src/squads/syllabus/components/LeaningObjectiveIcon";

import { StudyPlanItemFormValues, StudyPlanItemWithLoInfo } from "../../common/types";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import { StudyPlanItemStatusKey } from "src/squads/syllabus/pages/StudyPlan/common/constants";

export interface UseStudyPlanItemTableColumnsProps {
    classes: Partial<
        ClassNameMap<
            | "padding"
            | "topicColumn"
            | "topicEditColumn"
            | "loNameColumn"
            | "dateColumn"
            | "dateEditColumn"
            | "visibilityEditColumn"
        >
    >;
    sxStyles?: Partial<
        Record<
            | "padding"
            | "topicColumn"
            | "topicEditColumn"
            | "loNameColumn"
            | "dateColumn"
            | "dateEditColumn"
            | "visibilityEditColumn",
            SxProps<Theme>
        >
    >;

    isEditing: boolean;
}

const useStudyPlanItemTableColumns = ({
    classes,
    isEditing,
    sxStyles,
}: UseStudyPlanItemTableColumnsProps): TableColumn<StudyPlanItemWithLoInfo>[] => {
    const { register, getValues } = useFormContext<StudyPlanItemFormValues>();
    const t = useTranslate();
    const tCourse = useResourceTranslate(Entities.COURSES);
    const tStudyPlan = useResourceTranslate(EurekaEntities.STUDY_PLANS);
    const tTopic = useResourceTranslate(Entities.TOPICS);

    const dateClassNames = clsx(classes.padding, classes.dateColumn, classes.dateEditColumn);

    const memorizedColumns: TableColumn<StudyPlanItemWithLoInfo>[] = useMemo(() => {
        const commonProps: { [x: string]: TableColumn<StudyPlanItemWithLoInfo> } = {
            topicName: {
                key: "colTopicName",
                title: tTopic("topicName"),
                cellProps: {
                    className: clsx(classes.topicColumn, classes.topicEditColumn),
                    "data-testid": "StudyPlanItemTableColumns__topicName",
                },
            },
            loName: {
                key: "colLoName",
                title: tCourse("studyPlan.loName"),
                cellProps: {
                    className: clsx(classes.padding, classes.loNameColumn),
                    "data-testid": "StudyPlanItemTableColumns__loName",
                    sx: sxStyles?.padding,
                },
            },
            availableFrom: {
                key: "colAvailableFrom",
                title: tCourse("studyPlan.availableFrom"),
                cellProps: {
                    className: dateClassNames,
                    "data-testid": "StudyPlanItemTableColumns__availableFrom",
                    sx: sxStyles?.padding,
                },
            },
            availableUntil: {
                key: "colAvailableUntil",
                title: tCourse("studyPlan.availableUntil"),
                cellProps: {
                    className: dateClassNames,
                    "data-testid": "StudyPlanItemTableColumns__availableUntil",
                    sx: sxStyles?.padding,
                },
            },
            start: {
                key: "colStart",
                title: tStudyPlan("columns.start"),
                cellProps: {
                    className: dateClassNames,
                    "data-testid": "StudyPlanItemTableColumns__startDate",
                    sx: sxStyles?.padding,
                },
            },
            due: {
                key: "colDue",
                title: tStudyPlan("columns.due"),
                cellProps: {
                    className: dateClassNames,
                    "data-testid": "StudyPlanItemTableColumns__endDate",
                    sx: sxStyles?.padding,
                },
            },
            visibility: {
                key: "colVisibility",
                title: t("ra.action.show"),
                cellProps: {
                    className: clsx(classes.padding, classes.visibilityEditColumn),
                    sx: {
                        ...sxStyles?.padding,
                        ...sxStyles?.visibilityEditColumn,
                    } as SxProps<Theme>,
                },
            },
        };

        if (isEditing) {
            return [
                { ...commonProps.topicName, key: "colTopicNameEdit" },
                {
                    ...commonProps.loName,
                    key: "colLoNameEdit",
                    render: ({ loName, loType, status }) => (
                        <Box display="flex" alignItems="center">
                            <LearningObjectiveIcon
                                variant="outlined"
                                type={loType}
                                disabled={
                                    status ===
                                    StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED
                                }
                            />
                            <TypographyMaxLines variant="body2" maxLines={1}>
                                {loName}
                            </TypographyMaxLines>
                        </Box>
                    ),
                },
                {
                    ...commonProps.availableFrom,
                    key: "colAvailableFromEdit",
                    render: ({ study_plan_item_id, available_from }) => (
                        <StudyPlanItemDateEditor
                            studyPlanItemId={study_plan_item_id}
                            fieldName="availableFrom"
                            value={available_from}
                        />
                    ),
                },
                {
                    ...commonProps.availableUntil,
                    key: "colAvailableUntilEdit",
                    render: ({ study_plan_item_id, available_to }) => (
                        <StudyPlanItemDateEditor
                            studyPlanItemId={study_plan_item_id}
                            fieldName="availableTo"
                            value={available_to}
                        />
                    ),
                },
                {
                    ...commonProps.start,
                    key: "colStartEdit",
                    render: ({ study_plan_item_id, start_date }) => (
                        <StudyPlanItemDateEditor
                            studyPlanItemId={study_plan_item_id}
                            fieldName="startDate"
                            value={start_date}
                        />
                    ),
                },
                {
                    ...commonProps.due,
                    key: "colDueEdit",
                    render: ({ study_plan_item_id, end_date }) => (
                        <StudyPlanItemDateEditor
                            studyPlanItemId={study_plan_item_id}
                            fieldName="endDate"
                            value={end_date}
                        />
                    ),
                },
                {
                    ...commonProps.visibility,
                    key: "colVisibilityEdit",
                    render: ({ study_plan_item_id }) => (
                        <VisibilityToggle
                            studyPlanItemId={study_plan_item_id}
                            status={getValues(`studyPlanItem.${study_plan_item_id}.status`)}
                        />
                    ),
                },
                {
                    key: "colContentStructure",
                    cellProps: { style: { display: "none" } },
                    render: ({ study_plan_item_id, content_structure }) => (
                        <input
                            type="hidden"
                            {...register(
                                `studyPlanItem.${study_plan_item_id}.contentStructure` as const,
                                {
                                    value: content_structure,
                                }
                            )}
                        />
                    ),
                },
            ];
        }
        return [
            { ...commonProps.topicName },
            {
                ...commonProps.loName,
                render: ({ loName, loType, status }) => (
                    <Box display="flex" alignItems="center">
                        <LearningObjectiveIcon
                            variant="outlined"
                            type={loType}
                            disabled={
                                status === StudyPlanItemStatusKey.STUDY_PLAN_ITEM_STATUS_ARCHIVED
                            }
                        />
                        <TypographyMaxLines variant="body2" maxLines={1}>
                            {loName}
                        </TypographyMaxLines>
                    </Box>
                ),
            },
            {
                ...commonProps.availableFrom,
                render: ({ available_from }) => <StudyPlanItemDateDisplay value={available_from} />,
            },
            {
                ...commonProps.availableUntil,
                render: ({ available_to }) => <StudyPlanItemDateDisplay value={available_to} />,
            },
            {
                ...commonProps.start,
                render: ({ start_date }) => <StudyPlanItemDateDisplay value={start_date} />,
            },
            {
                ...commonProps.due,
                render: ({ end_date }) => <StudyPlanItemDateDisplay value={end_date} />,
            },
        ];
    }, [
        register,
        getValues,
        isEditing,
        classes,
        dateClassNames,
        sxStyles,
        t,
        tCourse,
        tStudyPlan,
        tTopic,
    ]);

    return memorizedColumns;
};

export default useStudyPlanItemTableColumns;
