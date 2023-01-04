const presets = [
    "@babel/preset-env",
    "@babel/preset-typescript",
    ["@babel/preset-react", { runtime: "automatic" }],
];
const plugins = [
    [
        "@babel/plugin-transform-runtime",
        {
            generator: true,
        },
    ],
    [
        "babel-plugin-import",
        {
            libraryName: "@mui/material",
            libraryDirectory: "",
            camel2DashComponentName: false,
        },
        "core",
    ],
    [
        "babel-plugin-import",
        {
            libraryName: "@mui/icons-material",
            libraryDirectory: "",
            camel2DashComponentName: false,
        },
        "icons",
    ],
];

if (process.env.NODE_ENV === "test") {
    presets.push("babel-preset-vite");
}

module.exports = {
    presets,
    plugins,
};
