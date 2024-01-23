/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

//@ts-check

// See https://github.com/Microsoft/vscode-azuretools/wiki/webpack for guidance

const process = require("node:process");
const dev = require("vscode-azureextensiondev");

const DEBUG_WEBPACK = !!process.env.DEBUG_WEBPACK;

const config = dev.getDefaultWebpackConfig({
	projectRoot: __dirname,
	verbosity: DEBUG_WEBPACK ? "debug" : "normal",
});

if (DEBUG_WEBPACK) {
	console.log("Config:", config);
}

module.exports = config;
