import { useCallback } from "react";

import { useDispatch } from "react-redux";
import { Entities, NotifyTypes } from "src/common/constants/enum";
import { MasterCategoryType } from "src/squads/payment/constants/master";
import inferMutation from "src/squads/payment/service/infer-mutation";
import { NsPaymentMasterImportService } from "src/squads/payment/service/payment/master-import-payment-service/types";
import { MasterActions } from "src/squads/payment/stores/master";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

interface UseImportReturn {
    onImportFile: (file: File, category: MasterCategoryType) => Promise<void>;
    onImportFiles: (files: File[], category: MasterCategoryType) => Promise<void>;
}

export const useImport = (): UseImportReturn => {
    const t = useTranslate();
    const tMaster = useResourceTranslate(Entities.MASTERS);
    const showSnackbar = useShowSnackbar();
    const dispatch = useDispatch();

    const setLoading = useCallback(
        (file: File, isImporting: boolean) => {
            dispatch(
                MasterActions.importMasterData({
                    file,
                    isImporting,
                })
            );
        },
        [dispatch]
    );

    const { mutateAsync } = inferMutation({
        entity: "masterImportPayment",
        action: "paymentImportMasterData",
    })({
        onSuccess: (data: NsPaymentMasterImportService.ImportMasterResponse) => {
            if (data.errorsList && data.errorsList.length) {
                showSnackbar(tMaster("message.importedFailure"), NotifyTypes.ERROR);
            } else {
                showSnackbar(tMaster("message.importedSuccess"));
            }
        },

        onError: (err: Error) => {
            window.warner?.warn("Imported master data failure", err);
            showSnackbar(t(err.message), NotifyTypes.ERROR);
        },
    });

    const onImportFile = useCallback(
        async (file: File, category: MasterCategoryType) => {
            setLoading(file, true);

            try {
                await mutateAsync({
                    payload: {
                        file,
                        category,
                    },
                });
            } catch (error) {
            } finally {
                setLoading(file, false);
            }
        },
        [mutateAsync, setLoading]
    );

    const onImportFiles = useCallback(
        async (files: File[], category: MasterCategoryType) => {
            await Promise.all(
                files.map(async (file) => {
                    return await onImportFile(file, category);
                })
            );
        },
        [onImportFile]
    );

    return {
        onImportFile,
        onImportFiles,
    };
};

export default useImport;
