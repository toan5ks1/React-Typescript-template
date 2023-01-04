import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";

import { Tab } from "@mui/material";
import DialogWithHeaderFooterTabsLayout, {
    DialogWithHeaderFooterTabsLayoutProps,
} from "src/squads/syllabus/components/Dialogs/DialogWithHeaderFooter";

import CreateLOsTab from "../CreateLOsTab";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

export interface DialogLOsProps {
    open: boolean;
    topicId: string;
    searchURL: string;
    onClose: () => void;
}

const DialogLOs = (props: DialogLOsProps) => {
    const { open, onClose, searchURL, topicId } = props;
    const tLOs = useResourceTranslate(Entities.LOS);

    const mapTabs: DialogWithHeaderFooterTabsLayoutProps["mapTabs"] = useMemo(
        () => [
            {
                tabName: <Tab label={tLOs("addNew")} />,
                tabPanel: (
                    <CreateLOsTab topicId={topicId} onClose={onClose} searchURL={searchURL} />
                ),
            },
        ],
        [onClose, searchURL, tLOs, topicId]
    );

    return (
        <DialogWithHeaderFooterTabsLayout
            title={`${tLOs("addLearningObjective")}`}
            maxWidth="lg"
            minWidthBox="md"
            open={open}
            onClose={onClose}
            footer="portal"
            mapTabs={mapTabs}
            data-testid="DialogLOs__root"
        />
    );
};

export default DialogLOs;
