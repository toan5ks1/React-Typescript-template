export interface BrightcoveVideoInfo {
    accountId: string;
    videoId: string;
}

export interface BrightcoveProfileData {
    accountId: string;
    policyKey: string;
}

export const parseBrightcoveVideoInfos = (content: string): BrightcoveVideoInfo[] => {
    if (!content) return [];
    return content
        .replace(/^\s*[\r\n]/gm, "")
        .trim()
        .split("\n")
        .map((url) => url.match(/\d{13}/gm) || [""])
        .map((token) => ({
            accountId: token[0],
            videoId: token[1],
        }));
};

export const isValidBrightcoveLink = (value: string, brightcoveId: string): boolean => {
    const brightcoveVideoInfos = parseBrightcoveVideoInfos(value);

    if (!brightcoveVideoInfos.length) return false;

    return brightcoveVideoInfos.every((info) => info.videoId && info.accountId === brightcoveId);
};
