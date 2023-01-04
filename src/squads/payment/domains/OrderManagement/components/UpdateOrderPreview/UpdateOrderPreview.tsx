import { Entities } from "src/common/constants/enum";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";

import { Grid } from "@mui/material";
import DividerBase from "src/components/Divider/DividerBase";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import TypographyBase from "src/components/Typographys/TypographyBase";
import UpdateOrderPreviewItem from "src/squads/payment/domains/OrderManagement/components/UpdateOrderPreview/UpdateOrderPreviewItem";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface UpdateOrderPreviewProps {
    beforeProductFieldItem: ProductsFormValues;
    afterProductFieldItem: ProductsFormValues;
}

const UpdateOrderPreview = ({
    beforeProductFieldItem,
    afterProductFieldItem,
}: UpdateOrderPreviewProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    return (
        <PaperSectionWrapper>
            <Grid container pb={1}>
                <Grid item xs>
                    <Grid container>
                        <Grid item xs={12}>
                            <TypographyBase variant="h6">
                                {tOrder("title.beforeUpdateInfo")}
                            </TypographyBase>
                        </Grid>
                        <Grid item xs={12}>
                            <UpdateOrderPreviewItem productFieldItem={beforeProductFieldItem} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item width="49px" pr={3} pl={3}>
                    <DividerBase
                        orientation="vertical"
                        sx={(theme) => ({
                            borderRight: `1px dashed ${theme.palette.divider}`,
                            borderBottom: 0,
                            backgroundColor: "transparent",
                            width: "1px",
                        })}
                        textAlign="center"
                    />
                </Grid>
                <Grid item xs>
                    <Grid container>
                        <Grid item xs={12}>
                            <TypographyBase variant="h6">
                                {tOrder("title.afterUpdateInfo")}
                            </TypographyBase>
                        </Grid>
                        <Grid item xs={12}>
                            <UpdateOrderPreviewItem
                                productFieldItem={afterProductFieldItem}
                                hasEffectiveDate
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </PaperSectionWrapper>
    );
};

export default UpdateOrderPreview;
