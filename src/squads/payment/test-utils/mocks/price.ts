import { ProductPriceType } from "src/squads/payment/types/service/price-types";

const mockRecurringProductPrices: ProductPriceType[] = [
    {
        product_price_id: 1,
        product_id: "product_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_1",
        price: 1000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
        quantity: 1,
    },
    {
        product_price_id: 2,
        product_id: "product_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_2",
        price: 1000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
        quantity: 1,
    },
    {
        product_price_id: 3,
        product_id: "product_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_3",
        price: 1000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
        quantity: 1,
    },
    {
        product_price_id: 4,
        product_id: "product_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_4",
        price: 1000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
        quantity: 1,
    },
    {
        product_price_id: 5,
        product_id: "product_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_1",
        price: 2000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
        quantity: 2,
    },
    {
        product_price_id: 6,
        product_id: "product_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_2",
        price: 2000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
        quantity: 2,
    },
    {
        product_price_id: 7,
        product_id: "product_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_3",
        price: 2000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
        quantity: 2,
    },
    {
        product_price_id: 8,
        product_id: "product_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_4",
        price: 2000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
        quantity: 2,
    },
];

export const createMockPackageBasedFrequencyProductPrices = (): ProductPriceType[] =>
    mockRecurringProductPrices;
