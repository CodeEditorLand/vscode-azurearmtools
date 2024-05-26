// ---------------------------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.md in the project root for license information.
// ---------------------------------------------------------------------------------------------

import type { allSchemas } from "./schemas";
import type { DeploymentScopeKind } from "./scopes/DeploymentScopeKind";

export interface ISchemaInfo {
	normalizedSchema: allSchemas;
	deploymentScopeKind: DeploymentScopeKind;
	isDeprecated: boolean;
}
