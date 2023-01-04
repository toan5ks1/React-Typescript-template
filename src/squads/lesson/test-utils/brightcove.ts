const exampleAccountId = "6064018595001";
const exampleVideoId = "6064018595001";

const invalidBrightcoveURLs = [
    `players.brightcove.net/${exampleAccountId}/default_default/index.html?videoId=${exampleVideoId}`,
    `http://players.brightcove.net/${exampleAccountId}/default_default/index.html?videoId=6064018595001`,
    `https://players.brightcove.net/606405001/default_default/index.html?videoId=60895001`,
    `https://players.brightcove.net6064018595001/default_default/index.html?videoId=6064018595001`,
    `https://players.brightcove.net/${exampleAccountId}/default_default/index.html?videoId=624448483788001`,
    `https://players.brightcove.net/${exampleAccountId}asd/default_default/index.html?videoId=6064018595001dsa`,
    `https://players.brightcove.net/qwe${exampleAccountId}/default_default/index.html?videoId=dsa6064018595001`,
    `https://players.brigh.net/${exampleAccountId}/default_default/index.html?videoId=6064018595001`,
    `https://players.brightcove.net/${exampleAccountId}/default_default/index.html?audioId/6064018595001`,
    `https://players.brightcove.net/ss/${exampleAccountId}/default_default/index.html?videoId=6064018595001`,
];

const validBrightcoveURLs = [
    `https://players.brightcove.net/${exampleAccountId}/default_Asdasd_default/index.html?videoId=${exampleVideoId}`,
    `https://players.brightcove.net/${exampleAccountId}/default_default/indexasdasdasd.html?videoId=${exampleVideoId}`,
    `https://players.brightcove.net/${exampleAccountId}/a/d/////e/default_default/index.html?videoId=${exampleVideoId}`,
    `https://players.brightcove.net/${exampleAccountId}/default_default/index.html?videoId=${exampleVideoId}`,
];

export const brightcoveSampleLinks = {
    invalidBrightcoveURLs,
    validBrightcoveURLs,
    exampleAccountId,
    exampleVideoId,
};
