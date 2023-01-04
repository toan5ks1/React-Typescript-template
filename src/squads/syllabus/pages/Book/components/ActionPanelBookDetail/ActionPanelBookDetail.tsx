import ActionPanel, { ActionPanelProps } from "src/components/Menus/ActionPanel";

import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";

export interface ActionPanelBookDetailProps extends ActionPanelProps {}

const ActionPanelBookDetail = (props: ActionPanelBookDetailProps) => {
    const { isDisableAction } = useBookDetail();

    return <ActionPanel {...props} disabled={isDisableAction} />;
};

export default ActionPanelBookDetail;
