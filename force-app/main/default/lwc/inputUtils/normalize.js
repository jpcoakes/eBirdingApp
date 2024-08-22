/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

// import { normalizeString } from 'c/utilsPrivate';

export const VARIANT = {
    STANDARD: 'standard',
    LABEL_HIDDEN: 'label-hidden',
    LABEL_STACKED: 'label-stacked',
    LABEL_INLINE: 'label-inline'
};

export function normalizeVariant(value) {
    return normalizeString(value, {
        fallbackValue: VARIANT.STANDARD,
        validValues: [
            VARIANT.STANDARD,
            VARIANT.LABEL_HIDDEN,
            VARIANT.LABEL_STACKED,
            VARIANT.LABEL_INLINE
        ]
    });
}

export function normalizeBoolean(value) {
    console.log("inside normalizeBoolean");
    
    return value === 'true';
}

export function normalizeString(value, fallbackValidValues) {
    // this._variant = normalizeString(value, {
    //     fallbackValue: VARIANT.STANDARD,
    //     validValues: [VARIANT.STANDARD, 'lookup']
    // });
    console.log("inside normalizeString", value, fallbackValidValues);
    
    if (value === VARIANT.STANDARD) { return VARIANT.STANDARD; }
    else if (value === VARIANT.LABEL_HIDDEN) { return VARIANT.LABEL_HIDDEN; }
    else if (value === VARIANT.LABEL_STACKED) { return VARIANT.LABEL_STACKED; }
    else if (value === VARIANT.LABEL_INLINE) { 
        console.log("inside label inline");
        
        return VARIANT.LABEL_INLINE; 
    }

}