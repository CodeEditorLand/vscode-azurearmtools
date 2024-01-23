// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------

import type { LineColPos } from "../../language/LineColPos";
import type { Span } from "../../language/Span";
import type { IDocumentLocation } from "./IDocumentLocation";

/**
 * Represents a document with a URL location, contents and indexing by position
 */
export interface IDocument extends IDocumentLocation {
	/**
	 * Get the document text as a string.
	 */
	documentText: string;

	/**
	 * Retrieves a section of the document text
	 */
	getDocumentText(span: Span, offsetIndex?: number): string;

	getDocumentPosition(documentCharacterIndex: number): LineColPos;
	getDocumentCharacterIndex(
		documentLineIndex: number,
		documentColumnIndex: number,
		options?: { allowOutOfBounds?: boolean },
	): number;
}
