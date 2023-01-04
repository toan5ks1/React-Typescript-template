import { useState } from "react";

import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Grid, InputBase, Theme } from "@mui/material";
import ButtonPrimaryText from "src/components/Buttons/ButtonPrimaryText";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";

import useTranslate from "src/squads/user/hooks/useTranslate";

interface AccountInfoProps {
    email: {
        label: string;
        value?: string;
    };
    password: {
        label: string;
        value?: string;
    };
}

const sx = {
    description: (theme: Theme) => ({
        color: theme.palette.text.secondary,
    }),
    eyeCon: (theme: Theme) => ({
        color: theme.palette.text.secondary,
        cursor: "pointer",
    }),
    normalText: (theme: Theme) => ({
        fontSize: theme.typography.fontSize,
    }),
};

const AccountInfo = ({ email, password }: AccountInfoProps) => {
    const [ocrPassword, setOcrPassword] = useState(true);
    const t = useTranslate();

    return (
        <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={2} sx={sx.description}>
                <TypographyBase variant="caption">{email.label}</TypographyBase>
            </Grid>
            <Grid item xs={4}>
                <TypographyShortenStr
                    variant="body2"
                    maxLength={20}
                    data-testid="AccountInfo__typoEmail"
                >
                    {email.value || ""}
                </TypographyShortenStr>
            </Grid>

            <Grid item xs={2} sx={sx.description}>
                <TypographyBase variant="caption">{password.label}</TypographyBase>
            </Grid>
            <Grid item xs={2}>
                <InputBase
                    data-testid="AccountInfo__inputPassword"
                    type={ocrPassword ? "password" : "text"}
                    endAdornment={
                        ocrPassword ? (
                            <VisibilityOffOutlinedIcon
                                sx={sx.eyeCon}
                                fontSize="small"
                                onClick={() => setOcrPassword(false)}
                            />
                        ) : (
                            <VisibilityOutlinedIcon
                                sx={sx.eyeCon}
                                fontSize="small"
                                onClick={() => setOcrPassword(true)}
                            />
                        )
                    }
                    value={password.value || ""}
                    readOnly
                    sx={sx.normalText}
                />
            </Grid>
            <Grid container item xs={2} justifyContent="flex-end">
                <Grid item>
                    <ButtonPrimaryText
                        size="large"
                        startIcon={<FileCopyOutlinedIcon />}
                        onClick={() =>
                            navigator.clipboard.writeText(`${email.value}/${password.value}`)
                        }
                    >
                        {t("ra.action.copy")}
                    </ButtonPrimaryText>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AccountInfo;
