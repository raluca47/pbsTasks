import {LightningElement, api} from 'lwc';
const VARIANTS = {
    FIELD: "field",
    SECTION_HEADER: "sectionHeader",
    BOLD_SECTION_HEADER: "boldSectionHeader",
    LARGE_HEADER: "largeHeader"
}

const VARIANTS_STYLES = {
    "field": "slds-p-right_x-small pbs-text-size_smaller text_bold",
    "sectionHeader": "slds-text-heading_medium text_bold",
    "boldSectionHeader": "slds-text-heading_medium text_bold",
    "largeHeader": "slds-text-heading_large text_bold"
}

export default class Label extends LightningElement {
    @api variant = VARIANTS.FIELD;
    @api align = "left";
    @api required;

    get styleClasses() {
        return `${VARIANTS_STYLES[this.variant]} slds-text-align_${this.align} slds-grid slds-nowrap`;
    }
}