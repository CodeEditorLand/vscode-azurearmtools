// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------

/**
 * The different sections of an ARM template
 */
export enum TemplateSectionType {
	Resources = 0,
	Outputs = 1,
	Parameters = 2,
	Variables = 3,
	Functions = 4,
	TopLevel = 5,
}
