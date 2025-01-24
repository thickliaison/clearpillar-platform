const path = require("path");

// paths to nested folders (1+ depth) based on "src" folder as base directory
// 1-depth folders should go to jsconfig.json

module.exports = {
    webpack: {
        alias: {
            "@auth": path.resolve(__dirname, "src/pages/auth"),
            "@profile": path.resolve(__dirname, "src/pages/profile"),
            "@thickliaison": path.resolve(__dirname, "src/pages/site/thickliaison"),
            "@about": path.resolve(__dirname, "src/pages/site/about"),
            "@home": path.resolve(__dirname, "src/pages/site/home"),
            "@join-the-team": path.resolve(__dirname, "src/pages/site/join-the-team"),
            "@services": path.resolve(__dirname, "src/pages/site/services"),
            "@student-resources": path.resolve(__dirname, "src/pages/site/student-resources"),
            "@liaison": path.resolve(__dirname, "src/pages/profile/liaison"),
        },
    },
};