import { useCallback, useState } from "react";

import { useForm } from "react-hook-form";
import { Entities, MutationMenus, ERPModules } from "src/common/constants/enum";
import { PRIMARY_KEYS } from "src/common/constants/other";
import { Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery } from "src/squads/syllabus/services/bob/bob-types";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import { Box } from "@mui/material";
import HookForm from "src/components/Forms/HookForm";
import ActionPanel from "src/components/Menus/ActionPanel";
import TableBase, { TableColumn } from "src/components/Table/TableBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ListMediaFromMediaIds from "src/squads/syllabus/components/RelatedCourse/ListMediaFromMediaIds";

import LessonUploadDialog from "../LessonUploadDialog";

import useLessonGroupContainLesson from "src/squads/syllabus/hooks/useLessonGroupContainLesson";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface LessonTabProp {
    courseId: string;
}

const LessonTab = ({ courseId }: LessonTabProp) => {
    const rowKey: string = PRIMARY_KEYS[Entities.BOOKS] as string;
    const t = useResourceTranslate(ERPModules.LESSON_SYLLABUS);
    const [open, setOpen] = useState<boolean>(false);
    const [lessonGroupId, setLessonGroupId] = useState<string>("");
    const [mediaIds, setMediaIds] = useState<string[]>([]);

    const methods = useForm({
        defaultValues: {
            files: [],
        },
    });

    const {
        lessonGroupListQuery: data,
        loading,
        pagination,
        updateLessonGroups,
    } = useLessonGroupContainLesson(courseId);

    const onAction = useCallback(
        (
            type: MutationMenus,
            _record: ArrayElement<
                Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery["lesson_groups"]
            >
        ) => {
            setLessonGroupId(_record.lesson_group_id);
            setMediaIds(_record.media_ids || []);
            switch (type) {
                case MutationMenus.UPLOAD_FILE: {
                    return setOpen(true);
                }
                default:
            }
        },
        []
    );

    const columns: TableColumn<
        ArrayElement<Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery["lesson_groups"]>
    >[] = [
        {
            key: rowKey,
            title: t("week"),
            render: (
                record: ArrayElement<
                    Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery["lesson_groups"]
                >
            ) => {
                return <span>{record.lesson_group_id}</span>;
            },
        },
        {
            key: "name",
            title: t("materialsList"),
            render: (
                record: ArrayElement<
                    Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery["lesson_groups"]
                >
            ) => (
                <ListMediaFromMediaIds
                    mediaIds={record.media_ids}
                    shouldConfirmDelete={true}
                    requirePdfConversion={true}
                    lessonGroupId={record.lesson_group_id}
                    courseId={courseId}
                    onDeleteMediaSuccessfully={updateLessonGroups}
                />
            ),
        },
        {
            key: "action",
            title: t("action"),
            render: (record) => {
                return (
                    <ActionPanel
                        record={record}
                        recordName={record.lesson_group_id}
                        onAction={onAction}
                        actions={[MutationMenus.UPLOAD_FILE]}
                    />
                );
            },
        },
    ];

    return (
        <Box data-testid="LessonTab">
            <Box padding={3}>
                <TypographyBase data-testid="LessonTab__title" variant="h6">
                    {t("uploadMaterials")}
                </TypographyBase>
            </Box>
            <TableBase
                columns={columns}
                data={data}
                tableProps={{
                    "data-testid": "LessonTab__table",
                }}
                body={{
                    rowKey,
                    loading,
                    pagination,
                }}
            />
            {open ? (
                <HookForm methods={methods}>
                    <LessonUploadDialog
                        open={open}
                        courseId={courseId}
                        lessonGroupId={lessonGroupId}
                        mediaIds={mediaIds}
                        onClose={() => setOpen(false)}
                        refetchLessonGroup={updateLessonGroups}
                    />
                </HookForm>
            ) : null}
        </Box>
    );
};

export default LessonTab;
