import { convertLegacyDataProvider, LegacyDataProvider } from "react-admin";

import getDataProvider from "../services";

export const dataProvider = getDataProvider();

//TODO: remove legacy provider here
export default convertLegacyDataProvider(dataProvider as LegacyDataProvider);
