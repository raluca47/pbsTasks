/* eslint-disable @lwc/lwc/no-api-reassignments */
import { api, LightningElement } from "lwc";

export default class ModalBase extends LightningElement {
  showModal = false;
  @api
  open() {
    this.showModal = true;
  }

  @api
  close() {
    this.showModal = false;
  }
}
