import useSafeSetState from "src/squads/lesson/hooks/useSafeState";

export interface UseHandleFormActionsReturn {
    formActions: {
        isSubmittingForm: boolean;
        isVisibleSubmitDialog: boolean;
        isVisibleCancelDialog: boolean;
    };
    submitFormActions: {
        handleSubmittingForm: () => void;
        handleSubmittedForm: () => void;
    };
    submitDialogActions: {
        handleOpenSubmitDialog: () => void;
        handleCloseSubmitDialog: () => void;
    };
    cancelDialogActions: {
        handleOpenCancelDialog: () => void;
        handleCloseCancelDialog: () => void;
    };
}

const useHandleFormActions = (): UseHandleFormActionsReturn => {
    const [isSubmittingForm, setIsSubmittingForm] = useSafeSetState(false);
    const [isVisibleSubmitDialog, setIsVisibleSubmitDialog] = useSafeSetState(false);
    const [isVisibleCancelDialog, setIsVisibleCancelDialog] = useSafeSetState(false);

    const handleSubmittingForm = () => setIsSubmittingForm(true);
    const handleSubmittedForm = () => setIsSubmittingForm(false);

    const handleOpenSubmitDialog = () => setIsVisibleSubmitDialog(true);
    const handleCloseSubmitDialog = () => setIsVisibleSubmitDialog(false);

    const handleOpenCancelDialog = () => setIsVisibleCancelDialog(true);
    const handleCloseCancelDialog = () => setIsVisibleCancelDialog(false);

    return {
        formActions: { isSubmittingForm, isVisibleSubmitDialog, isVisibleCancelDialog },
        submitFormActions: { handleSubmittingForm, handleSubmittedForm },
        submitDialogActions: { handleOpenSubmitDialog, handleCloseSubmitDialog },
        cancelDialogActions: { handleOpenCancelDialog, handleCloseCancelDialog },
    };
};

export default useHandleFormActions;
