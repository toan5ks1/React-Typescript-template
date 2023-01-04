export type CloseReasonTypes = "timeout" | "maxsnack" | "instructed";
export type SnackbarKey = string;
export type SnackbarMessage = string;

export type TransitionCloseHandler = (
    event: React.SyntheticEvent<any> | null,
    reason: CloseReasonTypes,
    key?: SnackbarKey
) => void;

export type TransitionHandler = (node: HTMLElement, key: SnackbarKey) => void;

export interface TransitionHandlerProps {
    onClose: TransitionCloseHandler;
    onExited: TransitionHandler;
}
