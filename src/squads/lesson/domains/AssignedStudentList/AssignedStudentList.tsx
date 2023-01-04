import { useRef } from "react";

import { ERPModules } from "src/common/constants/enum";

import { Tab } from "@mui/material";
import TabLayout, { TabLayoutRefs } from "src/components/Tabs/TabLayout";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import TabAssignedStudentList from "src/squads/lesson/domains/AssignedStudentList/components/Tabs/TabAssignedStudentListSlot";

import { AssignedStudentListTypes } from "src/squads/lesson/domains/AssignedStudentList/common/types";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import { MapTabReturns } from "src/squads/lesson/hooks/useTabs";

const AssignedStudentList = () => {
    const tabLayoutRef = useRef<TabLayoutRefs>();
    const tAssignedStudent = useResourceTranslate(ERPModules.ASSIGNED_STUDENT_LIST);

    const tabsList: MapTabReturns[] = [
        {
            tabName: <Tab label={tAssignedStudent("recurring")} />,
            tabPanel: (
                <TabAssignedStudentList
                    key="TableAssignedStudentWithPaging__recurring"
                    assignedStudentListTabType={AssignedStudentListTypes.RECURRING}
                />
            ),
        },
        {
            tabName: <Tab label={tAssignedStudent("slot")} />,
            tabPanel: (
                <TabAssignedStudentList
                    key="TableAssignedStudentWithPaging__slot"
                    assignedStudentListTabType={AssignedStudentListTypes.SLOT}
                />
            ),
        },
    ];

    return (
        <WrapperPageContent data-testid="AssignedStudentList__root">
            <TypographyPageTitle title={tAssignedStudent("name")} />
            <TabLayout hasDivider mapTabs={tabsList} ref={tabLayoutRef} />
        </WrapperPageContent>
    );
};

export default AssignedStudentList;
