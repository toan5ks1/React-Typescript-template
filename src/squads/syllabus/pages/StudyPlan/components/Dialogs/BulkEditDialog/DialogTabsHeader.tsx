import { SyntheticEvent } from "react";

import { Entities } from "src/common/constants/enum";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import DialogHeader from "src/components/Dialogs/DialogWithHeaderFooter/DialogHeader";
import TabsBase from "src/components/Tabs/TabsBase";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface DialogTabsHeaderProps {
    title: string;
    tabValue: number;
    onClose: () => void;
    onChangeTab: (event: SyntheticEvent<Element, Event>, value: any) => void;
}

function DialogTabsHeader({ title, onClose, tabValue, onChangeTab }: DialogTabsHeaderProps) {
    const tCourse = useResourceTranslate(Entities.COURSES);

    return (
        <>
            <DialogHeader title={title} onClose={onClose} />
            <Box px={3}>
                <TabsBase value={tabValue} onChange={onChangeTab}>
                    <Tab label={tCourse(`studyPlan.bulkEdit.specificDate`)} />
                    <Tab label={tCourse(`studyPlan.bulkEdit.postpone`)} />
                    <Tab label={tCourse(`studyPlan.bulkEdit.advance`)} />
                </TabsBase>
            </Box>
        </>
    );
}

export default DialogTabsHeader;
