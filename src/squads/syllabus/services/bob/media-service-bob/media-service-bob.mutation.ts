import { uploadServiceClientBob } from "src/squads/syllabus/services/bob/upload-reader-service-bob";

class MediaServiceBob {
    async uploadMedia(files: File[]) {
        const urlResponse = await uploadServiceClientBob.generateResumableUploadURL({
            files,
        });

        return urlResponse;
    }
}

const mediaServiceBob = new MediaServiceBob();

export default mediaServiceBob;
