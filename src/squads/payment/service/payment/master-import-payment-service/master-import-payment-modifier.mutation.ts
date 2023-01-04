import { fileToPayload } from "src/common/utils/file";
import appConfigs from "src/internals/configuration";
import { formInvalidErr } from "src/internals/errors";
import { commonGrpcOptions } from "src/internals/grpc";
import masterImportServiceSwitch from "src/squads/payment/service/payment/master-import-payment-service/master-import-switch";
import {
    associatedProductsType,
    NsPaymentMasterImportService,
    productAssociatedType,
    productType,
} from "src/squads/payment/service/payment/master-import-payment-service/types";
import { InheritedGrpcServiceClient } from "src/squads/payment/service/service-types";

import { ImportMasterDataServicePromiseClient } from "manabuf/payment/v1/import_grpc_web_pb";
import {
    ImportProductAssociatedDataRequest,
    ImportProductRequest,
    ImportAssociatedProductsRequest,
} from "manabuf/payment/v1/import_pb";

export const validateImportMasterDataRequest = (
    data?: NsPaymentMasterImportService.ImportMasterRequest
) => {
    if (!data || !data.payload || !data.payload.file || !data.payload.category) {
        throw formInvalidErr;
    }
};

export const setRequestData = async (
    request: NsPaymentMasterImportService.ImportMasterRequestInstance,
    payload: NsPaymentMasterImportService.ImportMasterDataPayload
) => {
    if (!request) return null;

    const { file, category } = payload;

    const filePayload = await fileToPayload(file);
    request.setPayload(filePayload);

    if (request instanceof ImportAssociatedProductsRequest)
        request.setAssociatedProductsType(associatedProductsType[category]);

    if (request instanceof ImportProductRequest) request.setProductType(productType[category]);

    if (request instanceof ImportProductAssociatedDataRequest)
        request.setProductAssociatedDataType(productAssociatedType[category]);

    return request;
};

export const getImportMasterRequestWithData = async (
    payload: NsPaymentMasterImportService.ImportMasterDataPayload
): Promise<NsPaymentMasterImportService.ImportMasterRequestInstance> => {
    const requestInstance = masterImportServiceSwitch.getMasterRequestInstance(payload.category);

    const requestWithData = await setRequestData(requestInstance, payload);

    return requestWithData;
};

class MasterImportPaymentService extends InheritedGrpcServiceClient<ImportMasterDataServicePromiseClient> {
    async importFile(data: NsPaymentMasterImportService.ImportMasterRequest) {
        const { payload } = data;

        validateImportMasterDataRequest(data);

        const request = await getImportMasterRequestWithData(payload);

        const response = await masterImportServiceSwitch.getImportMasterResponse(request);

        return response ? response.toObject() : null;
    }
}

const masterImportModifierMutationService = new MasterImportPaymentService(
    ImportMasterDataServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default masterImportModifierMutationService;
