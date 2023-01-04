import { ReactNode, useRef, useState } from "react";

import get from "lodash/get";
import {
    FieldArray,
    FieldError,
    FieldErrors,
    FormProvider,
    SubmitHandler,
    useFieldArray,
    UseFieldArrayReturn,
    useForm,
    useFormContext,
} from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { parseQuery } from "src/common/utils/query";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { getStudentName } from "src/squads/payment/helpers/student";
import { ArrayElement } from "src/squads/payment/types/common/array";
import {
    BulkOrderSectionType,
    OrderFormValues,
} from "src/squads/payment/types/form/order-form-types";
import { parseQueryParameterToStringArray } from "src/squads/payment/utils/types";

import { Box, Grid, Stack } from "@mui/material";
import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { ProductListSectionRefs } from "src/squads/payment/components/Sections/ProductListSection";
import BulkOrderDialog from "src/squads/payment/domains/OrderManagement/components/Dialogs/BulkOrderDialog";
import MenuItemButtonList from "src/squads/payment/domains/OrderManagement/components/Lists/MenuItemButtonList";
import OrderForm from "src/squads/payment/domains/OrderManagement/components/OrderForm";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { defaultProductFieldArrayItems } from "src/squads/payment/domains/OrderManagement/common/constants";
import { transformDataToCreateOrder } from "src/squads/payment/domains/OrderManagement/common/transformers";
import useBulkOrderMutation from "src/squads/payment/domains/OrderManagement/hooks/useBulkOrderMutation";
import ProductExtensionPluginsProvider, {
    useProductPluginsContext,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useGetManyStudents from "src/squads/payment/hooks/useGetManyStudents";
import useGoBackToRedirectUrl from "src/squads/payment/hooks/useGoBackToRedirectUrl";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

type FieldsType = UseFieldArrayReturn<OrderFormValues, "students">["fields"];

export type FieldErrorType<T> = {
    [K in keyof T]: T[K] extends (infer Item)[]
        ? [
              {
                  [Property in keyof Item]: FieldError;
              }
          ]
        : FieldError;
};
interface BulkOrderDialogWithFormProviderProps {
    studentsInfo: ArrayElement<OrderFormValues["students"]>["studentInfo"][];
}

const sx = {
    typography: {
        wordWrap: "break-word",
    },
};

const renderStudentListItem = (field: FieldArray<OrderFormValues, "students">): ReactNode => {
    return (
        <TypographyBase
            variant="body1"
            sx={sx.typography}
            data-testid="BulkOrderStudentList__studentName"
        >
            {getStudentName(field.studentInfo.user)}
        </TypographyBase>
    );
};

const renderStudentErrorListItem = (
    errors: FieldErrors<OrderFormValues>,
    studentIndex: number
): string | ReactNode => {
    const keyStudentsFieldError = Object.getOwnPropertyNames(errors).find(
        (key) => key === "students"
    );

    const fieldError: FieldErrorType<
        ArrayElement<OrderFormValues["students"]>
    >["productFieldArrayItems"] = get(errors, `${keyStudentsFieldError}.${studentIndex}`);

    if (!fieldError) return;
    return "";
};

const BulkOrderBulkSection = ({
    studentIndex = 0,
    shouldShowStudentInfoSection = true,
}: {
    studentIndex: number;
    shouldShowStudentInfoSection?: boolean;
}) => {
    const productListSectionRef = useRef<ProductListSectionRefs>();

    const onLocationChange = (): void => {
        productListSectionRef.current?.replace(defaultProductFieldArrayItems);
    };

    return (
        <OrderForm
            onLocationChange={onLocationChange}
            productListSectionRef={productListSectionRef}
            studentIndex={studentIndex}
            shouldShowStudentInfoSection={shouldShowStudentInfoSection}
        />
    );
};

const BulkOrderStudentsCustomizingSection = ({ fields }: { fields: FieldsType }) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const [studentIndex, setStudentIndex] = useState<number>(0);
    const {
        formState: { errors },
    } = useFormContext<OrderFormValues>();

    return (
        <>
            <Grid container columnSpacing={3}>
                <Grid item xs={4}>
                    <Stack>
                        <MenuItemButtonList<ArrayElement<FieldsType>>
                            keyName="id"
                            title={tOrder("title.studentList")}
                            itemList={fields}
                            selectedIndex={studentIndex}
                            onSelected={setStudentIndex}
                            renderComponent={renderStudentListItem}
                            errors={errors}
                            renderError={renderStudentErrorListItem}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={8}>
                    {fields.map((field, index) => {
                        return (
                            <Box key={field.id} display={index === studentIndex ? "block" : "none"}>
                                <BulkOrderBulkSection
                                    studentIndex={index}
                                    shouldShowStudentInfoSection={false}
                                />
                            </Box>
                        );
                    })}
                </Grid>
            </Grid>
        </>
    );
};

const BulkOrderDialogWithFormProvider = ({
    studentsInfo,
}: BulkOrderDialogWithFormProviderProps) => {
    const handleCloseDialog = useGoBackToRedirectUrl();

    const firstStudentIndex = 0;
    const firstStudentDefaultValue: ArrayElement<OrderFormValues["students"]> = {
        studentInfo: studentsInfo[firstStudentIndex],
        productFieldArrayItems: defaultProductFieldArrayItems,
        comment: "",
    };
    const hookFormMethods = useForm<OrderFormValues>({
        defaultValues: {
            students: [firstStudentDefaultValue],
        },
    });
    const { getValues, control, reset, handleSubmit } = hookFormMethods;

    const { fields } = useFieldArray<OrderFormValues, "students">({
        control,
        name: "students",
    });

    const [section, setSection] = useState<BulkOrderSectionType>("single-order-option");
    const isBulkSection: boolean = section === "single-order-option";

    const [firstStudentSelectedInfo, setFirstStudentSelectedInfo] = useState<OrderFormValues>();

    const makeAllStudentsInfoSameWithTheFirstStudent = (
        bulkOrderFormValues: OrderFormValues
    ): OrderFormValues => {
        const location = bulkOrderFormValues.location;

        const firstStudentProductFieldArrayItem =
            bulkOrderFormValues["students"][firstStudentIndex].productFieldArrayItems;

        const students: OrderFormValues["students"] = studentsInfo.map((studentInfo) => {
            return {
                studentInfo,
                productFieldArrayItems: firstStudentProductFieldArrayItem,
                comment: getValues(`students.${firstStudentIndex}.comment`),
            };
        });

        const finalFormValues = {
            location,
            students,
        };

        return finalFormValues;
    };

    const onResetSelectedInfoWhenBackToBulkSection = () => {
        reset(firstStudentSelectedInfo);
        setSection("single-order-option");
    };

    const onGoToBulkOrderOptionsSectionPage = (bulkOrderFormValues: OrderFormValues) => {
        const finalFormValues = makeAllStudentsInfoSameWithTheFirstStudent(bulkOrderFormValues);
        reset(finalFormValues);

        setFirstStudentSelectedInfo(finalFormValues);
        setSection("bulk-order-options");
    };

    const { getProductPluginsMap } = useProductPluginsContext();

    const { onCreateBulkOrder, isOnCreateBulkOrderLoading } = useBulkOrderMutation();

    const onSubmitBulkOrder: SubmitHandler<OrderFormValues> = (bulkOrderFormValues) => {
        const dataToSubmit = transformDataToCreateOrder(
            bulkOrderFormValues,
            OrderType.ORDER_TYPE_NEW,
            getProductPluginsMap,
            "bulk-students-orders"
        );

        onCreateBulkOrder({ data: dataToSubmit });
    };

    const onHandleActionBulkSection = (section: BulkOrderSectionType) => {
        const returnAction =
            section === "single-order-option"
                ? onGoToBulkOrderOptionsSectionPage
                : onSubmitBulkOrder;
        return handleSubmit(returnAction);
    };

    return (
        <FormProvider {...hookFormMethods}>
            <BulkOrderDialog
                isBulkSection={isBulkSection}
                bulkComponentSection={
                    isBulkSection ? (
                        <BulkOrderBulkSection studentIndex={firstStudentIndex} />
                    ) : (
                        <BulkOrderStudentsCustomizingSection fields={fields} />
                    )
                }
                isLoading={isOnCreateBulkOrderLoading}
                onHandleActionBulkSection={onHandleActionBulkSection(section)}
                onBackToBulkSection={onResetSelectedInfoWhenBackToBulkSection}
                onCloseDialog={handleCloseDialog}
            />
        </FormProvider>
    );
};

const BulkOrderPage = () => {
    const { studentId } = parseQuery();
    const selectedStudentIds = parseQueryParameterToStringArray(studentId);
    const { data: studentsInfo, isFetching: isFetchingStudents } = useGetManyStudents({
        studentIds: selectedStudentIds,
    });

    const { currentCurrency } = getCurrentCurrency();

    if (isFetchingStudents) return <Loading />;

    if (!arrayHasItem(studentsInfo) || !studentsInfo)
        return <NotFound data-testid="OrderManagementUpsert__notfound" />;

    return (
        <ProductExtensionPluginsProvider
            currency={currentCurrency}
            orderType={OrderType.ORDER_TYPE_NEW}
            notImplementedYetPlugins={defaultNotImplementedYetPlugins}
        >
            <BulkOrderDialogWithFormProvider studentsInfo={studentsInfo} />
        </ProductExtensionPluginsProvider>
    );
};

export default BulkOrderPage;
