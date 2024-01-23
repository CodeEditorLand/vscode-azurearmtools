// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------

import type { IProvideOpenedDocuments } from "../../../IProvideOpenedDocuments";
import { parseUri } from "../../../util/uri";
import type { IParameterDefinition } from "../../parameters/IParameterDefinition";
import type { DeploymentTemplateDoc } from "../DeploymentTemplateDoc";
import type { ILinkedTemplateReference } from "./ILinkedTemplateReference";

export function getParameterDefinitionsFromLinkedTemplate(
	linkedTemplate: ILinkedTemplateReference,
	provideOpenDocuments: IProvideOpenedDocuments,
): IParameterDefinition[] {
	let dt: DeploymentTemplateDoc | undefined;
	try {
		const uri = parseUri(linkedTemplate.fullUri);
		dt = provideOpenDocuments.getOpenedDeploymentTemplate(uri);
	} catch (error) {
		// Ignore poorly-formed URIs
	}

	return (
		dt?.topLevelScope.parameterDefinitionsSource.parameterDefinitions.slice() ?? // clone
		[]
	);
}
