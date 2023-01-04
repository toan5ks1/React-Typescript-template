import { createContext, PropsWithChildren, useCallback, useContext, useMemo } from "react";

import { ProductAndProductExtensionType } from "src/squads/payment/types/service/product-types";

import NotImplementYet from "src/squads/payment/components/NotImplementYet";

import { ProductExtensionPluginsMap } from "src/squads/payment/domains/OrderManagement/plugins/common/types";
import studentBillingPluginsMap from "src/squads/payment/domains/OrderManagement/plugins/student-billing/plugins-map";
import {
    StudentBillingFunctions,
    StudentBillingPluginsContextValues,
} from "src/squads/payment/domains/OrderManagement/plugins/student-billing/types";

const notImplementedYetPlugins: StudentBillingFunctions = {
    ProductDetailsProductListCell: () => (
        <NotImplementYet isImplemented={false} mt={2} textAlign="center" />
    ),
    BillItemDescriptionBillingItemsCell: () => (
        <NotImplementYet isImplemented={false} mt={2} textAlign="center" />
    ),
};

const StudentBillingPluginsContext = createContext<StudentBillingPluginsContextValues>(
    {} as StudentBillingPluginsContextValues
);

export const useStudentBillingPluginsContext = () => {
    return useContext(StudentBillingPluginsContext);
};

const StudentBillingPluginsProvider = ({ children }: PropsWithChildren<{}>) => {
    const getStudentBillingPluginsMap = useCallback(
        (productAndProductExtensionType: ProductAndProductExtensionType) => {
            const { productEntityType, productExtensionType } = productAndProductExtensionType;

            const productTypePluginsMap:
                | ProductExtensionPluginsMap<StudentBillingFunctions>
                | undefined = studentBillingPluginsMap[productEntityType];

            if (!productTypePluginsMap) return notImplementedYetPlugins;

            const productDetailsPlugin: StudentBillingFunctions | undefined =
                productTypePluginsMap[productExtensionType];

            return productDetailsPlugin || notImplementedYetPlugins;
        },
        []
    );

    const contextValue: StudentBillingPluginsContextValues = useMemo(
        () => ({
            productPluginsMap: studentBillingPluginsMap,
            getProductPluginsMap: getStudentBillingPluginsMap,
        }),
        [getStudentBillingPluginsMap]
    );

    return (
        <StudentBillingPluginsContext.Provider value={contextValue}>
            {children}
        </StudentBillingPluginsContext.Provider>
    );
};

export default StudentBillingPluginsProvider;
