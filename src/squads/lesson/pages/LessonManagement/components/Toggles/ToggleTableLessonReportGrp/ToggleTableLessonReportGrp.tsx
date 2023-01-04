import { useCallback, useMemo, useState } from "react";

import { ArrayElement } from "src/common/constants/types";
import { LessonForLessonReportQueried } from "src/squads/lesson/common/types";

import Box from "@mui/material/Box";
import { ToggleButtonBaseProps } from "src/components/Buttons/ToggleButtonBase/ToggleButtonBase";
import ToggleButtonGroupBase from "src/components/Buttons/ToggleButtonGroupBase/ToggleButtonGroupBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TableStudentWithDynamicField from "src/squads/lesson/pages/LessonManagement/components/Tables/TableStudentWithDynamicField";

import { ToggleTableLessonReport } from "src/squads/lesson/pages/LessonManagement/common/types";

interface ToggleTableLessonReportGrpProps extends ToggleTableLessonReport {
    studentsList: LessonForLessonReportQueried["lesson_members"];
}

const ToggleTableLessonReportGrp = (props: ToggleTableLessonReportGrpProps) => {
    const { studentsList, toggleButtons, dynamicFields } = props;

    const [selectedToggleValue, setSelectedToggleValue] = useState<
        ArrayElement<ToggleTableLessonReport["toggleButtons"]>
    >(toggleButtons[0]);

    const toggleOptions: ToggleButtonBaseProps[] = useMemo(() => {
        return toggleButtons.map((toggleButton) => {
            return {
                value: toggleButton,
                children: <TypographyBase variant="button">{toggleButton.label}</TypographyBase>,
            };
        });
    }, [toggleButtons]);

    const handleToggle = useCallback((_, value) => {
        if (value) setSelectedToggleValue(value);
    }, []);

    const reportTables = useMemo(() => {
        return toggleButtons.map((toggleButton) => {
            const dynamicComponents = dynamicFields.filter((field) => {
                return toggleButton.tableKey === field.component_config.table_key;
            });

            const displayMode =
                toggleButton.tableKey === selectedToggleValue.tableKey ? "block" : "none";

            return (
                <Box display={displayMode} key={toggleButton.tableKey}>
                    <TableStudentWithDynamicField
                        studentsList={studentsList}
                        dynamicFields={dynamicComponents}
                    />
                </Box>
            );
        });
    }, [dynamicFields, selectedToggleValue, studentsList, toggleButtons]);

    return (
        <>
            <ToggleButtonGroupBase
                options={toggleOptions}
                onChange={handleToggle}
                value={selectedToggleValue}
            />

            <Box pt={2}>{reportTables}</Box>
        </>
    );
};

export default ToggleTableLessonReportGrp;
