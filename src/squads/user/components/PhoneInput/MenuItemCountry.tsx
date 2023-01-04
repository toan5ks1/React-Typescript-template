import { Box } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

interface MenuItemCountryProps {
    image: React.ReactElement;
    title: string;
}

const MenuItemCountry = ({ image, title }: MenuItemCountryProps) => (
    <>
        <Box mr={1} display="flex" alignItems="center">
            {image}
        </Box>
        <Box display="flex" alignItems="center">
            <TypographyBase>{title}</TypographyBase>
        </Box>
    </>
);

export default MenuItemCountry;
