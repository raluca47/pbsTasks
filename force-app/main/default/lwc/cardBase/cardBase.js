/* eslint-disable @lwc/lwc/no-api-reassignments */
/* eslint-disable no-dupe-class-members */
import { LightningElement, api } from "lwc";
import { chooseVariant, initializeSeparator } from "./chooseVariant";

export default class CardBase extends LightningElement {
  @api showSeparator;
  @api footerButtonsAlignment = "centered-buttons";
  @api variant = "A";
  variantHeader = "";
  variantBody = "";
  connectedCallback() {
    Object.assign(this, chooseVariant(this.variant));
    Object.assign(this, initializeSeparator(this.variant, this.showSeparator));
  }
}
