// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------

import { Location } from "vscode";

import { configKeys } from "../../../common";
import { ext } from "../../extensionVariables";
import { assert } from "../../fixed_assert";
import { Span } from "../../language/Span";
import { IGotoResourcesArgs } from "../../vscodeIntegration/commandArguments";
import { getVSCodeRangeFromSpan } from "../../vscodeIntegration/vscodePosition";
import { ResolvableCodeLens } from "../DeploymentDocument";
import { IJsonResourceInfo } from "./getResourcesInfo";
import { TemplateScope } from "./scopes/TemplateScope";

export function getParentAndChildCodeLenses(
	scope: TemplateScope,
	infos: IJsonResourceInfo[],
): ResolvableCodeLens[] {
	if (
		!ext.configuration.get<boolean>(
			configKeys.codeLensForResourceParentsAndChildren,
		)
	) {
		return [];
	}

	const lenses: ResolvableCodeLens[] = [];

	for (const resource of infos) {
		if (!!resource.parent) {
			lenses.push(new ParentCodeLens(scope, resource));
		}

		if (resource.children.length > 0) {
			lenses.push(new ChildrenCodeLens(scope, resource));
		}
	}

	return lenses;
}

export abstract class ParentOrChildCodeLens extends ResolvableCodeLens {
	public constructor(
		scope: TemplateScope,
		protected readonly sourceResource: IJsonResourceInfo,
	) {
		super(
			scope,
			ParentOrChildCodeLens.getCodeLensSpan(scope, sourceResource),
		);
	}

	private static getCodeLensSpan(
		scope: TemplateScope,
		sourceResource: IJsonResourceInfo,
	): Span {
		// To allow the code lens to be collapsed if the resource is collapsed in the editor, we put the
		//   code lens on the first line *after* the opening brace
		const resourceSpan = sourceResource.resourceObject.span;

		const resourceFirstLine = scope.document.getDocumentPosition(
			resourceSpan.startIndex,
		).line;

		// Start lens on next line
		let lensStartIndex = scope.document.getDocumentCharacterIndex(
			resourceFirstLine + 1,
			0,
		);

		const lensEndIndex = resourceSpan.endIndex;

		if (lensStartIndex > lensEndIndex) {
			// The entire resource must be on a single line - start at the opening brace after all
			lensStartIndex = resourceSpan.startIndex;

			assert(lensStartIndex <= lensEndIndex);
		}

		return new Span(lensStartIndex, lensEndIndex - lensStartIndex);
	}

	protected resolveCore(
		title: string,
		targets: IJsonResourceInfo[],
		kind: "parent" | "children",
	): boolean {
		if (targets.length > 0) {
			const targetLocations = targets.map(
				(resInfo) =>
					new Location(
						this.scope.document.documentUri,
						getVSCodeRangeFromSpan(
							this.scope.document,
							resInfo.resourceObject.span,
						),
					),
			);

			this.command = {
				title: title,
				command: "azurerm-vscode-tools.codeLens.gotoResources",
				arguments: [
					<IGotoResourcesArgs>{
						source: {
							uri: this.scope.document.documentUri,
							range: this.range,
						},
						targets: targetLocations,
						telemetryProperties: {
							kind,
							targetCount: String(targets.length),
						},
					},
				],
			};
		} else {
			this.command = {
				title: title,
				command: "",
			};
		}

		return true;
	}
}

/**
 * A code lens that displays the children of a resource
 */
export class ChildrenCodeLens extends ParentOrChildCodeLens {
	public constructor(
		scope: TemplateScope,
		sourceResource: IJsonResourceInfo,
	) {
		super(scope, sourceResource);
	}

	public async resolve(): Promise<boolean> {
		let title: string;

		const children =
			<IJsonResourceInfo[]>this.sourceResource?.children ?? [];

		if (children.length > 0) {
			const countOfChildrenTitle = `${children.length} ${children.length === 1 ? "child" : "children"}`;

			const childrenLabels = children
				.map((child) =>
					(<IJsonResourceInfo>child).getFriendlyResourceLabel({}),
				)
				.join(", ");

			title = `${countOfChildrenTitle}: ${childrenLabels}`;
		} else {
			title = "No children";
		}

		return super.resolveCore(title, children, "children");
	}
}

/**
 * A code lens that displays the parent of a resource
 */
export class ParentCodeLens extends ParentOrChildCodeLens {
	public constructor(
		scope: TemplateScope,
		sourceResource: IJsonResourceInfo,
	) {
		super(scope, sourceResource);
	}

	public async resolve(): Promise<boolean> {
		const parent = <IJsonResourceInfo | undefined>(
			this.sourceResource?.parent
		);

		let title: string;

		if (parent) {
			title = `Parent: ${parent.getFriendlyResourceLabel({})}`;
		} else {
			title = "No parent";
		}

		return super.resolveCore(title, parent ? [parent] : [], "parent");
	}
}
