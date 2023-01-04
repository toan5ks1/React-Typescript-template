import { FieldArrayWithId } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { DeleteOutlined } from "@mui/icons-material";
import { Grid, Box, FormControl, InputLabel } from "@mui/material";
import IconButtonBase from "src/components/IconButton/IconButtonBase";
import SelectBase from "src/components/Select/SelectBase";
import DiscountAutocompleteHF from "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface AssociatedProductsListProps {
    associatedProducts: FieldArrayWithId<
        OrderFormValues,
        `students.${number}.productFieldArrayItems.${number}.associatedProducts`,
        "id"
    >[];
    associatedProductsOptions: OptionSelectType[];
    productFieldItemIndex: number;
    studentIndex: number;
    onAssociatedProductSelect: (productId: ProductTypeQuery["product_id"], index: number) => void;
    handleDeleteAssociatedProduct: (index: number) => void;
}

const AssociatedProductsList = ({
    associatedProducts,
    associatedProductsOptions,
    productFieldItemIndex,
    onAssociatedProductSelect,
    handleDeleteAssociatedProduct,
    studentIndex,
}: AssociatedProductsListProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    return (
        <>
            {associatedProducts.map((associatedProduct, index) => {
                return (
                    <Grid
                        key={`${associatedProduct.id}-${associatedProduct.product.product_id}`}
                        container
                        mt={2}
                        pl={3.75}
                        height="40px"
                    >
                        <Grid item xs={8}>
                            <Box marginRight={2}>
                                <FormControl variant="outlined" size={"small"} fullWidth>
                                    <InputLabel id={`${index}-associatedProduct-label`}>
                                        {tOrder("label.productName")}
                                    </InputLabel>
                                    <SelectBase
                                        label={tOrder("label.productName")}
                                        labelId={`${index}-associatedProduct-label`}
                                        data-testid="AssociatedProducts__select"
                                        value={associatedProduct.product.product_id}
                                        options={associatedProductsOptions}
                                        isTranslated={false}
                                        onChange={(e) =>
                                            onAssociatedProductSelect(
                                                e.target.value as ProductTypeQuery["product_id"],
                                                index
                                            )
                                        }
                                    />
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <DiscountAutocompleteHF<OrderFormValues>
                                controllerProps={{
                                    name: `students.${studentIndex}.productFieldArrayItems.${productFieldItemIndex}.associatedProducts.${index}.discount`,
                                }}
                            />
                        </Grid>
                        <Grid item xs={1} textAlign="right" marginBottom={2}>
                            <Box>
                                <IconButtonBase
                                    onClick={() => handleDeleteAssociatedProduct(index)}
                                    data-testid="AssociatedProducts__delete"
                                    color="error"
                                >
                                    <DeleteOutlined fontSize="small" />
                                </IconButtonBase>
                            </Box>
                        </Grid>
                    </Grid>
                );
            })}
        </>
    );
};

export default AssociatedProductsList;
