// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------

import type { MarkdownString } from "vscode";
import type { Span } from "../language/Span";

export interface IHoverInfo {
	hoverType: string; // for telemetry
	span: Span;
	getHoverText(): MarkdownString;
}

export enum HoverType {}
