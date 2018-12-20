module.exports = {
    verbose: true,
    testURL: "http://localhost/",
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "^.+\\.test\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|svg)$": "node-noop",
        "\\.(css|pcss)$": "identity-obj-proxy"
    },
    setupFiles: [
        "./config/jest-setup.js"
    ]
};
