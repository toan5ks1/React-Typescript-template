import { Entities } from "src/common/constants/enum";
import { convertToChoices } from "src/common/utils/choice";
import { KeyOrderTypes } from "src/squads/payment/constants/const";

export const orderTypeChoice = convertToChoices(KeyOrderTypes, "orderType", Entities.ORDERS);
