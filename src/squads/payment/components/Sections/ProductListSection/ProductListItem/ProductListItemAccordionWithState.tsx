import { useState, SyntheticEvent } from "react";

import ProductListItemAccordion, {
    ProductListItemAccordionProps,
} from "src/squads/payment/components/Sections/ProductListSection/ProductListItem/ProductListItemAccordion";

const ProductListItemAccordionWithState = (props: ProductListItemAccordionProps) => {
    const [expanded, setExpanded] = useState<boolean>(true);
    const onChangeAccordion = (_event: SyntheticEvent<Element, Event>) => {
        setExpanded((previous) => !previous);
    };

    return <ProductListItemAccordion expanded={expanded} onChange={onChangeAccordion} {...props} />;
};

export default ProductListItemAccordionWithState;
