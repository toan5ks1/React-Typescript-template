import { useState } from "react";

import { Entities, Features } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import { convertToChoices } from "src/common/utils/choice";
import { arrayHasItem } from "src/common/utils/other";
import {
    OrderManagementCategory,
    ArchitectureCategory,
    ArchitectureReserveCategory,
    UserSchoolGroupCategory,
    UserTagGroupCategory,
    UserBankGroupCategory,
    TimesheetCategory,
    InvoiceCategory,
} from "src/squads/payment/constants/master";
import {
    ArchitectureFeatures,
    UserFeatures,
    TimesheetFeatures,
    InvoiceFeatures,
} from "src/squads/payment/constants/permission";

import { SelectChangeEvent } from "@mui/material";

import useFeatureToggle from "src/squads/payment/hooks/useFeatureToggle";
import useTranslate from "src/squads/payment/hooks/useTranslate";

type Category = ArchitectureCategory | ArchitectureReserveCategory | OrderManagementCategory;
export interface UseCategoryReturn {
    category: Category | "";
    categoryOptions: OptionSelectType[];
    onChange: (event: SelectChangeEvent<unknown>) => void;
}

const architectureCategoryChoices = convertToChoices(
    ArchitectureCategory,
    "masterData",
    Entities.MASTERS
);
const architectureCategoryReserveChoices = convertToChoices(
    ArchitectureReserveCategory,
    "masterData",
    Entities.MASTERS
);

const orderManagementCategoryChoices = convertToChoices(
    OrderManagementCategory,
    "masterData",
    Entities.MASTERS
);

const userSchoolGroupCategoryChoices = convertToChoices(
    UserSchoolGroupCategory,
    "masterData",
    Entities.MASTERS
);

const userTagGroupCategoryyChoices = convertToChoices(
    UserTagGroupCategory,
    "masterData",
    Entities.MASTERS
);

const userBankGroupCategoryChoices = convertToChoices(
    UserBankGroupCategory,
    "masterData",
    Entities.MASTERS
);

const timesheetCategoryChoices = convertToChoices(
    TimesheetCategory,
    "masterData",
    Entities.MASTERS
);

const invoiceCategoryChoices = convertToChoices(InvoiceCategory, "masterData", Entities.MASTERS);

const useCategory = (): UseCategoryReturn => {
    const t = useTranslate();
    //TODO: move all of these into Payment
    const { isEnabled: isArchitectureCategoryEnabled } = useFeatureToggle(
        ArchitectureFeatures.ARCHITECTURE_MASTER_MANAGEMENT_MASTERDATA
    );
    const { isEnabled: isArchitectureCategoryReserveEnabled } = useFeatureToggle(
        ArchitectureFeatures.ARCHITECTURE_MASTER_MANAGEMENT_MASTERDATA_RESERVE
    );

    const { isEnabled: isPaymentCategoryEnabled } = useFeatureToggle(
        Features.PAYMENT_MASTER_MANAGEMENT_IMPORT_SELECTIONS
    );

    const { isEnabled: isUserSchoolGroupCategoryEnabled } = useFeatureToggle(
        UserFeatures.USER_MASTER_MANAGEMENT_SCHOOL_GROUP
    );

    const { isEnabled: isUserTagGroupCategoryEnabled } = useFeatureToggle(
        UserFeatures.USER_MASTER_MANAGEMENT_TAG_GROUP
    );

    const { isEnabled: isUserBankGroupCategoryEnabled } = useFeatureToggle(
        UserFeatures.USER_MASTER_MANAGEMENT_BANK_GROUP
    );

    const { isEnabled: isTimesheetCategoryEnabled } = useFeatureToggle(
        TimesheetFeatures.TIMESHEET_MASTER_MANAGEMENT_MASTER_DATA
    );

    const { isEnabled: isInvoiceCategoryEnabled } = useFeatureToggle(
        InvoiceFeatures.SCHEDULED_INVOICES
    );

    const categoryChoices = [
        ...(isArchitectureCategoryEnabled ? architectureCategoryChoices : []),
        ...(isArchitectureCategoryReserveEnabled ? architectureCategoryReserveChoices : []),
        ...(isPaymentCategoryEnabled ? orderManagementCategoryChoices : []),
        ...(isUserSchoolGroupCategoryEnabled ? userSchoolGroupCategoryChoices : []),
        ...(isUserTagGroupCategoryEnabled ? userTagGroupCategoryyChoices : []),
        ...(isUserBankGroupCategoryEnabled ? userBankGroupCategoryChoices : []),
        ...(isTimesheetCategoryEnabled ? timesheetCategoryChoices : []),
        ...(isInvoiceCategoryEnabled ? invoiceCategoryChoices : []),
    ];

    const categoryOptions: OptionSelectType[] = arrayHasItem(categoryChoices)
        ? categoryChoices.map((category) => ({
              ...category,
              id: category.id,
              value: t(category.value),
          }))
        : [];

    const [category, setCategory] = useState<Category | "">(
        categoryOptions.length ? (categoryOptions[0].id as Category) : ""
    );
    const onChange = (event: SelectChangeEvent<unknown>) => {
        setCategory(event.target.value as Category);
    };

    return {
        category,
        categoryOptions,
        onChange,
    };
};

export default useCategory;
