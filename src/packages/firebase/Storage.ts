import type { FirebaseApp } from "@firebase/app";
import { getStorage, FirebaseStorage, ref, uploadBytes, getDownloadURL } from "@firebase/storage";

class Storage {
    private readonly storage: FirebaseStorage;

    constructor(firebaseApp: FirebaseApp) {
        this.storage = getStorage(firebaseApp);
    }

    // https://firebase.google.com/docs/storage/web/upload-files#web-version-9_1
    uploadFile = async (file: File, targetName: string): Promise<string> => {
        const storageReference = ref(this.storage, targetName);
        const snapshot = await uploadBytes(storageReference, file);
        return getDownloadURL(snapshot.ref);
    };
}

export default Storage;
