import { useState } from "react";

import { arrayHasItem } from "src/common/utils/other";
import { StudentSchoolHistoryFormProps } from "src/squads/user/common/types/common";

import Box from "@mui/material/Box";
import ButtonCreate from "src/components/Buttons/ButtonCreate";
import ButtonDelete from "src/components/Buttons/ButtonDelete";
import TypographyHeader from "src/components/Typographys/TypographyHeader";

import SchoolHistoryTable from "./SchoolHistoryTable";

import useTranslate from "src/squads/user/hooks/useTranslate";
import useSchoolHistoryFieldArray from "src/squads/user/modules/student-upsert/hooks/useSchoolHistoryFieldArray";

export default function StudentSchoolHistoryUpsert() {
    const t = useTranslate();
    const { fields, onAdd, onRemove } = useSchoolHistoryFieldArray();
    const [selectedSchoolHistory, setSelectedSchoolHistory] = useState<
        StudentSchoolHistoryFormProps[]
    >([]);

    const handleRemoveSchoolHistory = () => {
        onRemove(selectedSchoolHistory);
        setSelectedSchoolHistory([]);
    };

    return (
        <>
            <Box
                mb={2}
                display="flex"
                alignItems="center"
                data-testid="StudentSchoolHistoryUpsert__root"
            >
                <TypographyHeader flex={1}>School History</TypographyHeader>
                <ButtonDelete
                    data-testid="StudentSchoolHistoryUpsert__deleteAction"
                    disabled={!arrayHasItem(selectedSchoolHistory)}
                    onClick={handleRemoveSchoolHistory}
                />
                <ButtonCreate
                    variant="outlined"
                    data-testid="StudentSchoolHistoryUpsert__addButton"
                    sx={(theme) => ({ ml: theme.spacing(1.5) })}
                    onClick={onAdd}
                >
                    {t("ra.common.action.add")}
                </ButtonCreate>
            </Box>
            <SchoolHistoryTable
                data={fields}
                selectedSchoolHistory={selectedSchoolHistory}
                onSelect={(data) => setSelectedSchoolHistory(data)}
            />
        </>
    );
}
