/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module "gulp-download" {
	import type { Stream } from "node:stream";

	function gulp_download(urls: string | string[]): Stream;

	export = gulp_download;
}
