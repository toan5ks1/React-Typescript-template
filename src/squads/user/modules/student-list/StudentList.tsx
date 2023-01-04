import { useEffect, useState } from "react";

import { usePrevious } from "react-use";
import { ERPModules } from "src/common/constants/enum";
import { StudentListNavbar } from "src/squads/user/modules/student-list/components";
import { StudentWithoutGradeFrgV2Fragment } from "src/squads/user/service/bob/bob-types";

import Grid from "@mui/material/Grid";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import StudentListTable from "src/squads/user/modules/student-list/components/StudentListTable";

import isEqual from "lodash/isEqual";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useFilterStudents from "src/squads/user/modules/student-list/hooks/useFilterStudents";
import useQueryStudents from "src/squads/user/modules/student-list/hooks/useQueryStudents";

export default function StudentList() {
    const tStudent = useResourceTranslate(ERPModules.STUDENTS);

    const { filter, onFilter, onSearch } = useFilterStudents();

    const prevFilter = usePrevious(filter);

    const { students, pagination, refetchStudents, resetPaginationOffset, loading } =
        useQueryStudents(filter);

    const [selectedStudents, setSelectedStudents] = useState<StudentWithoutGradeFrgV2Fragment[]>(
        []
    );

    useEffect(() => {
        if (!isEqual(filter, prevFilter)) {
            resetPaginationOffset();
        }
    }, [filter, prevFilter, resetPaginationOffset]);

    return (
        <>
            <TypographyPageTitle title={tStudent("titles.studentManagement")} />
            <Grid container spacing={2} data-testid="StudentList">
                <Grid item xs={12}>
                    <StudentListNavbar
                        filter={filter}
                        onFilter={onFilter}
                        onSearch={onSearch}
                        refetch={refetchStudents}
                        selectedStudents={selectedStudents}
                        onGenerate={() => setSelectedStudents([])}
                    />
                </Grid>
                <Grid item xs={12} width={1116} /*exactly design*/>
                    <StudentListTable
                        dataSource={students}
                        loading={loading}
                        pagination={pagination}
                        onSelect={setSelectedStudents}
                        listSelectedItems={selectedStudents}
                    />
                </Grid>
            </Grid>
        </>
    );
}
