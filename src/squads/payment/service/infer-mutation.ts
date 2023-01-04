import { masterImportPaymentService } from "src/squads/payment/service/payment/master-import-payment-service/master-import-payment-service";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";

import { composeServices, createUseMutation } from "@manabie-com/react-utils";

// compose all services into service map
const rootService = composeServices({
    orderPayment: orderPaymentService,
    masterImportPayment: masterImportPaymentService,
});

// create your squad useQuery
const inferMutation = createUseMutation(rootService);

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().

export default inferMutation;
