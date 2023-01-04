import FirebaseApp from "../packages/firebase/App";
import { AppConfigTypes } from "../typings/configuration";
import appConfigs from "./configuration";

const firebaseApp = new FirebaseApp(
    appConfigs.getConfig(AppConfigTypes.AUTH),
    import.meta.env.VITE_PJ_OWNER || "Manabie"
);

export default firebaseApp;
