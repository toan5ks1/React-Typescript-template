export interface BrightcoveVideoInfo {
    accountId: string;
    videoId: string;
}

export const parseBrightcoveVideoInfos = (content: string): BrightcoveVideoInfo[] => {
    if (!content) return [];

    const splitMultiLinks = content
        .replace(/^\s*[\r\n]/gm, "")
        .trim()
        .split("\n");

    const brightcoveLinkRegex =
        /^(?:https:\/\/)(?:www\.)?(?:players.brightcove.net\/)([\w\d]{13})\/(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)(?:videoId=)([\w\d]{13})$/g;

    const result = splitMultiLinks
        .map((link) => brightcoveLinkRegex.exec(link) || ["", "", ""])
        .map((token) => ({ accountId: token[1], videoId: token[2] }));

    return result;
};

export const isValidBrightcoveLink = (value: string, brightcoveId: string): boolean => {
    const brightcoveVideoInfos = parseBrightcoveVideoInfos(value);

    if (!brightcoveVideoInfos.length) return false;

    return brightcoveVideoInfos.every((info) => info.videoId && info.accountId === brightcoveId);
};
