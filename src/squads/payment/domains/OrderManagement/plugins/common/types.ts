import { ProductEntityType } from "src/squads/payment/types/service/product-types";

import { OrderStatus, OrderType, BillingStatus } from "manabuf/payment/v1/enums_pb";

export type ProductExtensionPluginsMap<T> = {
    [productExtensionType: string]: T | undefined;
};

export type ProductsPluginsMap<T> = {
    [productEntity in ProductEntityType]: T | undefined;
};

export type ProductPluginsMapType<T> = ProductsPluginsMap<ProductExtensionPluginsMap<T>>;

export type OrderTypeKeys = keyof typeof OrderType;

export type OrderStatusKeys = keyof typeof OrderStatus;

export type BillingStatusKeys = keyof typeof BillingStatus;
