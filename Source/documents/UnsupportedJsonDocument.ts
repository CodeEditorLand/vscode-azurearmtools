// ----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// ----------------------------------------------------------------------------

import { JsonDocument } from "./JsonDocument";

/**
 * Represents a JSON document that is not a deployment or parameter file
 */
export class UnsupportedJsonDocument extends JsonDocument {}
