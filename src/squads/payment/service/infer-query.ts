import { studentsService } from "src/squads/payment/service/bob/students-service/students-service";
import { usersService } from "src/squads/payment/service/bob/users-service/users-service";
import { billItemService } from "src/squads/payment/service/fatima/bill-item-service/bill-item-service";
import { billingRatioService } from "src/squads/payment/service/fatima/billing-ratio-service/billing-ratio-service";
import { billingSchedulePeriodService } from "src/squads/payment/service/fatima/billing-schedule-period-service/billing-schedule-period-service";
import { coursesService } from "src/squads/payment/service/fatima/courses-service/courses-service";
import { discountService } from "src/squads/payment/service/fatima/discount-service/discount-service";
import { feeService } from "src/squads/payment/service/fatima/fee-service/fee-service";
import { locationsService } from "src/squads/payment/service/fatima/locations-service/locations-service";
import { materialService } from "src/squads/payment/service/fatima/material-service/material-service";
import { orderActionLogService } from "src/squads/payment/service/fatima/order-action-log-service/order-action-log-service";
import { orderItemService } from "src/squads/payment/service/fatima/order-item-service/order-item-service";
import { orderService } from "src/squads/payment/service/fatima/order-service/order-service";
import { packageCourseFeeService } from "src/squads/payment/service/fatima/package-course-fee-service/package-course-fee-service";
import { packageCourseMaterialService } from "src/squads/payment/service/fatima/package-course-material-service/package-course-material-service";
import { packageCourseService } from "src/squads/payment/service/fatima/package-course-service/package-course-service";
import { packageService } from "src/squads/payment/service/fatima/package-service/package-service";
import { productGradeService } from "src/squads/payment/service/fatima/product-grade-service/product-grade-service";
import { productLocationService } from "src/squads/payment/service/fatima/product-location-service/product-location-service";
import { productPriceService } from "src/squads/payment/service/fatima/product-price-service/product-price-service";
import { productService } from "src/squads/payment/service/fatima/product-service/product-service";
import { productSettingService } from "src/squads/payment/service/fatima/product-setting-service/product-setting-service";
import { studentProductService } from "src/squads/payment/service/fatima/student-product-service/student-product-service";
import { taxService } from "src/squads/payment/service/fatima/tax-fatima-service/tax-service";
import { orderPaymentService } from "src/squads/payment/service/payment/order-payment-service/order-payment-service";
import { brightcoveService } from "src/squads/payment/service/yasuo/brightcove-yasuo-service/brightcove-yasuo-service";

import {
    composeServices,
    createUseQuery,
    createUseQueryPagination,
    createUseQueryWithGRPCPagination,
} from "@manabie-com/react-utils";

// compose all services into service map
// changed entity name for package to packageEntity since package is a reserved word in strict mode
const rootService = composeServices({
    brightcove: brightcoveService,
    discount: discountService,
    locations: locationsService,
    orderActionLog: orderActionLogService,
    order: orderService,
    orderPayment: orderPaymentService,
    product: productService,
    fee: feeService,
    productGrade: productGradeService,
    material: materialService,
    packageEntity: packageService,
    productPrice: productPriceService,
    productLocation: productLocationService,
    tax: taxService,
    students: studentsService,
    orderItem: orderItemService,
    users: usersService,
    billItem: billItemService,
    packageCourse: packageCourseService,
    courses: coursesService,
    packageCourseMaterial: packageCourseMaterialService,
    packageCourseFee: packageCourseFeeService,
    productSetting: productSettingService,
    billingSchedulePeriod: billingSchedulePeriodService,
    billingRatio: billingRatioService,
    studentProduct: studentProductService,
});

// infer typing for useQuery, we must use another infer layer because of typescript limitation
// else we will need to pass full generic on usage useQuery<A, B, C, D, E>().
export const inferQuery = createUseQuery(rootService);

export const inferQueryPagination = createUseQueryPagination(rootService);

export const inferQueryWithGRPCPagination = createUseQueryWithGRPCPagination(rootService);
