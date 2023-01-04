import { FieldValues } from "react-hook-form";
import { ERPModules } from "src/common/constants/enum";
import { ErrorMessageArrayFieldHF } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { LessonMember } from "src/squads/lesson/common/types";

import { ErrorOutlineOutlined } from "@mui/icons-material";
import { List, Box, ListItem, ListItemText, Theme } from "@mui/material";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export interface ListStudentOnUpsertProps<T> {
    students: LessonMember[];
    selectedIndex: number;
    onSelect: (value: number) => void;
    errors?: ErrorMessageArrayFieldHF<T>;
}

const sx = {
    container: (theme: Theme) => ({
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: 4,
        height: "100%",
        overflow: "auto",
    }),
    listItem: (theme: Theme) => ({
        "&:not(:first-of-type)": {
            borderTop: `1px solid ${theme.palette.grey[300]}`,
        },
        display: "flex",
        justifyContent: "space-between",
    }),
    errorIcon: (theme: Theme) => ({
        color: theme.palette.error.main,
    }),
};

const ListStudentOnUpsert = <TFieldValues extends FieldValues>(
    props: ListStudentOnUpsertProps<TFieldValues>
) => {
    const { students, onSelect, selectedIndex, errors } = props;

    const tLessonReports = useResourceTranslate(ERPModules.LESSON_REPORTS);

    const handleRenderValidateIcons = (index: number) => {
        if (errors && errors[index]) {
            return (
                <Box
                    data-testid="ListStudentOnUpsert__iconError"
                    title={tLessonReports("messages.needToFillInTheRequiredInformation")}
                >
                    <ErrorOutlineOutlined sx={sx.errorIcon} />
                </Box>
            );
        }

        return;
    };

    return (
        <Box sx={sx.container}>
            <List disablePadding data-testid="ListStudentOnUpsert__root">
                {arrayHasItem(students) &&
                    students.map((student, index) => {
                        return (
                            <ListItem
                                data-testid="ListStudentOnUpsert__listItem"
                                sx={sx.listItem}
                                key={student.user.user_id}
                                button
                                selected={index === selectedIndex}
                                onClick={() => onSelect(index)}
                            >
                                <ListItemText primary={student.user.name} />
                                {Boolean(errors) && handleRenderValidateIcons(index)}
                            </ListItem>
                        );
                    })}
            </List>
        </Box>
    );
};

export default ListStudentOnUpsert;
