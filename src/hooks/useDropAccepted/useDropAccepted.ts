import { useCallback } from "react";

export interface UseDropAcceptedProps {
    customFilterFn?: (files: File[]) => File[];
    onChange?: (files: File[]) => void;
}

const useDropAccepted = ({ customFilterFn, onChange }: UseDropAcceptedProps) => {
    const onDropAccepted = useCallback(
        (acceptedFiles: File[]) => {
            if (customFilterFn) acceptedFiles = customFilterFn(acceptedFiles);
            if (onChange) onChange(acceptedFiles);
        },
        [customFilterFn, onChange]
    );
    return { onDropAccepted };
};
export default useDropAccepted;
