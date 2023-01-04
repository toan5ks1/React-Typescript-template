import { Entities } from "src/common/constants/enum";

import { Box } from "@mui/material";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyHeader from "src/components/Typographys/TypographyHeader";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

const CommentSection = ({ studentIndex }: { studentIndex: number }) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    return (
        <>
            <Box mb={2}>
                <TypographyHeader>{tOrder("label.comment")}</TypographyHeader>
            </Box>
            <TextFieldHF
                name={`students.${studentIndex}.comment`}
                label={tOrder("label.comment")}
                inputProps={{
                    "data-testid": "CommentSection__commentInput",
                }}
                multiline
                rows={6.5}
            />
        </>
    );
};

export default CommentSection;
