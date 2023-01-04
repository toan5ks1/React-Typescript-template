import { Entities } from "src/common/constants/enum";

import BookTable from "./components/BookTable";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";

import useResourceTranslate from "../../hooks/useResourceTranslate";

const List = () => {
    const t = useResourceTranslate(Entities.BOOKS);

    return (
        <WrapperPageContent>
            <TypographyPageTitle title={t("name")} />
            <BookTable />
        </WrapperPageContent>
    );
};

export default List;
