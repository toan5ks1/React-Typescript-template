import { initializeApp, getApps, getApp } from "@firebase/app";
import type { FirebaseOptions, FirebaseApp as IFirebaseApp } from "@firebase/app";

class FirebaseApp {
    private readonly name: string;

    constructor(options: FirebaseOptions, name: string) {
        this.name = name;
        const isAppExisted = getApps().find((app) => app.name === name);

        if (!isAppExisted) {
            initializeApp(options, {
                name,
            });
        }

        this.getInstance = this.getInstance.bind(this);
    }

    getInstance(): IFirebaseApp {
        return getApp(this.name) as IFirebaseApp;
    }
}

export default FirebaseApp;
