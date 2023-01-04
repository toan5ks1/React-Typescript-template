import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";

export interface DialogConfirmStudyPlanItemProps
    extends Omit<
        DialogWithHeaderFooterProps,
        "children" | "footer" | "shouldShowCancelButton" | "textClose" | "title"
    > {
    children: string;
    textProceed: string;
    onProceed: () => void;
}
