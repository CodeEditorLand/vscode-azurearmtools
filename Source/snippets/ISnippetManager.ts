/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { Span } from "../language/Span";
import type * as Completion from "../vscodeIntegration/Completion";
import type { ISnippet } from "./ISnippet";
import type { InsertionContext } from "./InsertionContext";
import type { Context } from "./KnownContexts";

/**
 * Manages snippets and creates completion items for them.  We do this rather
 * than allowing them to be handled by vscode so that:
 * 1) We can control the context into which snippets can be inserted
 * 2) We can receive telemetry about snippet usage
 */
export interface ISnippetManager {
	/**
	 * Retrieve all snippets that support the given context
	 */
	getSnippets(context: Context): Promise<ISnippet[]>;
	/**
	 * Retrieve all snippets regardless of context
	 */
	getAllSnippets(): Promise<ISnippet[]>;
	/**
	 * Retrieve completion items for all snippets
	 */
	getSnippetsAsCompletionItems(
		insertionContext: InsertionContext,
		span: Span,
	): Promise<Completion.Item[]>;
}
