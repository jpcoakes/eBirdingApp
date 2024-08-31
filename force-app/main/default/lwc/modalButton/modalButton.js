import { LightningElement, api } from "lwc";

export default class ModalButton extends LightningElement {
  @api label;
  @api variant;
  @api title;
  handleClick() {
    this.dispatchEvent(
      new CustomEvent("select", {
        bubbles: true,
        composed: true,
        detail: { message: "test" }
      })
    );
    this.dispatchEvent(
      new CustomEvent("close", {
        detail: { message: "close" }
      })
    );
  }
}
