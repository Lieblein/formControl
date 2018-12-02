module.exports = {
    verbose: true,
    testURL: "http://localhost/",
    testRegex: "./src/.*\\*.test.(ts|tsx)$",
    transform: {
        "./src/.*\\*.test.(ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|svg)$": "node-noop",
        "\\.(css|pcss)$": "identity-obj-proxy"
    },
    setupFiles: [
        "./config/jest-setup.js"
    ]
};
