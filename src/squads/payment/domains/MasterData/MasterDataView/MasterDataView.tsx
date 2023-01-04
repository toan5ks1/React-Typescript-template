import { Entities } from "src/common/constants/enum";

import MasterDataContainer from "../components/MasterDataContainer";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export const MasterDataView = () => {
    const tMaster = useResourceTranslate(Entities.MASTERS);

    return (
        <WrapperPageContent>
            <TypographyPageTitle title={tMaster("name")} />
            <MasterDataContainer />
        </WrapperPageContent>
    );
};

export default MasterDataView;
