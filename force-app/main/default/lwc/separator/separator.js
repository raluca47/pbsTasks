import { LightningElement, api } from "lwc";

export default class Separator extends LightningElement {
  @api width = "1px";
  @api color = "var(--pbs-background-color)";
  get separatorStyle() {
    return `border-top: ${this.width} solid ${this.color};`;
  }
}
