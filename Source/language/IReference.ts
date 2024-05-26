// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------

import type { IJsonDocument } from "../documents/templates/IJsonDocument";
import type { Span } from "./Span";

export interface IReference {
	document: IJsonDocument;
	span: Span;
}
