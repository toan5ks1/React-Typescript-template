import { InvoiceCurrency } from "src/squads/adobo/domains/invoice/common/constants/enum";

export const getFormattedItemPrice = (
    currency: InvoiceCurrency,
    isCredit: boolean,
    itemPrice: number
): string => {
    switch (currency) {
        case InvoiceCurrency.JAPANESE_YEN:
            const formattedPrice = new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: InvoiceCurrency.JAPANESE_YEN,
                useGrouping: false,
            }).format(Math.round(itemPrice));
            return isCredit ? `-${formattedPrice}` : formattedPrice;
    }
};
