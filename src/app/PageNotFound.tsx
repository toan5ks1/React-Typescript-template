import { useHistory } from "react-router";

import { Box } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import PageNotFoundIcon from "src/components/SvgIcons/PageNotFoundIcon";
import TypographyBase from "src/components/Typographys/TypographyBase";

import useTranslate from "src/hooks/useTranslate";

const PageNotFound = () => {
    const { push } = useHistory();
    const t = useTranslate();
    return (
        <Box data-testid="PageNotFound__root" position="relative" width="100vw" height="100vh">
            <Box
                mt={21.75}
                style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                }}
            >
                <Box display="flex" justifyContent="center">
                    <Box>
                        <Box maxHeight="380px" maxWidth="580px">
                            <PageNotFoundIcon />
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            textAlign="center"
                        >
                            <Box mt={5.25}>
                                <TypographyBase variant="h3" color="textPrimary" align="center">
                                    {t("ra.pageNotFound.title")}
                                </TypographyBase>
                            </Box>
                            <Box mt={1}>
                                <TypographyBase
                                    variant="body1"
                                    color="textSecondary"
                                    align="center"
                                >
                                    {t("ra.pageNotFound.pageLookingForDoesExist")}
                                </TypographyBase>
                            </Box>
                            <Box mt={6}>
                                <ButtonPrimaryContained
                                    data-testid="PageNotFound__backHome"
                                    onClick={() => push("/")}
                                >
                                    {t("ra.pageNotFound.backToHome")}
                                </ButtonPrimaryContained>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PageNotFound;
